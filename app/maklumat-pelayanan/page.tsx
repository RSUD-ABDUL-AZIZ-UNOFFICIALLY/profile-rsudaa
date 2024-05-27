'use client'
import NavigationBar from '../component/NavigationBar'
import { NextUIProvider } from "@nextui-org/system";
import { BaseProvider } from '../context/BaseContext';
import SectionHome from '../comp-dashboard/SectionHome';
import Footer from '../component/Footer';
import JumbotronPage from '../component/JumbotronPage';
import Section from './Section';
import SectionPelayananPublik from '../comp-dashboard/SectionPelayananPublik';
import SectionDokter from '../comp-dashboard/SectionDokter';
export default function Home() {
  return (
    <NextUIProvider>
      <BaseProvider>
        <main className="">
          <NavigationBar />
          <JumbotronPage title='Maklumat Pelayanan' />
          <Section />
          <SectionPelayananPublik />
          <SectionDokter />
          <Footer />
        </main>
      </BaseProvider>
    </NextUIProvider>
  )
}
