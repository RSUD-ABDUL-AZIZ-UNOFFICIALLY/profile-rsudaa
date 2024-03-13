'use client'
import React from 'react'

const FormKegiatan = () => {
    return (
        <div className="p-4 grid gap-2">
            <div className="">
                <label htmlFor="">Nama Kegiatan</label>
                <input type="text" className='p-3 w-full rounded-md border-none' />
            </div>
            <div className="">
                <label htmlFor="">Tanggal Kegiatan</label>
                <input type="date" className='p-3 w-full rounded-md border-none' />
            </div>
            <div className="">
                <label htmlFor="file-upload" className="file-upload-label">
                    Choose a file
                </label>
                <input type="file" id="file-upload" className="file-input"
                />
            </div>
            <button className="btn btn-dark text-white">
                Tambah
            </button>
        </div>
    )
}

export default FormKegiatan