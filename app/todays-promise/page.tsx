'use client'

import { useEffect, useState } from 'react'
import ScrollReveal from '@/components/ScrollReveal'

type PromiseItem = {
  id: string
  src: string
  caption: string
  uploadedAt: string
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
    </svg>
  )
}

async function downloadImage(src: string, filename: string) {
  try {
    const res = await fetch(src)
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  } catch {
    window.open(src, '_blank', 'noopener,noreferrer')
  }
}

function ShareButtons({ item }: { item: PromiseItem }) {
  const pageUrl = typeof window !== 'undefined' ? `${window.location.origin}/todays-promise` : ''
  const imageUrl = typeof window !== 'undefined' ? `${window.location.origin}${item.src}` : item.src
  const message = item.caption
    ? `${item.caption}\n\n${pageUrl}`
    : `Today's Promise from Hosanna Mandir\n\n${pageUrl}`

  const [copied, setCopied] = useState(false)

  const copyForInstagram = async () => {
    try {
      await navigator.clipboard.writeText(imageUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      window.open(imageUrl, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3 justify-center">
      <button
        onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`, '_blank', 'noopener,noreferrer,width=600,height=500')}
        className="flex items-center gap-2 rounded-full bg-[#1877F2] px-5 py-2.5 font-sans text-xs font-extrabold uppercase tracking-widest text-white shadow-md hover:-translate-y-0.5 transition-all duration-200 hover:shadow-lg"
      >
        <FacebookIcon /> Share
      </button>
      <button
        onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')}
        className="flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 font-sans text-xs font-extrabold uppercase tracking-widest text-white shadow-md hover:-translate-y-0.5 transition-all duration-200 hover:shadow-lg"
      >
        <WhatsAppIcon /> Share
      </button>
      <button
        onClick={copyForInstagram}
        className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#f09433] via-[#e6683c] to-[#dc2743] px-5 py-2.5 font-sans text-xs font-extrabold uppercase tracking-widest text-white shadow-md hover:-translate-y-0.5 transition-all duration-200 hover:shadow-lg"
      >
        <InstagramIcon /> {copied ? 'Copied!' : 'Copy Link'}
      </button>
      <button
        onClick={() => downloadImage(item.src, `todays-promise-${item.id}.webp`)}
        className="flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5 font-sans text-xs font-extrabold uppercase tracking-widest text-white shadow-md hover:-translate-y-0.5 transition-all duration-200 hover:bg-zinc-700"
      >
        <DownloadIcon /> Download
      </button>
    </div>
  )
}

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function TodaysPromisePage() {
  const [promises, setPromises] = useState<PromiseItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/todays-promise', { cache: 'no-store' })
      .then((r) => r.json())
      .then((d) => setPromises(d.promises || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  // Max 7 total: 1 featured + 6 in grid
  const featured = promises[0] || null
  const previous = promises.slice(1, 7)

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans pb-24">

      {/* Hero Header */}
      <section className="relative pt-36 pb-16 bg-white border-b border-zinc-100 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-amber-500 rounded-full blur-[120px]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200 px-3.5 py-1 text-[11px] font-bold tracking-widest text-amber-700 uppercase">
            ✝ Daily Word of God
          </div>
          <h1 className="text-4xl font-black tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
            Today&apos;s{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-amber-500">
              Promise
            </span>
          </h1>
          <div className="mx-auto h-[3px] w-14 bg-gradient-to-r from-red-600 via-amber-400 to-blue-600 rounded-full" />
          <p className="mx-auto max-w-xl text-zinc-500 text-sm font-medium leading-relaxed">
            A fresh promise from God&apos;s Word every morning — declared over your life by Hosanna Mandir.
          </p>
        </div>
      </section>

      {/* Main Featured Poster */}
      <section className="bg-white">
        {loading ? (
          <div className="flex flex-col items-center gap-4 py-24">
            <div className="w-10 h-10 rounded-full border-4 border-amber-500 border-t-transparent animate-spin" />
            <p className="text-zinc-400 text-sm font-medium">Loading today&apos;s promise...</p>
          </div>
        ) : !featured ? (
          <div className="max-w-md mx-auto rounded-3xl bg-zinc-50 border border-zinc-100 p-12 text-center shadow-sm my-16">
            <p className="text-5xl mb-4">✝</p>
            <p className="text-xl font-black text-zinc-900">No promise yet</p>
            <p className="mt-2 text-sm text-zinc-400 font-medium">
              The daily promise will appear here once uploaded from the admin panel.
            </p>
          </div>
        ) : (
          <>
            {/* Full-width poster image */}
            <div className="w-full bg-white">
              <img
                src={featured.src}
                alt="Today's Promise"
                className="w-full h-auto block max-h-[85vh] object-contain mx-auto"
              />
            </div>

            {/* Caption + Share */}
            <div className="max-w-4xl mx-auto px-5 sm:px-8 py-10 space-y-6">
              {featured.caption && (
                <p className="text-center text-base sm:text-lg font-bold text-zinc-800 leading-relaxed max-w-2xl mx-auto">
                  {featured.caption}
                </p>
              )}
              <div>
                <p className="text-center text-[11px] font-black uppercase tracking-[0.22em] text-zinc-400 mb-5">
                  Share This Promise
                </p>
                <ShareButtons item={featured} />
              </div>
            </div>
          </>
        )}
      </section>

      {/* Divider */}
      {!loading && previous.length > 0 && (
        <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
      )}

      {/* Previous Promises Grid — max 6 (total 7 with featured) */}
      {!loading && previous.length > 0 && (
        <section className="py-16 bg-zinc-50">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-10">

            <ScrollReveal>
              <div className="text-center space-y-2">
                <span className="text-[11px] font-bold tracking-[0.2em] text-amber-600 uppercase bg-amber-50 border border-amber-100 px-3 py-1 rounded-md">
                  This Week&apos;s Promises
                </span>
                <h3 className="text-3xl font-black text-zinc-950 tracking-tight sm:text-4xl">
                  Previous Promises
                </h3>
                <div className="mx-auto h-[3px] w-12 bg-gradient-to-r from-red-500 to-amber-400 rounded-full" />
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {previous.map((item) => (
                <ScrollReveal key={item.id}>
                  <article className="group rounded-3xl border border-zinc-200/60 bg-white shadow-xl shadow-zinc-200/30 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">

                    {/* Poster image */}
                    <div className="relative overflow-hidden w-full bg-zinc-100">
                      <img
                        src={item.src}
                        alt="Promise"
                        className="w-full h-auto block transition duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Card footer */}
                    <div className="p-5 space-y-4 flex flex-col flex-1">
                      <div className="space-y-1.5">
                        <span className="inline-flex text-[9px] font-extrabold text-amber-600 tracking-wider bg-amber-50 border border-amber-100/60 rounded px-2 py-0.5 uppercase">
                          {formatDate(item.uploadedAt)}
                        </span>
                        {item.caption && (
                          <p className="text-sm font-bold text-zinc-800 leading-relaxed line-clamp-2">
                            {item.caption}
                          </p>
                        )}
                      </div>

                      <div className="flex gap-2 mt-auto pt-2 border-t border-zinc-100">
                        <button
                          onClick={() => {
                            const msg = item.caption
                              ? `${item.caption}\n\n${window.location.origin}/todays-promise`
                              : `Today's Promise from Hosanna Mandir\n\n${window.location.origin}/todays-promise`
                            window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer')
                          }}
                          className="flex items-center gap-1.5 rounded-full bg-[#25D366] px-4 py-2 font-sans text-[10px] font-extrabold uppercase tracking-wider text-white hover:-translate-y-0.5 transition-all duration-200"
                        >
                          <WhatsAppIcon /> Share
                        </button>
                        <button
                          onClick={() => downloadImage(item.src, `promise-${item.id}.webp`)}
                          className="flex items-center gap-1.5 rounded-full bg-zinc-900 px-4 py-2 font-sans text-[10px] font-extrabold uppercase tracking-wider text-white hover:-translate-y-0.5 transition-all duration-200 hover:bg-zinc-700"
                        >
                          <DownloadIcon /> Save
                        </button>
                      </div>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}