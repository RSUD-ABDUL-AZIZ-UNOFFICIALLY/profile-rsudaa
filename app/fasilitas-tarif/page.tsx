'use client'
import Jumbotron from '../component/Jumbotron';
import NavigationBar from '../component/NavigationBar'
import { NextUIProvider } from "@nextui-org/system";
import { BaseProvider } from '../context/BaseContext';
import SectionHome from '../comp-dashboard/SectionHome';
import Footer from '../component/Footer';
import JumbotronPage from '../component/JumbotronPage';
import SectionPelayananPublik from '../comp-dashboard/SectionPelayananPublik';
import SectionDokter from '../comp-dashboard/SectionDokter';
import Section from './Section';
import SectionKamar from './SectionKamar';

export default function Home() {
  return (
    <NextUIProvider>
      <BaseProvider>
        <main className="">
          <NavigationBar />
          <JumbotronPage title='Fasilitas & Tarif' />
          <SectionKamar />
          <Section />
          <SectionPelayananPublik />
          <SectionDokter />
          <Footer />
        </main>
      </BaseProvider>
    </NextUIProvider>
  )
}
