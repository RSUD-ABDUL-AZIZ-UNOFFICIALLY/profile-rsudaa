'use client'
import Jumbotron from './component/Jumbotron';
import NavigationBar from './component/NavigationBar'
import { NextUIProvider } from "@nextui-org/system";
import { BaseProvider } from './context/BaseContext';
import SectionHome from './comp-dashboard/SectionHome';
import Footer from './component/Footer';

export default function Home() {
  return (
    <NextUIProvider>
      <BaseProvider>
        <main className="">
          <NavigationBar />
          <Jumbotron />
          <SectionHome />
          <Footer />
        </main>
      </BaseProvider>
    </NextUIProvider>
  )
}
