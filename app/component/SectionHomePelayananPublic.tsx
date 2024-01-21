import React from 'react'
import poli from "../../public/icon/poli.png";
import iconSurveiKepuasan from "../../public/icon/surveiKepuasan.svg";
import iconPoli from "../../public/icon/poli.svg";
import iconInformation from "../../public/icon/information.svg";
import iconPengaduan from "../../public/icon/pengaduan.svg";
import iconJadwal from "../../public/icon/jadwal.svg";
import iconFasilitas from "../../public/icon/fasiltas.svg";
import iconRegistrasi from "../../public/icon/registrasi.svg";
import Image from 'next/image';
const SectionHomePelayananPublic = () => {

    return (
        <div className='mt-4 w-full gap-4'>
            <div className="grid lg:md:grid-cols-7 grid-cols-3 gap-2">
                <div className="">
                    <button className="btn btn-white shadow-lg aspect-square w-full">
                        <div className="h-[70%] flex justify-center">
                            <Image
                                src={iconSurveiKepuasan}
                                alt="Picture of the author"
                                // height={80}
                                className='lg:md:h-full h-[80%]'
                            // className='h-full'
                            />
                        </div>
                        <div className="h-[30%]  lg:md:text-[15px] text-[10px] uppercase font-bold text-primary flex items-center justify-center text-center">
                            Survei Kepuasan Masyarakat
                        </div>
                    </button>
                </div>
                <div className="">
                    <button className="btn btn-white shadow-lg aspect-square w-full" >
                        <div className="h-[70%] flex justify-center">
                            <Image
                                src={iconInformation}
                                alt="Picture of the author"
                                // height={80}
                                className='lg:md:h-full h-[80%]'
                            // className='h-full'
                            />
                        </div>
                        <div className="h-[30%] lg:md:text-[15px] text-[10px] uppercase font-bold text-primary flex items-center justify-center text-center">
                            Layanan Informasi
                        </div>
                    </button>
                </div>
                <div className="">
                    <button className="btn btn-white shadow-lg aspect-square w-full" >
                        <div className="h-[70%] flex justify-center">
                            <Image
                                src={iconPengaduan}
                                alt="Picture of the author"
                                // height={80}
                                className='lg:md:h-full h-[80%]'
                            // className='h-full'
                            />
                        </div>
                        <div className="h-[30%] lg:md:text-[15px] text-[10px] uppercase font-bold text-primary flex items-center justify-center text-center">
                            Pengaduan
                        </div>
                    </button>
                </div>
                <div className="">
                    <button className="btn btn-white shadow-lg aspect-square w-full" >
                        <div className="h-[70%] flex justify-center">
                            <Image
                                src={iconPoli}
                                alt="Picture of the author"
                                // height={80}
                                className='lg:md:h-full h-[80%]'
                            // className='h-full'
                            />
                        </div>
                        <div className="h-[30%] lg:md:text-[15px] text-[10px] uppercase font-bold text-primary flex items-center justify-center text-center">
                            Informasi Poliklinik
                        </div>
                    </button>
                </div>
                <div className="">
                    <button className="btn btn-white shadow-lg aspect-square w-full" >
                        <div className="h-[70%] flex justify-center">
                            <Image
                                src={iconJadwal}
                                alt="Picture of the author"
                                // height={80}
                                className='lg:md:h-full h-[80%]'
                            // className='h-full'
                            />
                        </div>
                        <div className="h-[30%] lg:md:text-[15px] text-[10px] uppercase font-bold text-primary flex items-center justify-center text-center">
                            Jadwal Praktek
                        </div>
                    </button>
                </div>
                <div className="">
                    <button className="btn btn-white shadow-lg aspect-square w-full" >
                        <div className="h-[70%] flex justify-center">
                            <Image
                                src={iconFasilitas}
                                alt="Picture of the author"
                                // height={80}
                                className='lg:md:h-full h-[80%]'
                            // className='h-full'
                            />
                        </div>
                        <div className="h-[30%] lg:md:text-[15px] text-[10px] uppercase font-bold text-primary flex items-center justify-center text-center">
                            Fasilitas & Tarif
                        </div>
                    </button>
                </div>
                <div className="">
                    <button className="btn btn-white shadow-lg aspect-square w-full" >
                        <div className="h-[70%] flex justify-center">
                            <Image
                                src={iconRegistrasi}
                                alt="Picture of the author"
                                // height={80}
                                className='lg:md:h-full h-[80%]'
                            // className='h-full'
                            />
                        </div>
                        <div className="h-[30%] lg:md:text-[15px] text-[10px] uppercase font-bold text-primary flex items-center justify-center text-center">
                            Pendaftaran Online
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SectionHomePelayananPublic