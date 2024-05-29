'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import reportIcon from "../../public/icon/report.png";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { laporanTahunanResponse } from '../Model/laporanTahunan.model';

const Section = () => {
    const navigation = useRouter()
    const API_URL = process.env.API_URL

    const [data, setData] = useState<laporanTahunanResponse[]>()

    const getDataLaporanTahunan = async () => {
        try {
            const response = await axios.get(`${API_URL}/laporan-tahunan?name=`)

            if (response.data.success == true) {
                setData(response.data.data)
            }
        } catch (error) {
            //console.log(error);
        }
    }

    useEffect(() => {
        getDataLaporanTahunan()
    }, [])
    return (
        <div className='flex justify-center p-2'>
            <div className="lg:w-[80%]">
                <div className="card-body shadow rounded-lg mt-5">
                    <div className="font-bold uppercase text-3xl">FREQUENTLY ASKED QUESTIONS</div>
                    <div className="grid gap-4">
                        <div className="collapse collapse-arrow bg-base-200">
                            <input type="radio" name="my-accordion-2" defaultChecked />
                            <div className="collapse-title text-xl font-medium">
                                Apakah RSUD memiliki layanan darurat?
                            </div>
                            <div className="collapse-content">
                                <p>Ya, RSUD kami memiliki layanan Unit Gawat Darurat 24 jam yang siap menerima pasien dalam keadaan darurat.</p>
                            </div>
                        </div>
                        <div className="collapse collapse-arrow bg-base-200">
                            <input type="radio" name="my-accordion-2" />
                            <div className="collapse-title text-xl font-medium">
                                Bagaimana prosedur pendaftaran pasien?
                            </div>
                            <div className="collapse-content">
                                <p>
                                    Prosedur pendaftaran pasien di RSUD dr. Abdul Aziz Singkawang dapat dilakukan dengan dua cara:
                                    <br /><br />
                                    Pendaftaran Offline melalui Loket Pendaftaran:
                                    Pasien dapat datang langsung ke rumah sakit dan mengunjungi loket pendaftaran. Di sana, petugas pendaftaran akan membantu proses pendaftaran dengan mengisi formulir yang diperlukan serta memberikan informasi terkait prosedur selanjutnya.
                                    <br /><br />
                                    Pendaftaran Online melalui WhatsApp:
                                    Untuk kemudahan dan efisiensi, RSUD dr. Abdul Aziz Singkawang juga menyediakan layanan pendaftaran online melalui WhatsApp. Pasien dapat mengirim pesan WhatsApp ke nomor pendaftaran yang telah disediakan oleh rumah sakit. Petugas akan memandu pasien melalui proses pendaftaran, termasuk pengisian data yang diperlukan dan konfirmasi jadwal.
                                </p>
                            </div>
                        </div>
                        <div className="collapse collapse-arrow bg-base-200">
                            <input type="radio" name="my-accordion-2" />
                            <div className="collapse-title text-xl font-medium">
                                Apakah RSUD menerima asuransi kesehatan?
                            </div>
                            <div className="collapse-content">
                                <p>Ya, kami menerima beberapa jenis asuransi kesehatan yang dapat Anda lihat pada tautan berikut: Asuransi.</p>
                            </div>
                        </div>
                        <div className="collapse collapse-arrow bg-base-200">
                            <input type="radio" name="my-accordion-2" />
                            <div className="collapse-title text-xl font-medium">
                                Apakah RSUD menyediakan layanan rawat inap?
                            </div>
                            <div className="collapse-content">
                                <p>Ya, RSUD kami memiliki fasilitas rawat inap yang dilengkapi dengan berbagai jenis kamar, mulai dari kamar kelas I hingga kamar kelas III.</p>
                            </div>
                        </div>
                        <div className="collapse collapse-arrow bg-base-200">
                            <input type="radio" name="my-accordion-2" />
                            <div className="collapse-title text-xl font-medium">
                                Bagaimana saya dapat memberikan umpan balik atau keluhan? Click to open this one and close others
                            </div>
                            <div className="collapse-content">
                                <p>
                                    Anda dapat memberikan umpan balik atau keluhan melalui beberapa cara:
                                    Melalui Whataap pengaduan +62 8134-5923-859.
                                    Langsung mengunjungi kantor pengaduan RSUD dr. Abdul Aziz untuk memberikan umpan balik atau keluhan langsung.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Section