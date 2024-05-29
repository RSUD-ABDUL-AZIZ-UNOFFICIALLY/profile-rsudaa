'use client'
import axios from 'axios'
import React, { use, useContext, useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { BaseContext } from '@/app/context/BaseContext'
import { MagangResponse } from '@/app/Model/magang.model'


interface Props {
    item: MagangResponse
}

const FormMagangLoker: React.FC<Props> = ({ item }) => {
    const baseContext = useContext(BaseContext)
    type Inputs = {
        email: string
        nik: string
        no_wa: string
        fullName: string
        tanggalLahir: string
        magangId: string
        sekolah: string
        jenjang: string
        jurusan: string
        address: string
        fileResume: string,
        fileApply: string,
        fileOther: string
    }
    const { register, handleSubmit, watch, setValue, formState: { errors }, reset } = useForm<Inputs>({
        defaultValues: {
            magangId: item.id
        }
    })

    const [fileResume, setFileResume] = useState<any>()
    const [fileApply, setFileApply] = useState<any>()
    const [fileOther, setFileOther] = useState<any>()


    const itemJenjang = [
        { name: 'S1' },
        { name: 'S2' },
        { name: 'D4' },
        { name: 'D3' },
        { name: 'D2' },
        { name: 'D1' },
        { name: 'SMA' },
    ]

    const API_URL = process.env.API_URL

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const formData = new FormData
            formData.append('magangId', data.magangId)
            formData.append('email', data.email)
            formData.append('nik', data.nik)
            formData.append('no_wa', data.no_wa)
            formData.append('fullName', data.fullName)
            formData.append('tanggalLahir', data.tanggalLahir)
            formData.append('sekolah', data.sekolah)
            formData.append('jenjang', data.jenjang)
            formData.append('jurusan', data.jurusan)
            formData.append('address', data.address)
            formData.append('fileResume', data.fileResume)
            formData.append('fileApply', data.fileApply)
            formData.append('fileOther', data.fileOther)

            const response = await axios.post(`${API_URL}/app-loker/post`, data)

            if (response.data.success == true) {
                window.scroll({
                    top: 0,
                    behavior: 'smooth'
                })
                baseContext.setAlertSuccessApplyLoker(true)
                reset()
                setTimeout(() => {
                    baseContext.setAlertSuccessApplyLoker(false)
                }, 10000)
            }

        } catch (error) {

        }
    }

    const TOKEN = process.env.TOKEN

    const SIMRS_URL = process.env.SIMRS_URL



    const hanldeFileResume = async () => {
        try {
            const formData: any = new FormData()

            formData.append('file', fileResume[0])

            const response = await axios.post(`${SIMRS_URL}/api/cdn/upload/file`, formData, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`
                }
            })

            if (response.data) {
                setValue('fileResume', response.data.data.url)
            }
        } catch (error) {
            //console.log(error);
        }
    }

    const hanldeFileApply = async () => {
        try {
            const formData: any = new FormData()
            formData.append('file', fileApply[0])

            const response = await axios.post(`${SIMRS_URL}/api/cdn/upload/file`, formData, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`
                }
            })

            if (response.data) {
                setValue('fileApply', response.data.data.url)
            }
        } catch (error) {
            //console.log(error);
        }
    }

    const hanldeFileOther = async () => {
        try {
            const formData: any = new FormData()
            formData.append('file', fileOther[0])

            const response = await axios.post(`${SIMRS_URL}/api/cdn/upload/file`, formData, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`
                }
            })

            if (response.data) {
                setValue('fileOther', response.data.data.url)
            }
        } catch (error) {
            //console.log(error);
        }
    }

    useEffect(() => {
        register('fileResume', { required: true })
        register('fileApply', { required: true })
        // checkLogin()
    }, [])

    return (
        <div className='mt-[10vh] flex justify-center'>
            <div className="grid lg:grid-cols-2 gap-2 lg:w-[80%] w-full">
                {baseContext.alertSuccessApplyLoker === true &&
                    <div className="lg:col-span-2">
                        <div className="p-2 bg-primary text-white">Submit Loker Sukses</div>
                    </div>
                }
                <div className="lg:col-span-2 w-fit text-primary pb-2 pr-5 border-b-4 border-primary font-bold uppercase">FORM DAFTAR</div>
                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text"><span className='text-red-600'>*</span>Nama Lengkap</span>
                    </div>
                    <input type="text" {...register("fullName", { required: true })} placeholder="Masukan nama lengkap" className="input input-bordered rounded-sm w-full" />
                    {errors.fullName &&
                        <div className="flex justify-end">
                            <span className='text-xs mt-2 p-1 bg-red-600 text-white rounded-sm'>* Nama Lengkap Harus Di Isi</span>
                        </div>
                    }
                </label>
                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text"><span className='text-red-600'>*</span>NIK</span>
                    </div>
                    <input type="number" min={0} {...register("nik", { required: true })} placeholder="Masukan NIK" className="input input-bordered rounded-sm w-full" />
                    {errors.nik &&
                        <div className="flex justify-end">
                            <span className='text-xs mt-2 p-1 bg-red-600 text-white rounded-sm'>* NIK Harus Di Isi</span>
                        </div>
                    }
                </label>
                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text"><span className='text-red-600'>*</span>Tanggal Lahir</span>
                    </div>
                    <input type="date" min={0} {...register("tanggalLahir", { required: true })} placeholder="Masukan NIK" className="input input-bordered rounded-sm w-full" />
                    {errors.tanggalLahir &&
                        <div className="flex justify-end">
                            <span className='text-xs mt-2 p-1 bg-red-600 text-white rounded-sm'>* Tanggal Lahir Harus Di Isi</span>
                        </div>
                    }
                </label>
                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text"><span className='text-red-600'>*</span>Nomor Whatsapp</span>
                    </div>
                    <input type="number" min={0} {...register("no_wa", { required: true })} placeholder="Masukan nomor whatsapp" className="input input-bordered rounded-sm w-full" />
                    {errors.no_wa &&
                        <div className="flex justify-end">
                            <span className='text-xs mt-2 p-1 bg-red-600 text-white rounded-sm'>* Nomor Whatsapp Harus Di Isi</span>
                        </div>
                    }
                </label>
                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text"><span className='text-red-600'>*</span>Email</span>
                    </div>
                    <input type="text" {...register("email", { required: true })} placeholder="Masukan email" className="input input-bordered rounded-sm w-full" />
                    {errors.email &&
                        <div className="flex justify-end">
                            <span className='text-xs mt-2 p-1 bg-red-600 text-white rounded-sm'>* Email Harus Di Isi</span>
                        </div>
                    }
                </label>
                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text"><span className='text-red-600'>*</span>Instansi Pendidikan Terakhir</span>
                    </div>
                    <input type="text" {...register("sekolah", { required: true })} placeholder="Masukan pendidikan" className="input input-bordered rounded-sm w-full" />
                    {errors.sekolah &&
                        <div className="flex justify-end">
                            <span className='text-xs mt-2 p-1 bg-red-600 text-white rounded-sm'>* Instansi Pendidikan Harus Di Isi</span>
                        </div>
                    }
                </label>
                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text"><span className='text-red-600'>*</span>Jenjang Pendidikan</span>
                    </div>
                    <select defaultValue={""} {...register("jenjang", { required: true })} className="select select-bordered w-full rounded-sm">
                        <option value={""} disabled hidden>Pilih Jenjang</option>
                        {itemJenjang.map((jenjang: { name: string }, index: number) => {
                            return (
                                <option value={jenjang.name} key={index}>{jenjang.name}</option>
                            )
                        })}
                    </select>
                    {errors.jenjang &&
                        <div className="flex justify-end">
                            <span className='text-xs mt-2 p-1 bg-red-600 text-white rounded-sm'>* Jenjang Pendidikan Harus Di Isi</span>
                        </div>
                    }
                </label>
                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text"><span className='text-red-600'>*</span>Jurusan</span>
                    </div>
                    <input type="text" {...register("jurusan", { required: true })} placeholder="Masukan jurusan" className="input input-bordered rounded-sm w-full" />
                    {errors.jurusan &&
                        <div className="flex justify-end">
                            <span className='text-xs mt-2 p-1 bg-red-600 text-white rounded-sm'>* Jurusan Harus Di Isi</span>
                        </div>
                    }
                </label>
                <label className="lg:col-span-2 form-control w-full ">
                    <div className="label">
                        <span className="label-text"><span className='text-red-600'>*</span>Alamat</span>
                    </div>
                    <textarea {...setValue} {...register("address", { required: true })} placeholder='Masukan Alamat' className='textarea textarea-bordered rounded-sm' name="address" rows={3} id=""></textarea>
                    {errors.address &&
                        <div className="flex justify-end">
                            <span className='text-xs mt-2 p-1 bg-red-600 text-white rounded-sm'>* Alamat Harus Di Isi</span>
                        </div>
                    }
                </label>
                <div className="lg:col-span-2">
                    <div className="grid gap-1">
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text"><span className='text-red-600'>*</span>File CV <span className='p-1 bg-success rounded-sm text-white'>Format .pdf</span></span>
                            </div>
                            <div className="lg:flex grid lg:items-center">
                                <input type="file" onChange={(e) => setFileResume(e.target.files)} accept='.pdf' className="file-input file-input-bordered w-full rounded-sm lg:max-w-[70%]" />
                                <button onClick={hanldeFileResume} className='btn rounded-none lg:max-w-28'>Upload file CV</button>
                            </div>
                        </label>
                        {watch('fileResume') &&
                            <div className="p-2 bg-lime-500 h-full rounded-sm text-white text-[10px] w-fit">
                                File Resume Sudah Benar
                            </div>
                        }
                        {errors.fileResume &&
                            <div className="flex justify-end">
                                <span className='text-xs mt-2 p-1 bg-red-600 text-white rounded-sm'>* File Surat Lamaran Harus Di Isi</span>
                            </div>
                        }
                    </div>
                    <div className="grid gap-1">
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text"><span className='text-red-600'>*</span>File Surat lamaran <span className='p-1 bg-success rounded-sm text-white'>Format .pdf</span></span>
                            </div>
                            <div className="lg:flex grid">
                                <input type="file" onChange={(e) => setFileApply(e.target.files)} accept='.pdf' className="file-input file-input-bordered w-full rounded-sm lg:max-w-[70%]" />
                                <button onClick={hanldeFileApply} className='btn rounded-none lg:max-w-28'>Upload Surat Lamaran</button>
                            </div>
                        </label>
                        {watch('fileApply') &&
                            <div className="p-2 bg-lime-500 h-full rounded-sm text-white text-[10px] w-fit">
                                File Lamaran Sudah Benar
                            </div>
                        }
                        {errors.fileApply &&
                            <div className="flex justify-end">
                                <span className='text-xs mt-2 p-1 bg-red-600 text-white rounded-sm'>* File Lamaran Harus Di Isi</span>
                            </div>
                        }
                    </div>
                    <div className="grid gap-1">
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">File Pendukung <span className='p-1 bg-success rounded-sm text-white'>Format .pdf</span></span>
                            </div>
                            <div className="lg:flex grid">
                                <input type="file" onChange={(e) => setFileOther(e.target.files)} accept='.pdf' className="file-input file-input-bordered w-full rounded-sm lg:max-w-[70%]" />
                                <button onClick={hanldeFileOther} className='btn rounded-none lg:max-w-28'>Upload Pendukung</button>
                            </div>
                        </label>
                        {watch('fileOther') &&
                            <div className="p-2 bg-lime-500 h-full rounded-sm text-white text-[10px] w-fit">
                                File Pendukung Sudah Benar
                            </div>
                        }
                    </div>
                </div>
                <div className="lg:col-span-2">
                    <hr className='mt-3 mb-3' />
                    <button onClick={handleSubmit(onSubmit)} className='btn btn-primary w-full rounded-sm'>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default FormMagangLoker