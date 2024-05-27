'use client'
import React from 'react'
import Form from './Form'
import FormLink from './FormLink'

const Section = () => {
    return (
        <div className='p-5'>
            <div className="rounded-xl shadow-md w-full">
                <div className="card-body">
                    <div className="grid lg:grid-cols-2 gap-3">
                        <div className="">
                            <Form />
                        </div>
                        <div className="">
                            <FormLink />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Section