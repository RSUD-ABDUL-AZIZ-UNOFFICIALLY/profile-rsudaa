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

    const [dataAnnouncement, setDataAnnouncement] = useState<AnnoucementResponse[]>()

    const getAnnouncement = useCallback(async () => {
        try {
            const res: AxiosResponse<any> = await axios.get(`http://localhost:4444/api/announcement?data=3`);

            const responseData: AnnoucementResponse[] = res.data.data.announcement;

            if (responseData) {
                setDataAnnouncement(responseData);
            }

        } catch (error) {
            console.error('Failed to fetch announcement:', error);
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
            transition={{ duration: 0.5, delay: 0 }}
        >
            <div className={`text-primary uppercase w-fit font-bold text-xl pb-2 pr-5 border-b-4 border-primary`}>Pengumuman</div>
            <div className="grid gap-3 mt-4">
                {dataAnnouncement && dataAnnouncement.map((item: AnnoucementResponse, index: number) => {
                    const desc: any = item.desc
                    const truncatedString = desc.slice(0, 150) + " ...";
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
                })}
                <Link href={''} className='hover:underline active:scale-95 duration-200  text-left'>Pengumuman Lainnya {`>>>`}</Link>
            </div>
        </motion.div>
    )
}

export default SectionPengumuman