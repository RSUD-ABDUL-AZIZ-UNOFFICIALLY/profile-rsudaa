'use client'
import { BaseProvider } from '../../../../context/BaseContext';
import Navbar from './../../../ComponentAdmin/Navbar';
import Section from './Section';

export default function Home({ params }: { params: { id: string } }) {
  return (
    <BaseProvider>
      <Navbar title='edit pengumuman' active='pengumuman' />
      <main className='p-2' >
        <Section announcementID={params.id} />
      </main>
    </BaseProvider>
  )
}
