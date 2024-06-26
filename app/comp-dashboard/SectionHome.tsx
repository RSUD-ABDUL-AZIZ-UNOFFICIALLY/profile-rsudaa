'use client'
import React from 'react'
import SectionPelayananPublik from './SectionPelayananPublik'
import SectionKegiatan from './SectionKegiatan'
import SectionPengumuman from './SectionPengumuman'
import SectionDokter from './SectionDokter'
import SectionStandarPelayanan from '../maklumat-pelayanan/SectionStandarPelayanan'

const SectionHome = () => {
    return (
        <React.Fragment>
            <div className='section'>
                <div className="item-section">
                    <div className="grid lg:md:grid-cols-10 lg:md:gap-4 h-full">
                        <div className="lg:md:col-span-3">
                            <SectionPengumuman />
                        </div>
                        <div className="lg:md:col-span-7">
                            <SectionKegiatan />
                        </div>
                    </div>
                </div>
            </div>
            <SectionPelayananPublik />
            <SectionStandarPelayanan />
            <SectionDokter />

        </React.Fragment>
    )
}

export default SectionHome