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

    const [desc, setDesc] = useState<string>('')

    const getDescLaporanTahunan = async () => {
        try {
            const response = await axios.get(`${API_URL}/profile/laporanTahunan`)

            if (response.data.success) {
                setDesc(response.data.data.desc)
            }
        } catch (error) {

        }
    }

    const handleNavigation = (e: string) => {
        navigation.push(`${e}`)
    }

    useEffect(() => {
        getDataLaporanTahunan()
        getDescLaporanTahunan()
    }, [])
    return (
        <div className='flex justify-center p-2'>
            <div className="lg:w-[60%] p-2">
                <div className="flex justify-center">
                    <Image alt='report-icon' src={reportIcon} className='h-64 w-fit' />
                </div>
                <div className="text-center text-lg">
                    <span className="p-1 bg-primary text-white rounded-sm m-1">Laporan Tahunan RSUD dr Abdul Aziz </span>
                    <div className="" dangerouslySetInnerHTML={{ __html: desc }} />
                </div>
                <div className="flex-wrap flex justify-center gap-5 mt-4">
                    {data ? data.map((item: laporanTahunanResponse, index: number) => {
                        return (
                            <button key={index} onClick={() => handleNavigation(`${item.desc}`)} className="lg:w-[30%] w-[40%] shadow-lg text-xl p-3 rounded-lg uppercase font-bold hover:scale-105 active:scale-95 duration-200 aspect-video">
                                {item.name}
                            </button>
                        )
                    })
                        :
                        <></>
                    }
                </div>
            </div>
        </div>
    )
}

export default Section
