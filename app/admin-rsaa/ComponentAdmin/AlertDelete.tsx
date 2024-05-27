'use client'
import Image from 'next/image'
import React from 'react'
import success from "../../../public/icon/success.gif";

interface props {
    title: string
}

const AlertDelete = () => {
    return (
        <div className='fixed top-0 left-0 w-screen h-screen z-50 flex justify-center items-center bg-[#000000b6]'>
            <div className="bg-white p-4 rounded-lg">
                <div className="flex justify-center">
                    <Image alt='' src={success} className='h-28 w-fit ' />
                </div>
                <div className="font-bold uppercase text-red-500">
                    <div className="">
                        {`Delete Data Successfully`}
                    </div>
                    <div className="text-center mt-4">
                        <span className="loading loading-dots loading-md"></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AlertDelete