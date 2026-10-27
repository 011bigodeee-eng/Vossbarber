import type { Metadata } from 'next';
import './globals.css';
const publicUrl = process.env.NEXT_PUBLIC_SITE_URL;
export const metadata: Metadata = {
  metadataBase: publicUrl ? new URL(publicUrl) : undefined,
  title: 'VOSS Barber Lounge | Barbearia em Ribeirão Preto',
  description: 'Mais do que um corte. Uma experiência. Conheça a VOSS Barber Lounge em Ribeirão Preto. Corte, barba, Clube VOSS e Dia do Noivo. Consulte pelo WhatsApp.',
  openGraph: { title: 'VOSS Barber Lounge', description: 'Mais do que um corte. Uma experiência em Ribeirão Preto.', locale: 'pt_BR', type: 'website', ...(publicUrl ? {images: [{url:'/images/lounge.jpg', alt:'Imagem conceitual de barbearia'}]} : {}) },
  robots: {index: false, follow: false},
};
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) { return <html lang="pt-BR"><body>{children}</body></html>; }
