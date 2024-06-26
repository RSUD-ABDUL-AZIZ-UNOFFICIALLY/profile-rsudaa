'use client'
import React, { useContext, useRef, useEffect, useCallback, useState } from 'react'
import { motion, useInView, useAnimation } from "framer-motion"
import axios, { AxiosResponse } from 'axios'
import { AnnoucementResponse } from '../Model/announcement.model'
import Link from 'next/link'
import moment from 'moment'

const SectionPengumuman = () => {
    const motionRef = useRef(null)
    const isInView = useInView(motionRef, { once: true })
    const mainControls = useAnimation()
    const API_URL = process.env.API_URL

    const [dataAnnouncement, setDataAnnouncement] = useState<AnnoucementResponse[]>()

    const getAnnouncement = useCallback(async () => {
        try {
            const response: AxiosResponse<any> = await axios.get(`${API_URL}/announcement`);

            if (response.data.success == true) {
                setDataAnnouncement(response.data.data);
            }

        } catch (error) {
            //console.error('Failed to fetch announcement:', error);
        }
    }, [dataAnnouncement]);

    useEffect(() => {
        getAnnouncement()
        if (isInView) {
            mainControls.start("visible")
        }
    }, [isInView])
    return (
        <motion.div
            className="h-full p-4"
            ref={motionRef}
            variants={{
                hidden: { opacity: 0, x: 200 },
                visible: { opacity: 1, x: 0 }
            }}
            initial="hidden"
            animate={mainControls}
            transition={{ duration: 1, delay: 0 }}
        >
            <div className={`text-primary uppercase w-fit font-bold text-xl pb-2 pr-5 border-b-4 border-primary`}>Pengumuman</div>
            <div className="grid gap-3 mt-4">
                {dataAnnouncement ? dataAnnouncement.map((item: AnnoucementResponse, index: number) => {
                    const desc: any = item.desc
                    const truncatedString = desc.slice(0, 150) + " ...";
                    if (index < 3) {
                        return (
                            <React.Fragment key={index}>
                                <div className="grid bg-white p-3 border-l-8 rounded-r-3xl shadow-sm rounded-l-md">
                                    <div className="flex">
                                        <Link href={''} className='active:scale-95 duration-200 font-bold  text-black uppercase text-lg text-left'>{item.title}</Link>
                                    </div>
                                    <div className="text-xs w-fit rounded-sm text-dark">{moment(item.createdAt).format('DD MMMM YYYY')}</div>
                                    <div className="text-sm p-2 pl-3 pr-3 ">{truncatedString}</div>
                                </div>
                            </React.Fragment>
                        )
                    }
                })
                    :
                    <>
                        <div className="flex flex-col gap-9">
                            <div className="flex flex-col gap-4 w-full">
                                <div className="skeleton h-4 w-28"></div>
                                <div className="skeleton h-4 w-full"></div>
                                <div className="skeleton h-4 w-full"></div>
                            </div>
                            <div className="flex flex-col gap-4 w-full">
                                <div className="skeleton h-4 w-28"></div>
                                <div className="skeleton h-4 w-full"></div>
                                <div className="skeleton h-4 w-full"></div>
                            </div>
                            <div className="flex flex-col gap-4 w-full">
                                <div className="skeleton h-4 w-28"></div>
                                <div className="skeleton h-4 w-full"></div>
                                <div className="skeleton h-4 w-full"></div>
                            </div>
                        </div>
                    </>
                }
                {dataAnnouncement &&
                    <Link href={''} className='hover:underline active:scale-95 duration-200  text-left'>Pengumuman Lainnya {`>>>`}</Link>
                }
            </div>
        </motion.div>
    )
}

export default SectionPengumuman