import React, { useContext } from 'react'
import { BaseContext } from '../context/BaseContext'
import SectionHomeKegiatan from './SectionHomeKegiatan'
import SectionHomePelayananPublic from './SectionHomePelayananPublic'

const SectionHome = () => {
    const base: any = useContext(BaseContext)
    const color = base.color

    return (
        <React.Fragment>
            <div className='section'>
                <div className="item-section">
                    <div className="grid lg:md:grid-cols-10 gap-4 h-full">
                        <div className="lg:md:col-span-7 bg-white p-4">
                            <div className="flex justify-between">
                                <div className={`text-primary uppercase w-fit font-bold text-3xl pb-2 pr-5 border-b-8 border-primary`}>Kegiatan</div>
                                <button className="btn btn-transparant">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                    </svg>
                                </button>
                            </div>
                            <SectionHomeKegiatan />
                        </div>
                        <div className="lg:md:col-span-3 bg-info p-4 ">
                            <div className={`text-midDark uppercase w-fit font-bold text-3xl pb-2 pr-5 border-b-8 border-midDark`}>Pengumuman</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='section'>
                <div className="item-section ">
                    <div className="grid lg:md:grid-cols-10 gap-4 h-full">
                        <div className="lg:md:col-span-10 bg-white p-4">
                            <div className="flex justify-right">
                                <div className={`text-primary uppercase w-fit font-bold text-3xl pb-2 pr-5 border-b-8 border-primary`}>Pelayanan Publik</div>
                            </div>
                            <SectionHomePelayananPublic />
                        </div>
                    </div>
                </div>
            </div>
            <div className='section'>
                <div className="item-section">
                    <div className="grid lg:grid-cols-10 gap-4 h-full">
                        <div className="lg:md:col-span-10 bg-white p-4">
                            <div className="flex justify-between">
                                <div className={`text-primary uppercase w-fit font-bold text-3xl pb-2 pr-5 border-b-8 border-primary`}>Dokter Kami</div>
                            </div>
                            {/* <SectionHomePelayananPublic /> */}
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}

export default SectionHome