'use client'

import axios from 'axios'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faUserDoctor,
    faStethoscope,
    faClock,
    faCalendarDay,
    faMagnifyingGlass,
    faFilter,
    faRotateRight,
} from '@fortawesome/free-solid-svg-icons'
import { dokterResponse, JadwalDokterResponse } from '../Model/dokter.model'

const SIMRS_URL = process.env.SIMRS_URL || ''
const SIMRS_TOKEN = process.env.TOKEN || ''

const NAMA_HARI_ID = ['MINGGU', 'SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU'] as const

const getTodayNameID = (): string => {
    return NAMA_HARI_ID[new Date().getDay()]
}

/**
 * Menyusun urutan hari dimulai dari hari ini ke depan (misal: Kamis, Jumat, Sabtu, ...)
 */
const getOrderedHariOptions = (today: string): string[] => {
    const startIndex = NAMA_HARI_ID.indexOf(today as (typeof NAMA_HARI_ID)[number])
    if (startIndex === -1) return [...NAMA_HARI_ID]

    return [
        ...NAMA_HARI_ID.slice(startIndex),
        ...NAMA_HARI_ID.slice(0, startIndex),
    ]
}

/**
 * Normalisasi nama hari dari SIMRS (misal "AKHAD" -> "MINGGU")
 */
const normalizeHariSIMRS = (hari?: string): string => {
    const clean = (hari || '').toUpperCase().trim()
    return clean === 'AKHAD' ? 'MINGGU' : clean
}

const getDoctorPhotoUrl = (photo?: string | null): string => {
    if (typeof photo === 'string' && /^https?:\/\//i.test(photo.trim())) {
        return photo.trim()
    }
    return '/dokter/default.jpg'
}

const formatJam = (jam?: string): string => {
    if (!jam) return '-'
    return jam.length >= 5 ? jam.slice(0, 5) : jam
}

const Section: React.FC = () => {
    const [doctors, setDoctors] = useState<dokterResponse[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const [todayName, setTodayName] = useState<string>('ALL')
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [selectedPoli, setSelectedPoli] = useState<string>('ALL')
    const [selectedHari, setSelectedHari] = useState<string>('ALL')

// Set hari ini di sisi client agar tidak terjadi hydration mismatch SSR vs CSR
    useEffect(() => {
        const today = getTodayNameID()
        setTodayName(today)
        setSelectedHari(today)
    }, [])

    const hariOptions = useMemo(() => {
        return todayName !== 'ALL' ? getOrderedHariOptions(todayName) : [...NAMA_HARI_ID]
    }, [todayName])

    const fetchDoctors = useCallback(async (signal?: AbortSignal) => {
        setIsLoading(true)
        setErrorMessage(null)

        try {
            const endpoint = `${SIMRS_URL}/api/petugas/dokters`
            const headers = { Authorization: `Bearer ${SIMRS_TOKEN}` }
            const response = await axios.get(endpoint, { headers, signal })
            if (signal?.aborted) return

            if (Array.isArray(response.data?.data)) {
                setDoctors(response.data.data)
            } else {
                setDoctors([])
            }
        } catch (error) {
            if (!axios.isCancel(error)) {
                console.error('Error fetching daftar dokter:', error)
                setErrorMessage('Gagal memuat daftar dokter dan jadwal praktek. Silakan coba lagi.')
            }
        } finally {
            if (!signal?.aborted) {
                setIsLoading(false)
            }
        }
    }, [])

    useEffect(() => {
        const controller = new AbortController()
        fetchDoctors(controller.signal)

        return () => controller.abort()
    }, [fetchDoctors])

    const poliOptions = useMemo(() => {
        const setPoli = new Set<string>()
        doctors.forEach((doc) => {
            if (doc.poliklinik && doc.poliklinik.trim() !== '') {
                setPoli.add(doc.poliklinik.trim())
            }
        })
        return Array.from(setPoli).sort((a, b) => a.localeCompare(b, 'id'))
    }, [doctors])

    const filteredDoctors = useMemo(() => {
        const keyword = searchQuery.toLowerCase().trim()

        return doctors.filter((doc) => {
            const matchPoli = selectedPoli === 'ALL' || doc.poliklinik?.trim() === selectedPoli
            if (!matchPoli) return false

            const matchHari =
                selectedHari === 'ALL' ||
                (Array.isArray(doc.jadwalPraktek) &&
                    doc.jadwalPraktek.some(
                        (j) => normalizeHariSIMRS(j.hari_kerja) === selectedHari
                    ))
            if (!matchHari) return false

            if (!keyword) return true
            const nama = (doc.nm_dokter || '').toLowerCase()
            const spesialis = (doc.spesialis || '').toLowerCase()
            const poli = (doc.poliklinik || '').toLowerCase()

            return nama.includes(keyword) || spesialis.includes(keyword) || poli.includes(keyword)
        })
    }, [doctors, searchQuery, selectedPoli, selectedHari])

    const hasActiveFilter =
        searchQuery !== '' || selectedPoli !== 'ALL' || selectedHari !== todayName

    const handleResetFilter = () => {
        setSearchQuery('')
        setSelectedPoli('ALL')
        setSelectedHari(todayName)
    }

    return (
        <section className="w-full min-h-[70vh] py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header Halaman */}
                <header className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
                    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary bg-info px-3.5 py-1 rounded-full border border-primary/20 mb-3">
                        <FontAwesomeIcon icon={faUserDoctor} className="w-3.5 h-3.5" />
                        <span>Direktori Medis</span>
                    </span>
                    <h1 className="font-bold uppercase text-2xl sm:text-3xl lg:text-4xl text-dark tracking-tight">
                        Daftar Dokter &amp; Jadwal Praktek
                    </h1>
                    <p className="text-sm sm:text-base text-black/70 mt-2">
                        RSUD dr. Abdul Aziz Singkawang
                    </p>
                </header>

                {/* Bar Pencarian, Filter Poliklinik & Hari */}
                {!isLoading && !errorMessage && doctors.length > 0 && (
                    <div className="bg-white border border-[#002722]/10 rounded-2xl shadow-xs p-4 sm:p-5 mb-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 items-center">
                            {/* Pencarian Nama / Spesialis */}
                            <div className="sm:col-span-2 lg:col-span-5 relative">
                                <FontAwesomeIcon
                                    icon={faMagnifyingGlass}
                                    className="w-4 h-4 text-black/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                                />
                                <input
                                    type="search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Cari nama dokter atau spesialisasi..."
                                    aria-label="Cari nama dokter atau spesialisasi"
                                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#f8fbfa] border border-[#002722]/15 rounded-xl focus:outline-none focus:border-primary focus:bg-white transition-colors"
                                />
                            </div>

                            {/* Filter Poliklinik */}
                            <div className="lg:col-span-3 relative">
                                <FontAwesomeIcon
                                    icon={faFilter}
                                    className="w-3.5 h-3.5 text-primary absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                                />
                                <select
                                    value={selectedPoli}
                                    onChange={(e) => setSelectedPoli(e.target.value)}
                                    aria-label="Filter poliklinik"
                                    className="w-full pl-9 pr-8 py-2.5 text-sm bg-[#f8fbfa] border border-[#002722]/15 rounded-xl focus:outline-none focus:border-primary focus:bg-white transition-colors cursor-pointer"
                                >
                                    <option value="ALL">Semua Poliklinik</option>
                                    {poliOptions.map((poli) => (
                                        <option key={poli} value={poli}>
                                            {poli}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Filter Hari Praktek (Diurutkan mulai hari ini) */}
                            <div className="lg:col-span-2 relative">
                                <FontAwesomeIcon
                                    icon={faCalendarDay}
                                    className="w-3.5 h-3.5 text-primary absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                                />
                                <select
                                    value={selectedHari}
                                    onChange={(e) => setSelectedHari(e.target.value)}
                                    aria-label="Filter hari praktek"
                                    className="w-full pl-9 pr-8 py-2.5 text-sm bg-[#f8fbfa] border border-[#002722]/15 rounded-xl focus:outline-none focus:border-primary focus:bg-white transition-colors cursor-pointer"
                                >
                                    <option value="ALL">Semua Hari</option>
                                    {hariOptions.map((hari) => {
                                        const labelHari = hari.charAt(0) + hari.slice(1).toLowerCase()
                                        const isToday = hari === todayName

                                        return (
                                            <option key={hari} value={hari}>
                                                {isToday ? `${labelHari} (Hari Ini)` : labelHari}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>

                            {/* Counter & Reset */}
                            <div className="sm:col-span-2 lg:col-span-2 flex items-center justify-between lg:justify-end gap-2">
                                <span className="text-xs font-semibold text-midDark bg-info px-3 py-1.5 rounded-lg whitespace-nowrap">
                                    {filteredDoctors.length} Dokter
                                </span>
                                {hasActiveFilter && (
                                    <button
                                        type="button"
                                        onClick={handleResetFilter}
                                        className="text-xs font-semibold text-primary hover:underline px-2 py-1.5 cursor-pointer"
                                    >
                                        Reset
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Konten Grid */}
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                        {[1, 2, 3, 4, 5, 6].map((skeleton) => (
                            <div
                                key={skeleton}
                                className="bg-white border border-[#002722]/10 rounded-2xl overflow-hidden shadow-xs animate-pulse"
                            >
                                <div className="aspect-square w-full bg-base-200" />
                                <div className="p-5 space-y-3">
                                    <div className="h-5 bg-base-200 rounded w-3/4 mx-auto" />
                                    <div className="h-4 bg-base-200 rounded w-1/2 mx-auto" />
                                    <div className="pt-3 border-t border-base-200 space-y-2">
                                        <div className="h-3.5 bg-base-200 rounded w-full" />
                                        <div className="h-3.5 bg-base-200 rounded w-5/6" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : errorMessage ? (
                    <div className="max-w-lg mx-auto bg-white border border-error/25 rounded-2xl p-8 text-center space-y-4 shadow-xs">
                        <p className="text-sm sm:text-base text-error font-medium">{errorMessage}</p>
                        <button
                            type="button"
                            onClick={() => fetchDoctors()}
                            className="button button-primary text-sm px-5 py-2.5 inline-flex items-center gap-2"
                        >
                            <FontAwesomeIcon icon={faRotateRight} className="w-3.5 h-3.5" />
                            <span>Muat Ulang Data</span>
                            </button>
                        </div>
                    ) : filteredDoctors.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                            {filteredDoctors.map((item, index) => (
                                <article
                                    key={item.kd_dokter ?? index}
                                    className="card-dokter group bg-white border border-[#002722]/10 flex flex-col justify-between h-full"
                                >
                                    <div>
                                        {/* Foto Dokter */}
                                        <div className="relative aspect-square w-full overflow-hidden bg-[#f8fbfa]">
                                            <img
                                                src={getDoctorPhotoUrl(item.photo)}
                                                alt={item.nm_dokter || 'Foto Dokter'}
                                                loading="lazy"
                                                onError={(e) => {
                                                    e.currentTarget.src = '/dokter/default.jpg'
                                                }}
                                                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                                            />
                                            {item.poliklinik && (
                                                <span className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-xs text-dark text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xs inline-flex items-center gap-1.5 border border-[#002722]/10">
                                                    <FontAwesomeIcon
                                                        icon={faStethoscope}
                                                        className="w-3.5 h-3.5 text-primary shrink-0"
                                                    />
                                                    <span className="truncate">{item.poliklinik}</span>
                                                </span>
                                            )}
                                        </div>

                                        {/* Identitas Dokter */}
                                        <div className="p-5 text-center border-b border-[#002722]/10">
                                            <h2 className="text-base sm:text-lg font-bold text-dark leading-snug line-clamp-2">
                                                {item.nm_dokter}
                                            </h2>
                                            {item.spesialis && (
                                                <p className="text-xs sm:text-sm font-medium text-primary italic mt-1">
                                                    Spesialis {item.spesialis}
                                                </p>
                                            )}
                                        </div>
                                </div>

                                    {/* Jadwal Praktek */}
                                    <div className="p-5 bg-[#f8fbfa] flex-1">
                                        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-midDark mb-3">
                                            <FontAwesomeIcon icon={faClock} className="w-3.5 h-3.5 text-primary" />
                                            <span>Jadwal Praktek</span>
                                        </div>

                                        {item.jadwalPraktek && item.jadwalPraktek.length > 0 ? (
                                            <ul className="space-y-1.5">
                                                {item.jadwalPraktek.map((jadwal: JadwalDokterResponse, jIdx: number) => {
                                                    const normalizedJadwalHari = normalizeHariSIMRS(jadwal.hari_kerja)
                                                    const isHighlightedDay =
                                                        selectedHari !== 'ALL'
                                                            ? normalizedJadwalHari === selectedHari
                                                            : normalizedJadwalHari === todayName

                                                    return (
                                                        <li
                                                            key={jIdx}
                                                            className={`flex items-center justify-between text-xs sm:text-sm rounded-lg px-3 py-1.5 border transition-colors ${isHighlightedDay
                                                                ? 'bg-info border-primary/40 font-semibold'
                                                                : 'bg-white border-[#002722]/10'
                                                                }`}
                                                        >
                                                            <span className="font-semibold text-dark">
                                                                {jadwal.hari_kerja}
                                                            </span>
                                                            <span className="font-medium text-primary tabular-nums">
                                                                {formatJam(jadwal.jam_mulai)} - {formatJam(jadwal.jam_selesai)}
                                                            </span>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        ) : (
                                            <p className="text-xs text-black/50 italic">
                                                Jadwal praktek belum tersedia.
                                            </p>
                                        )}
                                </div>
                                </article>
                            ))}
                            </div>
                        ) : (
                            <div className="bg-white border border-[#002722]/10 rounded-2xl py-12 px-4 text-center space-y-3">
                                <p className="text-sm sm:text-base text-black/70 font-medium">
                                    {selectedHari === todayName && !searchQuery && selectedPoli === 'ALL'
                                        ? 'Tidak ada jadwal praktek dokter untuk hari ini.'
                                        : 'Tidak ditemukan dokter yang sesuai dengan filter pencarian Anda.'}
                                </p>
                                <div className="flex justify-center gap-2">
                                    {selectedHari !== 'ALL' && (
                                        <button
                                            type="button"
                                            onClick={() => setSelectedHari('ALL')}
                                            className="button button-primary text-xs sm:text-sm px-4 py-2"
                                        >
                                            Lihat Semua Hari
                                        </button>
                                    )}
                                    {hasActiveFilter && (
                                        <button
                                            type="button"
                                            onClick={handleResetFilter}
                                            className="button button-info text-xs sm:text-sm px-4 py-2"
                                        >
                                            Reset Filter
                                        </button>
                                    )}
                                </div>
                            </div>
                )}
            </div>
        </section>
    )
}

export default Section