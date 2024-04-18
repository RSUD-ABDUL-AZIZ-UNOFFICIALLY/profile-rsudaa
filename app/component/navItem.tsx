import Link from "next/link";
import React from "react";

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
            <Link href={`/layanan-informasi`} className="dropdown-item">Layanan Informasi</Link>
            <Link href={`/pengaduan`} className="dropdown-item">Pengaduan</Link>
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
            <Link href={`#`} className="dropdown-item">Lowongan Pekerjaan</Link>
            <Link href={`#`} className="dropdown-item">Magang</Link>
        </React.Fragment>
    )
}

const Aplikasi = () => {
    return (
        <React.Fragment>
            <Link href={`#`} className="dropdown-item">Lorem ipsum</Link>
            <Link href={`#`} className="dropdown-item">Lorem ipsum</Link>
            <Link href={`#`} className="dropdown-item">Lorem ipsum</Link>
            <Link href={`#`} className="dropdown-item">Lorem ipsum</Link>
        </React.Fragment>
    )
}



const DasarHukum = () => {
    return (
        <React.Fragment>
            <Link href={`#`} className="dropdown-item">Lorem ipsum</Link>
            <Link href={`#`} className="dropdown-item">Lorem ipsum</Link>
            <Link href={`#`} className="dropdown-item">Lorem ipsum</Link>
            <Link href={`#`} className="dropdown-item">Lorem ipsum</Link>
        </React.Fragment>
    )
}

export { TentangKami, PelayananPublik, Karir, Aplikasi, DasarHukum }