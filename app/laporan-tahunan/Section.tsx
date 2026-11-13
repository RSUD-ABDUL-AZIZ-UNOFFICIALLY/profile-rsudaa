'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faFilePdf,
    faChartColumn,
    faArrowUpRightFromSquare,
    faArrowRight,
    faRotateRight,
} from '@fortawesome/free-solid-svg-icons'
import { laporanTahunanResponse } from '../Model/laporanTahunan.model'

const API_URL = process.env.API_URL || ''

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

const isExternalUrl = (url?: string): boolean => {
    if (!url) return false
    return /^https?:\/\//i.test(url.trim())
}

const Section: React.FC = () => {
    const [reports, setReports] = useState<laporanTahunanResponse[]>([])
    const [desc, setDesc] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const fetchLaporanTahunan = useCallback(async (signal?: AbortSignal) => {
        setIsLoading(true)
        setErrorMessage(null)

        try {
            const [listRes, profileRes] = await Promise.allSettled([
                axios.get(`${API_URL}/laporan-tahunan`, {
                    params: { name: '' },
                    signal,
                }),
                axios.get(`${API_URL}/profile/laporanTahunan`, { signal }),
            ])

            if (signal?.aborted) return

            if (listRes.status === 'fulfilled' && listRes.value.data?.success) {
                const rawList = Array.isArray(listRes.value.data?.data)
                    ? listRes.value.data.data
                    : []
                setReports(rawList)
            } else if (listRes.status === 'rejected' && !axios.isCancel(listRes.reason)) {
                setErrorMessage('Gagal memuat daftar laporan tahunan. Silakan coba beberapa saat lagi.')
            }

            if (
                profileRes.status === 'fulfilled' &&
                profileRes.value.data?.success &&
                profileRes.value.data?.data?.desc
            ) {
                setDesc(sanitizeHtml(profileRes.value.data.data.desc))
            }
        } catch (error) {
            if (!axios.isCancel(error)) {
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
        fetchLaporanTahunan(controller.signal)

        return () => controller.abort()
    }, [fetchLaporanTahunan])

    // Urutkan laporan dari tahun terbaru (descending) bila nama mengandung angka tahun
    const sortedReports = useMemo(() => {
        return [...reports].sort((a, b) =>
            (b.name || '').localeCompare(a.name || '', 'id', { numeric: true })
        )
    }, [reports])

    return (
        <section className="w-full min-h-[65vh] py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto bg-white border border-[#002722]/10 rounded-2xl shadow-sm p-6 sm:p-10">
                {/* Header Section */}
                <header className="text-center max-w-2xl mx-auto pb-8 mb-8 border-b border-[#002722]/10">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-info text-primary flex items-center justify-center mx-auto mb-4 shadow-xs border border-primary/15">
                        <FontAwesomeIcon icon={faChartColumn} className="text-2xl sm:text-3xl" />
                    </div>

                    <span className="inline-block text-xs font-semibold uppercase tracking-wider text-primary bg-info px-3.5 py-1 rounded-full mb-3">
                        Transparansi &amp; Akuntabilitas
                    </span>

                    <h1 className="font-bold uppercase text-xl sm:text-3xl lg:text-4xl text-dark tracking-tight leading-snug">
                        Laporan Tahunan <br className="hidden sm:inline" />
                        <span className="text-primary">RSUD dr. Abdul Aziz</span>
                    </h1>

                    {/* Deskripsi Umum */}
                    {isLoading ? (
                        <div className="mt-4 space-y-2 max-w-lg mx-auto animate-pulse">
                            <div className="h-3.5 bg-base-200 rounded w-full" />
                            <div className="h-3.5 bg-base-200 rounded w-4/5 mx-auto" />
                        </div>
                    ) : desc ? (
                        <div
                            className="prose prose-sm sm:prose-base max-w-none text-black/75 mt-4 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: desc }}
                        />
                    ) : null}
                </header>

                {/* Grid Arsip Laporan Tahunan */}
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                        {[1, 2, 3, 4, 5, 6].map((skeleton) => (
                            <div
                                key={skeleton}
                                className="bg-[#f8fbfa] border border-[#002722]/10 rounded-xl p-5 h-32 animate-pulse flex flex-col justify-between"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 rounded-xl bg-base-200 shrink-0" />
                                    <div className="space-y-2 flex-1">
                                        <div className="h-4 bg-base-200 rounded w-3/4" />
                                        <div className="h-3 bg-base-200 rounded w-1/2" />
                                    </div>
                                </div>
                                <div className="h-3 bg-base-200 rounded w-24 self-end" />
                            </div>
                        ))}
                    </div>
                ) : errorMessage ? (
                    <div className="bg-[#f8fbfa] border border-error/25 rounded-xl p-8 text-center space-y-4">
                        <p className="text-sm sm:text-base text-error font-medium">{errorMessage}</p>
                        <button
                            type="button"
                            onClick={() => fetchLaporanTahunan()}
                            className="button button-primary text-sm px-5 py-2.5 inline-flex items-center gap-2"
                        >
                            <FontAwesomeIcon icon={faRotateRight} className="w-3.5 h-3.5" />
                            <span>Muat Ulang Data</span>
                        </button>
                    </div>
                ) : sortedReports.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                        {sortedReports.map((item, index) => {
                            const targetUrl = (item.desc || '').trim()
                            const external = isExternalUrl(targetUrl)

                            const cardContent = (
                                <>
                                    <div className="flex items-start gap-3.5">
                                        <div className="w-12 h-12 rounded-xl bg-info group-hover:bg-primary text-primary group-hover:text-white flex items-center justify-center shrink-0 transition-colors duration-200">
                                            <FontAwesomeIcon icon={faFilePdf} className="text-xl" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <span className="text-[11px] font-semibold uppercase tracking-wider text-primary block mb-0.5">
                                                Dokumen Publikasi
                                            </span>
                                            <h2 className="text-base sm:text-lg font-bold text-dark group-hover:text-primary transition-colors uppercase leading-snug line-clamp-2">
                                                {item.name}
                                            </h2>
                                        </div>
                                    </div>

                                    <div className="mt-5 pt-3 border-t border-[#002722]/10 flex items-center justify-between text-xs font-semibold text-midDark group-hover:text-primary transition-colors">
                                        <span>{targetUrl ? 'Buka Dokumen' : 'Belum Tersedia'}</span>
                                        {targetUrl && (
                                            <FontAwesomeIcon
                                                icon={external ? faArrowUpRightFromSquare : faArrowRight}
                                                className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
                                            />
                                        )}
                                    </div>
                                </>
                            )

                            if (!targetUrl) {
                                return (
                                    <div
                                        key={index}
                                        className="flex flex-col justify-between bg-[#f8fbfa] border border-[#002722]/10 rounded-xl p-5 opacity-60 cursor-not-allowed"
                                    >
                                        {cardContent}
                                    </div>
                                )
                            }

                            if (external) {
                                return (
                                    <a
                                        key={index}
                                        href={targetUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex flex-col justify-between bg-[#f8fbfa] hover:bg-white border border-[#002722]/10 hover:border-primary/50 rounded-xl p-5 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                    >
                                        {cardContent}
                                    </a>
                                )
                            }

                            return (
                                <Link
                                    key={index}
                                    href={targetUrl}
                                    className="group flex flex-col justify-between bg-[#f8fbfa] hover:bg-white border border-[#002722]/10 hover:border-primary/50 rounded-xl p-5 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                >
                                    {cardContent}
                                </Link>
                            )
                        })}
                            </div>
                        ) : (
                            <div className="bg-[#f8fbfa] border border-[#002722]/10 rounded-xl py-12 px-4 text-center">
                                <p className="text-sm sm:text-base text-black/65 font-medium">
                                    Dokumen laporan tahunan belum tersedia saat ini.
                                </p>
                                </div>
                )}
            </div>
        </section>
    )
}

export default Section