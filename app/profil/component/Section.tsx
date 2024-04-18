import React from 'react'
import VisiMisi from './visiMisi'
import AboutUs from './AboutUs'
import History from './History'
import SectionPelayananPublik from '@/app/comp-dashboard/SectionPelayananPublik'
import SectionDokter from '@/app/comp-dashboard/SectionDokter'

const Section = () => {
    return (
        <div>
            <AboutUs />
            <VisiMisi />
            <History />
            <SectionPelayananPublik />
            <SectionDokter />
        </div>
    )
}

export default Section