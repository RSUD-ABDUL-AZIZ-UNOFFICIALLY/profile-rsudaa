'use client'
import { ProfileResponse } from '@/app/Model/profile.model'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { headers } from 'next/headers'

const FormLinkSKM = () => {
    const [data, setData] = useState<string>('')
    const API_URL = process.env.API_URL
    const access_token = Cookies.get('access_token')
    const [alertUpdate, setAlertUpdate] = useState<boolean>(false)
    const getData = useCallback(async () => {
        try {
            const response = await axios.get(`${API_URL}/profile/skmLink`)

            if (response.data) {
                setData(response.data.data.desc)
            }
        } catch (error) {

        }
    }, [])

    const handleUpdate = async () => {
        try {
            const response = await axios.post(`${API_URL}/profile/update/skmLink`, {
                desc: data
            }, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })

            if (response.data.data) {
                setAlertUpdate(true)
                setTimeout(() => {
                    setAlertUpdate(false)
                }, 5000)
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        getData()
    }, [alertUpdate])

    return (
        <div className='grid gap-2 w-full'>
            <div className="">Link Survei Kepuasan Masyarakat</div>
            {alertUpdate && <div className="p-3 bg-lime-200 rounded-md text-center font-bold uppercase">Update Successfully</div>}
            <div className="">
                <input value={data} onChange={(e) => setData(e.target.value)} className="input input-bordered w-full" placeholder="About RSUD" />
            </div>
            <button onClick={handleUpdate} className='btn btn-warning'>Update Keterangan</button>
        </div>
    )
}

export default FormLinkSKM