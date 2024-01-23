'use client'
import NavigationBar from '../component/NavigationBar'
import { NextUIProvider } from "@nextui-org/system";
import { BaseProvider } from '../context/BaseContext';
import Footer from '../component/Footer';
import JumbotronPage from '../component/JumbotronPage';

export default function Home() {
  return (
    <NextUIProvider>
      <BaseProvider>
        <main className="">
          <NavigationBar />
          <JumbotronPage title='Profil Direktur' />
          profil
          <Footer />
        </main>
      </BaseProvider>
    </NextUIProvider>
  )
}
