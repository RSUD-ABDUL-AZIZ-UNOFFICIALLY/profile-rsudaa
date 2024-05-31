'use client'
import { ProfileResponse } from '@/app/Model/profile.model'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import skw from "../../../public/skw.png";
const AboutUs = () => {
    const [AboutUs, setAboutUs] = useState<ProfileResponse>()

    const API_URL = process.env.API_URL
    const getAboutUs = async () => {
        try {
            const data = await axios.get(`${API_URL}/profile/about-us`)

            if (data.data.data) {
                setAboutUs(data.data.data)
            }

        } catch (error) {
            //console.error(error);
        }
    }

    useEffect(() => {
        getAboutUs()
    }, [])

    return (
        <div className='lg:pl-32 lg:pr-32 lg:p-5 md:pl-15 md:pr-15 md:p-3 p-2'>
            <div className="lg:grid lg:grid-cols-5 gap-2">
                <div className="col-span-1 rounded-r-sm min-h-[40vh] bg-cover bg-center  flex justify-center items-center">
                    {/* <img src="" alt="" /> */}
                    <Image alt='' src={skw} className='h-40 w-fit drop-shadow-xl hover:scale-125 duration-300' />
                </div>
                <div className="col-span-3 grid items-center ">
                    <div className="">
                        {/* <div className="uppercase text-2xl font-bold text-primary">Profile</div> */}
                        <div className="min-h-full flex items-center p-4 text-justify">
                            {AboutUs ?
                                <div className='text-lg' dangerouslySetInnerHTML={{ __html: AboutUs.desc ? AboutUs.desc : '' }} />
                                :
                                <>
                                    <div className="flex flex-col gap-4 w-full">
                                        <div className="skeleton h-4 w-28"></div>
                                        <div className="skeleton h-4 w-full"></div>
                                        <div className="skeleton h-4 w-full"></div>
                                        <div className="skeleton h-4 w-full"></div>
                                        <div className="skeleton h-4 w-full"></div>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default AboutUs