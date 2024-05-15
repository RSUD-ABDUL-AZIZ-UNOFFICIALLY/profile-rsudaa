'use client'
import NavigationBar from '../../component/NavigationBar'
import { NextUIProvider } from "@nextui-org/system";
import { BaseProvider } from '../../context/BaseContext';
import Footer from '../../component/Footer';
import JumbotronPage from '../../component/JumbotronPage';
import Section from './Section';


export default function Home({ params }: { params: { slug: string } }) {
  const slug: string = params.slug


  return (
    <NextUIProvider>
      <BaseProvider>
        <main className="">
          <NavigationBar />
          <JumbotronPage title='Magang' />
          <Section slug={slug} />
          <Footer />
        </main>
      </BaseProvider>
    </NextUIProvider>
  )
}
