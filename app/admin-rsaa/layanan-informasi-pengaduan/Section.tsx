'use client'
import React from 'react'
import FormLIP from './FormLIP'
import FormUpdateImage from './FormUpdateImage'

const Section = () => {
    return (
        <div className='p-5'>
            <div className="rounded-xl shadow-md w-full">
                <div className="card-body">
                    {/* <div className="uppercase font-bold text-2xl">
                        Halaman Struktur Organisasi 
                    </div> */}
                    <div className="grid lg:grid-cols-2 gap-3">
                        <div className="">
                            <FormLIP />
                        </div>
                        <div className="">
                            <FormUpdateImage />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Section