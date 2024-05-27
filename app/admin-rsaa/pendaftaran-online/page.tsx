'use client'
import { BaseProvider } from '../../context/BaseContext';
import Navbar from '../ComponentAdmin/Navbar';
import Section from './Section';

export default function Home() {
  return (
    <BaseProvider>
      <Navbar title='Pendaftaran Online' active='pendaftaran-online' />
      <main className='p-2' >
        <Section />
      </main>
    </BaseProvider>
  )
}
