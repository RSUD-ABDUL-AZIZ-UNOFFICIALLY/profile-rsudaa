'use client'

import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faBookMedical,
    faNotesMedical,
    faStethoscope,
} from '@fortawesome/free-solid-svg-icons'
import { ProfileResponse } from '@/app/Model/profile.model'

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

const Head: React.FC = () => {
    const [profileData, setProfileData] = useState<ProfileResponse | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const fetchArticleHeader = useCallback(async (signal?: AbortSignal) => {
        setIsLoading(true)

        try {
            const response = await axios.get(`${API_URL}/profile/article`, { signal })
            if (signal?.aborted) return

            if (response.data?.data) {
                setProfileData(response.data.data)
            }
        } catch (error) {
            if (!axios.isCancel(error)) {
                console.error('Error fetching header artikel:', error)
            }
        } finally {
            if (!signal?.aborted) {
                setIsLoading(false)
            }
        }
    }, [])

    useEffect(() => {
        const controller = new AbortController()
        fetchArticleHeader(controller.signal)

        return () => controller.abort()
    }, [fetchArticleHeader])

    const sanitizedDesc = sanitizeHtml(profileData?.desc || '')

    return (
        <section
            aria-labelledby="heading-artikel-rsud"
            className="w-full pt-8 pb-2 px-4 sm:px-6 lg:px-8"
        >
            <div className="max-w-6xl mx-auto bg-white border border-[#002722]/10 rounded-2xl shadow-sm overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                    {/* Kolom Kiri: Judul & Deskripsi Pengantar */}
                    <div className="lg:col-span-8 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
                        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary bg-info px-3.5 py-1 rounded-full border border-primary/20 w-fit mb-3">
                            <FontAwesomeIcon icon={faBookMedical} className="w-3.5 h-3.5" />
                            <span>Publikasi &amp; Literasi Kesehatan</span>
                        </span>

                        <h1
                            id="heading-artikel-rsud"
                            className="text-dark uppercase w-fit font-bold text-xl sm:text-2xl lg:text-3xl pb-2 pr-6 border-b-4 border-primary tracking-tight"
                        >
                            Artikel RSUD dr. Abdul Aziz
                        </h1>

                        <div className="mt-5">
                            {isLoading ? (
                                <div className="space-y-2.5 animate-pulse max-w-2xl">
                                    <div className="h-4 bg-base-200 rounded w-full" />
                                    <div className="h-4 bg-base-200 rounded w-11/12" />
                                    <div className="h-4 bg-base-200 rounded w-3/4" />
                                </div>
                            ) : sanitizedDesc ? (
                                <div
                                    className="prose prose-sm sm:prose-base max-w-none text-black/80 leading-relaxed text-justify sm:text-left"
                                    dangerouslySetInnerHTML={{ __html: sanitizedDesc }}
                                />
                            ) : (
                                <p className="text-sm sm:text-base text-black/75 leading-relaxed">
                                    Kumpulan artikel edukasi kesehatan, informasi medis terpercaya, dan wawasan pencegahan penyakit yang disusun oleh tim medis RSUD dr. Abdul Aziz Kota Singkawang.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Kolom Kanan: Panel Visual Institusional */}
                    <div className="lg:col-span-4 bg-gradient-to-br from-midDark to-primary text-white p-6 sm:p-8 flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[200px]">
                        {/* Ornamen Latar Halus */}
                        <div
                            aria-hidden="true"
                            className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-white/10 pointer-events-none"
                        />
                        <div
                            aria-hidden="true"
                            className="absolute -left-6 -top-6 w-28 h-28 rounded-full bg-secondary/20 pointer-events-none"
                        />

                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-xs border border-white/20 flex items-center justify-center mb-3.5 shadow-md">
                                <FontAwesomeIcon
                                    icon={faNotesMedical}
                                    className="text-3xl text-white"
                                />
                            </div>
                            <p className="font-bold text-base sm:text-lg tracking-wide">
                                Ruang Baca Sehat
                            </p>
                            <p className="text-xs text-white/80 mt-1 max-w-[220px] leading-relaxed">
                                Informasi medis akurat langsung dari tenaga kesehatan profesional
                            </p>
                            <span className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider bg-white/15 px-3 py-1 rounded-full text-white/95">
                                <FontAwesomeIcon icon={faStethoscope} className="w-3 h-3" />
                                <span>RSUD dr. Abdul Aziz</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Head