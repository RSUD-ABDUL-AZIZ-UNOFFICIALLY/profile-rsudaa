'use client'
import { ProfileResponse } from '@/app/Model/profile.model'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { headers } from 'next/headers'
import { image } from '@nextui-org/react'
import { maklumatPelayananResponse } from '@/app/Model/maklumatPelayanan.model'

const FileMaklumatPelayanan = () => {
    const [data, setData] = useState<maklumatPelayananResponse[]>([])
    const [dataImage, setDataImage] = useState<any>('')
    const API_URL = process.env.API_URL
    const access_token = Cookies.get('access_token')
    const GeneralToken = process.env.TOKEN
    const [alertUpdate, setAlertUpdate] = useState<boolean>(false)
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const SIMRS_URL = process.env.SIMRS_URL
    const [deleteStatus, setDeleteStatus] = useState<boolean>(false)
    const [deleteSelect, setDeleteSelect] = useState<maklumatPelayananResponse | null>(null)

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            setDataImage(file)
        }
    };

    const getData = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/maklumat-pelayanan`)

            if (response.data) {
                setData(response.data.data)
            }
        } catch (error) {

        }
    }

    const handleUpdate = async () => {
        if (dataImage) {
            try {

                const formData = new FormData()

                formData.append('image', dataImage)

                const upload = await axios.post(`${SIMRS_URL}/api/cdn/upload/img`, formData, {
                    headers: {
                        Authorization: `Bearer ${GeneralToken}`
                    }
                })

                const response = await axios.post(`${API_URL}/api/maklumat-pelayanan`, {
                    file: upload.data.data.url
                }, {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                })

                if (response.data.data) {
                    setAlertUpdate(true)
                    setImagePreview(null)
                    setTimeout(() => {
                        getData()
                        setAlertUpdate(false)
                    }, 5000)
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handleDelete = async (id: string) => {
        setDeleteSelect(null)
        try {
            const response = await axios.delete(`${API_URL}/api/maklumat-pelayanan/${id}`, {
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
        setTimeout(() => {
            getData()
        }, 1000)
    }, [alertUpdate, deleteStatus, imagePreview])

    return (
        <React.Fragment>
            {RenderAlertDelete()}
            <div className='grid gap-2 lg:w-[40%] card-body bg-slate-50 rounded-lg'>
                <div className="font-bold uppercase">Form Tambah  Maklumat Pelayanan</div>
                {alertUpdate && <div className="p-3 bg-lime-200 rounded-md text-center font-bold uppercase">Add Image Successfully</div>}
                <img src={imagePreview ? imagePreview : '/page/default.jpg'} alt="" className='rounded w-[50%]' />
                <div className="">
                    <input type="file" onChange={handleFileChange} accept='image/*' className="file-input file-input-bordered w-full" />
                </div>
                <button onClick={handleUpdate} className='btn btn-success uppercase text-white'>Save</button>
            </div>
            <div className="text-center font-bold"> Jumlah Gambar : <span className='text-2xl'>{data.length}</span></div>
            <div className="flex flex-wrap justify-center items-center gap-2 mt-4">
                {data && data.length > 0 && data.map((item: maklumatPelayananResponse, index: number) => {
                    return (
                        <div key={index} className="card lg:w-[15%] w-[30%] bg-white shadow-xl overflow-hidden">
                            <img src={item.file ? item.file : '/page/default.jpg'} />
                            <div className="p-3 flex justify-center ">
                                <button onClick={() => setDeleteSelect(item)} className='btn btn-sm btn-error text-white'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </React.Fragment>
    )
}

export default FileMaklumatPelayanan