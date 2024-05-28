'use client'
import { BaseProvider } from '../../../../context/BaseContext';
import Navbar from '../../../ComponentAdmin/Navbar';
import Section from './Section';

export default function Home({ params }: { params: { id: string } }) {
  const id: string = params.id

  return (
    <BaseProvider>
      <Navbar title='Edit Magang' active='magang' />
      <main className='p-2' >
        <Section id={id} />
      </main>
    </BaseProvider>
  )
}
