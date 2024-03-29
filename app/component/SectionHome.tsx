'use client'
import React, { useContext, useRef, useEffect } from 'react'
import { BaseContext } from '../context/BaseContext'
import SectionHomeKegiatan from './SectionHomeKegiatan'
import SectionHomePelayananPublic from './SectionHomePelayananPublic'
import SectionHomeDaftarDokter from './SectionHomeDaftarDokter'
import { motion, useInView, useAnimation } from "framer-motion"
const SectionHome = () => {
    const base: any = useContext(BaseContext)
    const color = base.color

    const motionRef = useRef(null)
    const motionRefPengumuman = useRef(null)
    const isInView = useInView(motionRef, { once: true })
    const isInViewPengumuman = useInView(motionRefPengumuman, { once: true })
    const mainControls = useAnimation()
    const mainControlsPengumuman = useAnimation()

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible")
        }
        if (isInViewPengumuman) {
            mainControlsPengumuman.start("visible")
        }
    }, [isInView, isInViewPengumuman])
    return (
        <React.Fragment>
            <div className='section'>
                <div className="item-section">
                    <div className="grid lg:md:grid-cols-10 lg:md:gap-4 h-full">
                        <motion.div
                            className="lg:md:col-span-7 bg-white p-4"
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
                            {/* <div className="uppercase flex justify-center mt-10 mb-10 text-center">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                            </div> */}
                            <SectionHomeKegiatan />
                        </motion.div>
                        <motion.div
                            className="lg:md:col-span-3 bg-info p-4"
                            ref={motionRefPengumuman}
                            variants={{
                                hidden: { opacity: 0, x: 200 },
                                visible: { opacity: 1, x: 0 }
                            }}
                            initial="hidden"
                            animate={mainControlsPengumuman}
                            transition={{ duration: 0.5, delay: 0 }}
                        >
                            <div className={`text-midDark uppercase w-fit font-bold text-3xl pb-2 pr-5 border-b-8 border-midDark`}>Pengumuman</div>
                        </motion.div>
                    </div>
                </div>
            </div>
            <motion.div
                className='section'
                variants={{
                    hidden: { opacity: 0, y: 200 },
                    visible: { opacity: 1, y: 0 }
                }}
                initial="hidden"
                animate={mainControls}
                transition={{ duration: 0.5, delay: 0 }}
            >
                <div className="item-section ">
                    <div className="grid lg:md:grid-cols-10 lg:md:gap-4 h-full">
                        <div className="lg:md:col-span-10 bg-white p-4">
                            <div className="flex justify-right">
                                <div className={`text-primary uppercase w-fit font-bold text-3xl pb-2 pr-5 border-b-8 border-primary`}>Pelayanan Publik</div>
                            </div>
                            {/* <div className="uppercase flex justify-center mt-10 mb-10 text-center">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                            </div> */}
                            <SectionHomePelayananPublic />
                        </div>
                    </div>
                </div>
            </motion.div>
            <div className='section'>
                <div className="item-section">
                    <div className="grid lg:grid-cols-10 lg:md:gap-4 h-full">
                        <div className="lg:md:col-span-10 bg-white p-4">
                            <div className="flex justify-center">
                                <div className={`text-primary uppercase w-fit font-bold text-3xl pb-2 pr-2 pl-2 border-b-8 border-primary`}>Dokter Kami</div>
                            </div>
                            {/* <div className="uppercase flex justify-center mt-10 mb-10 text-center">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                            </div> */}
                            <SectionHomeDaftarDokter />
                            {/* <SectionHomePelayananPublic /> */}
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}

export default SectionHome