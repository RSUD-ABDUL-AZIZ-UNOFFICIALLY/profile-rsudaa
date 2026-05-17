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
  createdAt?: string;
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
          <JumbotronPage title='Kegiatan / Event' />
          <ArtikelPage title={data.title}
            image={data.images ?? ''}
            content={data.desc ?? ''}
            createdAt={data.createdAt ?? ''}
             />
          <Footer />
        </main>
      </BaseProvider>
    </NextUIProvider>
  );
}