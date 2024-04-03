'use client'
import React, { useContext, useRef, useEffect, useCallback, useState } from 'react'
import { motion, useInView, useAnimation } from "framer-motion"
import axios, { AxiosResponse } from 'axios'
import { ActivityResponse } from '../Model/activity.model'
import itemImage from "../../public/hospital.webp";
import Image from 'next/image'

const SectionKegiatan = () => {
    const motionRef = useRef(null)
    const motionRefItem = useRef(null)
    const isInView = useInView(motionRef, { once: true })
    const isInViewItem = useInView(motionRefItem, { once: true })
    const mainControls = useAnimation()
    const mainControlsItem = useAnimation()

    const [dataActivity, setDataActivity] = useState<ActivityResponse[]>()

    const getActivity = useCallback(async () => {
        try {
            const res: AxiosResponse<any> = await axios.get(`http://localhost:4444/api/activity?data=2`);

            const responseData: ActivityResponse[] = res.data.data.activity;

            if (responseData) {
                setDataActivity(responseData);
            }

        } catch (error) {
            console.error('Failed to fetch activity:', error);
        }
    }, [dataActivity]);

    useEffect(() => {
        getActivity()
        if (isInView) {
            mainControls.start("visible")
        }
        if (isInViewItem) {
            mainControlsItem.start("visible")
        }
    }, [isInView, isInViewItem])
    return (
        <motion.div
            className=" bg-white p-4"
            ref={motionRef}
            variants={{
                hidden: { opacity: 0, x: -200 },
                visible: { opacity: 1, x: 0 }
            }}
            initial="hidden"
            animate={mainControls}
            transition={{ duration: 0.5, delay: 0 }}
        >
            <div className="flex justify-between mb-10">
                <div className={`text-primary uppercase w-fit font-bold text-3xl pb-2 pr-5 border-b-8 border-primary`}>Kegiatan</div>
                <button className="button button-transparant">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>

            <motion.div
                className="grid gap-4"
                ref={motionRefItem}
                variants={{
                    hidden: { opacity: 0, y: 75 },
                    visible: { opacity: 1, y: 0 }
                }}
                initial="hidden"
                animate={mainControlsItem}
                transition={{ duration: 0.5, delay: 0.5 }}
            >
                {dataActivity && dataActivity.map((item: ActivityResponse, index: number) => {
                    const desc: any = item.desc
                    const shortString = desc.split(" ").slice(0, 50).join(" "); // Ambil 100 kata pertama

                    const truncatedString = desc.slice(0, 250) + " ...";
                    // const truncatedString = shortString + "..."; // Tambahkan "---" di belakangnya
                    return (
                        <div key={index} className='grid lg:md:grid-cols-10 gap-1'>
                            <div className="col-span-5 overflow-hidden">
                                <Image src={itemImage} alt="Picture of the author" sizes='100%' style={{ objectFit: 'cover' }} />
                            </div>
                            <div className="col-span-5 lg:md:pl-3 lg:md:pr-3 text-black h-full">
                                <div className="lg:md:text-3xl text-xl font-bold ">{item.title}</div>
                                <div className="bg-yellow-400 p-2 text-xs w-fit rounded-sm">{item.createdAt}</div>
                                <div className="text-justify p-3 overflow-hidden">{truncatedString}</div>
                                <button className="button button-primary text-white mt-2 w-fit">Read more</button>
                            </div>
                        </div>
                    )
                })}
            </motion.div>
        </motion.div>
    )
}

export default SectionKegiatan