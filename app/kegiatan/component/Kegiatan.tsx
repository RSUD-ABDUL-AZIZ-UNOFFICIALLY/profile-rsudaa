'use client'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import moment from 'moment'
import { activityResponse } from '@/app/Model/activity.model';
import { BaseContext } from '@/app/context/BaseContext';
import ModalKegiatan from '@/app/component/ModalKegiatan';
require('moment/locale/id');
moment.locale('id');

const Kegiatan = () => {
    const [Data, setData] = useState<activityResponse[]>()
    const [numberData, setNumberData] = useState<number>(3)
    const [maxNumberData, setMaxNumberData] = useState<number>(0)
    const [loadData, setLoadData] = useState<boolean>(false)

    const baseContext = useContext(BaseContext)

    const handleOpenModal = (item: activityResponse) => {
        baseContext.setModalActivityItem(item)
        baseContext.setModalActivity(true)
    }

    const API_URL = process.env.API_URL

    const getData = async () => {
        try {
            const response = await axios.get(`${API_URL}/activity`)

            if (response.data.data) {
                setMaxNumberData(response.data.data.length)
                setData(response.data.data)
                setLoadData(false)
            }
        } catch (error) {
            //console.log(error);
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
        <div className="relative">
            <ModalKegiatan item={baseContext.modalActivityItem} />
            <div className="min-h-[30vh]  w-full flex p-4 justify-center items-center">
                <div className="lg:w-[70%] w-full">
                    <div className="text-center text-white text-xl uppercase font-semibold p-1 pr-5 pl-5 mb-4">Daftar Kegiatan</div>
                    <div className="grid lg:grid-cols-1 gap-4">

                        {/* Card */}
                        {Data ?
                            Data.map((item: activityResponse, index: number) => {
                                const desc: any = item.desc
                                const truncatedString = desc.slice(0, 200) + " ...";
                                return (
                                    <React.Fragment key={index}>
                                        <div className="card bg-slate-100 rounded-md overflow-hidden">
                                            <div className="grid grid-cols-2">
                                                <button onClick={() => handleOpenModal(item)} className=" overflow-hidden h-full">
                                                    <img src={item.images ? item.images : `/page/default.jpg`} className='h-full object-cover active:scale-110 hover:scale-125 duration-200' alt="" />
                                                </button>
                                                <div className="card-body">
                                                    <div className="font-bold text-2xl uppercase">{item.title}</div>
                                                    <div className="text-sm p-1 bg-primary rounded-sm w-fit text-white">{moment(item.createdAt).format('DD MMMM YYYY')}</div>
                                                    <div className="p-3 text-sm">{truncatedString}</div>
                                                    <div className="flex justify-end mt-4">
                                                        <button onClick={() => handleOpenModal(item)} className='btn btn-ghost'>
                                                            <div className="">...</div>
                                                        </button>
                                                    </div>
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