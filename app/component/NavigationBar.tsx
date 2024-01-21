import Image from 'next/image'
import Link from 'next/link'
import React, { useRef, useState, useEffect } from 'react'
import sidebarIcon from "../../public/icon/sidebarIcon.svg";
import skwLogo from "../../public/skw.png";
import Sidebar from './Sidebar';

const NavigationBar = () => {
    const navbarRef = useRef(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const [sidebar, setSidebar] = useState<boolean>(false)

    const handleSidebar = (e: boolean) => [
        setSidebar(e)
    ]
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const isTop = scrollTop < 10;

            setIsScrolled(!isTop);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`navbar ${isScrolled == true ? `bottom` : `top`}`} ref={navbarRef}>
            <div className="nav-left">
                <button onClick={(() => handleSidebar(true))} className="btn-sidebar rounded-full btn btn-transparant">
                    <Image
                        src={sidebarIcon}
                        alt="Picture of the author"
                        className='h-[20px] w-auto'
                    />
                </button>
                <div className="nav-logo bg-white h-full">
                    <div className="">
                        <Image
                            src={skwLogo}
                            alt="Picture of the author"
                            className='lg:h-[80px] h-[50px] w-auto'
                        />
                    </div>
                </div>
            </div>
            {sidebar == true && <Sidebar handleSidebar={handleSidebar} />}
            <div className="nav-right">
                <div className="nav-menu">
                    <div className="nm-item">
                        <Link className='item' href="/#">Dashboard</Link>
                    </div>
                    <div className="nm-item">
                        <Link className='item' href="/#">Tentang Kami</Link>
                        <div className="dropdown">
                            <button className="dropdown-item">Profil Rumah Sakit</button>
                            <button className="dropdown-item">Struktur Organisasi</button>
                            <button className="dropdown-item">Struktur Manajemen</button>
                            <button className="dropdown-item">Maklumat Pelayanan</button>
                            <button className="dropdown-item">Profil Direktur</button>
                        </div>
                    </div>
                    <div className="nm-item">
                        <Link className='item' href="/#">Pelayanan Publik</Link>
                        <div className="dropdown">
                            <button className="dropdown-item">Survey Kepuasan Masyarakat</button>
                            <button className="dropdown-item">Layanan Informasi</button>
                            <button className="dropdown-item">Pengaduan</button>
                            <button className="dropdown-item">Informasi Poliklinik</button>
                            <button className="dropdown-item">Jadwal Praktek</button>
                            <button className="dropdown-item">Fasilitas & Tarif</button>
                            <button className="dropdown-item">Pendaftaran Online</button>
                        </div>
                    </div>
                    <div className="nm-item">
                        <Link className='item' href="/#">Karir</Link>
                        <div className="dropdown">
                            <button className="dropdown-item">Lowongan Pekerjaan</button>
                            <button className="dropdown-item">Magang</button>
                        </div>
                    </div>
                    <div className="nm-item">
                        <Link className='item' href="/#">Aplikasi</Link>
                        <div className="dropdown">
                            <button className="dropdown-item">Lorem ipsum</button>
                            <button className="dropdown-item">Lorem ipsum</button>
                            <button className="dropdown-item">Lorem ipsum</button>
                            <button className="dropdown-item">Lorem ipsum</button>
                        </div>
                    </div>
                    <div className="nm-item">
                        <Link className='item' href="/#">Dasar Hukum</Link>
                        <div className="dropdown">
                            <button className="dropdown-item">Lorem ipsum</button>
                            <button className="dropdown-item">Lorem ipsum</button>
                            <button className="dropdown-item">Lorem ipsum</button>
                            <button className="dropdown-item">Lorem ipsum</button>
                        </div>
                    </div>
                    <div className="nm-item">
                        <Link className='item' href="/#">Faq</Link>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default NavigationBar