import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import Navigation from '@/components/Navigation'; // Import the Navigation component

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Portfolio Blog App',
  description: 'A blog and portfolio application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navigation /> {/* Add your Navigation component here */}
          {children}
        </Providers>
      </body>
    </html>
  );
}