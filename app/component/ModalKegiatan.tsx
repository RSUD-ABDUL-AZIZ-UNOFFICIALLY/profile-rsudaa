'use client'
import React, { useContext } from 'react'
import { ActivityResponse } from '../Model/activity.model';
import { BaseContext } from '../context/BaseContext';
import moment from 'moment';
require('moment/locale/id');
moment.locale('id');

interface props {
    item: ActivityResponse
}


const ModalKegiatan: React.FC<props> = ({ item }) => {
    const baseContext = useContext(BaseContext)

    const nullData: ActivityResponse = {
        id: 0,
        activityID: '',
        desc: '',
        title: '',
        images: [],
        createdAt: '',
        updatedAt: '',
    }

    const handleCloseModal = () => {
        baseContext.setModalActivity(false)
        baseContext.setModalActivityItem(nullData)
    }

    if (baseContext.modalActivity === true) {
        return (
            <div className='fixed top-0 left-0 h-screen w-screen bg-[#000000de] flex justify-center z-50'>
                <div className="lg:w-[70%] w-[90%]">
                    <div className="flex justify-end">
                        <button onClick={handleCloseModal} className=' m-4 btn btn-ghost btn-circle text-white'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="">
                        <div className="carousel w-full">
                            <div id="item1" className="carousel-item w-full">
                                <img src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg" className="w-full" />
                            </div>
                            <div id="item2" className="carousel-item w-full">
                                <img src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg" className="w-full" />
                            </div>
                            <div id="item3" className="carousel-item w-full">
                                <img src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg" className="w-full" />
                            </div>
                            <div id="item4" className="carousel-item w-full">
                                <img src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg" className="w-full" />
                            </div>
                        </div>
                        <div className="flex justify-center w-full py-2 gap-2">
                            <a href="#item1" className="btn btn-xs">1</a>
                            <a href="#item2" className="btn btn-xs">2</a>
                            <a href="#item3" className="btn btn-xs">3</a>
                            <a href="#item4" className="btn btn-xs">4</a>
                        </div>
                        <div className="text-white font-bold text-2xl">{baseContext.modalActivityItem.title}</div>
                        <div className="text-white text-xl">{moment(baseContext.modalActivityItem.createdAt).format(`HH:mm DD MMMM YYYY`)}</div>
                        <div className="font-thin text-slate-200 p-4">{baseContext.modalActivityItem.desc}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalKegiatan