import { Metadata } from 'next';
import axios from 'axios';
import ActivityClient from './ActivityClient';

interface HomeProps {
  params: {
    slug: string;
  };
}

const API_URL = process.env.API_URL;

async function getActivity(slug: string) {
  try {
    const response = await axios.get(`${API_URL}/article?articleID=${slug}`);
    return response.data?.data || null;
  } catch (err) {
    console.error('Gagal fetch activity:', err);
    return null;
  }
}

export async function generateMetadata({ params }: HomeProps): Promise<Metadata> {
  const { slug } = params;
  const data = await getActivity(slug);

  if (!data) {
    return {
      title: 'Activity Not Found',
    };
  }

  return {
    title: data.title,
    description: data.desc || 'Detail kegiatan RSUD dr. Abdul Aziz Kota Singkawang',
  };
}

export default async function Home({ params }: HomeProps) {
  const { slug } = params;
  const data = await getActivity(slug);

  return <ActivityClient data={data} />;
}