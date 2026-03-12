
import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import Providers from './providers';
import { Toaster } from 'sonner';
import ScrollToTop from '@/components/shared/ScrollToTop';

export const metadata: Metadata = {
  title: 'Aspiring Legal Network',
  description: 'A platform connecting aspiring legal professionals with resources, mentorship, and opportunities to thrive in the legal industry.',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>
          {children}
          <Toaster />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}
