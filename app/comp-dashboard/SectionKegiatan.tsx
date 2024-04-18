'use client'
import React, { useContext, useRef, useEffect, useCallback, useState } from 'react'
import { motion, useInView, useAnimation } from "framer-motion"
import axios, { AxiosResponse } from 'axios'
import { ActivityResponse } from '../Model/activity.model'
import itemImage from "../../public/hospital.webp";
import Image from 'next/image'
import Link from 'next/link'
import { ArticleResponse } from '../Model/article.model'
import moment from 'moment'
require('moment/locale/id');
moment.locale('id');

const SectionKegiatan = () => {
    const motionRef = useRef(null)
    const motionRefItem = useRef(null)
    const motionRefArticle = useRef(null)
    const isInView = useInView(motionRef, { once: true })
    const isInViewItem = useInView(motionRefItem, { once: true })
    const isInViewArticle = useInView(motionRefArticle, { once: true })
    const mainControls = useAnimation()
    const mainControlsItem = useAnimation()
    const mainControlsArticle = useAnimation()

    const [dataActivity, setDataActivity] = useState<ActivityResponse[]>()
    const [dataArticle, setDataArticle] = useState<ArticleResponse[]>()

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

    const getArticle = useCallback(async () => {
        try {
            const res: AxiosResponse<any> = await axios.get(`http://localhost:4444/api/article?data=2`);

            const responseData: ArticleResponse[] = res.data.data.article;

            if (responseData) {
                setDataArticle(responseData);
            }

        } catch (error) {
            console.error('Failed to fetch activity:', error);
        }
    }, [dataArticle]);

    const [tab, setTab] = useState<string>('kegiatan')

    const handleTab = (e: string) => {
        setTab(e)
    }

    useEffect(() => {
        getActivity()
        getArticle()
        if (isInView) {
            mainControls.start("visible")
        }
        if (isInViewItem) {
            mainControlsItem.start("visible")
        }

        if (isInViewArticle) {
            mainControlsArticle.start("visible")
        }
    }, [isInView, isInViewItem, isInViewArticle])
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
                <input type="radio" name="my_tabs_2" role="tab" className={`tab  uppercase ${tab === 'kegiatan' ? `text-primary font-bold text-xl` : `text-sm`}`} aria-label="Kegiatan" onChange={() => handleTab('kegiatan')} checked={tab === 'kegiatan' ? true : false} />
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

                                    const truncatedString = desc.slice(0, 250) + "...";
                                    // const truncatedString = shortString + "..."; // Tambahkan "---" di belakangnya
                                    return (
                                        <div key={index} className='grid lg:md:grid-cols-10 gap-1'>
                                            <div className="col-span-4 overflow-hidden">
                                                <Image src={itemImage} alt="Picture of the author" sizes='100%' style={{ objectFit: 'cover' }} />
                                            </div>
                                            <div className="col-span-6 lg:md:pl-3 lg:md:pr-3 text-black h-full">
                                                <div className="lg:md:text-xl text-xl font-bold uppercase">{item.title}</div>
                                                <div className="text-primary text-xs w-fit rounded-sm">
                                                    {moment(item.createdAt).format('HH:MM')} - <span> {moment(item.createdAt).format('DD MMMM YYYY')}</span>
                                                </div>
                                                <div className="text-justify p-3 overflow-hidden">{truncatedString}</div>
                                                <Link className='hover:text-3xl active:text-xl duration-200 text-primary text-2xl' href={'#'}>...</Link>
                                                {/* <button className="button button-primary text-white mt-2 w-fit">Read more</button> */}
                                            </div>
                                        </div>
                                    )
                                })}
                                <Link href={'/kegiatan'} className='hover:underline active:scale-95 duration-200  text-left mt-4'>Semua Kegiatan {`>>>`}</Link>
                            </>

                            :
                            <>
                                <span className="loading loading-spinner loading-lg"></span>
                            </>

                        }
                    </motion.div>
                </div>

                <input type="radio" name="my_tabs_2" role="tab" className={`tab  uppercase ${tab === 'artikel' ? `text-primary font-bold text-xl` : `text-sm`}`} aria-label="Artikel" onChange={() => handleTab('artikel')} checked={tab === 'artikel' ? true : false} />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                    <motion.div
                        className="grid lg:md:gap-6 gap-4"
                        ref={motionRefArticle}
                        variants={{
                            hidden: { opacity: 0, y: 75 },
                            visible: { opacity: 1, y: 0 }
                        }}
                        initial="hidden"
                        animate={mainControlsArticle}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        {dataArticle ?
                            <>
                                {dataArticle.map((item: ArticleResponse, index: number) => {
                                    const desc: any = item.desc
                                    const shortString = desc.split(" ").slice(0, 50).join(" "); // Ambil 100 kata pertama

                                    const truncatedString = desc.slice(0, 250) + "...";
                                    // const truncatedString = shortString + "..."; // Tambahkan "---" di belakangnya
                                    return (
                                        <div key={index} className='grid lg:md:grid-cols-10 gap-1'>
                                            <div className="col-span-4 overflow-hidden">
                                                <Image src={itemImage} alt="Picture of the author" sizes='100%' style={{ objectFit: 'cover' }} />
                                            </div>
                                            <div className="col-span-6 lg:md:pl-3 lg:md:pr-3 text-black h-full">
                                                <div className="lg:md:text-xl text-xl font-bold uppercase">{item.title}</div>
                                                <div className="text-primary text-xs w-fit rounded-sm">
                                                    {moment(item.createdAt).format('HH:MM')} - <span> {moment(item.createdAt).format('DD MMMM YYYY')}</span>
                                                </div>
                                                <div className="text-justify p-3 overflow-hidden">{truncatedString}</div>
                                                <Link className='hover:text-3xl active:text-xl duration-200 text-primary text-2xl' href={'#'}>...</Link>
                                                {/* <button className="button button-primary text-white mt-2 w-fit">Read more</button> */}
                                            </div>
                                        </div>
                                    )
                                })}
                                <Link href={'/artikel'} className='hover:underline active:scale-95 duration-200  text-left mt-4'>Semua Artikel {`>>>`}</Link>
                            </>

                            :
                            <>
                                <span className="loading loading-spinner loading-lg"></span>
                            </>

                        }
                    </motion.div>
                </div>
            </div>
        </motion.div>
    )
}

export default SectionKegiatan