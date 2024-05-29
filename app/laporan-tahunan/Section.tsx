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
            console.log(error);
        }
    }

    const handleNavigation = (e: string) => {
        navigation.push(`laporan-tahunan/${e}`)
    }

    useEffect(() => {
        getDataLaporanTahunan()
    }, [])
    return (
        <div className='flex justify-center p-2'>
            <div className="lg:w-[60%] p-2">
                <div className="flex justify-center">
                    <Image alt='report-icon' src={reportIcon} className='h-64 w-fit' />
                </div>
                <div className="text-center text-lg">
                    <span className="p-1 bg-primary text-white rounded-sm m-1">Laporan Tahunan RSUD dr Abdul Aziz </span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam excepturi eos hic est, ea suscipit reiciendis rerum perferendis facilis quasi assumenda asperiores maxime vitae necessitatibus et doloremque alias similique quod ut. Suscipit reprehenderit id, aliquam alias blanditiis dolorum est! Eligendi doloremque corporis eos maiores nostrum atque distinctio reiciendis voluptates veniam quis, ex adipisci placeat quae harum suscipit rem nobis provident, architecto exercitationem itaque neque necessitatibus rerum! Suscipit minus eos corporis reprehenderit vero a dicta rerum, libero ad beatae accusantium eum consequatur eaque explicabo voluptatem at dolorum ex odit. Tempore reprehenderit inventore aspernatur voluptas possimus fugit quisquam ducimus vel aliquam. Vel!
                </div>
                <div className="flex-wrap flex justify-center gap-5 mt-4">
                    {data ? data.map((item: laporanTahunanResponse, index: number) => {
                        return (
                            <button key={index} onClick={() => handleNavigation(`${item.name}`)} className="lg:w-[30%] w-[40%] shadow-lg text-xl p-3 rounded-lg uppercase font-bold hover:scale-105 active:scale-95 duration-200 aspect-video">
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