'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faMagnifyingGlassPlus,
    faXmark,
    faChevronLeft,
    faChevronRight,
    faFileShield,
} from '@fortawesome/free-solid-svg-icons'
import { maklumatPelayananResponse } from '../Model/maklumatPelayanan.model'

const API_URL = process.env.API_URL || ''

const SectionStandarPelayanan: React.FC = () => {
    const carouselRef = useRef<HTMLDivElement | null>(null)

    const [data, setData] = useState<maklumatPelayananResponse[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [selectedImage, setSelectedImage] = useState<{ url: string; title: string } | null>(null)

    const fetchStandarPelayanan = useCallback(async (signal?: AbortSignal) => {
        setIsLoading(true)
        setErrorMessage(null)

        try {
            const response = await axios.get(`${API_URL}/maklumat-pelayanan`, { signal })
            if (signal?.aborted) return

            if (response.data?.success && Array.isArray(response.data?.data)) {
                setData(response.data.data)
            } else {
                setData([])
            }
        } catch (error) {
            if (!axios.isCancel(error)) {
                console.error('Error fetching standar pelayanan:', error)
                setErrorMessage('Gagal memuat dokumen standar pelayanan.')
            }
        } finally {
            if (!signal?.aborted) {
                setIsLoading(false)
            }
        }
    }, [])

    useEffect(() => {
        const controller = new AbortController()
        fetchStandarPelayanan(controller.signal)

        return () => controller.abort()
    }, [fetchStandarPelayanan])

    // Kunci scroll body dan tangani tombol Escape saat lightbox terbuka
    useEffect(() => {
        if (!selectedImage) return

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setSelectedImage(null)
            }
        }

        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        window.addEventListener('keydown', handleKeyDown)

        return () => {
            document.body.style.overflow = previousOverflow
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [selectedImage])

    // Kontrol geser horizontal untuk pengguna desktop
    const scrollCarousel = (direction: 'left' | 'right') => {
        const container = carouselRef.current
        if (!container) return

        const scrollAmount = Math.max(container.clientWidth * 0.75, 300)
        container.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth',
        })
    }

    return (
        <>
            <section
                aria-labelledby="heading-standar-pelayanan"
                className="w-full flex justify-center overflow-hidden"
            >
                <div className="w-[92%] max-w-6xl">
                    {/* Header & Tombol Kontrol Carousel */}
                    <div className="flex items-end justify-between gap-4 mb-6">
                        <div>
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary bg-white px-3 py-1 rounded-full border border-primary/20 mb-2">
                                <FontAwesomeIcon icon={faFileShield} className="w-3.5 h-3.5" />
                                <span>Maklumat &amp; Mutu Layanan</span>
                            </span>
                            <h2
                                id="heading-standar-pelayanan"
                                className="text-dark uppercase w-fit font-bold text-lg sm:text-xl lg:text-2xl pb-2 pr-6 border-b-4 border-primary tracking-tight"
                            >
                                Standar Pelayanan
                            </h2>
                        </div>

                        {/* Tombol Navigasi Desktop */}
                        {!isLoading && data.length > 1 && (
                            <div className="hidden sm:flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => scrollCarousel('left')}
                                    aria-label="Geser standar pelayanan ke kiri"
                                    className="button-circle button-white border border-[#002722]/15 text-dark hover:bg-primary hover:text-white hover:border-primary w-10 h-10 shadow-xs"
                                >
                                    <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => scrollCarousel('right')}
                                    aria-label="Geser standar pelayanan ke kanan"
                                    className="button-circle button-white border border-[#002722]/15 text-dark hover:bg-primary hover:text-white hover:border-primary w-10 h-10 shadow-xs"
                                >
                                    <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Konten Carousel */}
                    {isLoading ? (
                        <div className="flex gap-4 overflow-hidden py-2">
                            {[1, 2, 3, 4].map((skeleton) => (
                                <div
                                    key={skeleton}
                                    className="shrink-0 w-64 sm:w-72 aspect-[3/4] bg-white/80 border border-[#002722]/10 rounded-xl animate-pulse"
                                />
                            ))}
                        </div>
                    ) : errorMessage ? (
                        <div className="bg-white border border-error/20 rounded-xl p-8 text-center space-y-3">
                            <p className="text-sm text-error font-medium">{errorMessage}</p>
                            <button
                                type="button"
                                onClick={() => fetchStandarPelayanan()}
                                className="button button-primary text-xs sm:text-sm px-4 py-2"
                            >
                                Muat Ulang
                            </button>
                        </div>
                    ) : data.length > 0 ? (
                                <motion.div
                                    ref={carouselRef}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.15 }}
                                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                                    className="flex gap-4 sm:gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory py-2 pb-4"
                                >
                                    {data.map((item, index) => {
                                        const imageUrl = item.file || '/page/default.jpg'
                                        const label = `Standar Pelayanan ${index + 1}`

                                        return (
                                            <button
                                                key={item.id ?? index}
                                                type="button"
                                                onClick={() => setSelectedImage({ url: imageUrl, title: label })}
                                                aria-label={`Perbesar gambar ${label}`}
                                                className="snap-start shrink-0 relative group overflow-hidden cursor-pointer w-64 sm:w-72 aspect-[3/4] bg-white border border-[#002722]/10 rounded-xl shadow-xs hover:shadow-lg transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                            >
                                                <img
                                                    src={imageUrl}
                                                    alt={label}
                                                    loading="lazy"
                                                    onError={(e) => {
                                                        e.currentTarget.src = '/page/default.jpg'
                                                    }}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />

                                                {/* Overlay Pratinjau */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#002722]/80 via-[#002722]/30 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                    <span className="inline-flex items-center gap-2 bg-white/95 text-dark font-semibold text-xs sm:text-sm px-4 py-2 rounded-full shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                                        <FontAwesomeIcon
                                                            icon={faMagnifyingGlassPlus}
                                                            className="w-4 h-4 text-primary"
                                                        />
                                                        <span>Lihat Dokumen</span>
                                                    </span>
                                                </div>
                                            </button>
                                        )
                                    })}
                                </motion.div>
                            ) : (
                                <div className="bg-white border border-[#002722]/10 rounded-xl py-10 text-center text-sm text-black/60">
                                    Dokumen standar pelayanan belum tersedia.
                                    </div>
                    )}
                </div>
            </section>

            {/* Lightbox Modal Pratinjau Dokumen */}
            {selectedImage && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label={selectedImage.title}
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm p-4 animation-popup"
                    onClick={() => setSelectedImage(null)}
                >
                    {/* Tombol Tutup */}
                    <button
                        type="button"
                        onClick={() => setSelectedImage(null)}
                        aria-label="Tutup pratinjau dokumen"
                        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-60 w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
                    </button>

                    {/* Container Gambar */}
                    <div
                        className="relative flex flex-col items-center justify-center w-full max-w-5xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={selectedImage.url}
                            alt={selectedImage.title}
                            className="w-auto h-auto max-w-full max-h-[80dvh] object-contain rounded-xl shadow-2xl bg-white"
                        />

                        <p className="text-white/85 mt-4 text-xs sm:text-sm font-medium tracking-wide bg-black/40 border border-white/10 px-4 py-2 rounded-full">
                            Klik di luar gambar atau tekan{' '}
                            <kbd className="font-sans font-semibold bg-white/20 px-2 py-0.5 rounded text-white mx-0.5">
                                Esc
                            </kbd>{' '}
                            untuk menutup
                        </p>
                    </div>
                </div>
            )}
        </>
    )
}

export default SectionStandarPelayanan