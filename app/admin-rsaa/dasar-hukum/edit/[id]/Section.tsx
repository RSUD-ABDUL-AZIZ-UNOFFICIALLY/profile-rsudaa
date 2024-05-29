'use client'
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
    const GeneralToken = process.env.TOKEN
    const [dataImage, setDataImage] = useState<any>('')

    const SIMRS_URL = process.env.SIMRS_URL
    type Inputs = {
        name: string
        file: string
    }
    const { register, handleSubmit, watch, setValue, formState: { errors }, reset } = useForm<Inputs>()
    const API_URL = process.env.API_URL

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        setDataImage(file)
    };

    const getData = async () => {
        try {
            const response = await axios.get(`${API_URL}/dasar-hukum?id=${id}`)

            if (response.data.success == true) {
                setValue('name', response.data.data.name)
            }
        } catch (error) {

        }
    }

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if (dataImage) {


            try {
                const formData = new FormData()

                formData.append('file', dataImage)

                const upload = await axios.post(`${SIMRS_URL}/api/cdn/upload/file`, formData, {
                    headers: {
                        Authorization: `Bearer ${GeneralToken}`
                    }
                })


                if (upload.data) {
                    setValue('file', upload.data.data.url)
                }

                const response = await axios.put(`${API_URL}/dasar-hukum/${id}`, data, {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                })

                if (response.data.data) {
                    setValue('name', '')
                    setValue('file', '')
                    setEditSuccess(true)
                    setTimeout(() => {
                        navigation.push('/admin-rsaa/dasar-hukum')
                    }, 3000)
                }
            } catch (error) {
                //console.log(error);

            }
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
                                    <input type="file" accept='application/pdf' onChange={handleFileChange} className="file-input file-input-bordered w-full" />
                                    {errors.file &&
                                        <div className="flex justify-end">
                                            <span className='text-xs mt-2 p-1 bg-red-600 text-white rounded-sm'>* File Dasar Hukum Harus Di Isi</span>
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