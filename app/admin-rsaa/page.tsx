'use client'
import { BaseProvider } from '../context/BaseContext';
import NavbarAdmin from "./compoenent/NavbarAdmin";
import AdminDashboard from "./compoenent/AdminDashboard";
import AdminSidebar from './compoenent/AdminSidebar';

export default function Home() {
  return (
      <BaseProvider>
        <main className="">
          {/* <NavbarAdmin /> */}
          <div className="grid grid-cols-10">
            <div className="col-span-2 min-h-[100vh] bg-slate-100 p-3">
              <AdminSidebar />
            </div>
            <div className="col-span-8 p-3 shadow">
              <AdminDashboard />
            </div>
          </div>
        </main>
      </BaseProvider>
  )
}
