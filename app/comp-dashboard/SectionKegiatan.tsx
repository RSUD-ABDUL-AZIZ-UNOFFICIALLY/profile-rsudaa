'use client'

import React, { useCallback, useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faArrowRight, faNewspaper, faBullhorn } from '@fortawesome/free-solid-svg-icons'

import { activityResponse } from '../Model/activity.model'
import { articleResponse } from '../Model/article.model'
import ModalKegiatan from '../component/ModalKegiatan'
import ModalArticle from '../component/ModalArticle'
import { BaseContext } from '../context/BaseContext'

type TabType = 'kegiatan' | 'artikel'

const API_URL = process.env.API_URL || ''

/**
 * Format waktu & tanggal ke format Indonesia tanpa library eksternal
 */
const formatDateTimeID = (dateInput?: string | Date): string => {
    if (!dateInput) return '-'
    const date = new Date(dateInput)
    if (Number.isNaN(date.getTime())) return '-'

    const datePart = new Intl.DateTimeFormat('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    }).format(date)

    const timePart = new Intl.DateTimeFormat('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    }).format(date)

    return `${timePart} WIB • ${datePart}`
}

/**
 * Ekstrak teks murni dari HTML agar pemotongan pratinjau tidak merusak tag DOM
 */
const extractPlainText = (html: string = '', maxLength: number = 200): string => {
    if (!html) return ''

    let text = html
    if (typeof window !== 'undefined') {
        const doc = new DOMParser().parseFromString(html, 'text/html')
        text = doc.body.textContent || ''
    } else {
        text = html.replace(/<[^>]*>?/gm, '')
    }

    const normalized = text.replace(/\s+/g, ' ').trim()
    if (normalized.length <= maxLength) return normalized
    return `${normalized.slice(0, maxLength).trimEnd()}...`
}

interface ContentCardProps {
    title: string
    image?: string
    date?: string | Date
    description?: string
    href: string
}

const ContentCard: React.FC<ContentCardProps> = ({ title, image, date, description, href }) => {
    return (
        <article className="group grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 bg-[#f8fbfa] hover:bg-white border border-[#002722]/10 hover:border-primary/40 rounded-xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all duration-200">
            {/* Thumbnail */}
            <Link
                href={href}
                className="md:col-span-4 relative aspect-video md:aspect-[4/3] w-full overflow-hidden rounded-lg bg-base-200 block"
            >
                <img
                    src={image || '/page/default.jpg'}
                    alt={title}
                    loading="lazy"
                    onError={(e) => {
                        e.currentTarget.src = '/page/default.jpg'
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </Link>

            {/* Konten Teks */}
            <div className="md:col-span-8 flex flex-col justify-between">
                <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-medium text-primary mb-2">
                        <FontAwesomeIcon icon={faCalendarDays} className="w-3.5 h-3.5" />
                        <time>{formatDateTimeID(date)}</time>
                    </div>

                    <h3 className="text-base sm:text-lg lg:text-xl font-bold text-dark group-hover:text-primary transition-colors line-clamp-2 leading-snug mb-2">
                        <Link href={href}>{title}</Link>
                    </h3>

                    <p className="text-xs sm:text-sm text-black/75 leading-relaxed line-clamp-3">
                        {extractPlainText(description, 220)}
                    </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#002722]/10 flex justify-end">
                    <Link
                        href={href}
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:text-midDark transition-colors"
                    >
                        <span>Baca Selengkapnya</span>
                        <FontAwesomeIcon
                            icon={faArrowRight}
                            className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200"
                        />
                    </Link>
                </div>
            </div>
        </article>
    )
}

const CardSkeleton: React.FC = () => (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 bg-[#f8fbfa] border border-[#002722]/10 rounded-xl p-4 sm:p-5 animate-pulse">
        <div className="md:col-span-4 aspect-video md:aspect-[4/3] bg-base-200 rounded-lg" />
        <div className="md:col-span-8 flex flex-col justify-between space-y-3">
            <div className="space-y-2.5">
                <div className="h-3.5 bg-base-200 rounded w-36" />
                <div className="h-5 bg-base-200 rounded w-3/4" />
                <div className="h-4 bg-base-200 rounded w-full" />
                <div className="h-4 bg-base-200 rounded w-5/6" />
            </div>
            <div className="pt-3 border-t border-base-200 flex justify-end">
                <div className="h-4 bg-base-200 rounded w-28" />
            </div>
        </div>
    </div>
)

const SectionKegiatan: React.FC = () => {
    const baseContext = useContext(BaseContext)

    const [activeTab, setActiveTab] = useState<TabType>('kegiatan')
    const [activities, setActivities] = useState<activityResponse[]>([])
    const [articles, setArticles] = useState<articleResponse[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const fetchContent = useCallback(async (signal?: AbortSignal) => {
        setIsLoading(true)
        setErrorMessage(null)

        try {
            const [activityRes, articleRes] = await Promise.allSettled([
                axios.get(`${API_URL}/activity`, { signal }),
                axios.get(`${API_URL}/article`, { signal }),
            ])

            if (signal?.aborted) return

            if (activityRes.status === 'fulfilled' && Array.isArray(activityRes.value.data?.data)) {
                setActivities(activityRes.value.data.data)
            }

            if (articleRes.status === 'fulfilled' && Array.isArray(articleRes.value.data?.data)) {
                setArticles(articleRes.value.data.data)
            }

            if (
                activityRes.status === 'rejected' &&
                articleRes.status === 'rejected' &&
                !axios.isCancel(activityRes.reason)
            ) {
                setErrorMessage('Gagal memuat informasi kegiatan dan artikel.')
            }
        } catch (err) {
            if (!axios.isCancel(err)) {
                setErrorMessage('Terjadi gangguan jaringan saat mengambil data.')
            }
        } finally {
            if (!signal?.aborted) {
                setIsLoading(false)
            }
        }
    }, [])

    useEffect(() => {
        const controller = new AbortController()
        fetchContent(controller.signal)

        return () => controller.abort()
    }, [fetchContent])

    return (
        <section
            aria-label="Kegiatan dan Artikel RSUD dr. Abdul Aziz"
            className="w-full bg-white border border-[#002722]/10 rounded-2xl shadow-sm p-4 sm:p-6 lg:p-8"
        >
            {/* Modal Global jika masih digunakan oleh komponen lain */}
            {baseContext?.modalActivityItem && <ModalKegiatan item={baseContext.modalActivityItem} />}
            {baseContext?.modalArticleItem && <ModalArticle item={baseContext.modalArticleItem} />}

            {/* Tab Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-6 border-b border-[#002722]/10">
                <div role="tablist" aria-label="Kategori Publikasi" className="inline-flex bg-[#f8fbfa] p-1.5 rounded-xl border border-[#002722]/10 w-full sm:w-auto">
                    <button
                        type="button"
                        role="tab"
                        aria-selected={activeTab === 'kegiatan'}
                        onClick={() => setActiveTab('kegiatan')}
                        className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wide transition-all cursor-pointer ${activeTab === 'kegiatan'
                            ? 'bg-primary text-white shadow-xs'
                            : 'text-midDark hover:text-primary'
                            }`}
                    >
                        <FontAwesomeIcon icon={faBullhorn} className="w-3.5 h-3.5" />
                        <span>Kegiatan</span>
                    </button>

                    <button
                        type="button"
                        role="tab"
                        aria-selected={activeTab === 'artikel'}
                        onClick={() => setActiveTab('artikel')}
                        className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wide transition-all cursor-pointer ${activeTab === 'artikel'
                            ? 'bg-primary text-white shadow-xs'
                            : 'text-midDark hover:text-primary'
                            }`}
                    >
                        <FontAwesomeIcon icon={faNewspaper} className="w-3.5 h-3.5" />
                        <span>Artikel Kesehatan</span>
                    </button>
                </div>

                {/* Link Lihat Semua di Desktop */}
                <Link
                    href={activeTab === 'kegiatan' ? '/kegiatan' : '/artikel'}
                    className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-midDark transition-colors"
                >
                    <span>Lihat Semua {activeTab === 'kegiatan' ? 'Kegiatan' : 'Artikel'}</span>
                    <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5" />
                </Link>
            </div>

            {/* Tab Panel Content */}
            <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                role="tabpanel"
                className="space-y-4 sm:space-y-5"
            >
                {isLoading ? (
                    <>
                        <CardSkeleton />
                        <CardSkeleton />
                    </>
                ) : errorMessage ? (
                    <div className="bg-[#f8fbfa] border border-error/20 rounded-xl p-8 text-center space-y-3">
                        <p className="text-sm text-error font-medium">{errorMessage}</p>
                        <button
                            type="button"
                            onClick={() => fetchContent()}
                            className="button button-primary text-xs sm:text-sm px-4 py-2"
                        >
                            Muat Ulang
                        </button>
                    </div>
                    ) : activeTab === 'kegiatan' ? (
                        activities.length > 0 ? (
                            activities.slice(0, 2).map((item, idx) => (
                                <ContentCard
                                    key={item.activityID ?? idx}
                                    title={item.title}
                                    image={item.images}
                                    date={item.createdAt}
                                    description={item.desc}
                                    href={`/activity/${item.activityID}`}
                                />
                            ))
                        ) : (
                            <div className="bg-[#f8fbfa] border border-[#002722]/10 rounded-xl py-10 text-center text-sm text-black/60">
                                Belum ada dokumentasi kegiatan terbaru.
                                    </div>
                                )
                ) : articles.length > 0 ? (
                    articles.slice(0, 2).map((item, idx) => (
                        <ContentCard
                            key={item.articleID ?? idx}
                            title={item.title}
                            image={item.images}
                            date={item.createdAt}
                            description={item.desc}
                            href={`/artikels/${item.articleID}`}
                        />
                    ))
                ) : (
                    <div className="bg-[#f8fbfa] border border-[#002722]/10 rounded-xl py-10 text-center text-sm text-black/60">
                        Belum ada artikel kesehatan terbaru.
                    </div>
                )}

                {/* Tombol Lihat Semua untuk Mobile */}
                <div className="pt-2 sm:hidden">
                    <Link
                        href={activeTab === 'kegiatan' ? '/kegiatan' : '/artikel'}
                        className="button button-info w-full py-2.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                    >
                        <span>Semua {activeTab === 'kegiatan' ? 'Kegiatan' : 'Artikel'}</span>
                        <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5" />
                    </Link>
                </div>
            </motion.div>
        </section>
    )
}

export default SectionKegiatan