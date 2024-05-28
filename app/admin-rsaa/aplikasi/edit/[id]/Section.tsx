'use client'
import { AplikasiResponse } from '@/app/Model/aplikasi.model'
import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import Cookies from "js-cookie";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import AlertSuccess from '@/app/admin-rsaa/ComponentAdmin/AlertSuccess';

interface props {
    id: string
}

const Section: React.FC<props> = ({ id }) => {
    const navigation = useRouter()
    const access_token = Cookies.get('access_token')
    const [editSuccess, setEditSuccess] = useState<boolean>(false)
    type Inputs = {
        name: string
        link: string
    }
    const { register, handleSubmit, watch, setValue, formState: { errors }, reset } = useForm<Inputs>()
    const API_URL = process.env.API_URL

    const getData = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/link-aplikasi?id=${id}`)

            if (response.data.success == true) {
                setValue('name', response.data.data.name)
                setValue('link', response.data.data.link)
            }
        } catch (error) {

        }
    }

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const response = await axios.put(`${API_URL}/api/link-aplikasi/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })

            if (response.data.data) {
                setValue('name', '')
                setValue('link', '')
                setEditSuccess(true)
                setTimeout(() => {
                    navigation.push('/admin-rsaa/aplikasi')
                }, 3000)
            }
        } catch (error) {

        }
    }


    useEffect(() => {
        getData()
    }, [editSuccess])

    return (
        <div className='p-5'>
            {editSuccess && <AlertSuccess title='Edit Aplikasi' />}
            <div className="rounded-xl shadow-md w-full">
                <div className="card-body">
                    <div className="lg:w-[40%] mt-4">
                        <div className=" p-4 rounded-md bg-slate-100">
                            <div className="uppercase font-bold">Form Edit Aplikasi</div>
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
                                <button onClick={handleSubmit(onSubmit)} className='btn btn-success mt-4 btn-wide uppercase text-white'>Simpan</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Section