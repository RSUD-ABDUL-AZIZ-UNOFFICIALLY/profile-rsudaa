'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faBookOpenMedical,
    faCalendarDays,
    faArrowRight,
    faMagnifyingGlass,
    faChevronDown,
    faRotateRight,
} from '@fortawesome/free-solid-svg-icons'
import { articleResponse } from '@/app/Model/article.model'

const API_URL = process.env.API_URL || ''
const PAGE_SIZE = 6

/**
 * Menghapus tag HTML untuk ringkasan artikel agar pemotongan teks tidak merusak DOM
 */
const createExcerpt = (html?: string | null, maxLength: number = 140): string => {
    if (!html) return ''
    const plainText = html
        .replace(/<[^>]*>/g, ' ')
        .replace(/&nbsp;/gi, ' ')
        .replace(/&amp;/gi, '&')
        .replace(/&quot;/gi, '"')
        .replace(/&#39;/gi, "'")
        .replace(/\s+/g, ' ')
        .trim()

    if (plainText.length <= maxLength) return plainText
    return `${plainText.slice(0, maxLength).trimEnd()}...`
}

const formatTanggalID = (dateString?: string): string => {
    if (!dateString) return '-'
    const date = new Date(dateString)
    if (Number.isNaN(date.getTime())) return dateString

    return new Intl.DateTimeFormat('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    }).format(date)
}

const Artikel: React.FC = () => {
    const [articles, setArticles] = useState<articleResponse[]>([])
    const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE)
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const fetchArticles = useCallback(async (signal?: AbortSignal) => {
        setIsLoading(true)
        setErrorMessage(null)

        try {
            const response = await axios.get(`${API_URL}/article`, { signal })
            if (signal?.aborted) return

            if (Array.isArray(response.data?.data)) {
                setArticles(response.data.data)
            } else {
                setArticles([])
            }
        } catch (error) {
            if (!axios.isCancel(error)) {
                console.error('Error fetching artikel:', error)
                setErrorMessage('Gagal memuat daftar artikel kesehatan. Silakan coba beberapa saat lagi.')
            }
        } finally {
            if (!signal?.aborted) {
                setIsLoading(false)
            }
        }
    }, [])

    useEffect(() => {
        const controller = new AbortController()
        fetchArticles(controller.signal)

        return () => controller.abort()
    }, [fetchArticles])

    const filteredArticles = useMemo(() => {
        const keyword = searchQuery.toLowerCase().trim()
        if (!keyword) return articles

        return articles.filter((item) => {
            const title = (item.title || '').toLowerCase()
            const desc = createExcerpt(item.desc, 500).toLowerCase()
            return title.includes(keyword) || desc.includes(keyword)
        })
    }, [articles, searchQuery])

    const displayedArticles = useMemo(() => {
        return filteredArticles.slice(0, visibleCount)
    }, [filteredArticles, visibleCount])

    const hasMore = visibleCount < filteredArticles.length

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + PAGE_SIZE)
    }

    const handleSearchChange = (value: string) => {
        setSearchQuery(value)
        setVisibleCount(PAGE_SIZE)
    }

    return (
        <section
            aria-labelledby="heading-daftar-artikel"
            className="w-full min-h-[65vh] py-10 px-4 sm:px-6 lg:px-8"
        >
            <div className="max-w-6xl mx-auto">
                {/* Header Halaman */}
                <header className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">

                    {/* Input Pencarian Artikel */}
                    {!isLoading && !errorMessage && articles.length > 0 && (
                        <div className="relative max-w-md mx-auto mt-6">
                            <FontAwesomeIcon
                                icon={faMagnifyingGlass}
                                className="w-4 h-4 text-black/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                            />
                            <input
                                type="search"
                                value={searchQuery}
                                onChange={(e) => handleSearchChange(e.target.value)}
                                placeholder="Cari judul atau topik artikel kesehatan..."
                                aria-label="Cari judul atau topik artikel kesehatan"
                                className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-[#002722]/15 rounded-xl shadow-xs focus:outline-none focus:border-primary transition-colors"
                            />
                        </div>
                    )}
                </header>

                {/* Konten Daftar Artikel */}
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((skeleton) => (
                            <div
                                key={skeleton}
                                className="bg-white border border-[#002722]/10 rounded-xl overflow-hidden shadow-xs animate-pulse"
                            >
                                <div className="aspect-video w-full bg-base-200" />
                                <div className="p-5 space-y-3">
                                    <div className="h-3.5 bg-base-200 rounded w-1/3" />
                                    <div className="h-5 bg-base-200 rounded w-5/6" />
                                    <div className="space-y-1.5 pt-1">
                                        <div className="h-3.5 bg-base-200 rounded w-full" />
                                        <div className="h-3.5 bg-base-200 rounded w-4/5" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : errorMessage ? (
                    <div className="max-w-lg mx-auto bg-white border border-error/25 rounded-2xl p-8 text-center space-y-4 shadow-xs">
                        <p className="text-sm sm:text-base text-error font-medium">{errorMessage}</p>
                        <button
                            type="button"
                            onClick={() => fetchArticles()}
                            className="button button-primary text-sm px-5 py-2.5 inline-flex items-center gap-2"
                        >
                            <FontAwesomeIcon icon={faRotateRight} className="w-3.5 h-3.5" />
                            <span>Muat Ulang Data</span>
                        </button>
                    </div>
                ) : displayedArticles.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {displayedArticles.map((item, index) => {
                                const detailHref = `/artikels/${item.articleID}`
                                const excerpt = createExcerpt(item.desc, 145)

                                return (
                                    <article
                                        key={item.articleID ?? index}
                                        className="card-kegiatan group bg-white border border-[#002722]/10 flex flex-col justify-between h-full"
                                    >
                                        <div>
                                            {/* Thumbnail Artikel */}
                                            <Link
                                                href={detailHref}
                                                className="relative aspect-video w-full overflow-hidden block bg-[#f8fbfa]"
                                            >
                                                <img
                                                    src={item.images || '/page/default.jpg'}
                                                    alt={item.title || 'Ilustrasi Artikel'}
                                                    loading="lazy"
                                                    onError={(e) => {
                                                        e.currentTarget.src = '/page/default.jpg'
                                                    }}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </Link>

                                            {/* Konten Kartu */}
                                            <div className="p-5">
                                                {/* Tanggal Publikasi */}
                                                <time
                                                    dateTime={item.createdAt}
                                                    className="inline-flex items-center gap-1.5 text-xs font-medium text-primary bg-info px-2.5 py-1 rounded-md mb-2.5"
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faCalendarDays}
                                                        className="w-3 h-3 shrink-0"
                                                    />
                                                    <span>{formatTanggalID(item.createdAt)}</span>
                                                </time>

                                                {/* Judul Artikel */}
                                                <h2 className="text-base sm:text-lg font-bold text-dark group-hover:text-primary transition-colors leading-snug line-clamp-2 mb-2">
                                                    <Link href={detailHref}>{item.title}</Link>
                                                </h2>

                                                {/* Ringkasan */}
                                                {excerpt && (
                                                    <p className="text-xs sm:text-sm text-black/70 leading-relaxed line-clamp-3">
                                                        {excerpt}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Footer Kartu */}
                                        <div className="px-5 pb-5 pt-2">
                                            <Link
                                                href={detailHref}
                                                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:text-midDark transition-colors"
                                            >
                                                <span>Baca Artikel</span>
                                                <FontAwesomeIcon
                                                    icon={faArrowRight}
                                                    className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
                                                />
                                            </Link>
                                        </div>
                                    </article>
                                )
                            })}
                                </div>

                                {/* Tombol Muat Lebih Banyak */}
                                {hasMore && (
                                    <div className="flex flex-col items-center mt-10 gap-2">
                                        <button
                                            type="button"
                                            onClick={handleLoadMore}
                                            className="button button-primary px-6 py-2.5 text-xs sm:text-sm font-semibold inline-flex items-center gap-2 shadow-xs hover:shadow-md"
                                        >
                                            <span>Muat Artikel Lainnya</span>
                                            <FontAwesomeIcon icon={faChevronDown} className="w-3.5 h-3.5" />
                                        </button>
                                        <span className="text-xs text-black/55">
                                            Menampilkan {displayedArticles.length} dari {filteredArticles.length} artikel
                                        </span>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="bg-white border border-[#002722]/10 rounded-2xl py-12 px-4 text-center space-y-3">
                                <p className="text-sm sm:text-base text-black/70 font-medium">
                                    {searchQuery
                                        ? `Tidak ditemukan artikel dengan kata kunci "${searchQuery}".`
                                        : 'Belum ada artikel yang dipublikasikan.'}
                                </p>
                                {searchQuery && (
                                    <button
                                        type="button"
                                        onClick={() => handleSearchChange('')}
                                        className="button button-primary text-xs sm:text-sm px-4 py-2"
                                    >
                                        Tampilkan Semua Artikel
                                    </button>
                                )}
                                </div>
                )}
            </div>
        </section>
    )
}

export default Artikel