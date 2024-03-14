'use client'
import React from 'react'
import Image from 'next/image'
import skw from "../../public/skw.png";
import login from "../../public/login.jpg";
import wa from "../../public/icon/whatsapp.svg";
import { useRouter } from 'next/navigation';

const SectionLogin = () => {
    const router: any = useRouter()
    const navigate = () => {
        router.push('/admin-rsaa')
    }
    return (
        <div className='lg:md:w-[50vw] w-[90vw]'>
            <div className="grid lg:grid-cols-2 gap-2">
                <div className="grid gap-4 p-4">
                    <div className="flex justify-center items-center">
                        <div className="rounded-full shadow-lg h-24 w-24 p-3">
                            <Image
                                src={skw}
                                alt="Picture of the author"
                                className='object-cover'
                            />
                        </div>
                    </div>
                    <div className="text-center font-bold text-midDark text-3xl mt-3 mb-3">RSUD dr Abdul Aziz</div>
                    <div className="flex gap-2">
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        <button className="button rounded-lg button-midDark min-w-20 max-w-36 text-white">Get OTP</button>
                    </div>
                    <div className="flex gap-2">
                        {/* <Input type="number" min={0} label="WhatsApp OTP" placeholder="Enter your whatsapp OTP" /> */}
                    </div>
                    <hr className='mt-4 mb-4' />
                    <button onClick={() => navigate()} className="button button-midDark text-white uppercase font-bold">
                        Login
                    </button>
                    <div className="mt-3 text-center">
                        <small className='text-neutral-400'>Copyright © 2024 RSUD dr. ABDUL AZIZ</small>
                    </div>
                </div>
                <div className="relative justify-center items-center p-4 lg:flex hidden">
                    <div className="absolute bg-primary rounded-[20px] h-[110%] w-[90%] overflow-hidden">
                        {/* <Image
                            src={login}
                            alt="Picture of the author"
                            className='object-cover h-full'
                        /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SectionLogin