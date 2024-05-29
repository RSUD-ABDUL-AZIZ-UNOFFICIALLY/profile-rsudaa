'use client'
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AplikasiResponse } from "../Model/aplikasi.model";
import axios from "axios";
import { DasarHukumResponse } from "../Model/dasarHukum.model";


const TentangKami = () => {
    return (
        <React.Fragment>
            <Link href={`/profil`} className="dropdown-item">Profil Rumah Sakit</Link>
            <Link href={`/struktur-organisasi`} className="dropdown-item">Struktur Organisasi</Link>
            <Link href={`/maklumat-pelayanan`} className="dropdown-item">Maklumat Pelayanan</Link>
            <Link href={`/kegiatan`} className="dropdown-item">Kegiatan</Link>
            <Link href={`/artikel`} className="dropdown-item">Artikel</Link>
        </React.Fragment>
    )
}

const PelayananPublik = () => {
    return (
        <React.Fragment>
            <Link href={`/survei-kepuasan-masyarakat`} className="dropdown-item">Survey Kepuasan Masyarakat</Link>
            <Link href={`/layanan-informasi`} className="dropdown-item">Layanan Informasi & Pengaduan</Link>
            <Link href={`/informasi-poliklinik`} className="dropdown-item">Informasi Poliklinik</Link>
            <Link href={`/jadwal-praktek`} className="dropdown-item">Jadwal Praktek</Link>
            <Link href={`/fasilitas-tarif`} className="dropdown-item">Fasilitas & Tarif</Link>
            <Link href={`/pendaftaran-online`} className="dropdown-item">Pendaftaran Online</Link>
        </React.Fragment>
    )
}
const Karir = () => {
    return (
        <React.Fragment>
            <Link href={`/loker`} className="dropdown-item">Lowongan Pekerjaan</Link>
            <Link href={`/magang`} className="dropdown-item">Magang</Link>
        </React.Fragment>
    )
}

const Aplikasi = () => {
    const [aplikasi, setAplikasi] = useState<AplikasiResponse[]>()
    const API_URL = process.env.API_URL

    const getDataAplikasi = async () => {
        try {
            const response = await axios.get(`${API_URL}/link-aplikasi`)
            if (response.data.success == true) {
                setAplikasi(response.data.data)
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        getDataAplikasi()
    }, [])

    return (
        <React.Fragment>
            {aplikasi && aplikasi.length > 0 && aplikasi.map((item: AplikasiResponse, index: number) => {
                return (
                    <Link target="_blank" key={index} href={item.link ? item.link : '#'} className="dropdown-item">{item.name}</Link>
                )
            })}
        </React.Fragment>
    )
}



const DasarHukum = () => {
    const [dasarHukum, setDasarHukum] = useState<DasarHukumResponse[]>()
    const API_URL = process.env.API_URL

    const getDataAplikasi = async () => {
        try {
            const response = await axios.get(`${API_URL}/dasar-hukum`)
            if (response.data.success == true) {
                setDasarHukum(response.data.data)
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        getDataAplikasi()
    }, [])
    return (
        <React.Fragment>
            {dasarHukum && dasarHukum.length > 0 && dasarHukum.map((item: DasarHukumResponse, index: number) => {
                return (
                    <Link key={index} href={`/dasar-hukum/${item.id}`} className="dropdown-item">{item.name}</Link>
                )
            })}
        </React.Fragment>
    )
}

export { TentangKami, PelayananPublik, Karir, Aplikasi, DasarHukum }