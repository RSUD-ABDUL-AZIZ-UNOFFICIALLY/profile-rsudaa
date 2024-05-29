'use client'
import { AplikasiResponse } from '@/app/Model/aplikasi.model'
import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import Cookies from "js-cookie";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Section = () => {
    const [data, setData] = useState<AplikasiResponse[]>([])
    const navigation = useRouter()
    const access_token = Cookies.get('access_token')
    const [addSuccess, setAddSuccess] = useState<boolean>(false)
    const [deleteStatus, setDeleteStatus] = useState<boolean>(false)
    const [deleteSelect, setDeleteSelect] = useState<AplikasiResponse | null>(null)
    type Inputs = {
        name: string
        link: string
    }
    const { register, handleSubmit, watch, setValue, formState: { errors }, reset } = useForm<Inputs>()
    const API_URL = process.env.API_URL

    const getData = async () => {
        try {
            const response = await axios.get(`${API_URL}/link-aplikasi`)

            if (response.data.success == true) {
                setData(response.data.data)
            }
        } catch (error) {

        }
    }

    const handleCreate: SubmitHandler<Inputs> = async (data) => {
        try {
            const response = await axios.post(`${API_URL}/link-aplikasi`, data, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })

            if (response.data.data) {
                setValue('name', '')
                setValue('link', '')
                setAddSuccess(true)
                setTimeout(() => {
                    setAddSuccess(false)
                }, 3000)
            }
        } catch (error) {

        }
    }

    const handleDelete = async (id: string) => {
        setDeleteSelect(null)
        try {
            const response = await axios.delete(`${API_URL}/link-aplikasi/${id}`, {
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

    const renderFormAdd = () => {
        return (
            <div className=" p-4 rounded-md bg-slate-100">
                <div className="uppercase font-bold">Form Add Aplikasi</div>
                {addSuccess == true &&
                    <div className="p-2 bg-lime-200 font-bold text-primary rounded-lg text-center">Add Aplikasi Successfully</div>
                }
                {RenderAlertDelete()}
                <div className="">
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Nama Aplikasi</span>
                        </div>
                        <input type="text" {...register("name", { required: true })} placeholder="Masukan nama aplikasi" className="input input-bordered w-full" />
                        {errors.name &&
                            <div className="flex justify-end">
                                <span className='text-xs mt-2 p-1 bg-red-600 text-white rounded-sm'>* Nama Aplikasi Harus Di Isi</span>
                            </div>
                        }
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Link Aplikasi</span>
                        </div>
                        <input type="text" {...register("link", { required: true })} placeholder="Masukan link aplikasi" className="input input-bordered w-full" />
                        {errors.link &&
                            <div className="flex justify-end">
                                <span className='text-xs mt-2 p-1 bg-red-600 text-white rounded-sm'>* Link Aplikasi Harus Di Isi</span>
                            </div>
                        }
                    </label>
                    <button onClick={handleSubmit(handleCreate)} className='btn btn-success mt-4 btn-wide uppercase text-white'>Simpan</button>
                </div>
            </div>
        )
    }

    useEffect(() => {
        getData()
    }, [addSuccess, deleteStatus])

    return (
        <div className='p-5'>
            <div className="rounded-xl shadow-md w-full">
                <div className="card-body">
                    <div className="font-bold uppercase text-2xl">DAFTAR APLIKASI</div>
                    <div className="lg:w-[40%] mt-4">
                        {renderFormAdd()}
                    </div>
                    <div className="grid lg:grid-cols-4 gap-3 mt-4">
                        {data && data.map((item: AplikasiResponse, index: number) => {
                            return (
                                <React.Fragment key={index}>
                                    <div className="card-body rounded-lg shadow overflow-hidden">
                                        {item.name}
                                        <div className="flex">
                                            <Link href={item.link ? item.link : '#'} target='_blank' className='link '>
                                                link
                                            </Link>
                                        </div>
                                        <div className="flex justify-end gap-3">
                                            <button onClick={() => navigation.push(`/admin-rsaa/aplikasi/edit/${item.id}`)} className='btn btn-warning '>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                                </svg>
                                            </button>
                                            <button onClick={() => setDeleteSelect(item)} className='btn btn-error '>
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