import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import './globals.css';

import Providers from '@/components/layout/providers';

export const metadata: Metadata = {
  title: 'Vijob system operator',
  description: 'Vijob system operator',
};

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  display: 'swap',
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${lato.className}`} suppressHydrationWarning>
      <body className={'overflow-hidden'}>
        <NextTopLoader showSpinner={false} />
        <Providers>{children}</Providers>
      </body>
      {/* <body className={'overflow-hidden'} suppressHydrationWarning={true}>
        {children}
      </body> */}
    </html>
  );
}
