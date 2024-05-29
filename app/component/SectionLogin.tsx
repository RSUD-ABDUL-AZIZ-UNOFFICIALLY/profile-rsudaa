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

    const API_URL = process.env.API_URL

    const handleLogin: SubmitHandler<Inputs> = async (data) => {
        try {
            const formData = new FormData
            formData.append('no_wa', data.no_wa)
            formData.append('otp', data.otp)

            const response = await axios.post(`${API_URL}/auth/login`, data)
            //console.log(response.data);

            if (response.data.success == true) {
                Cookies.set('access_token', response.data.data.token)
                setAlertLogin(true)
                setTimeout(() => {
                    setAlertLogin(false)
                    router.push('/admin-rsaa')
                }, 5000)
            }

        } catch (error) {

        }
    }

    const getOTP = async () => {
        try {
            const formData = new FormData
            const no_wa = watch('no_wa')

            formData.append('no_wa', no_wa)

            const response = await axios.post(`${API_URL}/auth/getOtp`, {
                no_wa: no_wa
            })

            if (response.data.success == true) {
                setAlertOtp(true)
                setTimeout(() => {
                    setAlertOtp(false)
                }, 5000)
            }

        } catch (error) {

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
                        Sent OTP Successfully
                        <div className="text-sm font-normal">Cek Your Whatsapp</div>
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