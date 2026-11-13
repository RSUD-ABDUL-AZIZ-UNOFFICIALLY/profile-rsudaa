'use client'

import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCircleQuestion,
    faChevronDown,
    faMagnifyingGlass,
    faHeadset,
    faArrowUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'

interface FaqItem {
    id: string
    category: string
    question: string
    searchKeywords: string
    answer: React.ReactNode
}

const FAQ_ITEMS: FaqItem[] = [
    {
        id: 'layanan-darurat',
        category: 'Layanan Medis',
        question: 'Apakah RSUD memiliki layanan darurat?',
        searchKeywords: 'igd ugd gawat darurat 24 jam kecelakaan',
        answer: (
            <p className="text-sm sm:text-base text-black/80 leading-relaxed">
                Ya, RSUD dr. Abdul Aziz memiliki layanan{' '}
                <strong className="font-semibold text-dark">Unit Gawat Darurat (UGD) 24 jam</strong>{' '}
                yang siap menerima dan menangani pasien dalam kondisi kegawatdaruratan medis setiap hari.
            </p>
        ),
    },
    {
        id: 'prosedur-pendaftaran',
        category: 'Pendaftaran',
        question: 'Bagaimana prosedur pendaftaran pasien?',
        searchKeywords: 'daftar offline online loket registrasi pasien baru lama',
        answer: (
            <div className="space-y-3 text-sm sm:text-base text-black/80 leading-relaxed">
                <p>
                    Prosedur pendaftaran pasien di RSUD dr. Abdul Aziz Singkawang dapat dilakukan melalui dua cara:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    <div className="bg-white border border-[#002722]/10 rounded-xl p-4">
                        <h3 className="font-bold text-dark text-sm sm:text-base mb-1.5">
                            1. Pendaftaran Offline (Loket Pendaftaran)
                        </h3>
                        <p className="text-xs sm:text-sm text-black/75 leading-relaxed">
                            Pasien dapat datang langsung ke rumah sakit dan mengunjungi loket pendaftaran. Petugas kami akan membantu pengisian formulir serta memberikan informasi alur pelayanan selanjutnya.
                        </p>
                    </div>
                    <div className="bg-white border border-[#002722]/10 rounded-xl p-4">
                        <h3 className="font-bold text-dark text-sm sm:text-base mb-1.5">
                            2. Pendaftaran Online via Mobile JKN (MJKN)
                        </h3>
                        <p className="text-xs sm:text-sm text-black/75 leading-relaxed">
                            Untuk kemudahan dan efisiensi waktu tunggu, pasien dapat mendaftar secara online melalui Mobile JKN (MJKN)Unduh Aplikasi: Unduh dan instal aplikasi Mobile JKN melalui Google Play Store atau Apple App Store.
                        </p>
                    </div>
                </div>
            </div>
        ),
    },
    {
        id: 'asuransi-kesehatan',
        category: 'Pembiayaan',
        question: 'Apakah RSUD menerima asuransi kesehatan?',
        searchKeywords: 'bpjs kesehatan jkn kis asuransi swasta jaminan',
        answer: (
            <p className="text-sm sm:text-base text-black/80 leading-relaxed">
                Ya, kami bekerja sama dan menerima berbagai jenis penjaminan serta asuransi kesehatan (termasuk BPJS Kesehatan). Daftar lengkap mitra asuransi dapat Anda lihat pada halaman{' '}
                <Link
                    href="/asuransi"
                    className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
                >
                    <span>Informasi Asuransi</span>
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="w-3 h-3" />
                </Link>
                .
            </p>
        ),
    },
    {
        id: 'layanan-rawat-inap',
        category: 'Fasilitas',
        question: 'Apakah RSUD menyediakan layanan rawat inap?',
        searchKeywords: 'rawat inap kamar kelas 1 2 3 vip bangsal',
        answer: (
            <p className="text-sm sm:text-base text-black/80 leading-relaxed">
                Ya, RSUD dr. Abdul Aziz memiliki fasilitas rawat inap yang dilengkapi dengan berbagai pilihan ruang perawatan, mulai dari{' '}
                <strong className="font-semibold text-dark">Kelas III, Kelas II, Kelas I, hingga Kelas VIP</strong>{' '}
                sesuai dengan kebutuhan perawatan dan hak kelas penjaminan pasien.
            </p>
        ),
    },
    {
        id: 'umpan-balik-keluhan',
        category: 'Pengaduan',
        question: 'Bagaimana saya dapat memberikan umpan balik atau keluhan?',
        searchKeywords: 'komplain pengaduan kritik saran whatsapp kantor pengaduan',
        answer: (
            <div className="space-y-2.5 text-sm sm:text-base text-black/80 leading-relaxed">
                <p>
                    Anda dapat menyampaikan kritik, saran, maupun pengaduan layanan melalui saluran berikut:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-black/80">
                    <li>
                        <strong className="text-dark">WhatsApp Pengaduan:</strong> Hubungi tim layanan pengaduan kami di{' '}
                        <a
                            href="https://wa.me/+6281345923859"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline"
                        >
                            <FontAwesomeIcon icon={faWhatsapp} className="w-4 h-4" />
                            <span>+62 813-4592-3859</span>
                        </a>
                    </li>
                    <li>
                        <strong className="text-dark">Tatap Muka Langsung:</strong> Mengunjungi ruang/kantor Unit Layanan Pengaduan di area RSUD dr. Abdul Aziz Singkawang.
                    </li>
                </ul>
            </div>
        ),
    },
]

const Section: React.FC = () => {
    const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id)
    const [searchQuery, setSearchQuery] = useState<string>('')

    const filteredFaqs = useMemo(() => {
        const keyword = searchQuery.toLowerCase().trim()
        if (!keyword) return FAQ_ITEMS

        return FAQ_ITEMS.filter(
            (item) =>
                item.question.toLowerCase().includes(keyword) ||
                item.category.toLowerCase().includes(keyword) ||
                item.searchKeywords.toLowerCase().includes(keyword)
        )
    }, [searchQuery])

    const toggleItem = (id: string) => {
        setOpenId((prev) => (prev === id ? null : id))
    }

    return (
        <section className="w-full min-h-[65vh] py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white border border-[#002722]/10 rounded-2xl shadow-sm p-6 sm:p-10">
                {/* Header Section */}
                <header className="text-center max-w-2xl mx-auto mb-8">
                    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary bg-info px-3.5 py-1 rounded-full border border-primary/20 mb-3">
                        <FontAwesomeIcon icon={faCircleQuestion} className="w-3.5 h-3.5" />
                        <span>Pusat Bantuan Pasien</span>
                    </span>
                    <h1 className="font-bold uppercase text-2xl sm:text-3xl lg:text-4xl text-dark tracking-tight">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-sm sm:text-base text-black/70 mt-2">
                        Pertanyaan yang sering diajukan seputar layanan RSUD dr. Abdul Aziz Singkawang
                    </p>

                    {/* Input Pencarian FAQ */}
                    <div className="relative max-w-md mx-auto mt-6">
                        <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            className="w-4 h-4 text-black/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                        />
                        <input
                            type="search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari topik (misal: pendaftaran, BPJS, UGD)..."
                            aria-label="Cari pertanyaan FAQ"
                            className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#f8fbfa] border border-[#002722]/15 rounded-xl focus:outline-none focus:border-primary focus:bg-white transition-colors"
                        />
                    </div>
                </header>

                {/* Daftar Accordion FAQ */}
                {filteredFaqs.length > 0 ? (
                    <div className="space-y-3">
                        {filteredFaqs.map((item) => {
                            const isOpen = openId === item.id

                            return (
                                <div
                                    key={item.id}
                                    className={`border rounded-xl transition-colors duration-200 overflow-hidden ${isOpen
                                        ? 'bg-[#f8fbfa] border-primary/40 shadow-xs'
                                        : 'bg-white border-[#002722]/10 hover:border-primary/30'
                                        }`}
                                >
                                    <h3>
                                        <button
                                            type="button"
                                            onClick={() => toggleItem(item.id)}
                                            aria-expanded={isOpen}
                                            aria-controls={`faq-panel-${item.id}`}
                                            className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary"
                                        >
                                            <div className="space-y-1">
                                                <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-primary">
                                                    {item.category}
                                                </span>
                                                <span className="block text-base sm:text-lg font-bold text-dark leading-snug">
                                                    {item.question}
                                                </span>
                                            </div>

                                            <span
                                                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${isOpen
                                                    ? 'bg-primary text-white rotate-180'
                                                    : 'bg-info text-primary'
                                                    }`}
                                            >
                                                <FontAwesomeIcon icon={faChevronDown} className="w-3.5 h-3.5" />
                                            </span>
                                        </button>
                                    </h3>

                                    {isOpen && (
                                        <div
                                            id={`faq-panel-${item.id}`}
                                            className="px-5 pb-5 pt-1 border-t border-[#002722]/10"
                                        >
                                            {item.answer}
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="bg-[#f8fbfa] border border-[#002722]/10 rounded-xl py-10 px-4 text-center space-y-2">
                        <p className="text-sm sm:text-base text-black/70 font-medium">
                            Pertanyaan dengan kata kunci &ldquo;{searchQuery}&rdquo; tidak ditemukan.
                        </p>
                            <button
                                type="button"
                                onClick={() => setSearchQuery('')}
                                className="text-xs sm:text-sm font-semibold text-primary hover:underline cursor-pointer"
                            >
                                Tampilkan semua pertanyaan
                            </button>
                        </div>
                )}

                {/* Banner Bantuan Tambahan */}
                <div className="mt-8 pt-6 border-t border-[#002722]/10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-info/60 border border-primary/15 rounded-xl p-5">
                    <div className="flex items-center gap-3.5 text-center sm:text-left">
                        <div className="w-11 h-11 rounded-xl bg-primary text-white hidden sm:flex items-center justify-center shrink-0">
                            <FontAwesomeIcon icon={faHeadset} className="text-lg" />
                        </div>
                        <div>
                            <h2 className="font-bold text-sm sm:text-base text-dark">
                                Masih memiliki pertanyaan lain?
                            </h2>
                            <p className="text-xs sm:text-sm text-black/70 mt-0.5">
                                Tim Layanan Informasi &amp; Pengaduan kami siap membantu Anda.
                            </p>
                        </div>
                    </div>

                    <Link
                        href="/layanan-informasi"
                        className="button button-primary text-xs sm:text-sm px-5 py-2.5 shrink-0"
                    >
                        Hubungi Layanan Informasi
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Section