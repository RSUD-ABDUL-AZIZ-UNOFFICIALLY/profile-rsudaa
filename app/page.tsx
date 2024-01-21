'use client'
import Jumbotron from './component/Jumbotron';
import NavigationBar from './component/NavigationBar'
import { NextUIProvider } from "@nextui-org/system";
import { BaseProvider } from './context/BaseContext';
import SectionHome from './component/SectionHome';

export default function Home() {
  return (
    <NextUIProvider>
      <BaseProvider>
        <main className="">
          <NavigationBar />
          <Jumbotron />
          <SectionHome />
        </main>
      </BaseProvider>
    </NextUIProvider>
  )
}
