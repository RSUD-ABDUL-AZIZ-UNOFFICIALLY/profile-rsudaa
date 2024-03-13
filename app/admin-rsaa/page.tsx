'use client'
import { BaseProvider } from '../context/BaseContext';
import NavbarAdmin from "./compoenent/NavbarAdmin";
import AdminDashboard from "./compoenent/AdminDashboard";


export default function Home() {
  return (
      <BaseProvider>
        <main className="p-4  relative">
          <NavbarAdmin />
          <div className="p-3 bg-slate-100 mt-4">
            <AdminDashboard />
          </div>
        </main>
      </BaseProvider>
  )
}
