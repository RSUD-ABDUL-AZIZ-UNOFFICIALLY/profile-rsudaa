'use client'
import React, { useEffect, useState } from 'react'
import { ArticleResponse } from '@/app/Model/article.model';
import axios from 'axios';
import Router, { useRouter } from 'next/router';
import moment from 'moment'
require('moment/locale/id');
moment.locale('id');

const Artikel = () => {
    const router = Router
    const [Data, setData] = useState<ArticleResponse[]>()
    const [numberData, setNumberData] = useState<number>(3)
    const [maxNumberData, setMaxNumberData] = useState<number>(0)
    const [loadData, setLoadData] = useState<boolean>(false)
    const getData = async () => {
        try {
            const response = await axios.get(`http://localhost:4444/api/article?data=${numberData}`)

            if (response.data.data) {
                setMaxNumberData(response.data.allRecord)
                setData(response.data.data.article)
                setLoadData(false)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleNumberData = () => {
        setLoadData(true)
        setNumberData(numberData + 3)
    }
    const [ArticleSelect, setArticleSelect] = useState<ArticleResponse | null>()

    const handleArticleSelect = (item: ArticleResponse) => {
        setArticleSelect(item)
        setModal(true)
    }

    const handleCloseModal = () => {
        setArticleSelect(null)
        setModal(false)
    }

    const [Modal, setModal] = useState<boolean>(false)

    const viewModal = () => {
        if (Modal === true) {
            document.body.style.overflow = 'hidden';
            return (
                <React.Fragment>
                    <div className="fixed top-0 left-0 w-screen min-h-screen bg-[#000000cf] z-50 p-4 overflow-y-scroll h-[100vh]">
                        <div className="flex justify-end fixed right-0 top-0 p-4">
                            <button onClick={handleCloseModal} className=' btn btn-ghost btn-circle text-white'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        {ArticleSelect ?
                            <>
                                <div className="flex justify-center">
                                    <div className="grid gap-3 lg:w-[70%] ">
                                        <div className="text-3xl text-white">{ArticleSelect.title}</div>
                                        <div className="text-gray-300 text-sm">{moment(ArticleSelect.createdAt).format('DD MMMM YYYY')}</div>
                                        <div className="p-2 rounded-md overflow-hidden">
                                            <div className="carousel w-full">
                                                <div id="item1" className="carousel-item w-full">
                                                    <img src="https://daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg" className=" w-full" />
                                                </div>
                                                <div id="item2" className="carousel-item w-full">
                                                    <img src="https://daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg" className=" w-full" />
                                                </div>
                                                <div id="item3" className="carousel-item w-full">
                                                    <img src="https://daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg" className=" w-full" />
                                                </div>
                                                <div id="item4" className="carousel-item w-full">
                                                    <img src="https://daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg" className=" w-full" />
                                                </div>
                                            </div>
                                            <div className="flex justify-center w-full py-2 gap-2">
                                                <a href="#item1" className="btn btn-xs">1</a>
                                                <a href="#item2" className="btn btn-xs">2</a>
                                                <a href="#item3" className="btn btn-xs">3</a>
                                                <a href="#item4" className="btn btn-xs">4</a>
                                            </div>
                                        </div>
                                        <div className="text-gray-200">{ArticleSelect.desc}</div>
                                    </div>
                                </div>
                            </>
                            :
                            <>
                                <div className="flex justify-center items-center">
                                    <span className="loading loading-dots loading-sm text-white"></span>
                                </div>
                            </>
                        }
                    </div>
                </React.Fragment>
            )
        } else {
            document.body.style.overflow = 'auto';
            return null
        }
    }


    useEffect(() => {
        getData()
    }, [numberData])
    return (
        <div className="bg-artikel relative">
            {viewModal()}
            <div className="min-h-[30vh] bg-[#00000098] w-full flex p-4 justify-center items-center">
                <div className="lg:w-[70%] w-full">
                    <div className="text-center text-white text-xl uppercase font-semibold p-1 pr-5 pl-5 mb-4">Daftar Artikel</div>
                    <div className="grid lg:grid-cols-1 gap-4">

                        {/* Card */}
                        {Data ?
                            Data.map((item: ArticleResponse, index: number) => {
                                const desc: any = item.desc
                                const truncatedString = desc.slice(0, 200) + " ...";
                                return (
                                    <React.Fragment key={index}>
                                        <div className="card bg-[#000000a0] rounded-md overflow-hidden">
                                            <div className="grid grid-cols-2">
                                                <button onClick={() => handleArticleSelect(item)} className=" overflow-hidden rounded-tr-3xl h-full">
                                                    <img src={`/page/default.jpg`} className='h-full object-cover active:scale-110 hover:scale-125 duration-200' alt="" />
                                                </button>
                                                <div className="p-2">
                                                    <div className="text-white font-semibold uppercase">{item.title}</div>
                                                    <div className="text-sm text-gray-400">{item.createdAt}</div>
                                                    <div className="p-3 text-gray-100 text-sm">{truncatedString}</div>
                                                    <button onClick={() => handleArticleSelect(item)} className='hover:scale-105 active:scale-95 duration-200 text-warning'>
                                                        <div className="">Read More</div>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                )
                            })
                            :
                            <>
                            </>
                        }
                        {numberData < maxNumberData &&
                            <button onClick={() => handleNumberData()} className='btn bg-[#3d3d3d94]  btn-wide rounded- hover:bg-stone-950 border-none text-white flex justify-between'>
                                <div className="">Next</div>
                                <div className="">
                                    {loadData === true && <span className="loading loading-spinner loading-md text-white"></span>}
                                </div>
                            </button>
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Artikel