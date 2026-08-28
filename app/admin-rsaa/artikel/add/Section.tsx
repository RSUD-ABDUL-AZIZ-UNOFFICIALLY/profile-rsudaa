'use client'
import { AnnoucementResponse } from '@/app/Model/announcement.model'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import axios from 'axios'
import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react'
import Cookies from "js-cookie";
import moment from 'moment';
import AlertSuccess from '../../ComponentAdmin/AlertSuccess'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

// 1. Wrapper khusus untuk dynamic import ReactQuill agar bisa menerima 'ref'
const ReactQuillWrapper = dynamic(
    async () => {
        const { default: RQ } = await import('react-quill');
        // eslint-disable-next-line react/display-name
        return ({ forwardedRef, ...props }: any) => <RQ ref={forwardedRef} {...props} />;
    },
    { ssr: false, loading: () => <p>Loading editor...</p> }
);

require('moment/locale/id');
moment.locale('id');

const Section = () => {
    const API_URL = process.env.API_URL
    const SIMRS_URL = process.env.SIMRS_URL
    const GeneralToken = process.env.TOKEN
    const access_token = Cookies.get('access_token')
    const navigation = useRouter()

    const [success, setSuccess] = useState<boolean>(false)
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [dataFile, setDataFile] = useState<any>('')

    // 2. Buat Ref untuk mengakses instance Quill
    const quillRef = useRef<any>(null);

    type Inputs = {
        title: string
        desc: string
        images: string
    }

    const { register, handleSubmit, watch, setValue, control, formState: { errors }, reset } = useForm<Inputs>()

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            setDataFile(file)
        }
    };

    // 3. Custom Image Handler untuk Quill
    const imageHandler = useCallback(() => {
        // Buat elemen input file secara dinamis
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files ? input.files[0] : null;
            if (!file) return;

            const formData = new FormData();
            formData.append('image', file);

            try {
                // Upload gambar ke endpoint API Anda
                const upload = await axios.post(`${SIMRS_URL}/api/cdn/upload/img`, formData, {
                    headers: {
                        Authorization: `Bearer ${GeneralToken}`
                    }
                });

                const imageUrl = upload.data.data.url;

                // Dapatkan instance editor Quill dari ref
                const quillEditor = quillRef.current?.getEditor();

                if (quillEditor) {
                    // Dapatkan posisi kursor saat ini
                    const range = quillEditor.getSelection(true);

                    // Sisipkan gambar menggunakan URL dari server
                    quillEditor.insertEmbed(range.index, 'image', imageUrl);

                    // Pindahkan kursor ke sebelah kanan gambar yang baru disisipkan
                    quillEditor.setSelection(range.index + 1, 0);
                }
            } catch (error) {
                console.error("Gagal mengupload gambar dari Quill:", error);
                alert("Gagal mengupload gambar ke dalam artikel.");
            }
        };
    }, [SIMRS_URL, GeneralToken]);

    // 4. Bungkus modules dengan useMemo agar tidak re-render saat mengetik
    const quillModules = useMemo(() => ({
        toolbar: {
            container: [
                [{ 'header': [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ['link', 'image'], // Tambahkan opsi image di toolbar
                ['clean']
            ],
            handlers: {
                image: imageHandler // Gunakan custom handler saat icon image diklik
            }
        }
    }), [imageHandler]);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if (dataFile) {
            try {
                const formData = new FormData()
                formData.append('image', dataFile)

                // Upload Thumbnail/Foto Utama
                const upload = await axios.post(`${SIMRS_URL}/api/cdn/upload/img`, formData, {
                    headers: {
                        Authorization: `Bearer ${GeneralToken}`
                    }
                })

                setValue('images', upload.data.data.url)

                const response = await axios.post(`${API_URL}/article`, {
                    title: data.title,
                    desc: data.desc,
                    images: upload.data.data.url
                }, {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                })

                if (response.data.data) {
                    reset()
                    setSuccess(true)
                    setImagePreview(null)
                    setDataFile('')
                    setTimeout(() => {
                        navigation.push('/admin-rsaa/artikel')
                    }, 3000)
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <div className=' p-5'>
            {success && <AlertSuccess title='Add kegiatan' />}
            <div className="rounded-xl shadow-md lg:w-[80%]">
                <div className="card-body">
                    <div className="uppercase font-bold">Form Tambah Kegiatan</div>
                    <div className="space-y-4">

                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text">Judul</span>
                            </div>
                            <input {...register("title", { required: true })} type="text" placeholder="Masukan Judul" className="input input-bordered w-full" />
                            {errors.title &&
                                <div className="flex justify-end">
                                    <span className='text-xs mt-2 p-1 bg-red-600 text-white rounded-sm'>* Title Harus Di Isi</span>
                                </div>
                            }
                        </label>

                        {/* Text Editor Quill */}
                        <div className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Deskripsi Lengkap</span>
                            </div>
                            <div className="bg-white text-black">
                                <Controller
                                    name="desc"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <ReactQuillWrapper
                                            forwardedRef={quillRef} // Lempar ref ke wrapper
                                            theme="snow"
                                            modules={quillModules} // Gunakan memoized modules
                                            value={field.value || ''}
                                            onChange={field.onChange}
                                            className="h-[300px] mb-12" // Diperbesar sedikit agar nyaman
                                        />
                                    )}
                                />
                            </div>
                            {errors.desc &&
                                <div className="flex justify-end mt-2">
                                    <span className='text-xs p-1 bg-red-600 text-white rounded-sm'>* Deskripsi Harus Di Isi</span>
                                </div>
                            }
                        </div>

                        {/* Thumbnail / Foto Utama */}
                        <div className="mt-8">
                            <div className="label">
                                <span className="label-text font-semibold">Foto Cover/Thumbnail</span>
                            </div>
                            <div className="mt-2 w-[50%]">
                                <img src={imagePreview ? imagePreview : '/page/default.jpg'} alt="Preview" className='rounded-lg object-cover max-h-64' />
                            </div>
                            <label className="form-control w-full ">
                                <input onChange={handleFileChange} type="file" accept="image/*" className="file-input file-input-bordered w-full mt-2" />
                                {!dataFile &&
                                    <div className="flex justify-end">
                                        <span className='text-xs mt-2 p-1 text-gray-500 rounded-sm'>* Wajib upload foto cover</span>
                                    </div>
                                }
                            </label>
                        </div>

                        <button
                            onClick={handleSubmit(onSubmit)}
                            disabled={!dataFile}
                            className='btn btn-primary mt-6 btn-wide uppercase'
                        >
                            Simpan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Section