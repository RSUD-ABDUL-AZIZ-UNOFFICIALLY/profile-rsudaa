import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import close from "../../public/icon/close.svg";
import { TentangKami, PelayananPublik, Aplikasi, DasarHukum, Karir } from './navItem';


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
                        {TentangKami()}
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
                        {PelayananPublik()}
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
                        {Karir()}
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
                        {Aplikasi()}
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
                        {DasarHukum()}
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