'use client'

import axios from 'axios'
import Link from 'next/link'
import React, { useCallback, useEffect, useState } from 'react'
import { LokerResponse } from '../Model/loker.model'


// const API_URL = process.env.NEXT_PUBLIC_API_URL || ''
const API_URL = process.env.API_URL

/**
 * Membersihkan tag HTML & decode HTML entities untuk preview teks pendek
 */
const extractPlainText = (html: string = '', maxLength: number = 160): string => {
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

/**
 * Sanitasi dasar untuk mencegah XSS sebelum merender HTML dari API
 */
const sanitizeHtml = (html: string = ''): string => {
    if (!html) return ''
    return html
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<(iframe|object|embed|form|style)[^>]*>.*?<\/\1>/gi, '')
        .replace(/\s+on\w+="[^"]*"/gi, '')
        .replace(/\s+on\w+='[^']*'/gi, '')
        .replace(/javascript:/gi, '')
}

const Section = () => {
    const [desc, setDesc] = useState<string>('')
    const [lokerList, setLokerList] = useState<LokerResponse[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const fetchLokerData = useCallback(async (signal?: AbortSignal) => {
        setIsLoading(true)
        setErrorMessage(null)

        try {
            const [profileRes, lokerRes] = await Promise.allSettled([
                axios.get(`${API_URL}/profile/loker`, { signal }),
                axios.get(`${API_URL}/loker`, { signal }),
            ])

            if (signal?.aborted) return

            if (profileRes.status === 'fulfilled' && profileRes.value.data?.data?.desc) {
                setDesc(sanitizeHtml(profileRes.value.data.data.desc))
            }

            if (lokerRes.status === 'fulfilled' && Array.isArray(lokerRes.value.data?.data)) {
                setLokerList(lokerRes.value.data.data)
            } else if (lokerRes.status === 'rejected' && !axios.isCancel(lokerRes.reason)) {
                setErrorMessage('Gagal memuat daftar lowongan pekerjaan. Silakan coba beberapa saat lagi.')
            }
        } catch (err) {
            if (!axios.isCancel(err)) {
                setErrorMessage('Terjadi kesalahan jaringan saat menghubungi server.')
            }
        } finally {
            if (!signal?.aborted) {
                setIsLoading(false)
            }
        }
    }, [])

    useEffect(() => {
        const controller = new AbortController()
        fetchLokerData(controller.signal)

        return () => controller.abort()
    }, [fetchLokerData])

    return (
        <section className="w-full min-h-[60vh] py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto bg-white shadow-sm border border-[#002722]/10 rounded-2xl p-6 sm:p-10">
                {/* Header Section */}
                <header className="mb-8 pb-6 border-b border-[#002722]/10">
                    <span className="inline-block text-xs font-semibold tracking-wider uppercase text-primary bg-info px-3 py-1 rounded-full mb-3">
                        Karir &amp; Rekrutmen
                    </span>
                    <h1 className="font-bold uppercase text-xl sm:text-3xl lg:text-4xl text-dark tracking-tight leading-tight">
                        Lowongan Pekerjaan <br className="hidden sm:inline" />
                        <span className="text-primary">RSUD dr. Abdul Aziz</span>
                    </h1>
                </header>

                {/* Deskripsi Umum */}
                {(isLoading || desc) && (
                    <div className="text-sm sm:text-base text-black/80 leading-relaxed mb-10">
                        {isLoading ? (
                            <div className="space-y-2.5 animate-pulse max-w-3xl">
                                <div className="h-4 bg-base-200 rounded w-full" />
                                <div className="h-4 bg-base-200 rounded w-11/12" />
                                <div className="h-4 bg-base-200 rounded w-3/4" />
                            </div>
                        ) : (
                            <div
                                className="prose prose-sm sm:prose-base max-w-none prose-headings:text-dark prose-a:text-primary"
                                dangerouslySetInnerHTML={{ __html: desc }}
                            />
                        )}
                    </div>
                )}

                {/* Daftar Lowongan */}
                <div className="bg-[#f8fbfa] border border-[#002722]/10 rounded-xl p-5 sm:p-8">
                    <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
                        <h2 className="pb-2 pr-4 border-b-4 border-primary text-dark font-bold text-lg sm:text-xl tracking-tight">
                            Daftar Lowongan Tersedia
                        </h2>
                        {!isLoading && lokerList.length > 0 && (
                            <span className="text-xs sm:text-sm font-medium text-midDark bg-info px-3 py-1 rounded-full">
                                {lokerList.length} Posisi Dibuka
                            </span>
                        )}
                    </div>

                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                            {[1, 2, 3].map((skeleton) => (
                                <div
                                    key={skeleton}
                                    className="bg-white rounded-xl p-6 border border-[#002722]/10 shadow-xs flex flex-col justify-between h-60 animate-pulse"
                                >
                                    <div className="space-y-3">
                                        <div className="h-5 bg-base-200 rounded w-3/4" />
                                        <div className="h-4 bg-base-200 rounded w-full" />
                                        <div className="h-4 bg-base-200 rounded w-5/6" />
                                        <div className="h-4 bg-base-200 rounded w-2/3" />
                                    </div>
                                    <div className="pt-4 border-t border-base-200 flex justify-end">
                                        <div className="h-9 bg-base-200 rounded-lg w-28" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : errorMessage ? (
                        <div className="bg-white border border-error/30 rounded-xl p-8 text-center space-y-4">
                            <p className="text-sm sm:text-base text-error font-medium">{errorMessage}</p>
                            <button
                                type="button"
                                onClick={() => fetchLokerData()}
                                className="button button-primary text-sm px-5 py-2.5"
                            >
                                Muat Ulang Data
                            </button>
                            </div>
                        ) : lokerList.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                                {lokerList.map((item, index) => (
                                    <article
                                        key={item.id ?? index}
                                        className="group bg-white rounded-xl border border-[#002722]/10 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between h-full p-6"
                                    >
                                        <div>
                                            <h3 className="text-base sm:text-lg font-bold text-dark group-hover:text-primary transition-colors line-clamp-2 mb-2.5 leading-snug">
                                                {item.name}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-black/70 leading-relaxed">
                                                {extractPlainText(item.desc, 160)}
                                            </p>
                                        </div>

                                        <div className="mt-6 pt-4 border-t border-[#002722]/10 flex justify-end">
                                            {item.id ? (
                                                <Link
                                                    href={`/loker/${item.id}`}
                                                    className="button button-primary text-xs sm:text-sm font-semibold w-full sm:w-auto px-4 py-2 text-center"
                                                >
                                                    Lihat Detail
                                                </Link>
                                            ) : (
                                                <span className="text-xs text-black/40 italic">
                                                    Detail tidak tersedia
                                                </span>
                                            )}
                                        </div>
                                    </article>
                                ))}
                                </div>
                            ) : (
                                <div className="bg-white border border-[#002722]/10 rounded-xl py-12 px-4 text-center">
                                    <p className="text-black/60 text-sm sm:text-base font-medium">
                                        Belum ada lowongan pekerjaan yang tersedia saat ini.
                                    </p>
                                    </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Section