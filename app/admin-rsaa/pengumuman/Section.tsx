'use client'
import { AnnoucementResponse } from '@/app/Model/announcement.model'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import moment from 'moment';
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation';
import AlertDelete from '../ComponentAdmin/AlertDelete';
require('moment/locale/id');
moment.locale('id');

const Section = () => {
    const [data, setData] = useState<AnnoucementResponse[]>()
    const navigation = useRouter()
    const access_token = Cookies.get('access_token')
    const [deleteStatus, setDeleteStatus] = useState<boolean>(false)
    const [deleteSelect, setDeleteSelect] = useState<AnnoucementResponse | null>(null)

    const API_URL = process.env.API_URL
    const getData = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/announcement`)

            if (response.data.success == true) {
                setData(response.data.data)
            }
        } catch (error) {

        }
    }

    const handleDelete = async (announcementID: string) => {
        try {
            const response = await axios.delete(`${API_URL}/api/announcement/${announcementID}`, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })

            if (response.data.success === true) {
                setDeleteStatus(true)
                setDeleteSelect(null)
                getData()
                setTimeout(() => {
                    setDeleteStatus(false)
                }, 3000)
            }
        } catch (error) {
            console.log(error);

        }
    }

    const RenderAlertDelete = () => {
        if (deleteSelect) {
            return (
                <div className="fixed top-0 left-0 w-screen h-screen z-50 flex justify-center items-center bg-[#000000b6]">
                    <div className="bg-white p-4 rounded-lg">
                        <div className="font-bold uppercase text-red-500">
                            <div className="">
                                Yakin ingin menghapus data ?
                                <div className="">
                                    <div className="text-xs p-2 bg-red-500 text-white w-fit rounded">judul pengumuman : {deleteSelect.title}</div>
                                </div>
                            </div>
                            <div className="flex gap-2 mt-5 justify-center">
                                <button onClick={() => handleDelete(`${deleteSelect.announcementID}`)} className="btn btn-success text-white w-20">Ya</button>
                                <button onClick={() => setDeleteSelect(null)} className="btn btn-error text-white w-20">Tidak</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    useEffect(() => {
        getData()
    }, [deleteStatus])

    return (
        <div className=' p-5'>
            <div className="rounded-xl shadow-md w-full">
                {deleteStatus == true && <AlertDelete />}
                {RenderAlertDelete()}
                <div className="card-body">
                    <button onClick={() => navigation.push(`/admin-rsaa/pengumuman/add`)} className='btn btn-success w-fit text-white uppercase'>Tambah Pengumuman</button>
                    <div className="grid lg:grid-cols-4 gap-3">
                        {data && data.map((item: AnnoucementResponse, index: number) => {
                            const truncate = item.desc?.slice(0, 100) + `...`
                            return (
                                <React.Fragment key={index}>
                                    <div className="p-4 rounded-lg shadow-slate-100 shadow">
                                        <div className="text-lg font-bold uppercase">{item.title}</div>
                                        <div className="mb-2">
                                            <img src={item.images ? item.images : '/page/default.jpg'} alt="" />
                                        </div>
                                        <div className="text-sm p-1 bg-slate-100 rounded-sm w-fit">{moment(item.createdAt).format('DD MMMM YYYY')}</div>
                                        <div className=" p-2 font-sm text-justify">
                                            {truncate}
                                        </div>
                                        <div className="flex justify-end gap-3 mt-4">
                                            <button onClick={() => navigation.push(`/admin-rsaa/pengumuman/edit/${item.announcementID}`)} className='btn btn-warning'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                                </svg>
                                            </button>
                                            <button onClick={() => setDeleteSelect(item)} className='btn btn-error'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </React.Fragment>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Section