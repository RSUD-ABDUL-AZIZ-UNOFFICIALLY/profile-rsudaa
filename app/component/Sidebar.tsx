import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import close from "../../public/icon/close.svg";
const Sidebar = ({ handleSidebar, open }: { handleSidebar: any, open: boolean }) => {
    const [active, setActive] = useState<string>('')

    const handleActiveSidebar = (e: string) => {
        setActive(e)
    }

    const handleNavigation = () => {
        setActive('')
        handleSidebar(false)
    }

    return (
        <div className={`sidebar p-2 ${open ? `active` : `non-active`}`}>
            <div className="flex justify-end">
                <button onClick={() => handleSidebar(false)} className="btn btn-sidebar ">
                    <Image
                        src={close}
                        alt="Picture of the author"
                        className='h-[20px] w-auto'
                    />
                </button>
            </div>
            <div className="sidebar-menu mt-4">
                <div className="sidebar-item">
                    <Link className='item' href="/">Dashboard</Link>
                </div>
                <div className="sidebar-item">
                    <button onClick={() => handleActiveSidebar('tentang-kami')} className={`item ${active == 'tentang-kami' && 'active'}`}>
                        <div className="flex justify-between items-center w-full">
                            <div className="">Tentang Kami</div>
                            <div className="flex justify-end">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </div>
                        </div>

                    </button>
                    <div className={`dropdown ${active == 'tentang-kami' && `active`}`}>
                        <Link href={`/profil`} className="dropdown-item">Profil Rumah Sakit</Link>
                        <Link href={`/struktur-organisasi`} className="dropdown-item">Struktur Organisasi</Link>
                        <Link href={`/struktur-manajemen`} className="dropdown-item">Struktur Manajemen</Link>
                        <Link href={`/maklumat-pelayanan`} className="dropdown-item">Maklumat Pelayanan</Link>
                        <Link href={`/profil-direktur`} className="dropdown-item">Profil Direktur</Link>
                    </div>
                </div>
                <div className="sidebar-item">
                    <button onClick={() => handleActiveSidebar('pelayanan-publik')} className={`item ${active == 'pelayanan-publik' && 'active'}`}>
                        <div className="flex justify-between items-center w-full">
                            <div className="">Pelayanan Publik</div>
                            <div className="flex justify-end">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </div>
                        </div>
                    </button>
                    <div className={`dropdown ${active == 'pelayanan-publik' && `active`}`}>
                        <Link href={`/survei-kepuasan-masyarakat`} className="dropdown-item">Survey Kepuasan Masyarakat</Link>
                        <Link href={`/layanan-informasi`} className="dropdown-item">Layanan Informasi</Link>
                        <Link href={`/pengaduan`} className="dropdown-item">Pengaduan</Link>
                        <Link href={`/informasi-poliklinik`} className="dropdown-item">Informasi Poliklinik</Link>
                        <Link href={`/jadwal-praktek`} className="dropdown-item">Jadwal Praktek</Link>
                        <Link href={`/fasilitas-tarif`} className="dropdown-item">Fasilitas & Tarif</Link>
                        <Link href={`/pendaftaran-online`} className="dropdown-item">Pendaftaran Online</Link>
                    </div>
                </div>
                <div className="sidebar-item">
                    <button onClick={() => handleActiveSidebar('karir')} className={`item ${active == 'karir' && 'active'}`}>
                        <div className="flex justify-between items-center w-full">
                            <div className="">Karir</div>
                            <div className="flex justify-end">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </div>
                        </div>
                    </button>
                    <div className={`dropdown ${active == 'karir' && `active`}`}>
                        <Link href={`#`} className="dropdown-item">Lowongan Pekerjaan</Link>
                        <Link href={`#`} className="dropdown-item">Magang</Link>
                    </div>
                </div>
                <div className="sidebar-item">
                    <button onClick={() => handleActiveSidebar('aplikasi')} className={`item ${active == 'aplikasi' && 'active'}`}>
                        <div className="flex justify-between items-center w-full">
                            <div className="">Aplikasi</div>
                            <div className="flex justify-end">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </div>
                        </div>
                    </button>
                    <div className={`dropdown ${active == 'aplikasi' && `active`}`}>
                        <Link href={`#`} className="dropdown-item">Lorem ipsum</Link>
                        <Link href={`#`} className="dropdown-item">Lorem ipsum</Link>
                        <Link href={`#`} className="dropdown-item">Lorem ipsum</Link>
                        <Link href={`#`} className="dropdown-item">Lorem ipsum</Link>
                    </div>
                </div>
                <div className="sidebar-item">
                    <button onClick={() => handleActiveSidebar('dasar-hukum')} className={`item ${active == 'dasar-hukum' && 'active'}`}>
                        <div className="flex justify-between items-center w-full">
                            <div className="">Dasar Hukum   </div>
                            <div className="flex justify-end">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </div>
                        </div>
                    </button>
                    <div className={`dropdown ${active == 'dasar-hukum' && `active`}`}>
                        <Link href={`#`} className="dropdown-item">Lorem ipsum</Link>
                        <Link href={`#`} className="dropdown-item">Lorem ipsum</Link>
                        <Link href={`#`} className="dropdown-item">Lorem ipsum</Link>
                        <Link href={`#`} className="dropdown-item">Lorem ipsum</Link>
                    </div>
                </div>
                <div className="sidebar-item">
                    <Link className='item' href="/">Faq</Link>
                </div>
            </div>
        </div>
    )
}

export default Sidebar