'use client'
import { AnnoucementResponse } from '@/app/Model/announcement.model'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import axios from 'axios'
import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react'
import Cookies from "js-cookie";
import moment from 'moment';
import AlertSuccess from '../../../ComponentAdmin/AlertSuccess'
import { useRouter } from 'next/navigation'
import { activityResponse } from '@/app/Model/activity.model'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

// Wrapper khusus untuk ReactQuill agar ref bisa diteruskan
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

interface props {
    activityID: string
}

const Section: React.FC<props> = ({ articleID }) => {
    const API_URL = process.env.API_URL
    const SIMRS_URL = process.env.SIMRS_URL
    const GeneralToken = process.env.TOKEN
    const access_token = Cookies.get('access_token')
    const navigation = useRouter()

    const [success, setSuccess] = useState<boolean>(false)
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [dataFile, setDataFile] = useState<any>('')

    // Ref untuk Quill
    const quillRef = useRef<any>(null);
    const MySwal = withReactContent(Swal);

    type Inputs = {
        title: string
        desc: string
        images: string
    }

    const { register, handleSubmit, watch, setValue, control, formState: { errors }, reset } = useForm<Inputs>()

    const getData = async () => {
        try {
            const response = await axios.get(`${API_URL}/article?articleID=${articleID}`)

            if (response.data.success == true) {
                const dataActivity: activityResponse = response.data.data
                setValue('title', dataActivity.title ? dataActivity.title : '')
                setValue('desc', dataActivity.desc ? dataActivity.desc : '') // Data HTML otomatis masuk ke Quill
                setImagePreview(dataActivity.images ? dataActivity.images : '')
            }
        } catch (error) {
            console.error("Gagal mengambil data activity:", error);
        }
    }

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

    // Custom Handler untuk Upload Gambar di dalam Editor Teks
    const imageHandler = useCallback(() => {
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
                const upload = await axios.post(`${SIMRS_URL}/api/cdn/upload/img`, formData, {
                    headers: { Authorization: `Bearer ${GeneralToken}` }
                });

                const imageUrl = upload.data.data.url;
                const quillEditor = quillRef.current?.getEditor();

                if (quillEditor) {
                    const range = quillEditor.getSelection(true);
                    quillEditor.insertEmbed(range.index, 'image', imageUrl);
                    quillEditor.setSelection(range.index + 1, 0);
                }
            } catch (error) {
                MySwal.fire('Error', 'Gagal mengupload gambar ke CDN', 'error');
            }
        };
    }, [SIMRS_URL, GeneralToken, MySwal]);

    // Konfigurasi Toolbar Quill
    const quillModules = useMemo(() => ({
        toolbar: {
            container: [
                [{ 'header': [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ['link', 'image'],
                ['clean']
            ],
            handlers: {
                image: imageHandler
            }
        }
    }), [imageHandler]);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            let dataUploadFile: string = '' // Anda bisa menyesuaikan ini jika endpoint edit membutuhkan URL lama ketika tidak ada update foto

            // Upload Foto Cover/Thumbnail jika ada perubahan
            if (dataFile) {
                const formData = new FormData()
                formData.append('image', dataFile)

                const upload = await axios.post(`${SIMRS_URL}/api/cdn/upload/img`, formData, {
                    headers: { Authorization: `Bearer ${GeneralToken}` }
                })

                setValue('images', upload.data.data.url)
                dataUploadFile = upload.data.data.url
            }

            // Gunakan full async/await agar penanganan response lebih bersih dan tidak tercampur Promise .then()
            await axios.put(`${API_URL}/article/${articleID}`, {
                title: data.title,
                desc: data.desc,
                images: dataUploadFile
            }, {
                headers: { Authorization: `Bearer ${access_token}` }
            });

            MySwal.fire({
                title: <strong>Update</strong>,
                html: <i>Update berhasil dilakukan! 🚀</i>,
                icon: 'success',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#16a34a',
            }).then(() => {
                navigation.push('/admin-rsaa/artikel')
            });

        } catch (error: any) {
            console.error(error);
            MySwal.fire({
                title: <strong>Oops...</strong>,
                html: <i>{error.response?.data?.message || 'Terjadi kesalahan sistem'}</i>,
                icon: 'error',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#dc2626',
            });
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className=' p-5'>
            {success && <AlertSuccess title='Edit Kegiatan' />}
            <div className="rounded-xl shadow-md lg:w-[80%]">
                <div className="card-body">
                    <div className="uppercase font-bold">Form Edit Kegiatan</div>
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

                        {/* Editor Quill untuk Deskripsi */}
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
                                            forwardedRef={quillRef}
                                            theme="snow"
                                            modules={quillModules}
                                            value={field.value || ''}
                                            onChange={field.onChange}
                                            className="h-[300px] mb-12"
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
                            </label>
                        </div>

                        <button onClick={handleSubmit(onSubmit)} className='btn btn-primary mt-6 btn-wide uppercase'>Update</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Section