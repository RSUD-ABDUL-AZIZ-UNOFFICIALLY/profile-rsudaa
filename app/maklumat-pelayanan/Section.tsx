'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Section = () => {
    const [itemDesc, setItemDesc] = useState<string>()
    const [direktur, setDirektur] = useState<string>()
    const [signDirektur, setSignDirektur] = useState<string>()

    const API_URL = process.env.API_URL

    const getDesc = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/profile/maklumat-pelayanan`)

            if (response.data.data) {
                setItemDesc(response.data.data.desc)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getDirektur = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/profile/nameDirektur`)
            if (response.data.data) {
                setDirektur(response.data.data.desc)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getSignDirektur = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/profile/signDirektur`)

            if (response.data.data) {
                setSignDirektur(response.data.data.desc)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getDesc()
        getDirektur()
        getSignDirektur()
    }, [])

    return (
        <div className='flex justify-center p-2'>
            <div className="lg:w-[80%] p-2">
                {itemDesc ?
                    <div className="text-center text-lg">
                        <span className='m-1 bg-primary text-white rounded-sm p-1'>Maklumat Pelayanan RSUD dr Abdul Aziz</span>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente obcaecati cupiditate veritatis, dolores earum ad quae voluptates similique reiciendis, ullam alias, ab suscipit ducimus? Accusantium suscipit ab tempora velit voluptates, nam tenetur deserunt quibusdam in incidunt voluptate delectus eum obcaecati ut veniam eaque pariatur dolorem maxime ipsum hic? Impedit id obcaecati debitis expedita beatae fugit ad, ipsam omnis temporibus labore mollitia reiciendis! Praesentium eos iure odio corrupti rerum similique quo obcaecati sint voluptas facilis, ratione officiis at voluptates libero. Expedita culpa earum non provident corporis vitae eveniet temporibus rem, enim, deserunt repudiandae necessitatibus ab minus voluptatem perspiciatis deleniti dolor fuga? Ipsa minus fugit odit blanditiis, hic molestiae cumque iure dicta voluptas quisquam? Vero, unde et, similique ipsum alias asperiores soluta consequuntur, repudiandae deserunt voluptates nobis cupiditate odio obcaecati voluptas beatae sequi quisquam distinctio fugiat molestias sint recusandae numquam eligendi. Asperiores nostrum tenetur ipsum. Libero esse animi assumenda consequatur nulla, et magni nobis aspernatur incidunt explicabo porro perspiciatis quam illo soluta inventore, impedit itaque veritatis laboriosam cupiditate praesentium voluptate voluptates! Aspernatur, fugiat non neque consequatur aut fugit, quae inventore maiores nostrum possimus asperiores magnam eveniet. Soluta, provident. Veniam aperiam ut, distinctio at totam rerum praesentium magnam illo maiores velit alias deleniti.
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
    )
}

export default Section