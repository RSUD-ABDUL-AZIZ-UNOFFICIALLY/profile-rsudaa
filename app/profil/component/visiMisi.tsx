'use client'
import { ProfileResponse } from '@/app/Model/profile.model'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const VisiMisi = () => {
    const [visi, setVisi] = useState<ProfileResponse>()
    const [misi, setMisi] = useState<ProfileResponse>()

    const API_URL = process.env.API_URL
    const getVisi = async () => {
        try {
            const response = await axios.get(`${API_URL}/profile/visi`)

            if (response.data.data) {
                setVisi(response.data.data)
            }
        } catch (error) {
            //console.log(error);
        }
    }

    const getMisi = async () => {
        try {
            const response = await axios.get(`${API_URL}/profile/misi`)

            if (response.data.data) {
                setMisi(response.data.data)
            }
        } catch (error) {
            //console.log(error);
        }
    }

    useEffect(() => {
        getVisi()
        getMisi()
    }, [])

    //console.log(visi?.desc);


    return (
        <div className='bg-cover bg-center bg-[url("https://www.breachcandyhospital.org/sites/default/files/17-compressed.jpg")] relative'>
            <div className="bg-[#000000b4] min-h-10 lg:p-4 p-2">
                <div className="flex justify-center items-center">
                    <div className="text-gray-400 text-center lg:w-[40%]">
                        <div className="flex justify-center mb-3">
                            <div className="uppercase font-semibold p-1 pl-4 pr-4 border-b-4 w-fit text-white text-2xl">
                                Visi
                            </div>
                        </div>
                        <div className="lg:md:text-md text-lg">
                            {visi ? visi.desc :
                                <>
                                    <div className="flex justify-center items-center min-h-24">
                                        <span className="loading loading-ring loading-md"></span>
                                    </div>
                                </>
                            }</div>
                    </div>
                </div>
                <div className="flex justify-center items-center mt-4">
                    <div className="text-gray-400 text-center lg:w-[40%]">
                        <div className="flex justify-center mb-3">
                            <div className="uppercase font-semibold p-1 pl-4 pr-4 border-b-4 w-fit text-white text-2xl">
                                Misi
                            </div>
                        </div>
                        <div className="lg:md:text-md text-lg">
                            {misi ? misi.desc :
                                <>
                                    <div className="flex justify-center items-center min-h-24">
                                        <span className="loading loading-ring loading-md"></span>
                                    </div>
                                </>
                            }</div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default VisiMisi