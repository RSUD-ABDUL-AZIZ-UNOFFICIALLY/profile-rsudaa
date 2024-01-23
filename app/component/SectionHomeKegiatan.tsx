import Image from 'next/image'
import React from 'react'
import item from "../../public/hospital.webp";
const SectionHomeKegiatan = () => {
    const date = new Date()
    const today = `${date.getDate()} ${date.getMonth() + 1} ${date.getFullYear()}`
    return (
        <>
            <div className="grid gap-4">
                <div className='grid lg:md:grid-cols-10 '>
                    <div className="col-span-5 overflow-hidden">
                        <Image
                            src={item}
                            alt="Picture of the author"
                            sizes='100%'
                            style={{
                                objectFit: 'cover', // cover, contain, none
                            }}
                        />
                    </div>
                    <div className="col-span-5 lg:md:pl-3 lg:md:pr-3 text-black h-full">
                        <div className="flex items-center gap-2">
                            <div className="lg:md:text-3xl text-xl font-bold ">Lorem ipsum dolor sit amet </div>
                        </div>
                        <div className="bg-yellow-400 p-2 text-xs w-fit rounded-sm">{today}</div>
                        <div className="text-justify p-3 overflow-hidden">Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero commodi, provident officia ea ut quam eum est, officiis amet doloribus atque dolores quaerat facere et debitis repellat ad autem minus odio, magnam unde consequatur suscipit corporis? Vitae nam repellat cupiditate quo minus, ut distinctio sint omnis beatae assumenda et nemo id pariatur eveniet eligendi impedit voluptatibus eos! </div>
                        <button className="btn btn-primary text-white mt-2">Read more</button>
                    </div>
                </div>
                <div className='grid lg:md:grid-cols-10'>
                    <div className="col-span-5 overflow-hidden">
                        <Image
                            src={item}
                            alt="Picture of the author"
                            sizes='100%'
                            style={{
                                objectFit: 'cover', // cover, contain, none
                            }}
                        />
                    </div>
                    <div className="col-span-5 lg:md:pl-3 lg:md:pr-3 text-black h-full">
                        <div className="flex items-center gap-2 sm:mt-2">
                            <div className="lg:md:text-3xl text-xl font-bold ">Lorem ipsum dolor sit amet </div>
                        </div>
                        <div className="bg-yellow-400 p-2 text-xs w-fit rounded-sm">{today}</div>
                        <div className="text-justify p-3 overflow-hidden">Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero commodi, provident officia ea ut quam eum est, officiis amet doloribus atque dolores quaerat facere et debitis repellat ad autem minus odio, magnam unde consequatur suscipit corporis? Vitae nam repellat cupiditate quo minus, ut distinctio sint omnis beatae assumenda et nemo id pariatur eveniet eligendi impedit voluptatibus eos! </div>
                        <button className="btn btn-primary text-white mt-2">Read more</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SectionHomeKegiatan