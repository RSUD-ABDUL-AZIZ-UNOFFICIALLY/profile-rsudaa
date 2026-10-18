import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import VisitorTracker from "./component/VisitorTracker";
import { AccessibilityProvider } from './providers/AccessibilityProvider';
import AccessibilityWidget from './component/AccessibilityWidget';

// @ts-ignore: CSS module declaration not present in this environment
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RSUD dr. Abdul Aziz Kota Singkawang',
  description: 'RSUD dr. Abdul Aziz Kota Singkawang',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        <meta name="google-site-verification" content="UQ6E4DHmk55GDXhSRReASIA6Ypax8fiX4gsAhQS03kk" />
      </head>
      <body className={inter.className}>
        <VisitorTracker />
        {/* Inject Provider untuk Global State Accessibility */}
        <AccessibilityProvider>

          {children} {/* Konten aplikasi Anda di sini */}

          {/* Inject Widget secara global */}
          <AccessibilityWidget />

        </AccessibilityProvider>
        {/* {children} */}
      </body>
    </html>
  )
}