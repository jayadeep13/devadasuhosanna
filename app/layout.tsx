import type { Metadata, Viewport } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageTransition from '@/components/PageTransition'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.devadasuhosanna.com'),

  title: {
    default:
      'Hosanna Ministries | Hosanna Mandir Hanuman Junction | Pastor Deva Dasu',
    template: '%s | Hosanna Ministries',
  },

  description:
    'Hosanna Ministries (Hosanna Mandir) Hanuman Junction. Join Pastor Deva Dasu for worship services, healing prayer, Bible teaching, gospel ministry, online messages, Christian fellowship, and spiritual growth.',

  keywords: [
    'Hosanna Ministries',
    'Hosanna Mandir',
    'Hosanna Mandir Hanuman Junction',
    'Hosanna Hanuman Junction',
    'Pastor Deva Dasu',
    'Pastor Devadasu',
    'Hosanna Church',
    'Telugu Church',
    'Telugu Christian Ministry',
    'Christian Ministry Andhra Pradesh',
    'Bible Teaching',
    'Bible Classes',
    'Healing Prayer',
    'Prayer Ministry',
    'Gospel Ministry',
    'Christian Fellowship',
    'Online Worship',
    'Hosanna Nuzvid',
    'Hanuman Junction Church',
    'Jesus Christ',
    'Christian Messages',
    'దైవ సందేశాలు',
    'హోసన్నా మినిస్ట్రీస్',
    'హోసన్నా మందిరం',
    'పాస్టర్ దేవదాసు',
  ],

  authors: [
    {
      name: 'Pastor Deva Dasu',
    },
  ],

  creator: 'Hosanna Ministries',
  publisher: 'Hosanna Ministries',

  icons: {
    icon: [
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/icon.png',
    apple: '/apple-icon.png',
  },

  alternates: {
    canonical: 'https://www.devadasuhosanna.com',
  },

  openGraph: {
    title:
      'Hosanna Ministries | Hosanna Mandir Hanuman Junction | Pastor Deva Dasu',
    description:
      'Where the power of God transforms lives through worship, healing prayer, Bible teaching, and Christian fellowship.',
    siteName: 'Hosanna Ministries',
    locale: 'en_US',
    type: 'website',
    url: 'https://www.devadasuhosanna.com',
    images: ['/logo1.png'],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Hosanna Ministries',
    description:
      'Worship, prayer, Bible teaching, healing ministry, and Christian fellowship.',
  },

  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#FFFCF6',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Church',
    name: 'Hosanna Ministries | Hosanna Mandir',
    alternateName: 'Hosanna Mandir Hanuman Junction',
    url: 'https://www.devadasuhosanna.com',
    logo: 'https://www.devadasuhosanna.com/logo1.png',
    image: 'https://www.devadasuhosanna.com/logo1.png',
    description:
      'Hosanna Ministries (Hosanna Mandir) Hanuman Junction. Join Pastor Deva Dasu for worship services, healing prayer, Bible teaching, gospel ministry, online messages, Christian fellowship, and spiritual growth.',
    founder: {
      '@type': 'Person',
      name: 'Pastor Deva Dasu',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Hanuman Junction',
      addressRegion: 'Andhra Pradesh',
      addressCountry: 'IN',
    },
  }

  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <PageTransition />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}