'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import sidebarIcon from '../../public/icon/sidebarIcon.svg'
import skwLogo from '../../public/skw.png'
import Sidebar from './Sidebar'
import { TentangKami, PelayananPublik, Karir, DasarHukum, Aplikasi } from './navItem'

const NavigationBar: React.FC = () => {
    const pathname = usePathname()
    const [isScrolled, setIsScrolled] = useState<boolean>(false)
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)

    const handleSidebar = useCallback((open: boolean) => {
        setIsSidebarOpen(open)
    }, [])

    // Deteksi posisi scroll dengan passive listener untuk performa optimal
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }

        handleScroll() // Cek posisi awal saat komponen mount
        window.addEventListener('scroll', handleScroll, { passive: true })

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    // Tutup sidebar mobile otomatis saat rute berubah
    useEffect(() => {
        setIsSidebarOpen(false)
    }, [pathname])

    const isActiveLink = (href: string) => {
        if (href === '/') return pathname === '/'
        return pathname?.startsWith(href)
    }

    return (
        <>
            <header
                className={`navigation-bar ${isScrolled ? 'bottom' : 'top'}`}
                role="banner"
            >
                {/* Kiri: Tombol Menu Mobile & Logo */}
                <div className="nav-left">
                    <button
                        type="button"
                        onClick={() => handleSidebar(true)}
                        aria-label="Buka menu navigasi"
                        aria-expanded={isSidebarOpen}
                        className="button-sidebar button button-transparent"
                    >
                        <Image
                            src={sidebarIcon}
                            alt=""
                            aria-hidden="true"
                            className="h-5 w-5 object-contain"
                        />
                    </button>

                    <Link
                        href="/"
                        className="nav-logo flex items-center"
                        aria-label="Beranda RSUD dr. Abdul Aziz"
                    >
                        <Image
                            src={skwLogo}
                            alt="Logo RSUD dr. Abdul Aziz Singkawang"
                            priority
                            className="lg:h-[64px] h-[46px] w-auto object-contain"
                        />
                    </Link>
                </div>

                {/* Kanan: Menu Navigasi Desktop */}
                <nav className="nav-right" aria-label="Navigasi Utama">
                    <div className="nav-menu animation-popup">
                        <div className="nm-item">
                            <Link
                                href="/"
                                className={`item ${isActiveLink('/') ? 'bg-primary text-white' : ''}`}
                            >
                                Dashboard
                            </Link>
                        </div>

                        <div className="nm-item">
                            <button
                                type="button"
                                aria-haspopup="true"
                                className="item gap-1.5"
                            >
                                <span>Tentang Kami</span>
                                <ChevronIcon />
                            </button>
                            <div className="dropdown">
                                <TentangKami />
                            </div>
                        </div>

                        <div className="nm-item">
                            <button
                                type="button"
                                aria-haspopup="true"
                                className="item gap-1.5"
                            >
                                <span>Pelayanan Publik</span>
                                <ChevronIcon />
                            </button>
                            <div className="dropdown">
                                <PelayananPublik />
                            </div>
                        </div>

                        <div className="nm-item">
                            <button
                                type="button"
                                aria-haspopup="true"
                                className={`item gap-1.5 ${isActiveLink('/loker') ? 'bg-primary text-white' : ''}`}
                            >
                                <span>Karir</span>
                                <ChevronIcon />
                            </button>
                            <div className="dropdown">
                                <Karir />
                            </div>
                        </div>

                        <div className="nm-item">
                            <button
                                type="button"
                                aria-haspopup="true"
                                className="item gap-1.5"
                            >
                                <span>Aplikasi</span>
                                <ChevronIcon />
                            </button>
                            <div className="dropdown">
                                <Aplikasi />
                            </div>
                        </div>

                        <div className="nm-item">
                            <button
                                type="button"
                                aria-haspopup="true"
                                className="item gap-1.5"
                            >
                                <span>Dasar Hukum</span>
                                <ChevronIcon />
                            </button>
                            <div className="dropdown">
                                <DasarHukum />
                            </div>
                        </div>

                        <div className="nm-item">
                            <Link
                                href="/laporan-tahunan"
                                className={`item ${isActiveLink('/laporan-tahunan') ? 'bg-primary text-white' : ''}`}
                            >
                                Laporan Tahunan
                            </Link>
                        </div>

                        <div className="nm-item">
                            <Link
                                href="/faq"
                                className={`item ${isActiveLink('/faq') ? 'bg-primary text-white' : ''}`}
                            >
                                FAQ
                            </Link>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Drawer Sidebar Mobile (dipisahkan dari header agar tidak terpengaruh backdrop-filter) */}
            <Sidebar handleSidebar={handleSidebar} open={isSidebarOpen} />
        </>
    )
}

const ChevronIcon = () => (
    <svg
        className="w-3.5 h-3.5 opacity-75 transition-transform duration-200 group-hover:rotate-180"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
    >
        <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
        />
    </svg>
)

export default NavigationBar