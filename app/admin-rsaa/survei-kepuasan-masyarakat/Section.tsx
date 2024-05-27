'use client'
import React from 'react'
import FormSKM from './FormSKM'
import FormLinkSKM from './FormLinkSKM'




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
                            <FormSKM />
                        </div>
                        <div className="">
                            <FormLinkSKM />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Section