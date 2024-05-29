'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { LokerResponse } from '../Model/loker.model'
import { useRouter } from 'next/navigation'

const Section = () => {
    const [desc, setDesc] = useState<string>('')
    const [data, setData] = useState<LokerResponse[]>([])

    const router = useRouter()
    const API_URL = process.env.API_URL

    const getDesc = async () => {
        try {
            const response = await axios.get(`${API_URL}/profile/loker`)

            if (response.data.data) {
                setDesc(response.data.data.desc)
            }
        } catch (error) {
            //console.log(error);
        }
    }

    const getDataLoker = async () => {
        try {
            const response = await axios.get(`${API_URL}/loker`)

            if (response.data.data) {
                setData(response.data.data)
            }
        } catch (error) {
            //console.log(error);
        }
    }

    const handleDetailLoker = (e: string) => {
        router.push(`/loker/${e}`)
    }

    useEffect(() => {
        getDesc()
        getDataLoker()
    }, [])
    return (
        <div className='flex justify-center min-h-[40vh] p-4'>
            <div className="lg:w-[70%] shadow-sm rounded-sm p-4">
                <div className="font-bold uppercase text-xl">Lowongan Pekerjaan <br /> RSUD dr Abdul Aziz</div>
                <div className="font-thin text-sm p-4">
                    {desc ? desc :
                        <>
                            <div className="flex justify-center items-center min-h-24">
                                <span className="loading loading-ring loading-md"></span>
                            </div>
                        </>
                    }
                </div>

                <div className="rounded-sm shadow-sm p-3 ">
                    <div className="pb-1 pr-5 w-fit border-b-4 border-primary text-primary mb-3">Daftar Lowongan</div>
                    <div className="lg:flex grid justify-center items-center gap-2 h-full">
                        {data && data.length > 0 ? data.map((item: LokerResponse, index: number) => {
                            const desc: any = item.desc
                            const id = item.id ? item.id : ''
                            const truncate = desc.slice(0, 200) + " ...";
                            return (
                                <React.Fragment key={index}>
                                    <div className="card lg:w-[30%] bg-base-100 shadow-sm rounded-sm">
                                        <div className="card-body">
                                            <h2 className="card-title">{item.name}</h2>
                                            <p className='p-2 font-thin text-sm'>{truncate}</p>
                                            <div className="card-actions justify-center">
                                                <button onClick={() => handleDetailLoker(id)} className="btn btn-primary ">Detail</button>
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment>
                            )
                        })
                            :
                            <>
                                <div className=" p-5">
                                    Tidak ada lowongan pekerjaan
                                </div>

                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Section