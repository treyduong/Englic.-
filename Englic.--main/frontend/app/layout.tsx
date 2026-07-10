import type { Metadata, Viewport } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import Footer from '@/components/Footer';
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, getAbsoluteUrl, SEO_KEYWORDS, SITE_NAME, SITE_URL } from '@/lib/site';
import { CLERK_AFTER_SIGN_IN_URL, CLERK_AFTER_SIGN_UP_URL, CLERK_SIGN_IN_URL, CLERK_SIGN_UP_URL } from '@/lib/clerk';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: SEO_KEYWORDS,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: 'education',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Englic - Luyện thi Tiếng Anh THPT Quốc Gia' }],
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [getAbsoluteUrl('/og-image.jpg')],
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#7c3aed',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      signInUrl={CLERK_SIGN_IN_URL}
      signUpUrl={CLERK_SIGN_UP_URL}
      signInFallbackRedirectUrl={CLERK_AFTER_SIGN_IN_URL}
      signUpFallbackRedirectUrl={CLERK_AFTER_SIGN_UP_URL}
    >
      <html lang="vi" className="scroll-smooth">
        <body>
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
