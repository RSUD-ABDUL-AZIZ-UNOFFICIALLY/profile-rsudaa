'use client'
import { ProfileResponse } from '@/app/Model/profile.model'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Head = () => {
    const [Data, setData] = useState<ProfileResponse>()
    const API_URL = process.env.API_URL
    const getArtikel = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/profile/article`)

            if (response.data.data) {
                setData(response.data.data)
            }


        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getArtikel()
    }, [])

    return (
        <div className='flex justify-center items-center'>
            <div className="lg:w-[80%] p-3">
                <div className="text-dark uppercase pb-2 pr-5 border-b-4 w-fit border-dark font-bold">Artikel RSUD dr Abdul Aziz</div>
                <div className="p-2 text-center grid grid-cols-10">
                    <div className="col-span-9 flex items-center p-5">
                        {Data ?
                            <>
                                {Data.desc}
                            </>
                            :
                            <>
                                <div className="flex justify-center items-center w-full">
                                    <span className="loading loading-dots loading-md"></span>
                                </div>
                            </>
                        }
                    </div>
                    <div className="min-h-[30vh] bg-cover bg-center col-span-1 bg-[url('https://miro.medium.com/v2/resize:fit:1400/0*ctta7PE_zJ-LyoqX')] rounded-sm"></div>
                </div>
            </div>
        </div>
    )
}

export default Head