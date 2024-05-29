'use client'
import React from 'react'

import FormUpdateImage from './FormUpdateImage'
import FormMaklumatPelayanan from './FormMaklumatPelayanan'
import FileMaklumatPelayanan from './FileMaklumatPelayanan'

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
                            <FormMaklumatPelayanan />
                        </div>
                        <div className="">
                            <FormUpdateImage />
                        </div>
                        <div className="lg:col-span-2">
                            <FileMaklumatPelayanan />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Section