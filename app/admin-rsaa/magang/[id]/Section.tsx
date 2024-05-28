'use client'
import { ApplyLokerResponse, LokerResponse } from '@/app/Model/loker.model'
import axios from 'axios'
import Link from 'next/link'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { useRouter } from 'next/navigation'
import AlertDelete from '../../ComponentAdmin/AlertDelete'
import { MagangResponse } from '@/app/Model/magang.model'
require('moment/locale/id');
moment.locale('id');


interface props {
    id: string
}
const Section: React.FC<props> = ({ id }) => {
    const [data, setData] = useState<MagangResponse>()
    const API_URL = process.env.API_URL
    const [dropDown, setDropdown] = useState<boolean>(false)
    const access_token = Cookies.get('access_token')
    const [deleteStatus, setDeleteStatus] = useState<boolean>(false)
    const [deleteSelect, setDeleteSelect] = useState<MagangResponse | null>(null)

    const navigation = useRouter()
    const getData = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/magang?id=${id}`)

            if (response.data.data) {
                setData(response.data.data)
            }
        } catch (error) {

        }
    }

    const handleDelete = async (id: string) => {
        setDeleteSelect(null)
        try {
            const response = await axios.post(`${API_URL}/api/magang/delete/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })

            if (response.data.success === true) {
                setDeleteStatus(true)
                getData()
                setTimeout(() => {
                    navigation.push(`/admin-rsaa/magang`)
                    // setDeleteStatus(false)
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
                                    <div className="text-xs p-2 bg-red-500 text-white w-fit rounded">nama magang : {deleteSelect.name}</div>
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
    }, [])

    return (
        <div className='p-5 flex justify-center'>
            {deleteStatus == true && <AlertDelete />}
            {RenderAlertDelete()}
            <div className="rounded-xl shadow-md w-full lg:w-[70%]">
                <div className="card-body">
                    {data &&
                        <>
                            <div className="">
                                Lowongan <span className='p-2 bg-yellow-300 font-vold uppercase font-bold rounded-md'>{data.name}</span>
                            </div>
                            <div className="p-4">
                                <div className="text-justify">
                                    {data.desc}
                                </div>
                                <div className="mt-2">
                                    <li>Tanggal Mulai : {moment(data.dateStart).format('DD MMMM YYYY')}</li>
                                    <li>Tanggal Selesai : {moment(data.dateEnd).format('DD MMMM YYYY')}</li>
                                </div>
                                <button onClick={(e) => setDropdown(true)} className="hover:scale-110 duration-200 active:scale-90 card-body shadow-lg w-fit rounded-lg mt-4 mb-4">
                                    Jumlah Apply : {data.applicationMagang?.length}
                                </button>
                                {dropDown &&
                                    <div className="mb-3 z-0">
                                        <div className="overflow-x-auto">
                                            <table className="table table-zebra">
                                                {/* head */}
                                                <thead>
                                                    <tr>
                                                        <th></th>
                                                        <th>NIK</th>
                                                        <th>Nama Lengkap</th>
                                                        <th>Tanggal Lahir</th>
                                                        <th>Nomor Wa</th>
                                                        <th>Email</th>
                                                        <th>Jurusan</th>
                                                        <th>Jenjang</th>
                                                        <th>Instansi Pendidikan</th>
                                                        <th>File Lamaran</th>
                                                        <th>File CV</th>
                                                        <th>File Pendukung</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data.applicationMagang && data.applicationMagang.map((item: ApplyLokerResponse, index: number) => {
                                                        return (
                                                            <tr>
                                                                <th>{index + 1}</th>
                                                                <td>{item.nik}</td>
                                                                <td>{item.fullName}</td>
                                                                <td>{moment(item.tanggalLahir).format('DD MMMM YYYY')}</td>
                                                                <td>{item.no_wa}</td>
                                                                <td>{item.email}</td>
                                                                <td>{item.jurusan}</td>
                                                                <td>{item.jenjang}</td>
                                                                <td>{item.sekolah}</td>
                                                                <td>
                                                                    <Link className='link' target='_blank' href={item.fileApply ? item.fileApply : '#'}>{item.fileApply}</Link>
                                                                </td>
                                                                <td>
                                                                    <Link className='link' target='_blank' href={item.fileResume ? item.fileResume : '#'}>{item.fileResume}</Link>
                                                                </td>
                                                                <td>
                                                                    <Link className='link' target='_blank' href={item.fileOther ? item.fileOther : '#'}>{item.fileOther}</Link>
                                                                </td>

                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                }
                                <div className="flex justify-center gap-2">
                                    <button onClick={() => navigation.push(`/admin-rsaa/loker/edit/${id}`)} className="btn btn-warning">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                        </svg>
                                    </button>
                                    <button onClick={() => setDeleteSelect(data)} className='btn btn-error'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default Section