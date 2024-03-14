"use client";
import { NextUIProvider } from "@nextui-org/system";
import { BaseProvider } from "../context/BaseContext";
import SectionLogin from "../component/SectionLogin";

export default function Home() {
  return (
    <NextUIProvider>
      <BaseProvider>
        <main className=''>
          <div className='login flex justify-center items-center min-h-screen'>
            <div className='card-login'>
              <div className='body-card-login'>
                <SectionLogin />
              </div>
            </div>
          </div>
        </main>
      </BaseProvider>
    </NextUIProvider>
  );
}
