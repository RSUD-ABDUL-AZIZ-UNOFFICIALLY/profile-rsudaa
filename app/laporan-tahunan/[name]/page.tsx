'use client'
import NavigationBar from '../../component/NavigationBar'
import { NextUIProvider } from "@nextui-org/system";
import { BaseProvider } from '../../context/BaseContext';
import Footer from '../../component/Footer';
import JumbotronPage from '../../component/JumbotronPage';
import Section from './Section';
Section


export default function Home({ params }: { params: { name: string } }) {
  let name: string = decodeURIComponent(params.name)


  return (
    <NextUIProvider>
      <BaseProvider>
        <main className="">
          <NavigationBar />
          <JumbotronPage title='Lowongan Pekerjaan' />
          <Section name={name} />
          <Footer />
        </main>
      </BaseProvider>
    </NextUIProvider>
  )
}
