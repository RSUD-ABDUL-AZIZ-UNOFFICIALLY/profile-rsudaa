'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Icon from "../../public/icon/register.png";
import Image from 'next/image';
import axios from 'axios';

const Section = () => {
    const [desc, setDesc] = useState<String>('')
    const [link, setLink] = useState<string>('')
    const API_URL = process.env.API_URL

    const getDesc = async () => {
        try {
            const response = await axios.get(`${API_URL}/profile/pendaftaranOnline`)

            if (response.data.data) {
                setDesc(response.data.data.desc)
            }
        } catch (error) {
            //console.log(error);
        }
    }

    const getLink = async () => {
        try {
            const response = await axios.get(`${API_URL}/profile/pendaftaranOnlineLink`)

            if (response.data.data) {
                setLink(response.data.data.desc)
            }
        } catch (error) {
            //console.log(error);
        }
    }

    useEffect(() => {
        getDesc()
        getLink()
    }, [])

    return (
        <div className='flex justify-center p-4 min-h-[40vh] items-center'>
            <div className="lg:w-[70%] shadow-sm rounded-sm p-4">
                <div className="font-bold uppercase text-2xl pb-2 pr-4 border-b-4 border-black w-fit">Pendaftaran Online</div>
                <div className="flex justify-center">
                    <Image alt='' src={Icon} className='h-52 w-fit' />
                </div>
                <div className="p-5 font-thin text-center">
                    {desc ?
                        <div className="" dangerouslySetInnerHTML={{ __html: desc }} />
                        :
                        <>
                            <div className="flex justify-center items-center min-h-24">
                                <span className="loading loading-ring loading-md"></span>
                            </div>
                        </>
                    }
                </div>
                {desc && link &&
                    <div className="flex justify-center mt-10">
                        <Link href={link} className='btn btn-primary'>Daftar Online Sekarang</Link>
                    </div>
                }
            </div>
        </div>
    )
}

export default Section