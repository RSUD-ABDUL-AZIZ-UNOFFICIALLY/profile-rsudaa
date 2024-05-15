'use client'
import Image from 'next/image'
import React from 'react'
import reportIcon from "../../public/icon/report.png";
import { useRouter } from 'next/navigation';

const Section = () => {
    const navigation = useRouter()

    const handleNavigation = (e: string) => {
        navigation.push(`laporan-tahunan/${e}`)
    }
    return (
        <div className='flex justify-center p-2'>
            <div className="lg:w-[60%] p-2">
                <div className="flex justify-center">
                    <Image alt='report-icon' src={reportIcon} className='h-64 w-fit' />
                </div>
                <div className="text-center text-lg">
                    <span className="p-1 bg-primary text-white rounded-sm m-1">Laporan Tahunan RSUD dr Abdul Aziz </span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam excepturi eos hic est, ea suscipit reiciendis rerum perferendis facilis quasi assumenda asperiores maxime vitae necessitatibus et doloremque alias similique quod ut. Suscipit reprehenderit id, aliquam alias blanditiis dolorum est! Eligendi doloremque corporis eos maiores nostrum atque distinctio reiciendis voluptates veniam quis, ex adipisci placeat quae harum suscipit rem nobis provident, architecto exercitationem itaque neque necessitatibus rerum! Suscipit minus eos corporis reprehenderit vero a dicta rerum, libero ad beatae accusantium eum consequatur eaque explicabo voluptatem at dolorum ex odit. Tempore reprehenderit inventore aspernatur voluptas possimus fugit quisquam ducimus vel aliquam. Vel!
                </div>
                <div className="flex-wrap flex justify-center gap-5 mt-4">
                    <button onClick={() => handleNavigation('/perjankin')} className="lg:w-[30%] w-[40%] shadow-lg text-xl p-3 rounded-lg uppercase font-bold hover:scale-105 active:scale-95 duration-200 aspect-video">
                        Perjankin
                    </button>
                    <button onClick={() => handleNavigation('/renaksi')} className="lg:w-[30%] w-[40%] shadow-lg text-xl p-3 rounded-lg uppercase font-bold hover:scale-105 active:scale-95 duration-200 aspect-video">
                        Renaksi
                    </button>
                    <button onClick={() => handleNavigation('/renja')} className="lg:w-[30%] w-[40%] shadow-lg text-xl p-3 rounded-lg uppercase font-bold hover:scale-105 active:scale-95 duration-200 aspect-video">
                        Renja
                    </button>
                    <button onClick={() => handleNavigation('/ikt')} className="lg:w-[30%] w-[40%] shadow-lg text-xl p-3 rounded-lg uppercase font-bold hover:scale-105 active:scale-95 duration-200 aspect-video">
                        IKT
                    </button>
                    <button onClick={() => handleNavigation('/hasil-survei')} className="lg:w-[30%] w-[40%] shadow-lg text-xl p-3 rounded-lg uppercase font-bold hover:scale-105 active:scale-95 duration-200 aspect-video">
                        Hasil Survei
                    </button>
                    <button onClick={() => handleNavigation('/hasil-ikm')} className="lg:w-[30%] w-[40%] shadow-lg text-xl p-3 rounded-lg uppercase font-bold hover:scale-105 active:scale-95 duration-200 aspect-video">
                        Hasil IKM
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Section