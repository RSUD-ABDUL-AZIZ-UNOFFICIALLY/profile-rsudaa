'use client'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import moment from 'moment'
import { ActivityResponse } from '@/app/Model/activity.model';
import { BaseContext } from '@/app/context/BaseContext';
import ModalKegiatan from '@/app/component/ModalKegiatan';
require('moment/locale/id');
moment.locale('id');

const Kegiatan = () => {
    const [Data, setData] = useState<ActivityResponse[]>()
    const [numberData, setNumberData] = useState<number>(3)
    const [maxNumberData, setMaxNumberData] = useState<number>(0)
    const [loadData, setLoadData] = useState<boolean>(false)

    const baseContext = useContext(BaseContext)

    const handleOpenModal = (item: ActivityResponse) => {
        baseContext.setModalActivityItem(item)
        baseContext.setModalActivity(true)
    }

    const API_URL = process.env.API_URL

    const getData = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/activity?data=${numberData}`)

            if (response.data.data) {
                setMaxNumberData(response.data.allRecord)
                setData(response.data.data.activity)
                setLoadData(false)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleNumberData = () => {
        setLoadData(true)
        setNumberData(numberData + 3)
    }


    useEffect(() => {
        getData()
    }, [numberData])
    return (
        <div className="bg-activity relative">
            <ModalKegiatan item={baseContext.modalActivityItem} />
            <div className="min-h-[30vh] bg-[#00000098] w-full flex p-4 justify-center items-center">
                <div className="lg:w-[70%] w-full">
                    <div className="text-center text-white text-xl uppercase font-semibold p-1 pr-5 pl-5 mb-4">Daftar Kegiatan</div>
                    <div className="grid lg:grid-cols-1 gap-4">

                        {/* Card */}
                        {Data ?
                            Data.map((item: ActivityResponse, index: number) => {
                                const desc: any = item.desc
                                const truncatedString = desc.slice(0, 200) + " ...";
                                return (
                                    <React.Fragment key={index}>
                                        <div className="card bg-[#000000a0] rounded-md overflow-hidden">
                                            <div className="grid grid-cols-2">
                                                <button onClick={() => handleOpenModal(item)} className=" overflow-hidden rounded-tr-3xl h-full">
                                                    <img src={`/page/default.jpg`} className='h-full object-cover active:scale-110 hover:scale-125 duration-200' alt="" />
                                                </button>
                                                <div className="p-2">
                                                    <div className="text-white font-semibold uppercase">{item.title}</div>
                                                    <div className="text-sm text-gray-400">{item.createdAt}</div>
                                                    <div className="p-3 text-gray-100 text-sm">{truncatedString}</div>
                                                    <button onClick={() => handleOpenModal(item)} className='hover:scale-105 active:scale-95 duration-200 text-warning'>
                                                        <div className="">Read More</div>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                )
                            })
                            :
                            <>
                            </>
                        }
                        {numberData < maxNumberData &&
                            <button onClick={() => handleNumberData()} className='btn bg-[#3d3d3d94]  btn-wide rounded-sm hover:bg-stone-950 border-none text-white flex justify-between'>
                                <div className="">Next</div>
                                <div className="">
                                    {loadData === true && <span className="loading loading-spinner loading-md text-white"></span>}
                                </div>
                            </button>
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Kegiatan