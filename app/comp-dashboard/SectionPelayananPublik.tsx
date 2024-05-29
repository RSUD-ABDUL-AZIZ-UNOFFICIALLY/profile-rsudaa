'use client'
import React, { useEffect, useRef } from 'react'
import { motion, useInView, useAnimation } from "framer-motion"
import Image from 'next/image'
import iconSurveiKepuasan from "../../public/icon/surveiKepuasan.svg";
import iconPoli from "../../public/icon/poli.svg";
import iconInformation from "../../public/icon/information.svg";
import iconPengaduan from "../../public/icon/pengaduan.svg";
import iconJadwal from "../../public/icon/jadwal.svg";
import iconFasilitas from "../../public/icon/fasiltas.svg";
import iconRegistrasi from "../../public/icon/registrasi.svg";
import { useRouter } from 'next/navigation';

const SectionPelayananPublik = () => {
    const motionRef = useRef(null)
    const isInView = useInView(motionRef, { once: true })
    const mainControls = useAnimation()

    const navigation = useRouter()

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible")
        }
    }, [isInView])

    return (
        <div className='section'>
            <div className="item-section">
                <div className="grid grid-cols-10 gap-4 h-full">
                    <div className="col-span-10 bg-white p-4">
                        <div className="flex justify-right">
                            <div className={`text-primary uppercase w-fit font-bold text-xl pb-2 pr-5 border-b-4 border-primary`}>Pelayanan Publik</div>
                        </div>
                        <motion.div
                            className="lg:md:mt-8 mt-4 w-full gap-4"
                            ref={motionRef}
                            variants={{
                                hidden: { opacity: 0, x: -200 },
                                visible: { opacity: 1, x: 0 }
                            }}
                            initial="hidden"
                            animate={mainControls}
                            transition={{ duration: 1, delay: 0 }}
                        >
                            <div className="grid lg:md:grid-cols-6 grid-cols-3 lg:gap-5 gap-4 justify-center">
                                <button onClick={() => navigation.push(`/survei-kepuasan-masyarakat`)} className="button button-white shadow-sm aspect-square w-full">
                                    <div className="h-[70%] flex justify-center items-center">
                                        <Image
                                            src={iconSurveiKepuasan}
                                            alt="Picture of the author"
                                            // height={80}
                                            className="lg:md:h-[60%] h-[60%]"
                                        // className='h-full'
                                        />
                                    </div>
                                    <div className="h-[30%]  lg:md:text-[15px] text-[10px] uppercase font-bold text-primary flex items-center justify-center text-center">
                                        Survei Kepuasan Masyarakat
                                    </div>
                                </button>
                                <button onClick={() => navigation.push(`/layanan-informasi`)} className="button button-white shadow-sm aspect-square w-full">
                                    <div className="h-[70%] flex justify-center items-center">
                                        <Image
                                            src={iconInformation}
                                            alt="Picture of the author"
                                            // height={80}
                                            className="lg:md:h-[60%] h-[60%]"
                                        // className='h-full'
                                        />
                                    </div>
                                    <div className="h-[30%] lg:md:text-[15px] text-[10px] uppercase font-bold text-primary flex items-center justify-center text-center">
                                        Layanan Informasi
                                    </div>
                                </button>
                                <div className="">
                                    <button onClick={() => navigation.push(``)} className="button button-white shadow-sm aspect-square w-full">
                                        <div className="h-[70%] flex justify-center items-center">
                                            <Image
                                                src={iconPoli}
                                                alt="Picture of the author"
                                                // height={80}
                                                className="lg:md:h-[60%] h-[60%]"
                                            // className='h-full'
                                            />
                                        </div>
                                        <div className="h-[30%] lg:md:text-[15px] text-[10px] uppercase font-bold text-primary flex items-center justify-center text-center">
                                            Informasi Poliklinik
                                        </div>
                                    </button>
                                </div>
                                <div className="">
                                    <button onClick={() => navigation.push(`/informasi-poliklinik`)} className="button button-white shadow-sm aspect-square w-full">
                                        <div className="h-[70%] flex justify-center items-center">
                                            <Image
                                                src={iconJadwal}
                                                alt="Picture of the author"
                                                // height={80}
                                                className="lg:md:h-[60%] h-[60%]"
                                            // className='h-full'
                                            />
                                        </div>
                                        <div className="h-[30%] lg:md:text-[15px] text-[10px] uppercase font-bold text-primary flex items-center justify-center text-center">
                                            Jadwal Praktek
                                        </div>
                                    </button>
                                </div>
                                <div className="">
                                    <button onClick={() => navigation.push(`/fasilitas-tarif`)} className="button button-white shadow-sm aspect-square w-full">
                                        <div className="h-[70%] flex justify-center items-center">
                                            <Image
                                                src={iconFasilitas}
                                                alt="Picture of the author"
                                                // height={80}
                                                className="lg:md:h-[60%] h-[60%]"
                                            // className='h-full'
                                            />
                                        </div>
                                        <div className="h-[30%] lg:md:text-[15px] text-[10px] uppercase font-bold text-primary flex items-center justify-center text-center">
                                            Fasilitas & Tarif
                                        </div>
                                    </button>
                                </div>
                                <div className="">
                                    <button onClick={() => navigation.push(`/pendaftaran-online`)} className="button button-white shadow-sm aspect-square w-full">
                                        <div className="h-[70%] flex justify-center items-center">
                                            <Image
                                                src={iconRegistrasi}
                                                alt="Picture of the author"
                                                // height={80}
                                                className="lg:md:h-[60%] h-[60%]"
                                            // className='h-full'
                                            />
                                        </div>
                                        <div className="h-[30%] lg:md:text-[15px] text-[10px] uppercase font-bold text-primary flex items-center justify-center text-center">
                                            Pendaftaran Online
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SectionPelayananPublik