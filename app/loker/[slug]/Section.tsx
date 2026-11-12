'use client'

import { LokerResponse } from '@/app/Model/loker.model'
import axios from 'axios'
import Link from 'next/link'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import FormApplyLoker from './FormApplyLoker'

interface Props {
    slug: string
}

const API_URL = process.env.API_URL

/**
 * Format tanggal ke bahasa Indonesia tanpa library eksternal (moment)
 */
const formatTanggalID = (dateInput?: string | Date): string => {
    if (!dateInput) return '-'
    const date = new Date(dateInput)
    if (Number.isNaN(date.getTime())) return '-'

    return new Intl.DateTimeFormat('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    }).format(date)
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

const Section: React.FC<Props> = ({ slug }) => {
    const [data, setData] = useState<LokerResponse | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [isApplying, setIsApplying] = useState<boolean>(false)

    const fetchDetailLoker = useCallback(
        async (signal?: AbortSignal) => {
            if (!slug) return
            setIsLoading(true)
            setErrorMessage(null)

            try {
                const response = await axios.get(`${API_URL}/loker`, {
                    params: { id: slug },
                    signal,
                })

                if (signal?.aborted) return

                const result = Array.isArray(response.data?.data)
                    ? response.data.data[0]
                    : response.data?.data

                if (result) {
                    setData(result)
                } else {
                    setErrorMessage('Data lowongan pekerjaan tidak ditemukan.')
                }
            } catch (error) {
                if (!axios.isCancel(error)) {
                    setErrorMessage('Gagal memuat detail lowongan pekerjaan. Silakan coba lagi.')
                }
            } finally {
                if (!signal?.aborted) {
                    setIsLoading(false)
                }
            }
        },
        [slug]
    )

    useEffect(() => {
        const controller = new AbortController()
        fetchDetailLoker(controller.signal)

        return () => controller.abort()
    }, [fetchDetailLoker])

    // Cek apakah lowongan masih dalam periode aktif
    const isOpen = useMemo(() => {
        if (!data?.dateEnd) return true
        const endDate = new Date(data.dateEnd)
        if (Number.isNaN(endDate.getTime())) return true

        // Set batas akhir ke penghujung hari (23:59:59) tanggal berakhir
        endDate.setHours(23, 59, 59, 999)
        return new Date() <= endDate
    }, [data?.dateEnd])

    const sanitizedDesc = useMemo(() => sanitizeHtml(data?.desc || ''), [data?.desc])

    return (
        <section className="w-full min-h-[65vh] py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Navigasi Kembali */}
                <div className="mb-5">
                    <Link
                        href="/loker"
                        className="inline-flex items-center gap-2 text-sm font-medium text-midDark hover:text-primary transition-colors"
                    >
                        <span aria-hidden="true">&larr;</span>
                        Kembali ke Daftar Lowongan
                    </Link>
                </div>

                <div className="bg-white border border-[#002722]/10 rounded-2xl shadow-sm p-6 sm:p-10">
                    {isLoading ? (
                        <div className="space-y-6 animate-pulse">
                            <div className="space-y-3 pb-6 border-b border-base-200">
                                <div className="h-5 bg-base-200 rounded-full w-28" />
                                <div className="h-8 bg-base-200 rounded-lg w-3/4" />
                            </div>
                            <div className="space-y-2.5">
                                <div className="h-4 bg-base-200 rounded w-full" />
                                <div className="h-4 bg-base-200 rounded w-11/12" />
                                <div className="h-4 bg-base-200 rounded w-full" />
                                <div className="h-4 bg-base-200 rounded w-4/5" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                                <div className="h-16 bg-base-200 rounded-xl" />
                                <div className="h-16 bg-base-200 rounded-xl" />
                            </div>
                        </div>
                    ) : errorMessage || !data ? (
                        <div className="py-12 text-center space-y-4">
                            <p className="text-base font-medium text-error">
                                {errorMessage || 'Lowongan tidak ditemukan.'}
                            </p>
                            <div className="flex justify-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => fetchDetailLoker()}
                                    className="button button-primary text-sm px-5 py-2.5"
                                >
                                    Coba Lagi
                                </button>
                                <Link
                                    href="/loker"
                                    className="button button-info text-sm px-5 py-2.5"
                                >
                                    Lihat Lowongan Lain
                                </Link>
                            </div>
                        </div>
                        ) : (
                        <>
                                    {/* Header Detail Lowongan */}
                                    <header className="pb-6 mb-6 border-b border-[#002722]/10">
                                        <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
                                            <span className="inline-block text-xs font-semibold tracking-wider uppercase text-primary bg-info px-3 py-1 rounded-full">
                                                Detail Formasi
                                            </span>
                                            <span
                                                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${isOpen
                                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                                    : 'bg-rose-50 text-rose-700 border border-rose-200'
                                                    }`}
                                            >
                                                <span
                                                    className={`w-2 h-2 rounded-full ${isOpen ? 'bg-emerald-500' : 'bg-rose-500'
                                                        }`}
                                                />
                                                {isOpen ? 'Pendaftaran Dibuka' : 'Pendaftaran Ditutup'}
                                            </span>
                                        </div>

                                        <h1 className="font-bold uppercase text-xl sm:text-2xl lg:text-3xl text-dark tracking-tight leading-snug">
                                            {data.name}
                                        </h1>
                                    </header>

                                    {/* Periode Pendaftaran */}
                                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                        <div className="bg-[#f8fbfa] border border-[#002722]/10 rounded-xl p-4">
                                            <dt className="text-xs font-medium uppercase tracking-wider text-black/60 mb-1">
                                                Tanggal Mulai
                                            </dt>
                                            <dd className="text-sm sm:text-base font-semibold text-dark">
                                                {formatTanggalID(data.dateStart)}
                                            </dd>
                                        </div>

                                        <div className="bg-[#f8fbfa] border border-[#002722]/10 rounded-xl p-4">
                                            <dt className="text-xs font-medium uppercase tracking-wider text-black/60 mb-1">
                                                Batas Akhir Pendaftaran
                                            </dt>
                                            <dd className="text-sm sm:text-base font-semibold text-primary">
                                                {formatTanggalID(data.dateEnd)}
                                            </dd>
                                </div>
                                    </dl>

                                    {/* Deskripsi & Persyaratan */}
                                    <div className="mb-8">
                                        <h2 className="text-sm font-bold uppercase tracking-wider text-midDark mb-3">
                                            Kualifikasi &amp; Deskripsi Pekerjaan
                                        </h2>
                                        {sanitizedDesc ? (
                                            <div
                                                className="prose prose-sm sm:prose-base max-w-none text-black/85 leading-relaxed prose-headings:text-dark prose-a:text-primary prose-li:my-1"
                                                dangerouslySetInnerHTML={{ __html: sanitizedDesc }}
                                            />
                                        ) : (
                                            <p className="text-sm text-black/60 italic">
                                                Tidak ada deskripsi tambahan untuk posisi ini.
                                            </p>
                                        )}
                            </div>

                                    {/* Area Aksi & Form Lamaran */}
                                    <div className="pt-6 border-t border-[#002722]/10">
                                        {!isOpen ? (
                                            <div className="bg-base-200/60 border border-[#002722]/10 rounded-xl p-4 text-center text-sm text-black/70">
                                                Periode pendaftaran untuk posisi ini telah berakhir.
                                            </div>
                                        ) : !isApplying ? (
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-info/60 border border-primary/20 rounded-xl p-5">
                                                <div>
                                                    <p className="font-semibold text-dark text-sm sm:text-base">
                                                        Tertarik melamar posisi ini?
                                                    </p>
                                                    <p className="text-xs sm:text-sm text-black/70">
                                                        Pastikan seluruh dokumen persyaratan sudah sesuai sebelum mengirim lamaran.
                                                    </p>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => setIsApplying(true)}
                                                    className="button button-primary px-6 py-2.5 text-sm font-semibold shrink-0"
                                                >
                                                    Lamar Sekarang
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="bg-[#f8fbfa] border border-[#002722]/10 rounded-xl p-5 sm:p-6 animation-popup">
                                                <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#002722]/10">
                                                    <h3 className="font-bold text-base sm:text-lg text-dark">
                                                        Formulir Lamaran Kerja
                                                    </h3>
                                                    <button
                                                        type="button"
                                                        onClick={() => setIsApplying(false)}
                                                        className="text-xs sm:text-sm font-medium text-black/60 hover:text-error transition-colors cursor-pointer"
                                                    >
                                                        Batal
                                                    </button>
                                                </div>
                                                <FormApplyLoker item={data} />
                                            </div>
                                        )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Section