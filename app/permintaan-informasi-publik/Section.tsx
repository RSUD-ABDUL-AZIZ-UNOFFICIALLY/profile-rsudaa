'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Icon from "../../public/icon/speech-bubble-chat-talk.png";
import Image from 'next/image';
import axios from 'axios';

const Section = () => {



    useEffect(() => {
        // getDesc()
        // getLink()
    }, [])

    return (
        <div className='flex justify-center p-4 min-h-[40vh] items-center'>
            <div className="lg:w-[70%] shadow-sm rounded-sm p-4">
                <div className="font-bold uppercase text-2xl pb-2 pr-4 border-b-4 border-black w-fit">Permintaan Informasi Publik</div>
                <div className="flex justify-center">
                    <Image alt='' src={Icon} className='h-52 w-fit' />
                </div>

                <section className="mb-12 space-y-4 text-justify leading-relaxed">
                    <p>
                        Sebagai bentuk komitmen terhadap keterbukaan dan akuntabilitas layanan publik,
                        <strong> RSUD dr. Abdul Aziz Singkawang</strong> menyediakan dua jenis formulir penting dalam pengelolaan informasi publik.
                    </p>

                    <p>
                        Pertama, <strong>Formulir Register Permintaan Informasi Publik</strong> berfungsi untuk mencatat secara resmi setiap permintaan informasi
                        yang diajukan oleh masyarakat. Formulir ini memuat data identitas pemohon, jenis informasi yang diminta, tujuan penggunaan informasi,
                        serta tanggal permintaan diterima. Dengan adanya pencatatan ini, rumah sakit memastikan bahwa pelayanan informasi dapat dilakukan
                        secara transparan, terukur, dan sesuai dengan ketentuan peraturan perundang-undangan.
                    </p>

                    <p>
                        Kedua, <strong>Formulir Register Pengajuan Keberatan</strong> disediakan bagi pemohon yang merasa keberatan terhadap tanggapan atau pelayanan
                        atas permintaan informasi publik yang diajukan sebelumnya. Formulir ini mencatat identitas pemohon, alasan keberatan, serta detail permintaan
                        informasi yang menjadi dasar keberatan. Keberadaan formulir ini menjadi wujud kesungguhan rumah sakit dalam memberikan ruang bagi masyarakat
                        untuk mendapatkan informasi secara adil dan bertanggung jawab.
                    </p>

                    <p>
                        Melalui kedua formulir ini, <strong>RSUD dr. Abdul Aziz Singkawang</strong> berupaya mendukung penuh hak masyarakat atas informasi publik,
                        sekaligus membangun budaya pelayanan yang transparan, responsif, dan akuntabel.
                    </p>
                </section>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLSeM_nAVRK_ZC9Jei33WbYJp7K7z3wsM1Am48kW45RNztfTNCA/viewform"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 text-white py-3 px-6 rounded-lg text-center hover:bg-blue-700 transition w-full sm:w-auto"
                    >
                        Formulir Permintaan Informasi Publik
                    </a>

                    <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLSfXovxeF8x_PVaY2fy3jby_T23bXMslP3dGr1BLE0Q7QU4WJA/viewform"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-red-600 text-white py-3 px-6 rounded-lg text-center hover:bg-red-700 transition w-full sm:w-auto"
                    >
                        Formulir Permohonan Keberatan
                    </a>

                    <a
                        href="https://forms.gle/SKoxSTsn18t73Z1s8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-600 text-white py-3 px-6 rounded-lg text-center hover:bg-green-700 transition w-full sm:w-auto"
                    >
                        Formulir Jawaban Permohonan Informasi

                    </a>

                    <a
                        href="https://forms.gle/YN2dk7yP7HjdSQNG7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-yellow-600 text-white py-3 px-6 rounded-lg text-center hover:bg-yellow-700 transition w-full sm:w-auto"
                    >
                        Buku Tamu Digital
                    </a>


                </div>
            </div>
        </div>
    )
}

export default Section