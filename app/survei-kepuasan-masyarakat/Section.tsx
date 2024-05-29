'use client'
import Image from "next/image";
import skm from "../../public/icon/skm.gif";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";

const Section = () => {
    // const skmLink: string = process.env.SKM_LINK ? process.env.SKM_LINK : 'https://rsudaa.singkawangkota.go.id/survei/'
    const API_URL = process.env.API_URL
    const [skmDesc, setSkmDesc] = useState<string>('')
    const [skmLink, setSkmLink] = useState<string>('')

    const getSKM = async () => {
        try {
            const response = await axios.get(`${API_URL}/profile/skm`)

            if (response.data.data) {
                setSkmDesc(response.data.data.desc)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getSKMLink = async () => {
        try {
            const response = await axios.get(`${API_URL}/profile/skmLink`)

            if (response.data.data) {
                setSkmLink(response.data.data.desc)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getSKM()
        getSKMLink()
    }, [])

    return (
        <div className='flex justify-center p-2'>
            <div className="lg:w-[80%] p-2">
                <div className="flex justify-center">
                    <Image alt="" src={skm} className="h-56 w-fit" />
                </div>
                <div className="text-center text-lg">
                    {skmDesc ?
                        <>
                            <span className='m-1 bg-primary text-white rounded-sm p-1'>Survei Kepuasan Masyarakat RSUD dr Abdul Aziz</span>
                            {skmDesc}
                        </>
                        :
                        <>
                            <div className="grid w-full h-full gap-4">
                                <div className="skeleton rounded-sm h-4 w-[30%]"></div>
                                <div className="skeleton rounded-sm h-4 w-full"></div>
                                <div className="skeleton rounded-sm h-4 w-full"></div>
                                <div className="skeleton rounded-sm h-4 w-full"></div>
                                <div className="skeleton rounded-sm h-4 w-full"></div>
                            </div>
                        </>
                    }
                </div>
                {skmDesc && skmLink &&
                    <div className="flex justify-center mt-4">
                        <Link href={skmLink} className="btn btn-primary" target="_blank">Form Survei Kepuasan Masyarakat</Link>
                    </div>
                }
            </div>
        </div>
    )
}

export default Section