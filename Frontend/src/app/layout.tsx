import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Providers } from '@/components/Providers';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Football catalog',
  description: 'My app',
};


export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
    <body className={ inter.className }>
      <Providers>
        <Header/>
        <main>
          { children }
          <Toaster position='top-right'/>
        </main>
      </Providers>
    </body>
    </html>
  );
}
