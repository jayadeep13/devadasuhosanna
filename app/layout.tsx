import type { Metadata, Viewport } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageTransition from '@/components/PageTransition'

export const metadata: Metadata = {
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
    icon: '/logo1.svg',
    shortcut: '/logo1.svg',
    apple: '/logo1.svg',
  },

  openGraph: {
    title:
      'Hosanna Ministries | Hosanna Mandir Hanuman Junction | Pastor Deva Dasu',
    description:
      'Where the power of God transforms lives through worship, healing prayer, Bible teaching, and Christian fellowship.',
    siteName: 'Hosanna Ministries',
    locale: 'en_US',
    type: 'website',
    url: 'https://your-domain.com', // Replace with your actual domain
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
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        <PageTransition />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}