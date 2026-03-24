import { DM_Sans, Space_Mono, Cormorant } from 'next/font/google';
import { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { WishlistProvider } from '@/lib/WishlistContext';
import { CartProvider } from '@/lib/CartContext';
import './globals.css';

const cormorant = Cormorant({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'DRAGOFFICE',
  description: '드래그오피스 — 보는 눈을 제안한다.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ko"
      className={`${cormorant.variable} ${spaceMono.variable} ${dmSans.variable}`}
    >
      <body>
        <WishlistProvider>
          <CartProvider>
            <Nav />
            <main className="page-content">{children}</main>
            <Footer />
          </CartProvider>
        </WishlistProvider>
      </body>
    </html>
  );
}
