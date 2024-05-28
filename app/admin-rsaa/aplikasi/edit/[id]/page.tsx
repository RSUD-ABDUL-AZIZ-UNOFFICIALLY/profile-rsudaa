'use client'
import { BaseProvider } from '../../../../context/BaseContext';
import Navbar from './../../../ComponentAdmin/Navbar';
import Section from './Section';

export default function Home({ params }: { params: { id: string } }) {
  return (
    <BaseProvider>
      <Navbar title='Edit aplikasi' active='aplikasi' />
      <main className='p-2' >
        <Section id={params.id} />
      </main>
    </BaseProvider>
  )
}
