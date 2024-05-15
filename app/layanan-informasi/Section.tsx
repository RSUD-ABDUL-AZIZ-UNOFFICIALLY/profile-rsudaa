'use client'
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";

const Section = () => {
    // const itemLInk: string = process.env.SKM_LINK ? process.env.SKM_LINK : 'https://rsudaa.singkawangkota.go.id/survei/'
    const API_URL = process.env.API_URL
    const [itemDesc, setItemDesc] = useState<string>('')
    const [itemLInk, setItemLink] = useState<string>('')

    const getSKM = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/profile/layananInformasi`)

            if (response.data.data) {
                setItemDesc(response.data.data.desc)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getSKMLink = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/profile/layananInformasi-image`)

            if (response.data.data) {
                setItemLink(response.data.data.desc)
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
            <div className="lg:w-[80%] p-2 grid gap-2">
                {itemLInk ?
                    <div className="">
                        <img src={itemLInk} alt="" />
                    </div>
                    :
                    <>
                        <div className="skeleton w-32 h-32"></div>
                    </>
                }
                <div className="text-center text-lg mt-4">
                    {itemDesc ?
                        <>
                            <span className='m-1 bg-primary text-white rounded-sm p-1'>Struktur Organisasi RSUD dr Abdul Aziz</span>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente obcaecati cupiditate veritatis, dolores earum ad quae voluptates similique reiciendis, ullam alias, ab suscipit ducimus? Accusantium suscipit ab tempora velit voluptates, nam tenetur deserunt quibusdam in incidunt voluptate delectus eum obcaecati ut veniam eaque pariatur dolorem maxime ipsum hic? Impedit id obcaecati debitis expedita beatae fugit ad, ipsam omnis temporibus labore mollitia reiciendis! Praesentium eos iure odio corrupti rerum similique quo obcaecati sint voluptas facilis, ratione officiis at voluptates libero. Expedita culpa earum non provident corporis vitae eveniet temporibus rem.
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
            </div>
        </div>
    )
}

export default Section