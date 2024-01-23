import Image from 'next/image'
import React, { useContext } from 'react'
import rs from "../../public/hospital.webp";
import { BaseContext } from '../context/BaseContext';

const Jumbotron = () => {

    return (
        <div className='overflow-hidden flex justify-center items-center'>
            <div className={`absolute text-white translate-y-10`}>
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
            </div>
            <img className='object-cover w-full lg:md:h-full h-[60vh]' src="/tron.jpg" alt="" />
        </div>
    )
}

export default Jumbotron