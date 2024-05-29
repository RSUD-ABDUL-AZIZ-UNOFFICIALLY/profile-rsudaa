'use client'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { LokerResponse } from '@/app/Model/loker.model'
import { useRouter } from 'next/navigation'
import AlertDelete from '../ComponentAdmin/AlertDelete'
import moment from 'moment';
require('moment/locale/id');
moment.locale('id');

const DaftLoker = () => {
    const [data, setData] = useState<LokerResponse[]>([])
    const API_URL = process.env.API_URL
    const access_token = Cookies.get('access_token')
    const [deleteStatus, setDeleteStatus] = useState<boolean>(false)
    const [deleteSelect, setDeleteSelect] = useState<LokerResponse | null>(null)
    const navigation = useRouter()
    const getData = useCallback(async () => {
        try {
            const response = await axios.get(`${API_URL}/loker`)

            if (response.data) {
                setData(response.data.data)
            }
        } catch (error) {

        }
    }, [])

    const handleDelete = async (id: string) => {
        setDeleteSelect(null)
        try {
            const response = await axios.post(`${API_URL}/loker/delete/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })

            if (response.data.success === true) {
                setDeleteStatus(true)
                getData()
                setTimeout(() => {
                    setDeleteStatus(false)
                }, 3000)
            }
        } catch (error) {

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
                                    <div className="text-xs p-2 bg-red-500 text-white w-fit rounded">nama loker : {deleteSelect.name}</div>
                                </div>
                            </div>
                            <div className="flex gap-2 mt-5 justify-center">
                                <button onClick={() => handleDelete(`${deleteSelect.id}`)} className="btn btn-success text-white w-20">Ya</button>
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
        <div className='rounded-lg grid lg:grid-cols-4 gap-3 mt-4'>
            {deleteStatus == true && <AlertDelete />}
            {RenderAlertDelete()}
            <div className="lg:col-span-4">
                <button onClick={() => navigation.push('/admin-rsaa/loker/add')} className='btn btn-success text-white'>Tambah Loker</button>
            </div>
            {data && data.length > 0 && data.map((item: LokerResponse, index: number) => {
                return (
                    <React.Fragment key={index}>
                        <div className=" shadow rounded-lg">
                            <div className="card-body">
                                <div className="font-bold uppercase text-xl text-center">
                                    {item.name}
                                </div>
                                <div className="">Mulai : {moment(item.dateStart).format(`DD MMMM YYYY`)}</div>
                                <div className="">Akhir : {moment(item.dateEnd).format(`DD MMMM YYYY`)}</div>
                                <div className="flex gap-2 mt-4 justify-center">
                                    <button onClick={() => navigation.push(`/admin-rsaa/loker/${item.id}`)} className='btn btn-primary text-white'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                                        </svg>
                                    </button>
                                    <button onClick={() => navigation.push(`/admin-rsaa/loker/edit/${item.id}`)} className='btn btn-warning'>
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
                        </div>
                    </React.Fragment>
                )
            })}
        </div>
    )
}

export default DaftLoker