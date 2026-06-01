'use client'

import Link from 'next/link'
import Image from 'next/image'
import ScrollReveal from '@/components/ScrollReveal'
import PublicMediaGrid from '@/components/PublicMediaGrid'

export default function UpdatesPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 selection:bg-red-600/10 pb-24 font-sans">

      {/* Full-bleed image hero covering navbar */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden pt-32 pb-20 bg-zinc-950">
        <div className="absolute inset-0 z-0">
          <Image
            src="/church.jpg"
            alt="Updates Background"
            fill
            priority
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 z-10 bg-black/55" />

        <div className="relative z-20 mx-auto max-w-4xl px-6 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-bold tracking-[0.25em] text-amber-300 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" /> Church Notifications
          </span>
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl drop-shadow-md">
            Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-400">Updates</span>
          </h1>
          <div className="mx-auto h-[3px] w-14 bg-gradient-to-r from-red-600 via-amber-400 to-blue-600 rounded-full" />
          <p className="mx-auto max-w-xl text-sm font-medium leading-relaxed text-zinc-200">
            Follow the latest service notices, ministry moments, and upcoming prophetic gatherings at Hosanna Mandir.
          </p>
        </div>
      </section>

      {/* Main Adaptive Operational Vault Section */}
      <main className="max-w-7xl mx-auto px-5 sm:px-8 mt-16">
        <ScrollReveal>
          
          {/* 🚀 FIXED AUTOMATION CONTAINER:
             By calling your specialized PublicMediaGrid directly with category="updates", 
             your uploaded admin images will render here instantly with proper formatting!
          */}
          <div className="w-full">
            <PublicMediaGrid category="updates" />
          </div>

        </ScrollReveal>

        {/* Global Redirect Action Footer */}
        <div className="text-center pt-16">
          <Link 
            href="/contact" 
            className="inline-flex items-center justify-center rounded-full bg-zinc-950 px-8 py-4 font-sans text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-zinc-900 shadow-lg hover:-translate-y-0.5 duration-200"
          >
            📬 Contact Main Church Office Hub
          </Link>
        </div>
      </main>

    </div>
    
  )
}