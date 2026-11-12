'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faLocationDot,
    faPhone,
    faEnvelope,
    faScaleBalanced,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import {
    faFacebookF,
    faInstagram,
    faYoutube,
    faTiktok
} from '@fortawesome/free-brands-svg-icons'
import skw from '../../public/skw.png'
import { DasarHukumResponse } from '../Model/dasarHukum.model'

const API_URL = process.env.API_URL || ''

const PELAYANAN_LINKS = [
    { label: 'Survei Kepuasan Masyarakat', href: '/skm' },
    { label: 'Layanan Informasi & Pengaduan', href: '/layanan-informasi' },
    { label: 'Informasi Poliklinik', href: '/informasi-poliklinik' },
    { label: 'Jadwal Praktek', href: '/jadwal-praktek' },
    { label: 'Fasilitas & Tarif', href: '/fasilitas-tarif' },
    { label: 'Permintaan Informasi Publik', href: '/permintaan-informasi-publik' },
]

const TENTANG_KAMI_LINKS = [
    { label: 'Profil Rumah Sakit', href: '/profil' },
    { label: 'Struktur Organisasi', href: '/struktur-organisasi' },
    { label: 'Maklumat Pelayanan', href: '/maklumat-pelayanan' },
    { label: 'Kegiatan', href: '/kegiatan' },
    { label: 'Artikel Kesehatan', href: '/artikel' },
]

const SOCIAL_LINKS = [
    { label: 'Facebook RSUD dr. Abdul Aziz', href: 'https://www.facebook.com/rsudaa', icon: faFacebookF },
    { label: 'Instagram RSUD dr. Abdul Aziz', href: 'https://www.instagram.com/rsuddr.abdulazizsingkawang?utm_source=ig_web_button_share_sheet&exln=ZDNlZDc0MzIxNw==', icon: faInstagram },
    { label: 'YouTube RSUD dr. Abdul Aziz', href: 'https://www.youtube.com/@RSUDdr.AbdulAziz', icon: faYoutube },
    { label: 'Tiktok RSUD dr. Abdul Aziz', href: 'https://www.tiktok.com/@rsuddr.abdulazizskw', icon: faTiktok },
]

const Footer: React.FC = () => {
    const [dataDasarHukum, setDataDasarHukum] = useState<DasarHukumResponse[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const fetchDasarHukum = useCallback(async (signal?: AbortSignal) => {
        try {
            const response = await axios.get(`${API_URL}/dasar-hukum`, { signal })
            if (signal?.aborted) return

            if (response.data?.success && Array.isArray(response.data?.data)) {
                setDataDasarHukum(response.data.data)
            }
        } catch (error) {
            if (!axios.isCancel(error)) {
                console.error('Error fetching dasar hukum:', error)
            }
        } finally {
            if (!signal?.aborted) {
                setIsLoading(false)
            }
        }
    }, [])

    useEffect(() => {
        const controller = new AbortController()
        fetchDasarHukum(controller.signal)

        return () => controller.abort()
    }, [fetchDasarHukum])

    const currentYear = new Date().getFullYear()

    return (
        <footer className="foot-bar mt-auto" role="contentinfo">
            <div className="max-w-6xl mx-auto">
                {/* Grid Utama 4 Kolom */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-10">
                    {/* Kolom 1: Identitas & Kontak RSUD */}
                    <div className="lg:col-span-4 space-y-4">
                        <div className="flex items-center gap-3.5">
                            <div className="bg-white p-2.5 rounded-xl shadow-md shrink-0">
                                <Image
                                    src={skw}
                                    alt="Logo RSUD dr. Abdul Aziz Singkawang"
                                    className="h-12 w-auto object-contain"
                                />
                            </div>
                            <div>
                                <p className="font-bold text-base sm:text-lg text-white leading-tight">
                                    RSUD dr. Abdul Aziz
                                </p>
                                <p className="text-xs sm:text-sm text-white/80 mt-0.5">
                                    Kota Singkawang, Kalimantan Barat
                                </p>
                            </div>
                        </div>

                        <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                            Memberikan pelayanan kesehatan rujukan yang profesional, bermutu, dan berorientasi pada keselamatan pasien.
                        </p>

                        <ul className="space-y-2 text-xs sm:text-sm text-white/90 pt-1">
                            <li className="flex items-start gap-2.5">
                                <FontAwesomeIcon
                                    icon={faLocationDot}
                                    className="w-3.5 h-3.5 text-secondary mt-1 shrink-0"
                                />
                                <span>Jl. Dr. Soetomo No. 28, Pasiran, Singkawang Barat, Kota Singkawang</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <FontAwesomeIcon
                                    icon={faPhone}
                                    className="w-3.5 h-3.5 text-secondary shrink-0"
                                />
                                <span>(0562) 631798</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <FontAwesomeIcon
                                    icon={faEnvelope}
                                    className="w-3.5 h-3.5 text-secondary shrink-0"
                                />
                                <span>rsudaa@singkawangkota.go.id</span>
                            </li>
                        </ul>
                    </div>

                    {/* Kolom 2: Pelayanan Publik */}
                    <nav aria-label="Pelayanan Publik" className="lg:col-span-3 foot-bar-item">
                        <h2 className="head">Pelayanan Publik</h2>
                        <ul className="body space-y-2.5 !px-0">
                            {PELAYANAN_LINKS.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="group inline-flex items-center gap-2 text-xs sm:text-sm text-white/85 hover:text-warning transition-colors"
                                    >
                                        <FontAwesomeIcon
                                            icon={faChevronRight}
                                            className="w-2.5 h-2.5 text-secondary group-hover:translate-x-0.5 transition-transform"
                                        />
                                        <span>{item.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Kolom 3: Tentang Kami */}
                    <nav aria-label="Tentang Kami" className="lg:col-span-2 foot-bar-item">
                        <h2 className="head">Tentang Kami</h2>
                        <ul className="body space-y-2.5 !px-0">
                            {TENTANG_KAMI_LINKS.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="group inline-flex items-center gap-2 text-xs sm:text-sm text-white/85 hover:text-warning transition-colors"
                                    >
                                        <FontAwesomeIcon
                                            icon={faChevronRight}
                                            className="w-2.5 h-2.5 text-secondary group-hover:translate-x-0.5 transition-transform"
                                        />
                                        <span>{item.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Kolom 4: Dasar Hukum */}
                    <nav aria-label="Dasar Hukum" className="lg:col-span-3 foot-bar-item">
                        <h2 className="head">Dasar Hukum</h2>
                        <div className="body !px-0">
                            {isLoading ? (
                                <div className="space-y-2.5 animate-pulse">
                                    <div className="h-3.5 bg-white/20 rounded w-4/5" />
                                    <div className="h-3.5 bg-white/20 rounded w-3/4" />
                                    <div className="h-3.5 bg-white/20 rounded w-5/6" />
                                </div>
                            ) : dataDasarHukum.length > 0 ? (
                                <ul className="space-y-2.5">
                                    {dataDasarHukum.slice(0, 6).map((item, index) => (
                                        <li key={item.id ?? index}>
                                            <Link
                                                href={item.file || '/dasar-hukum'}
                                                target={item.file ? '_blank' : undefined}
                                                rel={item.file ? 'noopener noreferrer' : undefined}
                                                className="group inline-flex items-start gap-2 text-xs sm:text-sm text-white/85 hover:text-warning transition-colors"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faScaleBalanced}
                                                    className="w-3 h-3 text-secondary mt-1 shrink-0"
                                                />
                                                <span className="line-clamp-2">{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-xs text-white/70 italic">
                                    Dokumen dasar hukum belum tersedia.
                                </p>
                            )}
                        </div>
                    </nav>
                </div>

                {/* Bottom Bar: Hak Cipta & Media Sosial */}
                <div className="pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs sm:text-sm text-white/80 text-center sm:text-left">
                        &copy; {currentYear} RSUD dr. Abdul Aziz Kota Singkawang. Hak Cipta Dilindungi.
                    </p>

                    <div className="flex items-center gap-3">
                        {SOCIAL_LINKS.map((soc) => (
                            <Link
                                key={soc.label}
                                href={soc.href}
                                aria-label={soc.label}
                                className="w-9 h-9 rounded-full bg-white/10 hover:bg-warning text-white hover:text-black flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                            >
                                <FontAwesomeIcon icon={soc.icon} className="w-4 h-4" />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer