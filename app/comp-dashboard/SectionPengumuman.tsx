'use client'
import React, { useContext, useRef, useEffect, useCallback, useState } from 'react'
import { motion, useInView, useAnimation } from "framer-motion"

const SectionPengumuman = () => {
    const motionRef = useRef(null)
    const isInView = useInView(motionRef, { once: true })
    const mainControls = useAnimation()


    useEffect(() => {
        if (isInView) {
            mainControls.start("visible")
        }
    }, [isInView])
    return (
        <motion.div
            className="h-full bg-info p-4"
            ref={motionRef}
            variants={{
                hidden: { opacity: 0, x: 200 },
                visible: { opacity: 1, x: 0 }
            }}
            initial="hidden"
            animate={mainControls}
            transition={{ duration: 0.5, delay: 0 }}
        >
            <div className={`text-midDark uppercase w-fit font-bold text-3xl pb-2 pr-5 border-b-8 border-midDark`}>Pengumuman</div>
        </motion.div>
    )
}

export default SectionPengumuman