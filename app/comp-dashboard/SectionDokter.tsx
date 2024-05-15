'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import dokter1 from '../../public/dokter/1.jpeg';
import axios from 'axios';
import { dokterResponse } from '../Model/dokter.model';
import user from "../../public/dokter/user.png";
import { useRouter } from 'next/navigation';
function SectionDokter() {
    const SIMRS_URL = process.env.SIMRS_URL
    const TOKEN = process.env.TOKEN
    const navigation = useRouter()

    const [dataDOkter, setDataDokter] = useState<dokterResponse[]>()
    const getDokter = async () => {
        try {
            const response = await axios.get(`${SIMRS_URL}/api/petugas/dokters/`, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`
                }
            })

            if (response.data.data) {
                setDataDokter(response.data.data)
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        getDokter()
    }, [])
    return (
        <div className='section'>
            <div className="item-section">
                <div className="grid lg:grid-cols-10 lg:md:gap-4 h-full">
                    <div className="lg:md:col-span-10 bg-white p-4">
                        <div className="flex justify-center">
                            <div className={`text-primary uppercase w-fit font-bold text-xl pb-2 pr-2 pl-2 border-b-4 border-primary`}>Dokter Kami</div>
                        </div>
                        <div className="flex gap-6 flex-wrap justify-center mt-4 lg:md:pl-[120px] lg:md:pr-[120px]">
                            {dataDOkter && dataDOkter.length > 0 ? dataDOkter.map((item: dokterResponse, index: number) => {
                                const photos: any = item.photo
                                const slice: any = photos.slice(0, 4)
                                if (index < 4) {
                                    return (
                                        <div key={index} className="flex justify-center lg:md:w-[22%] w-[45%]">
                                            <div className="card-dokter lg:md:w-[100%]">
                                                <div className="grid grid-cols-5"></div>
                                                <div className="body h-full w-full">
                                                    <div className="aspect-square overflow-hidden w-full">
                                                        <img src={slice === 'http' ? item.photo : '/dokter/default.jpg'} alt="" className='object-cover object-center ' />
                                                    </div>
                                                    <div className="desc w-full">
                                                        <div className="text-sm font-bold h-10 flex items-center text-center justify-center">{item.nm_dokter}</div>
                                                        <div className="text-sm font-thin">
                                                            {item.poliklinik}
                                                        </div>
                                                        <div className="motto">
                                                            Spesialis {item.spesialis}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            })
                                :
                                <>
                                    <div className="card flex shadow-lg shadow-zinc-100 justify-center lg:md:w-[22%] w-[45%]">
                                        <div className="card-body flex flex-col gap-4 w-full">
                                            <div className="skeleton h-48 w-full"></div>
                                            <div className="skeleton h-4 w-28"></div>
                                            <div className="skeleton h-4 w-full"></div>
                                            <div className="skeleton h-4 w-full"></div>
                                        </div>
                                    </div>
                                    <div className="card flex shadow-lg shadow-zinc-100 justify-center lg:md:w-[22%] w-[45%]">
                                        <div className="card-body flex flex-col gap-4 w-full">
                                            <div className="skeleton h-48 w-full"></div>
                                            <div className="skeleton h-4 w-28"></div>
                                            <div className="skeleton h-4 w-full"></div>
                                            <div className="skeleton h-4 w-full"></div>
                                        </div>
                                    </div>
                                    <div className="card flex shadow-lg shadow-zinc-100 justify-center lg:md:w-[22%] w-[45%]">
                                        <div className="card-body flex flex-col gap-4 w-full">
                                            <div className="skeleton h-48 w-full"></div>
                                            <div className="skeleton h-4 w-28"></div>
                                            <div className="skeleton h-4 w-full"></div>
                                            <div className="skeleton h-4 w-full"></div>
                                        </div>
                                    </div>
                                    <div className="card flex shadow-lg shadow-zinc-100 justify-center lg:md:w-[22%] w-[45%]">
                                        <div className="card-body flex flex-col gap-4 w-full">
                                            <div className="skeleton h-48 w-full"></div>
                                            <div className="skeleton h-4 w-28"></div>
                                            <div className="skeleton h-4 w-full"></div>
                                            <div className="skeleton h-4 w-full"></div>
                                        </div>
                                    </div>
                                </>
                            }
                        </div>
                        {dataDOkter &&
                            <div className="flex justify-center mt-5">
                                <button onClick={() => navigation.push('/jadwal-praktek')} className='hover:underline hover:scale-105 hover duration-200 active:scale-95 '>Lihat Semua Dokter</button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}


export default SectionDokter