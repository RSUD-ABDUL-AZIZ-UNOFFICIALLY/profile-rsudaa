'use client';
import NavigationBar from '../../component/NavigationBar'
import { NextUIProvider } from "@nextui-org/system";
import { BaseProvider } from '../../context/BaseContext';
import Footer from '../../component/Footer';
import JumbotronPage from '../../component/JumbotronPage';
import axios from 'axios';
import Section from './Section';
import { useEffect, useState } from 'react';


interface HomeProps {
  params: {
    slug: string;
  };
}
const API_URL = process.env.API_URL;


export default function Home({ params }: HomeProps) {
  const { slug } = params;

  interface ArticleData {
    title: string;
    images?: string;
    desc?: string;
    // add other properties as needed
  }

  const [data, setData] = useState<ArticleData | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${API_URL}/activity?activityID=${slug}`);
        if (response.data?.data) {
          setData(response.data.data);
        }
      } catch (err) {
        console.error('Gagal fetch:', err);
      }
    };

    if (slug) {
      getData();
    }
  }, [slug]);

  // ✅ Tidak tampilkan apapun sampai data siap
  if (!data) return null;
  // const dataJSON = data ? JSON.stringify(data, null, 2) : 'Loading...';
  // console.log(dataJSON);


  if (!data) return null;

  return (
    <NextUIProvider>
      <BaseProvider>
        <main>
          <NavigationBar />
          {/* <JumbotronPage title={data?.data.title || 'Artikel'} /> */}
          <JumbotronPage title={data.title} />
          {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
          <Section title={data.title}
            image={data.images ?? ''}
            content={data.desc ?? ''}
             />
          <Footer />
        </main>
      </BaseProvider>
    </NextUIProvider>
  );
}