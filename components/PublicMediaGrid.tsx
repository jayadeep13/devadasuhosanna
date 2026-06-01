'use client'

import { useEffect, useState } from 'react'

type MediaItem = {
  id: string
  category: 'gallery' | 'updates'
  title: string
  description: string
  src: string
  createdAt: string
}

function shareToFacebook(item: MediaItem) {
  const url = typeof window === 'undefined' ? item.src : new URL(item.src, window.location.origin).toString()
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank', 'noopener,noreferrer')
}

function shareToWhatsApp(item: MediaItem) {
  const url = typeof window === 'undefined' ? item.src : new URL(item.src, window.location.origin).toString()
  const message = [item.title, item.description, url].filter(Boolean).join('\n\n')
  window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
}

function downloadImage(item: MediaItem) {
  const link = document.createElement('a')
  link.href = item.src
  link.download = item.title || 'hosanna-update'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

function UpdateCard({ item, big }: { item: MediaItem; big: boolean }) {
  const [copied, setCopied] = useState(false)

  function copyLink() {
    const url = typeof window === 'undefined' ? item.src : new URL(item.src, window.location.origin).toString()
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <article className="overflow-hidden rounded-[1.5rem] shadow-[0_18px_45px_rgba(33,25,20,0.10)] bg-white">
      {/* Image — full natural dimensions, no cropping */}
      <div className="group relative overflow-hidden bg-zinc-950">
        <img
          src={item.src}
          alt={item.title}
          className="w-full h-auto block transition duration-500 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/8 transition-all duration-300" />
      </div>

      {/* Title / description */}
      {(item.title || item.description) && (
        <div className="px-5 pt-4 pb-1">
          {item.title && (
            <h3 className="font-sans text-base font-black text-zinc-900 leading-tight">{item.title}</h3>
          )}
          {item.description && (
            <p className="mt-1 font-sans text-sm text-zinc-500 leading-snug">{item.description}</p>
          )}
        </div>
      )}

      {/* Share row */}
      <div className="px-5 pb-5 pt-3">
        <p className="text-center text-[10px] font-bold tracking-[0.22em] text-zinc-400 uppercase mb-3">
          SHARE THIS PROMISE
        </p>
        <div className="flex flex-wrap justify-center gap-2">

          {/* Facebook */}
          <button
            type="button"
            onClick={() => shareToFacebook(item)}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#1877F2] px-4 py-2 text-[11px] font-black uppercase tracking-wider text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:scale-95"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 shrink-0">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Share
          </button>

          {/* WhatsApp */}
          <button
            type="button"
            onClick={() => shareToWhatsApp(item)}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-4 py-2 text-[11px] font-black uppercase tracking-wider text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:scale-95"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 shrink-0">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Share
          </button>

          {/* Copy Link (Instagram style) */}
          <button
            type="button"
            onClick={copyLink}
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#f97316] via-[#e11d48] to-[#be123c] px-4 py-2 text-[11px] font-black uppercase tracking-wider text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:scale-95"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 shrink-0">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            {copied ? 'Copied!' : 'Copy Link'}
          </button>

          {/* Download */}
          <button
            type="button"
            onClick={() => downloadImage(item)}
            className="inline-flex items-center gap-1.5 rounded-full bg-zinc-950 px-4 py-2 text-[11px] font-black uppercase tracking-wider text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-zinc-800 hover:shadow-md active:scale-95"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 shrink-0">
              <path d="M12 16.5l-5-5h3.5V4h3v7.5H17l-5 5zM5 20v-1.5h14V20H5z"/>
            </svg>
            Download
          </button>

        </div>
      </div>
    </article>
  )
}

export default function PublicMediaGrid({ category }: { category: 'gallery' | 'updates' }) {
  const [items, setItems] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    fetch(`/api/media?category=${category}`, { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (mounted) setItems(data.items || [])
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })
    return () => {
      mounted = false
    }
  }, [category])

  if (loading) {
    return <p className="text-center font-sans text-[#6f5b51]">Loading images...</p>
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl rounded-[1.5rem] bg-white p-10 text-center shadow-[0_18px_45px_rgba(33,25,20,0.1)]">
        <p className="font-sans text-3xl font-black text-[#211914]">No images uploaded yet</p>
        <p className="mt-3 font-sans text-base font-semibold text-[#6f5b51]">
          Upload images from the admin panel and they will appear here automatically.
        </p>
      </div>
    )
  }

  if (category === 'updates') {
    if (items.length === 1) {
      return (
        <div className="max-w-4xl mx-auto">
          <UpdateCard item={items[0]} big />
        </div>
      )
    }
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <UpdateCard key={item.id} item={item} big={false} />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <article key={item.id} className="overflow-hidden rounded-[1.5rem] bg-white shadow-[0_18px_45px_rgba(33,25,20,0.12)]">
          <div className="relative aspect-[4/3] overflow-hidden bg-[#fff7ed]">
            <img src={item.src} alt={item.title} loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-500 hover:scale-105" />
          </div>
          <div className="p-6">
            <p className="font-sans text-xs font-extrabold uppercase tracking-[0.18em] text-[#e11d48]">
              {new Date(item.createdAt).toLocaleDateString()}
            </p>
            <h2 className="mt-2 font-sans text-2xl font-black text-[#211914]">{item.title}</h2>
            {item.description && <p className="mt-3 font-sans text-base font-semibold leading-7 text-[#6f5b51]">{item.description}</p>}
          </div>
        </article>
      ))}
    </div>
  )
}
