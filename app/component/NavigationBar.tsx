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
                        <button className='item' >Tentang Kami</button>
                        <div className="dropdown">
                            <Link href={`/profil`} className="dropdown-item">Profil Rumah Sakit</Link>
                            <Link href={`/struktur-organisasi`} className="dropdown-item">Struktur Organisasi</Link>
                            <Link href={`/struktur-manajemen`} className="dropdown-item">Struktur Manajemen</Link>
                            <Link href={`/maklumat-pelayanan`} className="dropdown-item">Maklumat Pelayanan</Link>
                            <Link href={`/profil-direktur`} className="dropdown-item">Profil Direktur</Link>
                        </div>
                    </div>
                    <div className="nm-item">
                        <button className='item' >Pelayanan Publik</button>
                        <div className="dropdown">
                            <Link href={`/survei-kepuasan-masyarakat`} className="dropdown-item">Survey Kepuasan Masyarakat</Link>
                            <Link href={`/layanan-informasi`} className="dropdown-item">Layanan Informasi</Link>
                            <Link href={`/pengaduan`} className="dropdown-item">Pengaduan</Link>
                            <Link href={`/informasi-poliklinik`} className="dropdown-item">Informasi Poliklinik</Link>
                            <Link href={`/jadwal-praktek`} className="dropdown-item">Jadwal Praktek</Link>
                            <Link href={`/fasilitas-tarif`} className="dropdown-item">Fasilitas & Tarif</Link>
                            <Link href={`/pendaftaran-online`} className="dropdown-item">Pendaftaran Online</Link>
                        </div>
                    </div>
                    <div className="nm-item">
                        <button className='item'>Karir</button>
                        <div className="dropdown">
                            <Link href={`#`} className="dropdown-item">Lowongan Pekerjaan</Link>
                            <Link href={`#`} className="dropdown-item">Magang</Link>
                        </div>
                    </div>
                    <div className="nm-item">
                        <button className='item' >Aplikasi</button>
                        <div className="dropdown">
                            <Link href={`#`} className="dropdown-item">Lorem ipsum</Link>
                            <Link href={`#`} className="dropdown-item">Lorem ipsum</Link>
                            <Link href={`#`} className="dropdown-item">Lorem ipsum</Link>
                            <Link href={`#`} className="dropdown-item">Lorem ipsum</Link>
                        </div>
                    </div>
                    <div className="nm-item">
                        <button className='item'>Dasar Hukum</button>
                        <div className="dropdown">
                            <Link href={`#`} className="dropdown-item">Lorem ipsum</Link>
                            <Link href={`#`} className="dropdown-item">Lorem ipsum</Link>
                            <Link href={`#`} className="dropdown-item">Lorem ipsum</Link>
                            <Link href={`#`} className="dropdown-item">Lorem ipsum</Link>
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