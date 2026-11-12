'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faUserDoctor,
    faStethoscope,
    faArrowRight,
} from '@fortawesome/free-solid-svg-icons'
import { dokterResponse } from '../Model/dokter.model'

// Disarankan menggunakan API Route internal Next.js (/api/dokter) agar TOKEN SIMRS tetap aman di server,
// atau gunakan NEXT_PUBLIC_SIMRS_URL jika endpoint bersifat publik.
const SIMRS_URL = process.env.SIMRS_URL || ''
const SIMRS_TOKEN = process.env.TOKEN || ''

const getDoctorPhotoUrl = (photo?: string | null): string => {
    if (typeof photo === 'string' && /^https?:\/\//i.test(photo.trim())) {
        return photo.trim()
    }
    return '/dokter/default.jpg'
}

const SectionDokter: React.FC = () => {
    const [doctors, setDoctors] = useState<dokterResponse[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const fetchDoctors = useCallback(async (signal?: AbortSignal) => {
        setIsLoading(true)
        setErrorMessage(null)

        try {
            const endpoint = SIMRS_URL ? `${SIMRS_URL}/api/petugas/dokters/` : '/api/dokter'
            const headers = SIMRS_TOKEN ? { Authorization: `Bearer ${SIMRS_TOKEN}` } : undefined

            const response = await axios.get(endpoint, { headers, signal })
            if (signal?.aborted) return

            if (Array.isArray(response.data?.data)) {
                setDoctors(response.data.data)
            } else {
                setDoctors([])
            }
        } catch (error) {
            if (!axios.isCancel(error)) {
                console.error('Error fetching data dokter:', error)
                setErrorMessage('Gagal memuat daftar dokter. Silakan coba beberapa saat lagi.')
            }
        } finally {
            if (!signal?.aborted) {
                setIsLoading(false)
            }
        }
    }, [])

    useEffect(() => {
        const controller = new AbortController()
        fetchDoctors(controller.signal)

        return () => controller.abort()
    }, [fetchDoctors])

    return (
        <section
            aria-labelledby="heading-dokter-kami"
            className="section"
        >
            <div className="item-section">
                <div className="w-full bg-white border border-[#002722]/10 rounded-2xl shadow-sm p-5 sm:p-8 lg:p-10">
                    {/* Header Section */}
                    <header className="flex flex-col items-center text-center mb-8 sm:mb-10">
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary bg-info px-3.5 py-1 rounded-full mb-2.5">
                            <FontAwesomeIcon icon={faUserDoctor} className="w-3.5 h-3.5" />
                            <span>Tenaga Medis Profesional</span>
                        </span>

                        <h2
                            id="heading-dokter-kami"
                            className="text-dark uppercase w-fit font-bold text-lg sm:text-2xl lg:text-3xl pb-2 px-4 border-b-4 border-primary tracking-tight"
                        >
                            Dokter Kami
                        </h2>
                    </header>

                    {/* Grid Kartu Dokter */}
                    {isLoading ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
                            {[1, 2, 3, 4].map((skeleton) => (
                                <div
                                    key={skeleton}
                                    className="bg-[#f8fbfa] border border-[#002722]/10 rounded-xl overflow-hidden animate-pulse"
                                >
                                    <div className="aspect-square w-full bg-base-200" />
                                    <div className="p-4 space-y-2.5 flex flex-col items-center">
                                        <div className="h-4 bg-base-200 rounded w-3/4" />
                                        <div className="h-3.5 bg-base-200 rounded w-1/2" />
                                        <div className="h-3 bg-base-200 rounded w-2/3" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : errorMessage ? (
                        <div className="max-w-xl mx-auto bg-[#f8fbfa] border border-error/20 rounded-xl p-8 text-center space-y-3">
                            <p className="text-sm text-error font-medium">{errorMessage}</p>
                            <button
                                type="button"
                                onClick={() => fetchDoctors()}
                                className="button button-primary text-xs sm:text-sm px-5 py-2"
                            >
                                Muat Ulang
                            </button>
                            </div>
                        ) : doctors.length > 0 ? (
                            <>
                                    <motion.div
                                        initial={{ opacity: 0, y: 16 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.15 }}
                                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                                        className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto"
                                    >
                                        {doctors.slice(0, 4).map((item, index) => (
                                            <article
                                                key={item.kd_dokter ?? index}
                                                className="card-dokter group flex flex-col justify-between h-full"
                                            >
                                                <div className="body flex flex-col h-full">
                                                    {/* Foto Profil Dokter */}
                                                    <div className="relative aspect-square w-full overflow-hidden bg-[#f8fbfa]">
                                                        <img
                                                            src={getDoctorPhotoUrl(item.photo)}
                                                            alt={item.nm_dokter || 'Foto Dokter'}
                                                            loading="lazy"
                                                            onError={(e) => {
                                                                e.currentTarget.src = '/dokter/default.jpg'
                                                            }}
                                                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                                                        />
                                                    </div>

                                                    {/* Deskripsi Dokter (selaras dengan class .desc, .name, .poli, .motto di globals.css) */}
                                                    <div className="desc flex-1 flex flex-col justify-between">
                                                        <div>
                                                            <h3 className="name line-clamp-2 !text-sm sm:!text-base lg:!text-lg">
                                                                {item.nm_dokter}
                                                            </h3>

                                                            {item.poliklinik && (
                                                                <p className="poli inline-flex items-center justify-center gap-1.5 mt-1.5">
                                                                    <FontAwesomeIcon
                                                                        icon={faStethoscope}
                                                                        className="w-3 h-3 text-primary shrink-0"
                                                                    />
                                                                    <span className="line-clamp-1">{item.poliklinik}</span>
                                                                </p>
                                                            )}
                                                        </div>

                                                        {item.spesialis && (
                                                            <p className="motto mt-2 pt-2 border-t border-[#002722]/10 line-clamp-1">
                                                                Spesialis {item.spesialis}
                                                            </p>
                                                        )}
                                                    </div>
                                        </div>
                                            </article>
                                        ))}
                                    </motion.div>

                                    {/* Tombol Lihat Semua Dokter */}
                                    <div className="flex justify-center mt-8 sm:mt-10">
                                        <Link
                                            href="/jadwal-praktek"
                                            className="button button-primary px-6 py-2.5 text-xs sm:text-sm font-semibold inline-flex items-center gap-2 shadow-xs hover:shadow-md"
                                        >
                                            <span>Lihat Semua Dokter &amp; Jadwal</span>
                                            <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5" />
                                        </Link>
                                    </div>
                                </>
                            ) : (
                                <div className="bg-[#f8fbfa] border border-[#002722]/10 rounded-xl py-10 text-center text-sm text-black/60">
                                    Data dokter belum tersedia saat ini.
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default SectionDokter