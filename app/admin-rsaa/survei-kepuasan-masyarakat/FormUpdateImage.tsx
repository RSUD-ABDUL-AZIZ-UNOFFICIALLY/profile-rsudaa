'use client'
import { ProfileResponse } from '@/app/Model/profile.model'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { headers } from 'next/headers'
import { image } from '@nextui-org/react'

const FormUpdateImage = () => {
    const [data, setData] = useState<string>('')
    const [dataImage, setDataImage] = useState<any>('')
    const API_URL = process.env.API_URL
    const access_token = Cookies.get('access_token')
    const GeneralToken = process.env.TOKEN
    const [alertUpdate, setAlertUpdate] = useState<boolean>(false)
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const SIMRS_URL = process.env.SIMRS_URL

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
            const response = await axios.get(`${API_URL}/profile/skmImage`)

            if (response.data) {
                setData(response.data.data.desc)
                setImagePreview(response.data.data.desc)
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


                if (upload.data) {
                    setData(upload.data.data.url)
                }

                const response = await axios.post(`${API_URL}/profile/update/skmImage`, {
                    desc: upload.data.data.url
                }, {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                })

                if (response.data.data) {
                    setAlertUpdate(true)
                    getData()
                    setTimeout(() => {
                        setAlertUpdate(false)
                    }, 5000)
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        getData()
    }, [alertUpdate])

    return (
        <div className='grid gap-2 w-full'>
            <div className="">Image Survei Kepuasan Masyarakat</div>
            {alertUpdate && <div className="p-3 bg-lime-200 rounded-md text-center font-bold uppercase">Update Successfully</div>}
            <div className="w-[50%]">
                <img src={imagePreview ? imagePreview : '/page/default.jpg'} alt="" className='rounded' />
            </div>
            <div className="">
                <input type="file" accept='image/*' onChange={handleFileChange} className="file-input file-input-bordered w-full" />
            </div>
            <button onClick={handleUpdate} className='btn btn-warning'>Update Image</button>
        </div>
    )
}

export default FormUpdateImage