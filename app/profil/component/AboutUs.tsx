'use client'
import { ProfileResponse } from '@/app/Model/profile.model'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const AboutUs = () => {
    const [AboutUs, setAboutUs] = useState<ProfileResponse>()

    const API_URL = process.env.API_URL
    const getAboutUs = async () => {
        try {
            const data = await axios.get(`${API_URL}/api/profile/about-us`)

            if (data.data.data) {
                setAboutUs(data.data.data)
            }

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getAboutUs()
    }, [])

    return (
        <div className='lg:pl-32 lg:pr-32 lg:p-5 md:pl-15 md:pr-15 md:p-3 p-2'>
            <div className="lg:grid lg:grid-cols-5 gap-2">
                <div className="col-span-1 rounded-r-3xl min-h-[40vh] bg-cover bg-center bg-[url('https://www.beaconhospital.com.my/wp-content/uploads/2022/06/Beacon-Hospital-New.jpg.webp')]">
                    {/* <img src="" alt="" /> */}
                </div>
                <div className="col-span-2 grid items-center ">
                    <div className="">
                        <div className="uppercase text-2xl font-bold text-primary">Profile</div>
                        <div className="min-h-full flex items-center p-4 text-justify">
                            {AboutUs ?
                                <div className='text-sm'>
                                    {AboutUs.desc}
                                </div>
                                :
                                <div className="flex justify-center">
                                    <span className="loading loading-dots loading-xs"></span>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default AboutUs