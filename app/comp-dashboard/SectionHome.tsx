import React from 'react'
import SectionPelayananPublik from './SectionPelayananPublik'
import SectionKegiatan from './SectionKegiatan'
import SectionDokter from './SectionDokter'
import SectionStandarPelayanan from '../maklumat-pelayanan/SectionStandarPelayanan'

const SectionHome: React.FC = () => {
    return (
        <main className="w-full space-y-12 sm:space-y-16 pb-16">
            {/* Bagian Utama: Layanan Publik & Kegiatan */}
            <div className="section">
                <div className="item-section space-y-10 sm:space-y-14">
                    <SectionPelayananPublik />
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                        <div className="lg:col-span-12">
                            <SectionKegiatan />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bagian Maklumat & Standar Pelayanan dengan permukaan kontras lembut */}
            <div className="w-full border-y border-[#002722]/10 py-10 sm:py-14">
                <SectionStandarPelayanan />
            </div>

            {/* Bagian Profil Dokter */}
            <div className="w-full">
                <SectionDokter />
            </div>
        </main>
    )
}

export default SectionHome