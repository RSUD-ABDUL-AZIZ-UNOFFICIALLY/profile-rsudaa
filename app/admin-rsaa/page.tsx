'use client'
import { NextUIProvider } from "@nextui-org/system";
import { BaseProvider } from '../context/BaseContext';

export default function Home() {
  return (
    <NextUIProvider>
      <BaseProvider>
        <main className="">
          admin
        </main>
      </BaseProvider>
    </NextUIProvider>
  )
}
