'use client'
import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import item from "../../public/hospital.webp";
import { motion, useInView, useAnimation } from "framer-motion"
const SectionHomeKegiatan = () => {
    const date = new Date()
    const today = `${date.getDate()} ${date.getMonth() + 1} ${date.getFullYear()}`

    const motionRef = useRef(null)
    const isInView = useInView(motionRef, { once: true })
    const mainControls = useAnimation()

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible")
        }
    }, [isInView])
    return (
        <>
            <motion.div
                className="grid gap-4"
                ref={motionRef}
                variants={{
                    hidden: { opacity: 0, y: 75 },
                    visible: { opacity: 1, y: 0 }
                }}
                initial="hidden"
                animate={mainControls}
                transition={{ duration: 0.5, delay: 0 }}
            >
                <div className='grid lg:md:grid-cols-10'>
                    <div className="col-span-5 overflow-hidden">
                        <Image
                            src={item}
                            alt="Picture of the author"
                            sizes='100%'
                            style={{
                                objectFit: 'cover', // cover, contain, none
                            }}
                        />
                    </div>
                    <div className="col-span-5 lg:md:pl-3 lg:md:pr-3 text-black h-full">
                        <div className="flex items-center gap-2">
                            <div className="lg:md:text-3xl text-xl font-bold ">Lorem ipsum dolor sit amet </div>
                        </div>
                        <div className="bg-yellow-400 p-2 text-xs w-fit rounded-sm">{today}</div>
                        <div className="text-justify p-3 overflow-hidden">Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero commodi, provident officia ea ut quam eum est, officiis amet doloribus atque dolores quaerat facere et debitis repellat ad autem minus odio, magnam unde consequatur suscipit corporis? Vitae nam repellat cupiditate quo minus, ut distinctio sint omnis beatae assumenda et nemo id pariatur eveniet eligendi impedit voluptatibus eos! </div>
                        <button className="btn btn-primary text-white mt-2">Read more</button>
                    </div>
                </div>
                <div className='grid lg:md:grid-cols-10'>
                    <div className="col-span-5 overflow-hidden">
                        <Image
                            src={item}
                            alt="Picture of the author"
                            sizes='100%'
                            style={{
                                objectFit: 'cover', // cover, contain, none
                            }}
                        />
                    </div>
                    <div className="col-span-5 lg:md:pl-3 lg:md:pr-3 text-black h-full">
                        <div className="flex items-center gap-2 sm:mt-2">
                            <div className="lg:md:text-3xl text-xl font-bold ">Lorem ipsum dolor sit amet </div>
                        </div>
                        <div className="bg-yellow-400 p-2 text-xs w-fit rounded-sm">{today}</div>
                        <div className="text-justify p-3 overflow-hidden">Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero commodi, provident officia ea ut quam eum est, officiis amet doloribus atque dolores quaerat facere et debitis repellat ad autem minus odio, magnam unde consequatur suscipit corporis? Vitae nam repellat cupiditate quo minus, ut distinctio sint omnis beatae assumenda et nemo id pariatur eveniet eligendi impedit voluptatibus eos! </div>
                        <button className="btn btn-primary text-white mt-2">Read more</button>
                    </div>
                </div>
            </motion.div>
        </>
    )
}

export default SectionHomeKegiatan