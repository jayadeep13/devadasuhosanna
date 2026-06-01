'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import ScrollReveal from '@/components/ScrollReveal'

const SUBCATEGORIES = [
  { value: 'all', label: 'All Photos' },
  { value: 'children', label: 'Children' },
  { value: 'gospel-meetings', label: 'Gospel Meetings' },
  { value: 'pastors-meeting', label: 'Pastors Meeting' },
  { value: 'church-construction', label: 'Church Construction' },
  { value: 'others', label: 'Others' },
]

type MediaItem = {
  id: string
  category: string
  subcategory?: string
  title: string
  description: string
  src: string
  createdAt: string
}

function Lightbox({ item, onClose }: { item: MediaItem; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const handleDownload = async () => {
    try {
      const res = await fetch(item.src)
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = item.src.split('/').pop() || 'hosanna-photo.webp'
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      window.open(item.src, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
    >
      <div className="relative flex flex-col items-center max-w-5xl w-full">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition text-xl font-bold"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Image */}
        <img
          src={item.src}
          alt={item.title}
          className="max-h-[80vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
        />

        {/* Download bar */}
        <div className="mt-4 flex items-center gap-4">
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-xs font-extrabold uppercase tracking-widest text-zinc-900 shadow-lg hover:-translate-y-0.5 transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
            </svg>
            Download Photo
          </button>
        </div>
      </div>
    </div>
  )
}

export default function GalleryPage() {
  const [active, setActive] = useState('all')
  const [items, setItems] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<MediaItem | null>(null)

  useEffect(() => {
    setLoading(true)
    const url = active === 'all'
      ? '/api/media?category=gallery'
      : `/api/media?category=gallery&subcategory=${active}`

    fetch(url, { cache: 'no-store' })
      .then((r) => r.json())
      .then((d) => setItems(d.items || []))
      .finally(() => setLoading(false))
  }, [active])

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans">

      {/* Lightbox */}
      {selected && <Lightbox item={selected} onClose={() => setSelected(null)} />}

      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden pt-32 pb-20 bg-zinc-950">
        <div className="absolute inset-0 z-0">
          <Image
            src="/unnamed.webp"
            alt="Gallery Background"
            fill
            priority
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 z-10 bg-black/55" />

        <div className="relative z-20 mx-auto max-w-4xl px-6 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-bold tracking-[0.25em] text-blue-300 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400" /> Life at Hosanna Mandir
          </span>
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl drop-shadow-md">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-400">Gallery</span>
          </h1>
          <div className="mx-auto h-[3px] w-14 bg-gradient-to-r from-red-600 via-amber-400 to-blue-600 rounded-full" />
          <p className="mx-auto max-w-xl text-sm font-medium leading-relaxed text-zinc-200">
            Moments of worship, community, and God&apos;s faithfulness captured at Hosanna Mandir.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="sticky top-0 z-30 bg-white border-b border-zinc-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex gap-2.5 overflow-x-auto scrollbar-none">
          {SUBCATEGORIES.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setActive(tab.value)}
              className={`flex-shrink-0 rounded-full px-5 py-2 text-xs font-extrabold uppercase tracking-[0.14em] transition-all duration-200 ${
                active === tab.value
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          {loading ? (
            <p className="text-center text-zinc-400 text-sm font-medium py-20">Loading photos...</p>
          ) : items.length === 0 ? (
            <div className="mx-auto max-w-md rounded-2xl bg-white p-10 text-center shadow-sm border border-zinc-100">
              <p className="text-2xl font-black text-zinc-900">No photos yet</p>
              <p className="mt-2 text-sm text-zinc-400 font-medium">
                Upload images from the admin panel and they will appear here.
              </p>
            </div>
          ) : (
            <ScrollReveal>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {items.map((item) => (
                  <article
                    key={item.id}
                    className="group overflow-hidden rounded-2xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.14)] transition-shadow duration-300 cursor-pointer"
                    onClick={() => setSelected(item)}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
                      <img
                        src={item.src}
                        alt={item.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      {/* Hover overlay hint */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full px-4 py-2 text-[11px] font-extrabold uppercase tracking-widest text-zinc-800 flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
                          </svg>
                          View
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

    </div>
  )
}
