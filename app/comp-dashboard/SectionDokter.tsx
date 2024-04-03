import Image from 'next/image'
import React from 'react'
import dokter1 from '../../public/dokter/1.jpeg';
import dokter2 from '../../public/dokter/2.jpeg';
import dokter3 from '../../public/dokter/5.jpeg';
import dokter4 from '../../public/dokter/6.jpg';
import dokter5 from '../../public/dokter/4.jpeg';
function SectionDokter() {
    return (
        <div className='section'>
            <div className="item-section">
                <div className="grid lg:grid-cols-10 lg:md:gap-4 h-full">
                    <div className="lg:md:col-span-10 bg-white p-4">
                        <div className="flex justify-center">
                            <div className={`text-primary uppercase w-fit font-bold text-3xl pb-2 pr-2 pl-2 border-b-8 border-primary`}>Dokter Kami</div>
                        </div>
                        <div className="flex gap-6 flex-wrap justify-center mt-4 lg:md:pl-[120px] lg:md:pr-[120px]">
                            <div className="flex justify-center lg:md:w-[22%] w-[45%]">
                                <div className="card-dokter lg:md:w-[100%]">
                                    <div className="body h-full">
                                        <Image
                                            src={dokter1}
                                            alt="Picture of the author"
                                            className='img-dokter object-fill w-full'
                                        />
                                        <div className="desc w-max">
                                            <div className="name">Nama Dokter</div>
                                            <div className="poli">
                                                Poliklinik
                                            </div>
                                            <div className="motto">
                                                "Lorem ipsum dolor sit amet consectetur adipisicing elit"
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default SectionDokter