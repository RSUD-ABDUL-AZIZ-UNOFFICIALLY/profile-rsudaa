'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
    faClipboardCheck,
    faCircleInfo,
    faHospitalUser,
    faCalendarCheck,
    faHospital,
    faLaptopMedical,
    faFileLines,
} from '@fortawesome/free-solid-svg-icons'

interface LayananItem {
    title: string
    href: string
    icon: IconDefinition
}

const LAYANAN_PUBLIK: LayananItem[] = [
    {
        title: 'Survei Kepuasan Masyarakat',
        href: '/skm',
        icon: faClipboardCheck,
    },
    {
        title: 'Layanan Informasi',
        href: '/layanan-informasi',
        icon: faCircleInfo,
    },
    {
        title: 'Informasi Poliklinik',
        href: '/informasi-poliklinik',
        icon: faHospitalUser,
    },
    {
        title: 'Jadwal Praktek',
        href: '/jadwal-praktek',
        icon: faCalendarCheck,
    },
    {
        title: 'Fasilitas & Tarif',
        href: '/fasilitas-tarif',
        icon: faHospital,
    },
    {
        title: 'Pendaftaran Online',
        href: '/pendaftaran-online',
        icon: faLaptopMedical,
    },
    {
        title: 'Permintaan Informasi Publik',
        href: '/permintaan-informasi-publik',
        icon: faFileLines,
    },
]

const SectionPelayananPublik: React.FC = () => {
    return (
        <section
            aria-labelledby="heading-pelayanan-publik"
            className="w-full bg-white border border-[#002722]/10 rounded-2xl shadow-sm p-4 sm:p-6 lg:p-8"
        >
            {/* Header Section */}
            <header className="mb-5 sm:mb-8">
                <h2
                    id="heading-pelayanan-publik"
                    className="text-primary uppercase w-fit font-bold text-base sm:text-xl lg:text-2xl pb-2 pr-5 border-b-4 border-primary tracking-tight"
                >
                    Pelayanan Publik
                </h2>
            </header>

            {/* Grid Kartu Layanan Responsif (Mobile 2 Kolom -> Tablet 3/4 Kolom -> Desktop 7 Kolom) */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4"
            >
                {LAYANAN_PUBLIK.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="group flex flex-col items-center justify-center sm:justify-between bg-[#f8fbfa] hover:bg-white active:scale-[0.98] border border-[#002722]/10 hover:border-primary/50 rounded-xl p-3.5 sm:p-5 min-h-[120px] sm:min-h-[145px] shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                        {/* Wadah FA-Icon */}
                        <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-2xl bg-info group-hover:bg-primary text-primary group-hover:text-white flex items-center justify-center mb-2.5 sm:mb-3.5 transition-colors duration-200 shrink-0">
                            <FontAwesomeIcon
                                icon={item.icon}
                                className="text-xl sm:text-2xl lg:text-[26px] group-hover:scale-110 transition-transform duration-200"
                            />
                        </div>

                        {/* Label Layanan */}
                        <span className="text-[11px] sm:text-xs font-bold uppercase text-dark group-hover:text-primary text-center leading-snug tracking-wide line-clamp-2 transition-colors">
                            {item.title}
                        </span>
                    </Link>
                ))}
            </motion.div>
        </section>
    )
}

export default SectionPelayananPublik