'use client'
import Image from 'next/image'
import React from 'react'
import skw from "../../../public/skw.png";
import Link from 'next/link';
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation';

interface props {
    active: string,
    title: string
}

const Navbar: React.FC<props> = ({ active, title }) => {
    const navigation = useRouter()

    const handleLogout = () => {
        Cookies.remove('access_token')
        navigation.push('/login-admin')
    }

    return (
        <div className='p-4 bg-white text-primary flex justify-between items-center shadow-md sticky '>
            <div className="">
                <div className="drawer ">
                    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        {/* Page content here */}
                        <label htmlFor="my-drawer" className="btn">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </label>
                    </div>
                    <div className="drawer-side ">
                        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className=" p-4 w-80 min-h-full bg-white text-base-content">
                            {/* Sidebar content here */}
                            <li className='p-1'>
                                <Link href={'/admin-rsaa'} className={`btn hover:shadow-md w-full shadow-sm ${active === 'home' ? 'btn-warning hover:bg-warning' : 'bg-white hover:bg-white'}`}>Home</Link>
                            </li>
                            <li className='p-1'>
                                <Link href={'/admin-rsaa/profile'} className={`btn  hover:shadow-md w-full shadow-sm ${active === 'profile' ? 'btn-warning hover:bg-warning' : 'bg-white hover:bg-white'}`}>Profile</Link>
                            </li>
                            <li className='p-1'>
                                <Link href={'/admin-rsaa/struktur-organisasi'} className={`btn hover:shadow-md w-full shadow-sm ${active === 'struktur-organisasi' ? 'btn-warning hover:bg-warning' : 'bg-white hover:bg-white'}`}>Struktur Organisasi</Link>
                            </li>
                            <li className='p-1'>
                                <Link href={'/admin-rsaa/maklumat-pelayanan'} className={`btn hover:shadow-md w-full shadow-sm ${active === 'maklumat-pelayanan' ? 'btn-warning hover:bg-warning' : 'bg-white hover:bg-white'}`}>Maklumat Pelayanan</Link>
                            </li>
                            <li className='p-1'>
                                <Link href={'#'} className={`btn hover:shadow-md w-full shadow-sm ${active === 'kegiatan' ? 'btn-warning hover:bg-warning' : 'bg-white hover:bg-white'}`}>Kegiatan</Link>
                            </li>
                            <li className='p-1'>
                                <Link href={'#'} className={`btn hover:shadow-md w-full shadow-sm ${active === 'artikel' ? 'btn-warning hover:bg-warning' : 'bg-white hover:bg-white'}`}>Artikel</Link>
                            </li>
                            <li className='p-1'>
                                <Link href={'#'} className={`btn hover:shadow-md w-full shadow-sm ${active === 'survei-kepuasan-masyarakat' ? 'btn-warning hover:bg-warning' : 'bg-white hover:bg-white'}`}>Survei Kepuasan Masyarakat</Link>
                            </li>
                            <li className='p-1'>
                                <Link href={'#'} className={`btn hover:shadow-md w-full shadow-sm ${active === 'layanan-informasi-pengaduan' ? 'btn-warning hover:bg-warning' : 'bg-white hover:bg-white'}`}>Layanan Informasi Pengaduan</Link>
                            </li>
                            <li className='p-1'>
                                <Link href={'#'} className={`btn hover:shadow-md w-full shadow-sm ${active === 'pendaftaran-online' ? 'btn-warning hover:bg-warning' : 'bg-white hover:bg-white'}`}>Pendaftaran Online</Link>
                            </li>
                            <li className='p-1'>
                                <Link href={'#'} className={`btn  hover:shadow-md w-full shadow-sm ${active === 'loker' ? 'btn-warning hover:bg-warning' : 'bg-white hover:bg-white'}`}>Loker</Link>
                            </li>
                            <li className='p-1'>
                                <Link href={'#'} className={`btn  hover:shadow-md w-full shadow-sm ${active === 'magang' ? 'btn-warning hover:bg-warning' : 'bg-white hover:bg-white'}`}>Magang</Link>
                            </li>
                            <li className='p-1'>
                                <Link href={'#'} className={`btn  hover:shadow-md w-full shadow-sm ${active === 'aplikasi' ? 'btn-warning hover:bg-warning' : 'bg-white hover:bg-white'}`}>Aplikasi</Link>
                            </li>
                            <li className='p-1'>
                                <Link href={'#'} className={`btn hover:shadow-md w-full shadow-sm ${active === 'dasar-hukum' ? 'btn-warning hover:bg-warning' : 'bg-white hover:bg-white'}`}>Dasar Hukum</Link>
                            </li>
                            <li className='p-1'>
                                <Link href={'#'} className={`btn  hover:shadow-md w-full shadow-sm ${active === 'laporan-tahunan' ? 'btn-warning hover:bg-warning' : 'bg-white hover:bg-white'}`}>Laporan Tahunan</Link>
                            </li>
                            <li className='p-1'>
                                <button onClick={handleLogout} className={`btn btn-error text-white  hover:shadow-md w-full shadow-sm `}>Logout</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="font-bold uppercase text-black text-2xl flex justify-center">
                <div className="text-center">
                    <div className="">
                        ADMIN RSAA
                    </div>
                    <div className="p-2 rounded uppercase bg-primary text-white text-sm">{title}</div>
                </div>
            </div>
            <div className="">
                <Image alt='' src={skw} className='h-20 w-fit' />
            </div>
        </div>
    )
}

export default Navbar