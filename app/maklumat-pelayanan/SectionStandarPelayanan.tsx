'use client'
import React, { useEffect, useRef, useState } from 'react'
import { maklumatPelayananResponse } from '../Model/maklumatPelayanan.model'
import { motion, useInView, useAnimation } from "framer-motion"
import axios from 'axios'

const SectionStandarPelayanan = () => {
    const motionRef = useRef(null)
    const isInView = useInView(motionRef, { once: true })
    const mainControls = useAnimation()

    const [data, setData] = useState<maklumatPelayananResponse[]>([])
    const API_URL = process.env.API_URL

    const getData = async () => {
        try {
            const response = await axios.get(`${API_URL}/maklumat-pelayanan`)

            if (response.data.success == true) {
                setData(response.data.data)
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        getData()
        if (isInView) {
            mainControls.start("visible")
        }
    }, [isInView])
    return (
        <div className="flex justify-center">
            <div className="p-4 lg:w-[90%]">
                <div className={`text-primary uppercase w-fit font-bold text-xl pb-2 pr-5 border-b-4 border-primary mb-4`}>Standar Pelayanan</div>
                <motion.div
                    className="carousel rounded-box w-fit"
                    ref={motionRef}
                    variants={{
                        hidden: { opacity: 0, x: 200 },
                        visible: { opacity: 1, x: 0 }
                    }}
                    initial="hidden"
                    animate={mainControls}
                    transition={{ duration: 1.5, delay: 0 }}
                >
                    {data && data.length > 0 && data.map((item: maklumatPelayananResponse, index: number) => {
                        return (
                            <div className="carousel-item" key={index}>
                                <img src={item.file} alt="Maklumat-pelayanan" className={`lg:w-72 w-72 ${index < data.length - 1 && 'mr-1'} object-cover`} />
                            </div>
                        )
                    })}
                </motion.div>
            </div>
        </div>
    )
}

export default SectionStandarPelayanan