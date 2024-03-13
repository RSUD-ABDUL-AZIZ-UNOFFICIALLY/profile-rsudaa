'use client'
import React from 'react'
import FormKegiatan from './FormKegiatan'
import FormPengumuman from './FormPengumuman'
import FormSocialMedia from './FormSocialMedia'


const AdminDashboard = () => {
  return (
    <div>
      <div className="text-center font-bold mb-3">
        DASHBOARD ADMIN
      </div>
      <div className="grid lg:grid-cols-3 gap-3">
        <div className="border border-slate-200 rounded-md overflow-hidden h-fit">
          <div className="text-center p-2 bg-slate-200">
            Form Kegiatan
          </div>
          <FormKegiatan />
        </div>
        <div className="border border-slate-200 rounded-md overflow-hidden h-fit">
          <div className="text-center p-2 bg-slate-200">
            Form Pengumuman
          </div>
          <FormPengumuman />
        </div>
        <div className="border border-slate-200 rounded-md overflow-hidden h-fit">
          <div className="text-center p-2 bg-slate-200">
            Form Media Sosial
          </div>
          <FormSocialMedia />
        </div>
      </div>
    </div >
  )
}

export default AdminDashboard