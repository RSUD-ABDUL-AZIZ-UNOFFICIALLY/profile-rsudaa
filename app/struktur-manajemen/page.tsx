'use client'
import NavigationBar from '../component/NavigationBar'
import { NextUIProvider } from "@nextui-org/system";
import { BaseProvider } from '../context/BaseContext';
import SectionHome from '../component/SectionHome';
import Footer from '../component/Footer';
import JumbotronPage from '../component/JumbotronPage';

export default function Home() {
  return (
    <NextUIProvider>
      <BaseProvider>
        <main className="">
          <NavigationBar />
          <JumbotronPage title='Struktur Manajemen' />
          profil
          <Footer />
        </main>
      </BaseProvider>
    </NextUIProvider>
  )
}
