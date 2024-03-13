'use client'
import React from 'react'
import call from "../../../public/icon/call.svg";
import mail from "../../../public/icon/mail.svg";
import fb from "../../../public/icon/facebook.svg";
import ig from "../../../public/icon/instagram.svg";
import skw from "../../../public/skw.png";
import Image from 'next/image';

const FormSocialMedia = () => {
    return (
        <div className="p-4 grid gap-2">
            <div className="flex rounded-md overflow-hidden items-center">
                <div className="p-3 bg-yellow-400 h-fit w-fit">
                    <Image
                        src={call}
                        alt="Picture of the author"
                        className='h-5 w-fit'
                    />
                </div>
                <input type="text" className='p-3 w-full border-none' />
            </div>
            <div className="flex rounded-md overflow-hidden items-center">
                <div className="p-3 bg-yellow-400 h-fit w-fit">
                    <Image
                        src={mail}
                        alt="Picture of the author"
                        className='h-5 w-fit'
                    />
                </div>
                <input type="text" className='p-3 w-full border-none' />
            </div>
            <div className="flex rounded-md overflow-hidden items-center">
                <div className="p-3 bg-yellow-400 h-fit w-fit">
                    <Image
                        src={fb}
                        alt="Picture of the author"
                        className='h-5 w-fit'
                    />
                </div>
                <input type="text" className='p-3 w-full border-none' />
            </div>
            <div className="flex rounded-md overflow-hidden items-center">
                <div className="p-3 bg-yellow-400 h-fit w-fit">
                    <Image
                        src={ig}
                        alt="Picture of the author"
                        className='h-5 w-fit'
                    />
                </div>
                <input type="text" className='p-3 w-full border-none' />
            </div>
            <hr className='mt-3 mb-3' />
            <button className="btn btn-dark text-white">
                Update
            </button>
        </div>
    )
}

export default FormSocialMedia