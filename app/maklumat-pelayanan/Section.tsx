'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { maklumatPelayananResponse } from '../Model/maklumatPelayanan.model'

const Section = () => {
    const [itemDesc, setItemDesc] = useState<string>()
    const [direktur, setDirektur] = useState<string>()
    const [signDirektur, setSignDirektur] = useState<string>()
    const [data, setData] = useState<maklumatPelayananResponse[]>([])
    const API_URL = process.env.API_URL

    const getData = async () => {
        try {
            const response = await axios.get(`${API_URL}/maklumat-pelayanan`)

            if (response.data.success == true) {
                setData(response.data.data)
            }
        } catch (error) {

        }
    }

    const getDesc = async () => {
        try {
            const response = await axios.get(`${API_URL}/profile/maklumat-pelayanan`)

            if (response.data.data) {
                setItemDesc(response.data.data.desc)
            }
        } catch (error) {
            //console.log(error);
        }
    }

    const getDirektur = async () => {
        try {
            const response = await axios.get(`${API_URL}/profile/nameDirektur`)
            if (response.data.data) {
                setDirektur(response.data.data.desc)
            }
        } catch (error) {
            //console.log(error);
        }
    }

    const getSignDirektur = async () => {
        try {
            const response = await axios.get(`${API_URL}/profile/signDirektur`)

            if (response.data.data) {
                setSignDirektur(response.data.data.desc)
            }
        } catch (error) {
            //console.log(error);
        }
    }

    useEffect(() => {
        getDesc()
        getDirektur()
        getSignDirektur()
        getData()
    }, [])

    return (
        <React.Fragment>
            <div className='flex justify-center p-2'>
                <div className="lg:w-[80%] p-2">
                    {itemDesc ?
                        <div className="text-center text-lg">
                            <span className='m-1 bg-primary text-white rounded-sm p-1'>Maklumat Pelayanan RSUD dr Abdul Aziz</span>
                            {itemDesc}
                        </div>
                        :
                        <>
                            <div className="grid w-full gap-2">
                                <div className="skeleton rounded-sm h-4 w-[30%]"></div>
                                <div className="skeleton rounded-sm h-4 w-full"></div>
                                <div className="skeleton rounded-sm h-4 w-full"></div>
                                <div className="skeleton rounded-sm h-4 w-full"></div>
                                <div className="skeleton rounded-sm h-4 w-full"></div>
                            </div>
                        </>
                    }
                    {signDirektur && direktur &&
                        <div className="grid justify-center w-full">
                            <img src={signDirektur} className='h-44 mt-4' alt="" />
                            <div className="text-sm text-center">
                                <div className="text-primary">Direktur RSUD dr Abdul Aziz</div>
                                <div className="text-sm font-thin">{direktur}</div>
                            </div>
                        </div>
                    }


                </div>
            </div>
            <div className="mt-5 grid lg:p-10 p-4">
                <div className="carousel rounded-box w-fit">
                    {data && data.length > 0 && data.map((item: maklumatPelayananResponse, index: number) => {
                        return (
                            <div className="carousel-item" key={index}>
                                <img src={item.file} alt="Maklumat-pelayanan" className={`lg:w-72 w-72 ${index < data.length - 1 && 'mr-1'} object-cover`} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </React.Fragment>
    )
}

export default Section