'use client'
import React, { useEffect, useRef, useState } from 'react'
import { maklumatPelayananResponse } from '../Model/maklumatPelayanan.model'
import { motion, useInView, useAnimation } from "framer-motion"
import axios from 'axios'

const SectionStandarPelayanan = () => {
    const motionRef = useRef(null)
    const isInView = useInView(motionRef, { once: true })
    const mainControls = useAnimation()

    const [data, setData] = useState<maklumatPelayananResponse[]>([])
    // State untuk menyimpan URL gambar yang dipilih untuk pratinjau modal
    const [selectedImage, setSelectedImage] = useState<string | null>(null)

    const API_URL = process.env.API_URL // Pastikan menggunakan NEXT_PUBLIC_ untuk env di sisi client

    const getData = async () => {
        try {
            const response = await axios.get(`${API_URL}/maklumat-pelayanan`)

            if (response.data.success == true) {
                setData(response.data.data)
            }
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }

    useEffect(() => {
        getData()
        if (isInView) {
            mainControls.start("visible")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isInView])

    // Mengunci body scroll dan menangani tombol Esc saat modal terbuka
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setSelectedImage(null)
            }
        }

        if (selectedImage) {
            document.body.style.overflow = 'hidden' // Kunci scroll
            window.addEventListener('keydown', handleEsc)
        } else {
            document.body.style.overflow = 'unset' // Kembalikan scroll
        }

        // Cleanup function
        return () => {
            document.body.style.overflow = 'unset'
            window.removeEventListener('keydown', handleEsc)
        }
    }, [selectedImage])

    return (
        <>
            {/* Ditambahkan overflow-hidden di wrapper utama agar aman jika ada elemen anak yang berusaha menembus batas layar */}
            <div className="flex justify-center w-full overflow-hidden">
                <div className="p-4 w-full lg:w-[90%]">
                    <div className={`text-primary uppercase w-fit font-bold text-xl pb-2 pr-5 border-b-4 border-primary mb-4`}>
                        Standar Pelayanan
                    </div>

                    <motion.div
                        // Perbaikan layout: w-fit diganti menjadi w-full agar tidak melebihi layout parent
                        className="carousel rounded-box w-full py-4"
                        ref={motionRef}
                        variants={{
                            hidden: { opacity: 0, x: 200 },
                            visible: { opacity: 1, x: 0 }
                        }}
                        initial="hidden"
                        animate={mainControls}
                        transition={{ duration: 1.5, delay: 0 }}
                    >
                        {data && data.length > 0 && data.map((item: maklumatPelayananResponse, index: number) => {
                            return (
                                <div
                                    className={`carousel-item relative group overflow-hidden cursor-pointer lg:w-72 w-72 h-auto rounded-xl ${index < data.length - 1 ? 'mr-2' : ''}`}
                                    key={index}
                                    onClick={() => setSelectedImage(item.file ?? null)}
                                >
                                    {/* Efek Hover Zoom pada gambar */}
                                    <img
                                        src={item.file}
                                        alt="Maklumat-pelayanan"
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />

                                    {/* Overlay "Lihat foto" */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <span className="text-white font-medium text-lg flex items-center gap-2 drop-shadow-md">
                                            🔍 Lihat foto
                                        </span>
                                    </div>
                                </div>
                            )
                        })}
                    </motion.div>
                </div>
            </div>

            {/* Modal Pratinjau Foto */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm p-4"
                    onClick={() => setSelectedImage(null)} // Tutup saat klik background (di luar gambar)
                >
                    {/* Tombol Tutup (X) */}
                    <button
                        className="absolute top-6 right-6 text-white hover:text-gray-300 text-5xl leading-none z-[60] transition-colors"
                        onClick={() => setSelectedImage(null)}
                        aria-label="Tutup pratinjau"
                    >
                        &times;
                    </button>

                    {/* Wrapper Gambar (hentikan event klik agar tidak menutup modal saat gambar diklik) */}
                    <div
                        className="relative flex flex-col items-center justify-center w-full max-w-5xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={selectedImage}
                            alt="Pratinjau Dokumen"
                            className="w-auto h-auto max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                        />

                        {/* Hint Text */}
                        <p className="text-white/80 mt-6 text-sm md:text-base font-light tracking-wide bg-black/30 px-4 py-2 rounded-full">
                            Klik di luar atau tekan <kbd className="font-sans bg-white/20 px-2 py-0.5 rounded text-white">Esc</kbd> untuk menutup
                        </p>
                    </div>
                </div>
            )}
        </>
    )
}

export default SectionStandarPelayanan