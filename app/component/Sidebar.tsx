import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import close from "../../public/icon/close.svg";
const Sidebar = ({ handleSidebar }: { handleSidebar: any }) => {
    const [active, setActive] = useState<string>('')

    const handleActiveSidebar = (e: string) => {
        setActive(e)
    }

    const handleNavigation = () => {
        setActive('')
        handleSidebar(false)
    }

    return (
        <div className="sidebar p-2">
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
                    <button onClick={() => handleNavigation()} className={`item ${active == 'dashboard' && 'active'}`}>Dashboard</button>
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
                        <button onClick={() => handleNavigation()} className="dropdown-item">Profil Rumah Sakit</button>
                        <button onClick={() => handleNavigation()} className="dropdown-item">Struktur Organisasi</button>
                        <button onClick={() => handleNavigation()} className="dropdown-item">Struktur Manajemen</button>
                        <button onClick={() => handleNavigation()} className="dropdown-item">Maklumat Pelayanan</button>
                        <button onClick={() => handleNavigation()} className="dropdown-item">Profil Direktur</button>
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
                        <button onClick={() => handleNavigation()} className="dropdown-item">Survey Kepuasan Masyarakat</button>
                        <button onClick={() => handleNavigation()} className="dropdown-item">Layanan Informasi</button>
                        <button onClick={() => handleNavigation()} className="dropdown-item">Pengaduan</button>
                        <button onClick={() => handleNavigation()} className="dropdown-item">Informasi Poliklinik</button>
                        <button onClick={() => handleNavigation()} className="dropdown-item">Jadwal Praktek</button>
                        <button onClick={() => handleNavigation()} className="dropdown-item">Fasilitas & Tarif</button>
                        <button onClick={() => handleNavigation()} className="dropdown-item">Pendaftaran Online</button>
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
                        <button onClick={() => handleNavigation()} className="dropdown-item">Lowongan Pekerjaan</button>
                        <button onClick={() => handleNavigation()} className="dropdown-item">Magang</button>
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
                        <button onClick={() => handleNavigation()} className="dropdown-item">Lorem ipsum</button>
                        <button onClick={() => handleNavigation()} className="dropdown-item">Lorem ipsum</button>
                        <button onClick={() => handleNavigation()} className="dropdown-item">Lorem ipsum</button>
                        <button onClick={() => handleNavigation()} className="dropdown-item">Lorem ipsum</button>
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
                        <button onClick={() => handleNavigation()} className="dropdown-item">Lorem ipsum</button>
                        <button onClick={() => handleNavigation()} className="dropdown-item">Lorem ipsum</button>
                        <button onClick={() => handleNavigation()} className="dropdown-item">Lorem ipsum</button>
                        <button onClick={() => handleNavigation()} className="dropdown-item">Lorem ipsum</button>
                    </div>
                </div>
                <div className="sidebar-item">
                    <button onClick={() => handleNavigation()} className={`item ${active == 'faq' && 'active'}`}>Faq</button>
                </div>
            </div>
        </div>
    )
}

export default Sidebar