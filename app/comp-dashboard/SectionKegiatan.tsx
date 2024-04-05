'use client'
import React, { useContext, useRef, useEffect, useCallback, useState } from 'react'
import { motion, useInView, useAnimation } from "framer-motion"
import axios, { AxiosResponse } from 'axios'
import { ActivityResponse } from '../Model/activity.model'
import itemImage from "../../public/hospital.webp";
import Image from 'next/image'
import moment from 'moment'
import Link from 'next/link'
require('moment/locale/id');
moment.locale('id');

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
            const res: AxiosResponse<any> = await axios.get(`http://localhost:4444/api/activity?data=3`);

            const responseData: ActivityResponse[] = res.data.data.activity;

            if (responseData) {
                setDataActivity(responseData);
            }

        } catch (error) {
            console.error('Failed to fetch activity:', error);
        }
    }, [dataActivity]);

    const [tab, setTab] = useState<string>('kegiatan')

    const handleTab = (e: string) => {
        setTab(e)
    }

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

            <div role="tablist" className="tabs tabs-lifted">
                <input type="radio" name="my_tabs_2" role="tab" className={`tab  uppercase ${tab === 'kegiatan' ? `text-primary font-bold text-2xl` : `text-sm`}`} aria-label="Kegiatan" onChange={() => handleTab('kegiatan')} checked={tab === 'kegiatan' ? true : false} />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                    <motion.div
                        className="grid lg:md:gap-6 gap-4"
                        ref={motionRefItem}
                        variants={{
                            hidden: { opacity: 0, y: 75 },
                            visible: { opacity: 1, y: 0 }
                        }}
                        initial="hidden"
                        animate={mainControlsItem}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        {dataActivity ?
                            <>
                                {dataActivity.map((item: ActivityResponse, index: number) => {
                                    const desc: any = item.desc
                                    const shortString = desc.split(" ").slice(0, 50).join(" "); // Ambil 100 kata pertama

                                    const truncatedString = desc.slice(0, 250) + " ...";
                                    // const truncatedString = shortString + "..."; // Tambahkan "---" di belakangnya
                                    return (
                                        <div key={index} className='grid lg:md:grid-cols-10 gap-1'>
                                            <div className="col-span-4 overflow-hidden">
                                                <Image src={itemImage} alt="Picture of the author" sizes='100%' style={{ objectFit: 'cover' }} />
                                            </div>
                                            <div className="col-span-6 lg:md:pl-3 lg:md:pr-3 text-black h-full">
                                                <div className="lg:md:text-xl text-xl font-bold uppercase">{item.title}</div>
                                                <div className="bg-yellow-400 p-1 text-xs w-fit rounded-sm">
                                                    {moment(item.createdAt).format('HH:MM')} - <span> {moment(item.createdAt).format('DD MMMM YYYY')}</span>
                                                </div>
                                                <div className="text-justify p-3 overflow-hidden">{truncatedString}</div>
                                                <button className="button button-primary text-white mt-2 w-fit">Read more</button>
                                            </div>
                                        </div>
                                    )
                                })}
                                <Link href={''} className='hover:underline active:scale-95 duration-200  text-left mt-4'>Semua Kegiatan {`>>>`}</Link>
                            </>

                            :
                            <>
                                <span className="loading loading-spinner loading-lg"></span>
                            </>

                        }
                    </motion.div>
                </div>

                <input type="radio" name="my_tabs_2" role="tab" className={`tab  uppercase ${tab === 'artikel' ? `text-primary font-bold text-2xl` : `text-sm`}`} aria-label="Artikel" onChange={() => handleTab('artikel')} checked={tab === 'artikel' ? true : false} />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">Tab content 2</div>
            </div>
        </motion.div>
    )
}

export default SectionKegiatan