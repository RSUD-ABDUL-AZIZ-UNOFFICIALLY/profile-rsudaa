'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import skw from "../../public/skw.png";
import login from "../../public/tron.jpg";
import wa from "../../public/icon/whatsapp.svg";
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form'
import axios from 'axios';
import Cookies from 'js-cookie'

const SectionLogin = () => {
    const router = useRouter()
    type Inputs = {
        no_wa: string
        otp: string
    }
    const { register, handleSubmit, watch, setValue, formState: { errors }, reset } = useForm<Inputs>({
        defaultValues: {
            no_wa: '',
            otp: ''
        }
    })

    const [alertOtp, setAlertOtp] = useState<boolean>(false)
    const [alertLogin, setAlertLogin] = useState<boolean>(false)
    const [alertError, setAlertError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')

    const API_URL = process.env.SIMRS_URL

    const handleLogin: SubmitHandler<Inputs> = async (data) => {
        try {
            const formData = new FormData
            formData.append('no_wa', data.no_wa)
            formData.append('otp', data.otp)

            const response = await axios.post(`${API_URL}/api/web-profile/auth/login`, {
                phone: data.no_wa,
                otp: data.otp
            })
            console.log(response);

            if (response.data.success == true) {
                Cookies.set('access_token', response.data.data.token)
                setAlertLogin(true)
                setTimeout(() => {
                    setAlertLogin(false)
                    router.push('/admin-rsaa')
                }, 5000)
            }

        } catch (error) {
            setAlertError(true)
            // 1. Check if the error is from Axios
            if (axios.isAxiosError(error) && error.response) {
                // error.response.data contains the body sent by your API
                // Adjust '.message' based on how your backend structures the JSON error response
                const serverError = error.response.data;

                // Example: if your API sends { "message": "Invalid OTP" }
                setErrorMessage(serverError.message || JSON.stringify(serverError));
            } else {
                // 2. Fallback for network errors (no response) or generic code errors
                setErrorMessage((error as Error).message);
            }
            setTimeout(() => {
                setAlertError(false)
            }, 5000)
        }
    }

    const getOTP = async () => {
        try {
            const formData = new FormData
            const no_wa = watch('no_wa')

            formData.append('no_wa', no_wa)
            if (no_wa == '') {
                setAlertError(true)
                setErrorMessage('No Whatsapp Tidak Boleh Kosong')
                setTimeout(() => {
                    setAlertError(false)
                }, 5000)
            }
            if (no_wa.length < 10) {
                setAlertError(true)
                setErrorMessage('No Whatsapp Tidak Valid')
                setTimeout(() => {
                    setAlertError(false)
                }, 5000)
            }

            const response = await axios.post(`${API_URL}/api/web-profile/auth/getOtp`, {
                no_wa: no_wa
            })

            if (response.data.success == true) {
                setAlertOtp(true)
                setTimeout(() => {
                    setAlertOtp(false)
                }, 5000)
            }

        } catch (error) {
            setAlertError(true)
            // 1. Check if the error is from Axios
            if (axios.isAxiosError(error) && error.response) {
                // error.response.data contains the body sent by your API
                // Adjust '.message' based on how your backend structures the JSON error response
                const serverError = error.response.data;

                // Example: if your API sends { "message": "Invalid OTP" }
                setErrorMessage(serverError.message || JSON.stringify(serverError));
            } else {
                // 2. Fallback for network errors (no response) or generic code errors
                setErrorMessage((error as Error).message);
            }
            setTimeout(() => {
                setAlertError(false)
            }, 5000)

        }
    }

    const navigate = () => {
        router.push('/admin-rsaa')
    }

    useEffect(() => {
        //console.log(watch('no_wa'));

    }, [watch('no_wa')])

    return (
        <div className='lg:md:w-[50vw] w-[90vw]'>
            <div className="grid lg:grid-cols-2 gap-2">
                <div className="grid gap-4 p-4 relative overflow-hidden">
                    <div className="flex justify-center items-center">
                        <div className="rounded-full shadow-lg h-24 w-24 p-3">
                            <Image
                                src={skw}
                                alt="Picture of the author"
                                className='object-cover object-center'
                            />
                        </div>
                    </div>
                    <div className={`p-2 bg-lime-400 rounded-sm font-bold text-center absolute w-full m-2  duration-200  ${alertOtp ? `visible translate-y-[20%]` : `translate-y-[-150%]`}`}>
                        <div className="text-sm font-normal">OTP Telah Terkirim</div>
                        <div className="text-sm font-normal">Cek Your Whatsapp</div>
                    </div>
                    <div className={`p-2 bg-red-400 rounded-sm font-bold text-center absolute w-full m-2  duration-200  ${alertError ? `visible translate-y-[20%]` : `translate-y-[-150%]`}`}>
                        <div className="text-sm font-normal">{errorMessage}</div>
                    </div>
                    <div className={`p-2 bg-lime-400 rounded-sm font-bold text-center absolute w-full m-2  duration-200  ${alertLogin ? `visible translate-y-[20%]` : `translate-y-[-150%]`}`}>
                        Login Successfully
                        <div className="text-sm font-normal">Redirect to Admin Page</div>
                    </div>
                    <div className="text-center font-bold text-midDark text-3xl mt-3 mb-3">RSUD dr Abdul Aziz</div>
                    <div className="form-control gap-2">
                        <label htmlFor="">WhatsApp</label>
                        <input {...register("no_wa", { required: true })} type="text" placeholder="Nomor Whatsapp" className="input input-bordered w-full rounded-sm" />
                    </div>

                    <div className="form-control flex gap-2">
                        <label htmlFor="">Kode OTP</label>
                        <div className="flex gap-2">
                            <input type="number"  {...register("otp", { required: true })} placeholder="Kode OTP" className="input input-bordered w-full rounded-sm" />
                            <button onClick={() => getOTP()} className="button rounded-sm button-midDark min-w-20 max-w-36 text-white ">Get OTP</button>
                        </div>
                    </div>
                    <hr className='mt-4 mb-4' />
                    <button onClick={handleSubmit(handleLogin)} className="button button-midDark text-white uppercase font-bold">
                        Login
                    </button>
                    <div className="mt-3 text-center">
                        <small className='text-neutral-400'>Copyright © 2024 RSUD dr. ABDUL AZIZ</small>
                    </div>
                </div>
                <div className="relative justify-center items-center p-4 lg:flex hidden">
                    <div className="absolute bg-primary rounded-[20px] h-[110%] w-[90%] overflow-hidden">
                        <Image
                            src={login}
                            alt="Picture of the author"
                            className='object-cover h-full'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SectionLogin