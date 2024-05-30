'use client'
import UnderMaintenance from '@/app/component/UnderMaintenance';
import { DasarHukumResponse } from '@/app/Model/dasarHukum.model';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Iframe from 'react-iframe';

interface Props {
    id: string;
}

const Section: React.FC<Props> = ({ id }) => {
    const API_URL = process.env.API_URL
    const [data, setData] = useState<DasarHukumResponse>()

    const getData = async () => {
        try {
            const response = await axios.get(`${API_URL}/dasar-hukum?id=${id}`)

            if (response.data.success == true) {
                setData(response.data.data)
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div>
            {/* <UnderMaintenance /> */}
            <div className="flex justify-center p-4">
                <div className="lg:w-[80%] w-[100%] ">
                    {data && data.file ?
                        <Iframe url={data.file}
                            id=""
                            className="w-full h-[80vh]"
                            // display="block"
                            // position="relative"
                            scrolling='no'
                            allowFullScreen
                        />
                        :
                        <>
                            <div className="flex justify-center items-center h-[20vh] uppercase font-bold">
                                <p>
                                    TIDAK ADA FILE DASAR HUKUM <span className='p-1 bg-yellow-400 rounded-sm'>{data?.name}</span>
                                </p>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default Section