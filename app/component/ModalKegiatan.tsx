'use client'
import React, { useContext } from 'react'
import { activityResponse } from '../Model/activity.model';
import { BaseContext } from '../context/BaseContext';
import moment from 'moment';
require('moment/locale/id');
moment.locale('id');

interface props {
    item: activityResponse
}


const ModalKegiatan: React.FC<props> = ({ item }) => {
    const baseContext = useContext(BaseContext)

    const nullData: activityResponse = {
        id: 0,
        activityID: '',
        desc: '',
        title: '',
        images: '',
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
                        <div className="mb-4">
                            <img src={item.images ? item.images : '/page/default.jpg'} alt="Picture of the author" sizes='100%' className='object-cover lg:w-[50%] w-full' />
                        </div>
                        <div className="text-white font-bold text-2xl">{item.title}</div>
                        <div className="text-white text-xl">{moment(item.createdAt).format(`DD MMMM YYYY`)}</div>
                        <div className="font-thin text-slate-200 p-4">{item.desc}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalKegiatan