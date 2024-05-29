'use client'
import NavigationBar from '../../component/NavigationBar'
import { NextUIProvider } from "@nextui-org/system";
import { BaseProvider } from '../../context/BaseContext';
import Footer from '../../component/Footer';
import JumbotronPage from '../../component/JumbotronPage';
import Section from './Section';
import SectionPelayananPublik from '@/app/comp-dashboard/SectionPelayananPublik';
import SectionStandarPelayanan from '@/app/maklumat-pelayanan/SectionStandarPelayanan';

export default function Home({ params }: { params: { id: string } }) {
  let id: string = decodeURIComponent(params.id)


  return (
    <NextUIProvider>
      <BaseProvider>
        <main className="">
          <NavigationBar />
          <JumbotronPage title='Dasar Hukum' />
          <Section id={id} />
          <SectionPelayananPublik />
          <SectionStandarPelayanan />
          <Footer />
        </main>
      </BaseProvider>
    </NextUIProvider>
  )
}
