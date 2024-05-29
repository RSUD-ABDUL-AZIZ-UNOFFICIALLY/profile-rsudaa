'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BangsalDTO, kamarDTO } from '../Model/kamar.model'
import notFound from "../../public/icon/notFound.png";
import Image from 'next/image';
import Link from 'next/link';

const SectionKamar = () => {
    const [data, setData] = useState<BangsalDTO[]>()
    const [numberData, setNumberData] = useState<number>(0)
    const [keyword, setKeyword] = useState<string>('')
    const SIMRS_URL = process.env.SIMRS_URL
    const token = process.env.TOKEN
    const getData = async () => {
        try {
            const response = await axios.get(`${SIMRS_URL}/api/ranap/kamar?nm_bangsal=${keyword}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (response.data.data) {
                setData(response.data.data)
                setNumberData(response.data.data.length)
            }
        } catch (error) {
            //console.log(error);
        }
    }

    useEffect(() => {
        getData()
    }, [keyword])
    return (
        <div className='flex justify-center p-2'>
            <div className="lg:w-[70%] w-[100%] p-2 ">
                <div className="text-3xl uppercase font-bold text-primary">DAFTAR KAMAR </div>
                {data ?
                    <div className=" p-3 shadow-lg rounded-md">
                        <label className="input input-bordered rounded-none flex items-center gap-2">
                            <input onChange={(e) => setKeyword(e.target.value)} type="text" className="grow" placeholder="Masukan keyword kamar" />
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                        </label>


                        {numberData > 0 &&
                            <>
                                <div className="flex flex-wrap mt-4">
                                    {data.map((itemBangsal: BangsalDTO, index: number) => {
                                        return (
                                            <React.Fragment key={index}>
                                                <Link href={`#${itemBangsal.nm_bangsal}`} role="tab" className="tab hover:scale-110 duration-200">{itemBangsal.nm_bangsal}</Link>
                                            </React.Fragment>
                                        )
                                    })}
                                </div>
                            </>
                        }
                        {numberData > 0 ? data.map((itemBangsal: BangsalDTO, index: number) => {
                            return (
                                <React.Fragment key={index}>
                                    <div id={itemBangsal.nm_bangsal} className={`uppercase text-2xl font-bold mt-5 `}> {itemBangsal.nm_bangsal}</div>
                                    <div className="overflow-x-auto">
                                        <table className="table">
                                            {/* head */}
                                            <thead className='text-center'>
                                                <tr>
                                                    <th className='border border-primary bg-primary text-white uppercase'>Kamar</th>
                                                    {/* <th className='border border-primary bg-primary text-white uppercase'>Bangsal</th> */}
                                                    <th className='border border-primary bg-primary text-white uppercase'>Kelas</th>
                                                    <th className='border border-primary bg-primary text-white uppercase'>tarif</th>
                                                    <th className='border border-primary bg-primary text-white uppercase'>Status</th>
                                                </tr>
                                            </thead>
                                            {itemBangsal.kamars && itemBangsal.kamars.map((itemKamar: kamarDTO, index: number) => {
                                                return (
                                                    <React.Fragment key={index}>
                                                        <tbody className='text-center'>
                                                            {/* row 1 */}
                                                            <tr>
                                                                <td className='border border-primary'>{itemKamar.kd_kamar}</td>
                                                                {/* <td className='border border-primary'>{itemKamar.kd_bangsal}</td> */}
                                                                <td className='border border-primary '>
                                                                    <div className="lg:w-full w-28 text-center">
                                                                        {itemKamar.kelas}
                                                                    </div>
                                                                </td>
                                                                <td className='border border-primary'>{itemKamar.trf_kamar} </td>
                                                                <td className='border border-primary'>{itemKamar.status} </td>
                                                            </tr>
                                                        </tbody>
                                                    </React.Fragment>
                                                )
                                            })}
                                        </table>
                                    </div>
                                </React.Fragment>
                            )
                        })
                            :
                            <React.Fragment>
                                <div className="p-4 flex justify-center items-center min-h-40 uppercase font-bold">
                                    <div className="text-center">
                                        <Image alt='' src={notFound} className='h-60 w-fit' />
                                        <div className="w-full">
                                            Data tidak di temukan
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                        }

                    </div>
                    :
                    <React.Fragment>
                        <div className="flex flex-col gap-4 w-full mt-5">
                            <div className="skeleton h-4 w-44"></div>
                            <div className="skeleton h-4 w-full"></div>
                            <div className="skeleton h-4 w-full"></div>
                            <div className="skeleton h-4 w-full"></div>
                            <div className="skeleton h-4 w-full"></div>
                        </div>
                    </React.Fragment>
                }
            </div>
        </div >
    )
}

export default SectionKamar