'use client'
import { BaseProvider } from '../../context/BaseContext';
import Navbar from '../ComponentAdmin/Navbar';
import Section from './Section';

export default function Home() {
  return (
    <BaseProvider>
      <Navbar title='Survei Kepuasan Masyarakat' active='survei-kepuasan-masyarakat' />
      <main className='p-2' >
        <Section />
      </main>
    </BaseProvider>
  )
}
