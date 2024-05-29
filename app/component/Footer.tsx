'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import skw from "../../public/skw.png";
import Link from 'next/link';
import { DasarHukumResponse } from '../Model/dasarHukum.model';
import axios from 'axios';

const Footer = () => {
    const API_URL = process.env.API_URL
    const [dataDasarHukum, setDataDasarHukum] = useState<DasarHukumResponse[]>([])

    const getDasarHukum = async () => {
        try {
            const response = await axios.get(`${API_URL}/dasar-hukum`)

            if (response.data.success == true) {
                setDataDasarHukum(response.data.data)
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        getDasarHukum()
    }, [])

    return (
        <div className="flex justify-center p-2 bg-primary">
            <div className="lg:w-[80%] w-full">
                <footer className="footer p-10 text-white">
                    <nav>
                        <h6 className="footer-title">Pelayanan Publik</h6>
                        <Link href={`#`} className="link link-hover">Survei Kepuasan Masyarakat</Link>
                        <Link href={`#`} className="link link-hover">Layanan Informasi & Pengaduan</Link>
                        <Link href={`#`} className="link link-hover">Informasi Poliklinik</Link>
                        <Link href={`#`} className="link link-hover">Jadwal Praktek</Link>
                        <Link href={`#`} className="link link-hover">Fasiltas & Tarif</Link>
                        <Link href={`#`} className="link link-hover">Pendaftaran Online</Link>
                    </nav>
                    <nav>
                        <h6 className="footer-title">Tentang Kami</h6>
                        <Link href={`#`} className="link link-hover">Profil Rumah Sakit</Link>
                        <Link href={`#`} className="link link-hover">Struktur Organisasi</Link>
                        <Link href={`#`} className="link link-hover">Maklumat Pelayanan</Link>
                        <Link href={`#`} className="link link-hover">Kegiatan</Link>
                        <Link href={`#`} className="link link-hover">Artikel</Link>
                    </nav>
                    <nav>
                        <h6 className="footer-title">Dasar Hukum</h6>

                        {dataDasarHukum && dataDasarHukum.map((item: DasarHukumResponse, index: number) => {
                            return (
                                <Link key={index} href={`#`} className="link link-hover">{item.name}</Link>
                            )
                        })}
                    </nav>
                </footer>
                <footer className="footer px-10 py-4 border-t border-zinc-900">
                    <aside className="items-center grid-flow-col">
                        <div className="p-3 rounded-full shadow-xl">
                            <Image alt='logo' src={skw} className='h-14 w-fit' />
                        </div>
                        <p className='text-black rounded-lg font-bold p-2 bg-yellow-500'>RSUD dr Abdul Aziz <br />Kota Singkawang, Kalimantan Barat</p>
                    </aside>
                    <nav className="md:place-self-center md:justify-self-end">
                        <div className="grid grid-flow-col gap-4">
                            <Link href={'#'}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
                            </Link>
                            <Link href={'#'}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg>
                            </Link>
                            <Link href={'#'}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg>
                            </Link>
                        </div>
                    </nav>
                </footer>
            </div>
        </div>
    )
}

export default Footer