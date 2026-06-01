import type { Metadata, Viewport } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageTransition from '@/components/PageTransition'

export const metadata: Metadata = {
  title: { default: 'HOSANNA – దైవ సందేశాలు', template: '%s | Hosanna Mandir' },
  description: 'Hosanna Mandir — Where the power of God transforms lives. Join us for worship, healing prayer, Bible teaching, and vibrant community across Andhra Pradesh and worldwide.',
  keywords: 'Hosanna Mandir, Telugu church, Pastor Deva Dasu, Bible classes, healing prayer, Hanuman Junction, Nuzvid, gospel ministry',
}

export const viewport: Viewport = {
  themeColor: '#FFFCF6',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
