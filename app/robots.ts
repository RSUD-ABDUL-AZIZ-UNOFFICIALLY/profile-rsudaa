import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // Ambil base URL dari environment variable
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://rsudaa.singkawangkota.go.id';
  const isProduction = process.env.NODE_ENV === 'production';

  return {
    rules: {
      userAgent: '*',
      // Blokir seluruh akses jika bukan di production
      allow: isProduction ? '/' : '',
      disallow: isProduction ? ['/admin-rsaa/', '/api/', '/admin/'] : ['/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}