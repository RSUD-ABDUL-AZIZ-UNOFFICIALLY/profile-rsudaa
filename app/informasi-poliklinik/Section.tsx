'use client'
import React, { useEffect, useState } from 'react'
import { poliklinikResponse } from '../Model/poliklinik.model'
import axios from 'axios'

const Section = () => {
    const SIMRS_URL = process.env.SIMRS_URL
    const TOKEN = process.env.TOKEN
    const [dataPoli, setDataPoli] = useState<poliklinikResponse[]>()

    const getPoliklinik = async () => {
        try {
            const response = await axios.get(`${SIMRS_URL}/api/ralan/drpoli`, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`
                }
            })
            if (response.data.data) {
                setDataPoli(response.data.data)
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        getPoliklinik()
    }, [])
    return (
        <div className='flex justify-center p-2'>
            <div className="lg:w-[90%] w-[100%]">
                <div className="grid lg:grid-cols-4 gap-4">
                    {dataPoli && dataPoli.length > 0 ? dataPoli.map((item: poliklinikResponse, index: number) => {
                        return (
                            <React.Fragment key={index}>
                                <div className="card shadow-md shadow-zinc-100 h-fit">
                                    <div className="card-body">
                                        <div className="text-primary uppercase font-bold text-xl">{item.poliklinik}</div>
                                        <div className="text-black font-semibold">Dokter :</div>
                                        {item.dokter && item.dokter.map((dokter: string, index: number) => {
                                            return (
                                                <React.Fragment key={index}>
                                                    <div className="text-xs">
                                                        <li>{dokter}</li>
                                                    </div>
                                                </React.Fragment>
                                            )
                                        })}
                                    </div>
                                </div>
                            </React.Fragment>
                        )
                    })
                        :
                        <>
                            <div className="card shadow-md shadow-zinc-100 w-full">
                                <div className="card-body">
                                    <div className="">
                                        <div className="flex flex-col gap-4 w-full">
                                            <div className="skeleton h-4 w-28"></div>
                                            <div className="skeleton h-4 w-full"></div>
                                            <div className="skeleton h-4 w-full"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card shadow-md shadow-zinc-100 w-full">
                                <div className="card-body">
                                    <div className="">
                                        <div className="flex flex-col gap-4 w-full">
                                            <div className="skeleton h-4 w-28"></div>
                                            <div className="skeleton h-4 w-full"></div>
                                            <div className="skeleton h-4 w-full"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card shadow-md shadow-zinc-100 w-full">
                                <div className="card-body">
                                    <div className="">
                                        <div className="flex flex-col gap-4 w-full">
                                            <div className="skeleton h-4 w-28"></div>
                                            <div className="skeleton h-4 w-full"></div>
                                            <div className="skeleton h-4 w-full"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card shadow-md shadow-zinc-100 w-full">
                                <div className="card-body">
                                    <div className="">
                                        <div className="flex flex-col gap-4 w-full">
                                            <div className="skeleton h-4 w-28"></div>
                                            <div className="skeleton h-4 w-full"></div>
                                            <div className="skeleton h-4 w-full"></div>
                                        </div>
                                    </div>
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