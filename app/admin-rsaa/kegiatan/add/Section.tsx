'use client'
import { AnnoucementResponse } from '@/app/Model/announcement.model'
import { useForm, SubmitHandler } from 'react-hook-form'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Cookies from "js-cookie";
import moment from 'moment';
import AlertSuccess from '../../ComponentAdmin/AlertSuccess'
import { useRouter } from 'next/navigation'
require('moment/locale/id');
moment.locale('id');

const Section = () => {
    const API_URL = process.env.API_URL
    const access_token = Cookies.get('access_token')
    const navigation = useRouter()
    const [success, setSuccess] = useState<boolean>(false)
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    type Inputs = {
        title: string
        desc: string
        images: string
    }
    const { register, handleSubmit, watch, setValue, formState: { errors }, reset } = useForm<Inputs>()
    const GeneralToken = process.env.TOKEN
    const [dataFile, setDataFile] = useState<any>('')

    const SIMRS_URL = process.env.SIMRS_URL

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            setDataFile(file)
        }
    };

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if (dataFile) {
            try {

                const formData = new FormData()

                formData.append('image', dataFile)

                const upload = await axios.post(`${SIMRS_URL}/api/cdn/upload/img`, formData, {
                    headers: {
                        Authorization: `Bearer ${GeneralToken}`
                    }
                })

                setValue('images', upload.data.data.url)
                //console.log(upload.data.data.url);

                const response = await axios.post(`${API_URL}/activity`, {
                    title: data.title,
                    desc: data.desc,
                    images: upload.data.data.url
                }, {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                })

                //console.log(response.data);


                if (response.data.data) {
                    setValue('title', '')
                    setValue('desc', '')
                    setValue('images', '')
                    setSuccess(true)
                    setTimeout(() => {
                        navigation.push('/admin-rsaa/kegiatan')
                    }, 3000)
                }
            } catch (error) {
                //console.log(error);

            }
        }
    }


    return (
        <div className=' p-5'>
            {success && <AlertSuccess title='Add kegiatan' />}
            <div className="rounded-xl shadow-md lg:w-[50%]">
                <div className="card-body">
                    <div className="uppercase font-bold">Form Tambah Kegiatan</div>
                    <div className="">
                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text">Judul</span>
                            </div>
                            <input {...register("title", { required: true })} type="text" placeholder="Masukan Judul" className="input input-bordered w-full" />
                            {errors.title &&
                                <div className="flex justify-end">
                                    <span className='text-xs mt-2 p-1 bg-red-600 text-white rounded-sm'>* Title Harus Di Isi</span>
                                </div>
                            }
                        </label>

                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text">Deskripsi</span>
                            </div>
                            <textarea {...register("desc", { required: true })} className="textarea textarea-bordered" rows={4} placeholder="Masukan deskripsi"></textarea>
                            {errors.desc &&
                                <div className="flex justify-end">
                                    <span className='text-xs mt-2 p-1 bg-red-600 text-white rounded-sm'>* Deskripsi Harus Di Isi</span>
                                </div>
                            }
                        </label>
                        <div className="mt-2 w-[50%]">
                            <img src={imagePreview ? imagePreview : '/page/default.jpg'} alt="" className='rounded-lg' />
                        </div>
                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text">Foto</span>
                            </div>
                            <input onChange={handleFileChange} type="file" accept="image/*" className="file-input file-input-bordered w-full" />
                            {errors.images &&
                                <div className="flex justify-end">
                                    <span className='text-xs mt-2 p-1 bg-red-600 text-white rounded-sm'>* Image Harus Di Isi</span>
                                </div>
                            }
                        </label>
                        <button onClick={handleSubmit(onSubmit)} className='btn btn-primary mt-4 btn-wide uppercase'>Simpan</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Section