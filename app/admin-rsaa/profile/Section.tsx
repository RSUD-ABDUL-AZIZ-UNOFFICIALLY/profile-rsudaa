'use client'
import React from 'react'
import FormAboutUs from './FormAboutUs'
import FormVisi from './FormVisi'
import FormMisi from './FormMisi'
import FormHistory from './FormHistory'

const Section = () => {
    return (
        <div className='p-5'>
            <div className="rounded-xl shadow-md w-full">
                <div className="card-body">
                    <div className="">
                        <div className="grid lg:grid-cols-3 gap-3">
                            <FormAboutUs />
                            <FormVisi />
                            <FormMisi />
                            <FormHistory />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Section