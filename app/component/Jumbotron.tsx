import Image from 'next/image'
import React, { useContext, useEffect, useRef } from 'react'
import { motion, useInView, useAnimation } from "framer-motion"
const Jumbotron = () => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })
    const mainControls = useAnimation()
    useEffect(() => {
        if (isInView) {
            mainControls.start(`visible`)
        }
    }, [isInView])
    return (
        <div ref={ref} className="">
            <div className='overflow-hidden flex justify-center items-center'>
                <div className={`absolute text-white translate-y-10`}>
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 75 },
                            visible: { opacity: 1, y: 0 }
                        }}
                        initial="hidden"
                        animate={`visible`}
                        transition={{ duration: 0.5, delay: 0.25 }}
                    >
                        <div className="lg:md:text-[60px] text-[30px] font-bold uppercase">
                            SELAMAT DATANG di <br /> website <span className='text-info'>pelayanan</span>
                        </div>
                        <div className="flex">
                            <div className="lg:md:text-[40px] text-[20px] text-white p-2 bg-primary font-bold uppercase w-fit ">
                                RSUD dr Abdul Aziz
                            </div>
                        </div>
                        <div className="flex">
                            <div className="lg:md:text-[20px] font-bold uppercase bg-warning p-2 text-dark">
                                Kota Singkawang
                            </div>
                        </div>
                    </motion.div>
                </div>
                <img className='object-cover w-full lg:md:h-full h-[60vh]' src="/tron.jpg" alt="" />
            </div>
        </div >
    )
}

export default Jumbotron