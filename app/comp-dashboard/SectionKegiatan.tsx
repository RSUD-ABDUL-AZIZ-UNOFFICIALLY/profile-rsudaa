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
import ModalKegiatan from '../component/ModalKegiatan'
import { BaseContext } from '../context/BaseContext'
import ModalArticle from '../component/ModalArticle'
import { useRouter } from 'next/navigation'
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

    const baseContext = useContext(BaseContext)

    const [dataActivity, setDataActivity] = useState<ActivityResponse[]>()
    const [dataArticle, setDataArticle] = useState<ArticleResponse[]>()

    const API_URL = process.env.API_URL

    const getActivity = useCallback(async () => {
        try {
            const res: AxiosResponse<any> = await axios.get(`${API_URL}/api/activity?data=2`);

            const responseData: ActivityResponse[] = res.data.data.activity;

            if (responseData) {
                setDataActivity(responseData);
            }

        } catch (error) {
            console.error('Failed to fetch activity:', error);
        }
    }, [dataActivity]);

    const handleActivityModal = (item: ActivityResponse) => {
        baseContext.setModalActivity(true)
        baseContext.setModalActivityItem(item)
    }

    const handleArticleModal = (item: ArticleResponse) => {
        baseContext.setModalArticle(true)
        baseContext.setModalArticleItem(item)
    }

    const getArticle = useCallback(async () => {
        try {
            const res: AxiosResponse<any> = await axios.get(`${API_URL}/api/article?data=2`);

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

    const router = useRouter()
    const handleNavigation = (e: string) => {
        router.push(e)
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

            <ModalKegiatan item={baseContext.modalActivityItem} />
            <ModalArticle item={baseContext.modalArticleItem} />
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
                                            <div className="lg:col-span-4 overflow-hidden">
                                                <Image src={itemImage} alt="Picture of the author" sizes='100%' style={{ objectFit: 'cover' }} />
                                            </div>
                                            <div className="lg:col-span-6 lg:md:pl-3 lg:md:pr-3 text-black h-full">
                                                <div className="lg:md:text-xl text-xl font-bold uppercase">{item.title}</div>
                                                <div className="text-primary text-xs w-fit rounded-sm">
                                                    {moment(item.createdAt).format('HH:mm DD MMMM YYYY')}
                                                </div>
                                                <div className="text-justify p-3 overflow-hidden">{truncatedString}</div>
                                                <button onClick={() => handleActivityModal(item)} className='hover:scale-105 active:scale-95 duration-200 text-primary text-2xl'>...</button>
                                            </div>
                                        </div>
                                    )
                                })}
                                <button onClick={() => handleNavigation('/kegiatan')} className='btn btn-ghost hover:bg-transparent hover:scale-105 hover:underline active:scale-95 duration-200 text-left mt-4 w-fit rounded-none'>Semua Kegiatan {`>`}</button>
                            </>

                            :
                            <>
                                {/* <span className="loading loading-spinner loading-lg"></span> */}

                                <div className="flex items-center gap-4 w-full">
                                    <div className="skeleton w-56 h-32 "></div>
                                    <div className="flex flex-col gap-4 w-full ">
                                        <div className="skeleton h-4 w-28"></div>
                                        <div className="skeleton h-4 w-full"></div>
                                        <div className="skeleton h-4 w-full"></div>
                                        <div className="skeleton h-4 w-full"></div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 w-full">
                                    <div className="skeleton w-56 h-32 "></div>
                                    <div className="flex flex-col gap-4 w-full ">
                                        <div className="skeleton h-4 w-28"></div>
                                        <div className="skeleton h-4 w-full"></div>
                                        <div className="skeleton h-4 w-full"></div>
                                        <div className="skeleton h-4 w-full"></div>
                                    </div>
                                </div>
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
                                            <div className="lg:col-span-4 overflow-hidden">
                                                <Image src={itemImage} alt="Picture of the author" sizes='100%' style={{ objectFit: 'cover' }} />
                                            </div>
                                            <div className="lg:col-span-6 lg:md:pl-3 lg:md:pr-3 text-black h-full">
                                                <div className="lg:md:text-xl text-xl font-bold uppercase">{item.title}</div>
                                                <div className="text-primary text-xs w-fit rounded-sm">
                                                    {moment(item.createdAt).format('HH:mm DD MMMM YYYY')}
                                                </div>
                                                <div className="text-justify p-3 overflow-hidden">{truncatedString}</div>
                                                <button onClick={() => handleArticleModal(item)} className='hover:scale-105 active:scale-95 duration-200 text-primary text-2xl'>...</button>
                                            </div>
                                        </div>
                                    )
                                })}
                                <button onClick={() => handleNavigation('/artikel')} className='btn btn-ghost hover:bg-transparent hover:scale-105 hover:underline active:scale-95 duration-200 text-left mt-4 w-fit rounded-none'>Semua Artikel {`>`}</button>
                            </>

                            :
                            <>
                                <div className="flex items-center gap-4 w-full">
                                    <div className="skeleton w-56 h-32 "></div>
                                    <div className="flex flex-col gap-4 w-full ">
                                        <div className="skeleton h-4 w-28"></div>
                                        <div className="skeleton h-4 w-full"></div>
                                        <div className="skeleton h-4 w-full"></div>
                                        <div className="skeleton h-4 w-full"></div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 w-full">
                                    <div className="skeleton w-56 h-32 "></div>
                                    <div className="flex flex-col gap-4 w-full ">
                                        <div className="skeleton h-4 w-28"></div>
                                        <div className="skeleton h-4 w-full"></div>
                                        <div className="skeleton h-4 w-full"></div>
                                        <div className="skeleton h-4 w-full"></div>
                                    </div>
                                </div>
                            </>

                        }
                    </motion.div>
                </div>
            </div>
        </motion.div >
    )
}

export default SectionKegiatan