'use client'
import NavigationBar from '../../component/NavigationBar'
import { NextUIProvider } from "@nextui-org/system";
import { BaseProvider } from '../../context/BaseContext';
import Footer from '../../component/Footer';
import JumbotronPage from '../../component/JumbotronPage';
import Section from './Section';


export default function Home({ params }: { params: { id: string } }) {
  const id: string = params.id


  return (
    <NextUIProvider>
      <BaseProvider>
        <main className="">
          <NavigationBar />
          <JumbotronPage title='Detail Kegiatan' />
          <Section id={id} />
          <Footer />
        </main>
      </BaseProvider>
    </NextUIProvider>
  )
}
