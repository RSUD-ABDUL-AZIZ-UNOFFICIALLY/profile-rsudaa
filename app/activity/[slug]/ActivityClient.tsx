'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import NavigationBar from '../../component/NavigationBar';
import { NextUIProvider } from "@nextui-org/system";
import { BaseProvider } from '../../context/BaseContext';
import Footer from '../../component/Footer';
import JumbotronPage from '../../component/JumbotronPage';
import ArtikelPage from '../../component/ArtikelPage';

interface ArticleData {
  title: string;
  images?: string;
  desc?: string;
  createdAt?: Date;
}

interface ActivityClientProps {
  data: ArticleData | null;
}

export default function ActivityClient({ data }: ActivityClientProps) {
  const pathname = usePathname();
  const [views, setViews] = useState<number>(0);

  useEffect(() => {
    // Pastikan kode hanya dieksekusi di browser
    if (typeof window === 'undefined') return;

    const fetchViews = async () => {
      try {
        const hostname = window.location.hostname;
        const pageUrl = `${hostname}${pathname}`;

        const response = await fetch(`https://count.spairum.my.id/api/counters/view?url=${pageUrl}`);

        if (!response.ok) throw new Error('Network response was not ok');

        const result = await response.json();

        setViews(result.data || 0);

      } catch (error) {
        console.error("Gagal mengambil jumlah views:", error);
      }
    };

    fetchViews();
  }, [pathname]);

  if (!data) return null;

  return (
    <NextUIProvider>
      <BaseProvider>
        <main>
          <NavigationBar />
          <JumbotronPage title='Kegiatan / Event' />

          <ArtikelPage
            title={data.title}
            image={data.images ?? ''}
            content={data.desc ?? ''}
            createdAt={data.createdAt ?? new Date()}
            views={views} // Lempar state views sebagai props ke ArtikelPage
          />

          <Footer />
        </main>
      </BaseProvider>
    </NextUIProvider>
  );
}