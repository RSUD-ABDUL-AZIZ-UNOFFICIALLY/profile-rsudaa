'use client'
import Image from 'next/image'
import React from 'react'
import call from "../../public/icon/call.svg";
import mail from "../../public/icon/mail.svg";
import fb from "../../public/icon/facebook.svg";
import ig from "../../public/icon/instagram.svg";
import skw from "../../public/skw.png";
const Footer = () => {
    return (
        <div className='foot-bar grid lg:grid-cols-2 gap-2 lg:md:mt-[20px]'>
            <div className="foot-bar-item">
                {/* <div className="head">Kontak kami</div> */}
                <div className="body">
                    <div className="mt-2 grid gap-2">
                        <div className="flex items-center">
                            <button className="button-circle button-dark ">
                                <Image
                                    src={call}
                                    alt="Picture of the author"
                                    className='h-[20px] w-auto icon'
                                />
                            </button>
                            <div className="ml-2">(0562) 631798</div>
                        </div>
                        <div className="flex items-center">
                            <button className="button-circle button-dark ">
                                <Image
                                    src={mail}
                                    alt="Picture of the author"
                                    className='h-[20px] w-auto icon'
                                />
                            </button>
                            <div className="ml-2">rsudaa@singkawangkota.go.id</div>
                        </div>
                        <div className="flex items-center">
                            <button className="button-circle button-dark ">
                                <Image
                                    src={fb}
                                    alt="Picture of the author"
                                    className='h-[20px] w-auto icon'
                                />
                            </button>
                            <div className="ml-2">(0562) 631798</div>
                        </div>
                        <div className="flex items-center">
                            <button className="button-circle button-dark ">
                                <Image
                                    src={ig}
                                    alt="Picture of the author"
                                    className='h-[20px] w-auto icon'
                                />
                            </button>
                            <div className="ml-2">(0562) 631798</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="lg:md:col-span-2">
                <hr />
                <div className="p-2 text-center">
                    Copyright © 2024 RSUD dr. ABDUL AZIZ
                </div>
            </div>
        </div>
    )
}

export default Footer