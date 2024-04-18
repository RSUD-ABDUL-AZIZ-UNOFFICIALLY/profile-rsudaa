'use client'
import React, { useEffect, useState } from 'react'
import { ProfileResponse } from '@/app/Model/profile.model'
import axios from 'axios'

const History = () => {
    const [History, setHistory] = useState<ProfileResponse>()
    const getHistory = async () => {
        try {
            const data = await axios.get('http://localhost:4444/api/profile/history')

            if (data.data.data) {
                setHistory(data.data.data)
            }

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getHistory()
    }, [History])
    return (
        <div className='lg:pl-32 lg:pr-32 lg:p-5 md:pl-15 md:pr-15 md:p-3 p-2 flex justify-center'>
            <div className="lg:grid lg:grid-cols-5 gap-2 lg:w-[80%]">
                <div className="col-span-4 grid items-center ">
                    <div className="">
                        <div className="uppercase text-2xl font-bold text-primary">History</div>
                        <div className="min-h-full flex items-center p-4 text-justify">
                            {History ?
                                <div className='text-sm'>
                                    {History.desc}
                                </div>
                                :
                                <div className="flex justify-center">
                                    <span className="loading loading-dots loading-xs"></span>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="col-span-1 rounded-l-3xl rounded-r-md  min-h-[40vh] bg-cover bg-center bg-[url('https://www.beaconhospital.com.my/wp-content/uploads/2022/06/Beacon-Hospital-New.jpg.webp')]">
                    {/* <img src="" alt="" /> */}
                </div>
            </div>
        </div>
    )
}

export default History