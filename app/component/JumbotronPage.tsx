import Image from 'next/image'
import React, { useContext } from 'react'
import rs from "../../public/hospital.webp";
import { BaseContext } from '../context/BaseContext';
import tronPage from "../../public/tron-page.jpg";

const JumbotronPage = ({ title }: { title: string }) => {

    return (
        <div className='overflow-hidden flex justify-center items-center'>
            <div className={`absolute text-white translate-y-10`}>
                <div className="lg:md:text-[60px] text-[30px] font-bold uppercase">
                    {title}
                </div>
            </div>
            <Image
                src={tronPage}
                alt="Picture of the author"
                className='object-cover w-full lg:md:h-[30vh] h-[30vh]'
            />
        </div>
    )
}

export default JumbotronPage