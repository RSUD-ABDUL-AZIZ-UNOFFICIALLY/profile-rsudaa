'use client';
import NavigationBar from '../../component/NavigationBar'
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
  if (!data) return null;

  return (
    <NextUIProvider>
      <BaseProvider>
        <main>
          <NavigationBar />
          <JumbotronPage title='Artikel / Pengumuman' />
          <ArtikelPage title={data.title}
            image={data.images ?? ''}
            content={data.desc ?? ''}
            createdAt={data.createdAt ?? new Date()}
             />
          <Footer />
        </main>
      </BaseProvider>
    </NextUIProvider>
  );
}