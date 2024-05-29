'use client'
import { BaseProvider } from '../../../../context/BaseContext';
import Navbar from './../../../ComponentAdmin/Navbar';
import Section from './Section';

export default function Home({ params }: { params: { id: string } }) {
  return (
    <BaseProvider>
      <Navbar title='edit artikel' active='artikel' />
      <main className='p-2' >
        <Section articleID={params.id} />
      </main>
    </BaseProvider>
  )
}
