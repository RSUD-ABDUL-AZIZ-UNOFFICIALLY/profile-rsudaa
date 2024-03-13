'use client'
import React from 'react'

const FormPengumuman = () => {
    return (
        <div className="p-4 grid gap-2">
            <div className="">
                <label htmlFor="">Judul Pengumuman</label>
                <input type="text" className='p-3 w-full rounded-md border-none' />
            </div>
            <div className="grid">
                <label htmlFor="">Deskripsi Pengumuman</label>
                <textarea className='p-3 rounded-md border-none'>

                </textarea>
            </div>
            <button className="btn btn-dark text-white">
                Tambah
            </button>
        </div>
    )
}

export default FormPengumuman