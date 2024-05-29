'use client'
import { LokerResponse } from '@/app/Model/loker.model';
import axios from 'axios';
import React, { FC, useEffect, useState } from 'react'
import FormApplyLoker from './FormApplyLoker';
import moment from 'moment';
require('moment/locale/id');
moment.locale('id');

interface Props {
    slug: string;
}

const Section: React.FC<Props> = ({ slug }) => {
    const [data, setData] = useState<LokerResponse>()
    const API_URL = process.env.API_URL
    const [apply, setApply] = useState<boolean>(false)
    const getData = async () => {
        try {
            const response = await axios.get(`${API_URL}/loker?id=${slug}`)
            if (response.data.data) {
                setData(response.data.data)
            }

        } catch (error) {

        }
    }

    useEffect(() => {
        getData()
    }, [])
    return (
        <div className='flex justify-center items-center p-4'>
            <div className=" p-3 rounded-sm shadow-sm lg:w-[70%] w-full">
                <div className="font-bold uppercase text-xl">
                    {data ? data.name : <><div className="skeleton rounded-sm h-4 w-[20%]"></div></>}
                </div>
                <div className="min-h-[30vh] flex justify-center items-center p-4">
                    {data ?
                        <>
                            <div className="">
                                <div className="font-thin">{data.desc}</div>
                                <div className="mt-3 grid gap-2">
                                    <ul> Tanggal Mulai : <span className='text-white p-1 bg-primary'>{moment(data.dateStart).format('DD MMMM YYYY')}</span></ul>
                                    <ul> Tanggal Berakhir : <span className='text-white p-1 bg-primary'>{moment(data.dateEnd).format('DD MMMM YYYY')}</span></ul>
                                </div>
                                {apply == false ? <button onClick={() => setApply(true)} className="btn btn-primary mt-4 rounded-sm">Apply</button> : <FormApplyLoker item={data} />}

                            </div>

                        </>
                        :
                        <>
                            <div className="grid w-full h-full gap-4">
                                <div className="skeleton rounded-sm h-4 w-[30%]"></div>
                                <div className="skeleton rounded-sm h-4 w-full"></div>
                                <div className="skeleton rounded-sm h-4 w-full"></div>
                                <div className="skeleton rounded-sm h-4 w-full"></div>
                                <div className="skeleton rounded-sm h-4 w-full"></div>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default Section