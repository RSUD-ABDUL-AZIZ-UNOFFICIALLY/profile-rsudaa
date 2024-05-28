'use client'
import React, { useEffect, useState } from 'react'
import AlertSuccess from '../../../ComponentAdmin/AlertSuccess'
import { useForm, SubmitHandler } from 'react-hook-form'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { LokerResponse } from '@/app/Model/loker.model'

interface props {
    id: string
}

const Section: React.FC<props> = ({ id }) => {
    const API_URL = process.env.API_URL
    const access_token = Cookies.get('access_tokens')
    const navigation = useRouter()
    const [success, setSuccess] = useState<boolean>(false)
    type Inputs = {
        name: string
        desc: string
        dateStart: string
        dateEnd: string
    }
    const { register, handleSubmit, watch, setValue, formState: { errors }, reset } = useForm<Inputs>()

    const getData = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/loker?id=${id}`)

            if (response.data.data) {
                const data: LokerResponse = response.data.data
                setValue('name', data.name ? data.name : '')
                setValue('desc', data.desc ? data.desc : '')
                setValue('dateStart', data.dateStart ? data.dateStart : '')
                setValue('dateEnd', data.dateEnd ? data.dateEnd : '')
            }
        } catch (error) {

        }

    }

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const response = await axios.post(`${API_URL}/api/loker/update/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })

            if (response.data.data) {
                setSuccess(true)
                setTimeout(() => {
                    navigation.push('/admin-rsaa/loker')
                }, 3000)
            }

        } catch (error) {

        }
    }

    useEffect(() => {
        getData()
    }, [])
    return (
        <div className='p-5 flex justify-center'>
            {success && <AlertSuccess title='Update Loker' />}
            <div className="rounded-xl shadow-md w-full lg:w-[70%]">
                <div className="card-body grid lg:grid-cols-4">
                    <label className="form-control w-full lg:col-span-2">
                        <div className="label">
                            <span className="label-text">Nama Loker</span>
                        </div>
                        <input type="text"  {...register("name", { required: true })} placeholder="masukan nama loker" className="input input-bordered w-full" />
                        {errors.name &&
                            <div className="flex justify-end">
                                <span className='text-xs mt-2 p-1 bg-red-600 text-white rounded-sm'>* Nama Loker Harus Di Isi</span>
                            </div>
                        }
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Tanggal Mulai</span>
                        </div>
                        <input type="date" {...register("dateStart", { required: true })} placeholder="masukan nama loker" className="input input-bordered w-full" />
                        {errors.dateStart &&
                            <div className="flex justify-end">
                                <span className='text-xs mt-2 p-1 bg-red-600 text-white rounded-sm'>* Tanggal Mulai Harus Di Isi</span>
                            </div>
                        }
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Tanggal Selesai</span>
                        </div>
                        <input type="date"  {...register("dateEnd", { required: true })} placeholder="masukan nama loker" className="input input-bordered w-full" />
                        {errors.dateStart &&
                            <div className="flex justify-end">
                                <span className='text-xs mt-2 p-1 bg-red-600 text-white rounded-sm'>* Tanggal Selesai Harus Di Isi</span>
                            </div>
                        }
                    </label>
                    <label className="form-control w-full lg:col-span-4">
                        <div className="label">
                            <span className="label-text">Deskripsi</span>
                        </div>
                        <textarea {...setValue} {...register("desc", { required: true })} rows={4} placeholder="masukan deskripsi loker" className="textarea textarea-bordered w-full" ></textarea>
                        {errors.desc &&
                            <div className="flex justify-end">
                                <span className='text-xs mt-2 p-1 bg-red-600 text-white rounded-sm'>* Deskripsi Harus Di Isi</span>
                            </div>
                        }
                    </label>
                    <div className="lg:col-span-4 mt-4">
                        <button onClick={handleSubmit(onSubmit)} className='btn btn-success text-white w-full'>Update</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Section