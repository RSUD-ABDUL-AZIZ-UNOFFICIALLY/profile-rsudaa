'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { dokterResponse, JadwalDokterResponse } from '../Model/dokter.model'

const Section = () => {
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
        do {
            setTimeout(() => {
                getDokter()
            }, 2000)
        } while (dataDOkter);
    }, [])

    return (
        <div className='flex justify-center p-2'>
            <div className="w-[80%] p-2">
                <div className="text-center text-primary">
                    <div className="font-bold uppercase text-3xl">DAFTAR DOKTER</div>
                    <div className="">RSUD dr Abdul Aziz</div>
                </div>
                <div className="flex gap-6 flex-wrap justify-center mt-4 lg:md:pl-[120px] lg:md:pr-[120px]">
                    {dataDOkter && dataDOkter.length > 0 ? dataDOkter.map((item: dokterResponse, index: number) => {
                        const photos: any = item.photo
                        const slice: any = photos.slice(0, 4)
                        return (
                            <React.Fragment key={index}>
                                <button className="rounded-xl shadow-lg shadow-zinc-100 overflow-hidden lg:md:w-[30%] w-[100%] active:scale-95 duration-200 h-fit active:border-none">
                                    <div className="aspect-square overflow-hidden w-full">
                                        <img src={slice === 'http' ? item.photo : '/dokter/default.jpg'} alt="" className='object-cover' />
                                    </div>
                                    <div className="card-body">
                                        <div className="text-sm font-bold h-10 flex items-center text-center justify-center">{item.nm_dokter}</div>
                                        <div className="text-sm font-thin">
                                            {item.poliklinik}
                                        </div>
                                        <div className="">
                                            Spesialis {item.spesialis}
                                        </div>
                                        <div className="">
                                            {item.jadwalPraktek && item.jadwalPraktek.length > 0 && item.jadwalPraktek?.map((itemm: JadwalDokterResponse, index: number) => {
                                                return (
                                                    <React.Fragment key={index}>
                                                        <div className="text-xs text-left">
                                                            {itemm.hari_kerja} : {itemm.jam_mulai} - {itemm.jam_selesai}
                                                        </div>
                                                    </React.Fragment>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </button>
                            </React.Fragment>
                        )
                    })
                        :
                        <>
                            <div className="card flex shadow-lg shadow-zinc-100 justify-center lg:md:w-[30%] w-[100%]">
                                <div className="card-body flex flex-col gap-4 w-full">
                                    <div className="skeleton h-48 w-full"></div>
                                    <div className="skeleton h-4 w-28"></div>
                                    <div className="skeleton h-4 w-full"></div>
                                    <div className="skeleton h-4 w-full"></div>
                                    <div className="skeleton h-4 w-full"></div>
                                    <div className="skeleton h-4 w-full"></div>
                                </div>
                            </div>
                            <div className="card flex shadow-lg shadow-zinc-100 justify-center lg:md:w-[30%] w-[100%]">
                                <div className="card-body flex flex-col gap-4 w-full">
                                    <div className="skeleton h-48 w-full"></div>
                                    <div className="skeleton h-4 w-28"></div>
                                    <div className="skeleton h-4 w-full"></div>
                                    <div className="skeleton h-4 w-full"></div>
                                    <div className="skeleton h-4 w-full"></div>
                                    <div className="skeleton h-4 w-full"></div>
                                </div>
                            </div>
                            <div className="card flex shadow-lg shadow-zinc-100 justify-center lg:md:w-[30%] w-[100%]">
                                <div className="card-body flex flex-col gap-4 w-full">
                                    <div className="skeleton h-48 w-full"></div>
                                    <div className="skeleton h-4 w-28"></div>
                                    <div className="skeleton h-4 w-full"></div>
                                    <div className="skeleton h-4 w-full"></div>
                                    <div className="skeleton h-4 w-full"></div>
                                    <div className="skeleton h-4 w-full"></div>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default Section