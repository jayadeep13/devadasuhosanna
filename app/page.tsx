'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ImageWithFallback from '@/components/ImageWithFallback'
import ScrollReveal from '@/components/ScrollReveal'

const ministries = [
  { slug: 'bible-classes',       image: '/biblestudy.jpeg',   title: 'Bible Classes',       desc: "Deep, verse-by-verse study of God's eternal Word for every believer.",        color: 'from-sky-500 to-blue-700' },
  { slug: 'children-ministries', image: '/chi.webp',          title: 'Children Ministries', desc: 'Nurturing young hearts with the love and truth of Jesus Christ.',             color: 'from-amber-400 to-orange-600' },
  { slug: 'gospel-meetings',     image: '/gospel.jpeg',       title: 'Gospel Meetings',     desc: 'Powerful evangelistic crusades bringing salvation to communities.',          color: 'from-rose-500 to-red-700' },
  { slug: 'tv-ministries',       image: '/churchm.jpeg',      title: 'T.V Ministries',      desc: 'Broadcasting the Gospel to thousands through television outreach.',          color: 'from-violet-500 to-indigo-700' },
  { slug: 'youth-ministries',    image: '/youthmini.jpeg',    title: 'Youth Ministries',    desc: 'Raising a generation of bold, purpose-driven believers for God.',             color: 'from-lime-500 to-emerald-700' },
  { slug: 'women-ministries',    image: '/woo12.jpg',           title: 'Women Ministries',    desc: 'Empowering women to walk in their God-given calling and grace.',             color: 'from-pink-500 to-fuchsia-700' },
  { slug: 'pastors-meeting',     image: '/pme.jpeg',          title: 'Pastors Meeting',     desc: 'Uniting church leaders in prayer, vision, and kingdom strategy.',           color: 'from-cyan-500 to-teal-700' },
  { slug: 'church-construction', image: '/churchcons12.jpeg',   title: 'Church Construction', desc: "Building sanctuaries to house God's growing family of believers.",         color: 'from-yellow-500 to-red-600' },
]

const testimonials = [
  {
    name: 'Pulapaka Suvarchala & Nella Satyanarayana Garu Family',
    location: 'Nuzvid',
    role: 'Thankful Family • Witnesses of Gods Faithfulness',
    image: '/satfa.png',
    quote: 'God has been faithful to our family throughout our journey. By His grace, Satyanarayana Garu serves as an LIC Officer and Suvarchala Garu serves as a School Teacher. The Lord has blessed our children with successful careers and a bright future. Our son Tarun and daughter-in-law Mani serve as Section Officers in EPFO, Delhi. Our daughter is pursuing her PhD at EFLU, Hyderabad and serving as an Assistant Professor. We thank God for His guidance, favor, and countless blessings upon our family. All glory belongs to Him.',
  },
  {
    name: 'Lakshmi Devi',
    location: 'Nuzvid',
    role: "Women's Ministry Member",
    image: '/testimonials/t2.jpg',
    quote: "The Women's Ministry changed my life completely. I found purpose, sisterhood, and a deep faith in Jesus. Every prayer meeting fills my heart with peace, joy, and renewed strength.",
  },
  {
    name: 'Samuel Babu',
    location: 'Hanuman Junction',
    role: 'Youth Ministry Leader',
    image: '/testimonials/t3.jpg',
    quote: 'I was lost before I came to this church. Today I lead the youth ministry because of the love, mentorship, and the Word of God I received here. Christ is real and His power is real.',
  },
  {
    name: 'Anitha Rao',
    location: 'Andhra Pradesh',
    role: 'TV Ministry Viewer',
    image: '/testimonials/t4.jpg',
    quote: 'I watched the TV ministry from my home village and gave my life to Christ. The message reached me when no one else could. God used this ministry to bring me into His family.',
  },
  {
    name: 'David Prasad',
    location: 'Nuzvid',
    role: 'Gospel Meetings Attendee',
    image: '/testimonials/t5.jpg',
    quote: 'The Gospel meeting in our village brought healing to my mother and salvation to 12 families including mine. We are forever grateful to God and to Hosanna Ministries.',
  },
]

const serviceTimings = [
  {
    location: 'Hanuman Junction',
    note: 'Main worship campus',
    color: 'from-[#e11d48] to-[#f97316]',
    services: [
      { day: 'Sunday', time: '10:00 AM - 1:00 PM', type: 'Worship Service' },
      { day: 'Wednesday', time: '12:00 PM - 3:00 PM', type: "Women's Prayer" },
      { day: 'Saturday', time: '7:00 PM - 9:00 PM', type: 'Fasting Prayer' },
    ],
  },
  {
    location: 'Nuzvid',
    note: 'Prayer and healing campus',
    color: 'from-[#2563eb] to-[#7c3aed]',
    services: [
      { day: 'Sunday', time: '8:00 AM - 10:00 AM', type: 'Worship Service' },
      { day: 'Wednesday', time: '12:00 PM - 2:00 PM', type: 'Midweek Service' },
      { day: 'Friday', time: '10:00 AM - 2:00 PM', type: 'Healing Prayer' },
    ],
  },
]

const monthlyServices = [
  { icon: '🙏', date: '1st of Every Month', event: "Women's Prayer Meeting", color: 'text-rose-300' },
  { icon: '🌙', date: '15th of Every Month', event: 'Whole Night Worship Service', color: 'text-sky-300' },
  { icon: '🔥', date: 'Every July', event: '21 Days - Prayers, Fasting & Healing', color: 'text-amber-300' },
]

function HomeSectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <div className="mx-auto mb-14 max-w-3xl text-center">
      <p className="mb-3 font-display text-sm font-extrabold uppercase tracking-[0.26em] text-[#e11d48]">{eyebrow}</p>
      <h2 className="font-display text-4xl font-black leading-tight text-[#211914] sm:text-5xl">{title}</h2>
      <div className="mx-auto my-5 h-1 w-28 rounded-full bg-gradient-to-r from-[#e11d48] via-[#facc15] to-[#2563eb]" />
      <p className="font-modern text-base leading-8 text-[#67554b] sm:text-lg">{subtitle}</p>
    </div>
  )
}

function UdayakalaVideoSection() {
  const [videoId, setVideoId] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/devotional-status')
      .then(r => r.json())
      .then(data => {
        if (data.mainVideoId && data.mainVideoId !== 'f5v8eD_8NWe') {
          setVideoId(data.mainVideoId)
        } else if (data.pastVideos?.length > 0) {
          setVideoId(data.pastVideos[0].id)
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="relative overflow-hidden bg-[#07050e] pt-24 pb-0">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(225,29,72,0.15),transparent_55%)]" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
        <ScrollReveal>
          <div className="mb-10 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 font-modern text-xs font-extrabold uppercase tracking-[0.28em] text-[#facc15]">
              Daily Devotion
            </span>
            <h2 className="mt-4 font-display text-3xl font-black text-white sm:text-4xl">ఉదయకాల సందేశాలు</h2>
            <p className="mt-2 font-modern text-sm text-white/40 tracking-wide">Udayakala Sandhesam · Morning Messages</p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
            <div className="relative aspect-video w-full bg-zinc-950 flex items-center justify-center">
              {loading ? (
                <div className="flex flex-col items-center gap-3 text-white/30">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-[#facc15]" />
                  <p className="font-modern text-xs uppercase tracking-widest">Loading message…</p>
                </div>
              ) : videoId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                  title="Udayakala Sandhesam - Morning Message"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                />
              ) : (
                <div className="flex flex-col items-center gap-3 text-white/30">
                  <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" /></svg>
                  <p className="font-modern text-xs uppercase tracking-widest">Video coming soon</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/udayakala-daiva-sandesham"
              className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/8 px-8 py-3.5 font-modern text-sm font-extrabold uppercase tracking-[0.16em] text-white backdrop-blur-sm transition hover:border-[#facc15]/50 hover:bg-[#facc15]/10 hover:text-[#facc15]"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              Watch More ఉదయకాల సందేశాలు Videos
            </Link>
          </div>
        </ScrollReveal>
      </div>

      {/* Powered by P&J Technologies — seamless scrolling marquee */}
      <div className="mt-10 w-full border-t border-white/8 py-1 overflow-hidden flex select-none">
        <div className="marquee-track flex whitespace-nowrap shrink-0 items-center">
          {[...Array(2)].map((setIdx) =>
            [...Array(6)].map((_, i) => (
              <div key={`${setIdx}-${i}`} className="flex items-center gap-3 shrink-0 px-8 text-white font-sans text-[10px] font-black tracking-[0.22em] uppercase">
                <span className="text-white/40">POWERED BY</span>
                <div className="relative w-3.5 h-3.5 bg-white rounded-full shrink-0">
                  <Image src="/pjlogo.png" alt="P&J Technologies" fill className="object-contain p-0.5" />
                </div>
                <span>P &amp; J TECHNOLOGIES</span>
                <span className="text-amber-400 pl-2">🌅</span>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}

function TestimonialImg({ src, alt, name, gradient }: { src: string; alt: string; name: string; gradient: string }) {
  const [failed, setFailed] = useState(false)
  if (!src || failed) {
    return (
      <div className={`h-full w-full flex flex-col items-center justify-center bg-gradient-to-br ${gradient}`}>
        <span className="font-display text-7xl font-black text-white/30">{name[0]}</span>
      </div>
    )
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className="h-full w-full object-cover object-top"
      onError={() => setFailed(true)}
    />
  )
}

const testimonialGradients = [
  'from-[#e11d48] to-[#f97316]',
  'from-[#7c3aed] to-[#2563eb]',
  'from-[#0891b2] to-[#0f766e]',
  'from-[#b45309] to-[#d97706]',
  'from-[#be123c] to-[#9f1239]',
]

function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [fading, setFading] = useState(false)

  const goTo = (idx: number) => {
    setFading(true)
    setTimeout(() => {
      setCurrent(idx)
      setFading(false)
    }, 280)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setCurrent(prev => {
          setFading(false)
          return (prev + 1) % testimonials.length
        })
      }, 280)
    }, 10000)
    return () => clearInterval(timer)
  }, [])

  const t = testimonials[current]

  return (
    <section className="bg-[#fff8ed] py-24">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <ScrollReveal>
          <HomeSectionHeader
            eyebrow="Lives Transformed"
            title="Testimonials"
            subtitle="Stories of grace, healing, and new life from our Hosanna church family."
          />
        </ScrollReveal>

        {/* Fixed-height card — always 460px, equal on all testimonials */}
        <div className={`transition-opacity duration-300 ${fading ? 'opacity-0' : 'opacity-100'}`}>
          <div
          className="overflow-hidden rounded-3xl bg-white shadow-[0_28px_80px_rgba(33,25,20,0.14)] border border-orange-100/60 h-[650px] lg:h-[460px]"
          >
     <div className="grid h-full grid-cols-1 lg:grid-cols-[45%_55%]">
              {/* ── Image panel — always shown, graceful fallback ── */}
             <div className="relative h-full w-full overflow-hidden">
                <TestimonialImg
                  key={`${current}-${t.image}`}
                  src={t.image}
                  alt={t.name}
                  name={t.name}
                  gradient={testimonialGradients[current % testimonialGradients.length]}
                />
                {/* Dark right-edge vignette — blends into quote panel */}
                <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-r from-transparent to-black/40" />
                {/* Bottom vignette */}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              {/* ── Quote panel ── */}
            <div className={`relative flex flex-col overflow-hidden px-6 py-6 lg:px-10 lg:py-10 ${!t.image ? 'items-center text-center' : ''}`}>
                {/* Decorative large quote mark */}
                <svg className="absolute top-6 right-8 h-20 w-20 text-[#e11d48]/6 pointer-events-none select-none" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>

                {/* Small quote icon */}
                <svg className="mb-4 h-7 w-7 text-[#e11d48]/30 shrink-0" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>

                {/* Quote text — scrollable if very long */}
              <div className="flex-1 overflow-y-auto pr-2 max-h-[220px] lg:max-h-[280px]">
                  <p className="font-modern text-base font-semibold leading-8 text-[#5f4a41] sm:text-[17px]">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                {/* Attribution */}
                <div className="mt-6 shrink-0">
                  <div className="mb-4 h-px bg-gradient-to-r from-[#e11d48]/20 via-[#facc15]/20 to-transparent" />
                  <p className="font-display text-base font-black text-[#211914] leading-tight">{t.name}</p>
                  <p className="mt-1 font-modern text-[10px] font-bold uppercase tracking-[0.2em] text-[#e11d48]">{t.role} · {t.location}</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Dot navigation */}
        <div className="mt-8 flex items-center justify-center gap-2.5">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Testimonial ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? 'h-3 w-8 bg-[#e11d48]'
                  : 'h-3 w-3 bg-[#e11d48]/25 hover:bg-[#e11d48]/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

type PromiseItem = { id: string; src: string; caption: string; uploadedAt: string }
type PopupPhase = 'idle' | 'promise' | 'udayakala'

function PopupManager() {
  const [phase, setPhase] = useState<PopupPhase>('idle')
  const [promise, setPromise] = useState<PromiseItem | null>(null)
  const [videoId, setVideoId] = useState('')

  useEffect(() => {
    // Prefetch both resources immediately
    fetch('/api/todays-promise', { cache: 'no-store' })
      .then(r => r.json()).then(d => { if (d.promises?.[0]) setPromise(d.promises[0]) }).catch(() => {})

    fetch('/api/devotional-status')
      .then(r => r.json())
      .then(d => {
        const vid = (d.mainVideoId && d.mainVideoId !== 'f5v8eD_8NWe') ? d.mainVideoId : d.pastVideos?.[0]?.id
        if (vid) setVideoId(vid)
      }).catch(() => {})

    const t = setTimeout(() => setPhase('promise'), 10000)
    return () => clearTimeout(t)
  }, [])

  const closePromise = () => {
    setPhase('idle')
    setTimeout(() => setPhase('udayakala'), 5000)
  }

  const closeUdayakala = () => setPhase('idle')

  const handleDownload = async () => {
    if (!promise) return
    try {
      const res = await fetch(promise.src)
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = promise.src.split('/').pop() || 'todays-promise.jpg'
      a.click()
      URL.revokeObjectURL(url)
    } catch { window.open(promise.src, '_blank', 'noopener,noreferrer') }
  }

  const shareWhatsApp = () => {
    if (!promise) return
    const text = encodeURIComponent((promise.caption || "Today's Promise from Hosanna Mandir") + '\n' + window.location.origin + '/todays-promise')
    window.open(`https://wa.me/?text=${text}`, '_blank', 'noopener,noreferrer')
  }

  const shareFacebook = () => {
    if (!promise) return
    const url = encodeURIComponent(window.location.origin + '/todays-promise')
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'noopener,noreferrer')
  }

  const CloseBtn = ({ onClose }: { onClose: () => void }) => (
    <button onClick={onClose} className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 text-zinc-400 transition hover:bg-zinc-200 hover:text-zinc-700">
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  )

  if (phase === 'promise' && promise) return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4" onClick={closePromise}>
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
      <div className="relative z-10 w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-[0_40px_100px_rgba(0,0,0,0.8)] border border-zinc-200" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-3.5 bg-white border-b border-zinc-100">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#e11d48] animate-pulse" />
            <span className="font-sans text-[10px] font-black uppercase tracking-[0.3em] text-zinc-800">Today&apos;s Promise</span>
          </div>
          <CloseBtn onClose={closePromise} />
        </div>
        <div className="relative aspect-square w-full bg-zinc-100">
          <Image src={promise.src} alt="Today's Promise" fill className="object-cover object-center" />
        </div>
        {promise.caption && (
          <p className="px-5 pt-3 pb-1 font-sans text-xs font-semibold leading-5 text-zinc-600 text-center bg-white border-t border-zinc-100">{promise.caption}</p>
        )}
        <div className="bg-white border-t border-zinc-100 px-5 py-4">
          <div className="flex items-center gap-3">
            <button onClick={handleDownload} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-zinc-900 py-2.5 font-sans text-[10px] font-extrabold uppercase tracking-widest text-white transition hover:bg-zinc-700">
              <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" /></svg>
              Download
            </button>
            <button onClick={shareWhatsApp} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#25D366] transition hover:bg-[#1ebe5d]" title="Share on WhatsApp">
              <svg viewBox="0 0 24 24" fill="white" className="h-4 w-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </button>
            <button onClick={shareFacebook} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1877F2] transition hover:bg-[#166fe5]" title="Share on Facebook">
              <svg viewBox="0 0 24 24" fill="white" className="h-4 w-4"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  if (phase === 'udayakala' && videoId) return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4" onClick={closeUdayakala}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl bg-[#07050e] shadow-[0_40px_100px_rgba(0,0,0,0.9)] border border-white/10" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/8">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#facc15] animate-pulse" />
            <span className="font-sans text-[10px] font-black uppercase tracking-[0.3em] text-[#facc15]">ఉదయకాల సందేశాలు</span>
          </div>
          <button onClick={closeUdayakala} className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/50 transition hover:bg-white/20 hover:text-white">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        {/* Video */}
        <div className="relative aspect-video w-full bg-zinc-950">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1`}
            title="Udayakala Sandhesam"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>
        {/* Footer */}
        <div className="px-5 py-3 border-t border-white/8 flex items-center justify-between">
          <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-white/40">Morning Message · Hosanna Mandir</p>
          <Link href="/udayakala-daiva-sandesham" onClick={closeUdayakala} className="font-sans text-[10px] font-extrabold uppercase tracking-widest text-[#facc15] transition hover:text-[#facc15]/70">
            Watch All →
          </Link>
        </div>
      </div>
    </div>
  )

  return null
}

export default function HomePage() {
  return (
    <>
      <PopupManager />

      {/* ── Hero ── */}
      <section className="relative flex min-h-[115vh] items-end overflow-hidden bg-black">
        {/* Full background — congregation worship image */}
        {/* Desktop Image */}
        <Image
          src="/use.jpeg"
          alt="Hosanna Mandir"
          fill
          priority
          quality={100}
          sizes="100vw"
          className="hidden md:block object-cover object-center"
        />

        {/* Mobile Image */}
        <Image
          src="/use.jpeg" // Using the main asset safely now
          alt="Hosanna Mandir Mobile"
          fill
          priority
          quality={100}
          sizes="100vw"
          className="block md:hidden object-cover object-top"
        />

        {/* ── NEW DARK TINT OVERLAYS START HERE ── */}
        {/* Mobile-Specific Dark Overlay Tint (Masks blurriness on mobile screens) */}
        <div className="absolute inset-0 block md:hidden bg-black/50 z-[1] pointer-events-none" />

        {/* Global Text Readability Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20 z-[2]" />
        {/* ── NEW DARK TINT OVERLAYS END HERE ── */}

        {/* Location label — top center */}
        <div className="absolute top-28 inset-x-0 z-10 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-4 py-1.5 font-modern text-[9px] font-bold uppercase tracking-[0.35em] text-white/70 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#e11d48]" />
            Hanuman Junction &amp; Nuzvid · Andhra Pradesh
          </span>
        </div>
        {/* Main content — pinned to bottom */}
        <div className="relative z-10 w-full px-6 pb-16 sm:pb-20 sm:px-12">
          <div className="mx-auto max-w-6xl">
            <ScrollReveal>
              {/* Accent rule */}
              <div className="mb-5 flex items-center gap-4">
                <div className="h-[2px] w-12 bg-[#e11d48]" />
                <span className="font-modern text-[9px] font-bold uppercase tracking-[0.4em] text-white/40">Since 2001 · House of God</span>
              </div>

              {/* Headline */}
              <h1 className="font-display font-black leading-none text-white">
                <span className="block text-5xl xs:text-6xl sm:text-7xl md:text-[8rem] lg:text-[9rem] leading-none tracking-tight drop-shadow-2xl">HOSANNA</span>
                <div className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-2">
                  <span className="font-telugu text-2xl xs:text-3xl sm:text-4xl md:text-[3rem] font-bold text-[#facc15]">దైవ సందేశాలు</span>
                  <span className="text-sm xs:text-base sm:text-lg md:text-[1.8rem] font-light tracking-[0.18em] text-white/50 uppercase">Daiva Sandeshalu</span>
                </div>
              </h1>

              {/* Buttons */}
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/live"
                  className="inline-flex items-center gap-2.5 rounded-full bg-[#e11d48] px-8 py-3.5 font-modern text-sm font-extrabold uppercase tracking-[0.18em] text-white shadow-xl shadow-[#e11d48]/30 transition hover:bg-[#be123c] hover:-translate-y-0.5"
                >
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                  </span>
                  Watch Live
                </Link>
                <Link
                  href="/udayakala-daiva-sandesham"
                  className="inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/8 px-8 py-3.5 font-modern text-sm font-extrabold uppercase tracking-[0.16em] text-white backdrop-blur-sm transition hover:bg-white/15 hover:border-white/45"
                >
                  <svg className="h-3.5 w-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/></svg>
                  ఉదయకాల సందేశాలు
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Thin red accent bottom border */}
        <div className="absolute bottom-0 inset-x-0 h-[3px] bg-gradient-to-r from-[#e11d48] via-[#facc15] to-[#2563eb]" />
      </section>

      {/* ── Stats / Impact Bar ── */}
      <section className="bg-white border-b border-zinc-100">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid grid-cols-2 divide-x divide-zinc-100 lg:grid-cols-4">
            {[
              { num: '40+', label: 'Years of Ministry', color: 'text-[#e11d48]' },
              { num: '2',   label: 'Church Campuses',  color: 'text-[#2563eb]' },
              { num: '4+',  label: 'TV Channels',      color: 'text-[#facc15]' },
              { num: '∞',   label: 'Lives Transformed', color: 'text-[#e11d48]' },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center justify-center gap-1 py-8 px-4 text-center">
                <span className={`font-display text-4xl font-black sm:text-5xl ${s.color}`}>{s.num}</span>
                <span className="font-modern text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-400">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Live Stream Teaser Banner ── */}
      <div className="bg-gradient-to-r from-[#e11d48] via-[#c2185b] to-[#e11d48] py-3.5">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-70" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
            </span>
            <p className="font-modern text-sm font-extrabold uppercase tracking-[0.18em] text-white">
              Join us Live — Every Sunday 10:00 AM &amp; 8:00 AM · Hanuman Junction &amp; Nuzvid
            </p>
          </div>
          <Link
            href="/live"
            className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/15 px-5 py-1.5 font-modern text-xs font-extrabold uppercase tracking-widest text-white backdrop-blur-sm transition hover:bg-white/25"
          >
            Watch Live →
          </Link>
        </div>
      </div>

      {/* ── About & Pastor — Premium Full-Bleed Editorial ── */}
      <section className="bg-gradient-to-b from-white via-slate-50 to-white py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2" style={{ minHeight: '580px' }}>

            {/* ── Church Card ── */}
            <ScrollReveal>
              <div className="group relative h-full min-h-[520px] overflow-hidden rounded-3xl shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
                {/* Full-bleed image */}
                <div className="absolute inset-0">
                  <ImageWithFallback
                    src="/church.jpg"
                    alt="Hosanna church"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-107"
                    fallbackClassName="h-full w-full bg-zinc-800"
                    fallback="Church"
                  />
                </div>

                {/* Layered gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

                {/* Top badge */}
                <div className="absolute top-6 left-6">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/30 px-3 py-1 font-modern text-[9px] font-bold uppercase tracking-[0.35em] text-white/60 backdrop-blur-md">
                    <span className="h-1 w-1 rounded-full bg-[#e11d48]" /> Our Church
                  </span>
                </div>

                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="mb-4 h-[2px] w-8 bg-[#e11d48]" />
                  <h2 className="font-display text-3xl font-black leading-tight text-white sm:text-4xl">
                    Faith, Prayer<br />&amp; New Life
                  </h2>
                  <p className="mt-3 font-modern text-sm leading-7 text-white/60">
                    A Spirit-filled church family in Hanuman Junction and Nuzvid — worship, healing, prayer, and the living Word of God.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {['Worship', 'Healing', 'Teaching', 'Outreach'].map(t => (
                      <span key={t} className="rounded-full border border-white/15 bg-white/8 px-3 py-1 font-modern text-[9px] font-bold uppercase tracking-wider text-white/70 backdrop-blur-sm">{t}</span>
                    ))}
                  </div>
                  <Link
                    href="/about"
                    className="mt-6 inline-flex items-center gap-2 font-modern text-xs font-extrabold uppercase tracking-[0.22em] text-[#facc15] transition-all duration-200 hover:gap-3"
                  >
                    Learn More
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            {/* ── Pastor Card ── */}
            <ScrollReveal delay={120}>
              <div className="group relative h-full min-h-[520px] overflow-hidden rounded-3xl shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
                {/* Full-bleed image */}
                <div className="absolute inset-0 bg-[#1a0f08]">
                  <ImageWithFallback
                    src="/pastor.png"
                    alt="Pastor Deva Dasu"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    fallbackClassName="h-full w-full bg-[#1a0f08]"
                    fallback="Pastor"
                  />
                </div>

                {/* Layered gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-black/5" />

                {/* Top badge */}
                <div className="absolute top-6 left-6">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/30 px-3 py-1 font-modern text-[9px] font-bold uppercase tracking-[0.35em] text-white/60 backdrop-blur-md">
                    <span className="h-1 w-1 rounded-full bg-[#facc15]" /> Our Pastor
                  </span>
                </div>

                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="mb-4 h-[2px] w-8 bg-[#facc15]" />
                  <h2 className="font-display text-3xl font-black leading-tight text-white sm:text-4xl">
                    Pastor<br />Deva Dasu
                  </h2>
                  <p className="mt-3 font-modern text-sm leading-7 text-white/60">
                    Anointed by God, leading Hosanna Mandir with faith, prayer, and a deep love for the Gospel — bringing healing and transformation.
                  </p>
                  <blockquote className="mt-4 border-l-2 border-[#facc15]/50 pl-3">
                    <p className="font-serif text-xs italic text-white/45">&ldquo;Every soul matters. Every prayer is heard by God.&rdquo;</p>
                  </blockquote>
                  <Link
                    href="/pastor"
                    className="mt-6 inline-flex items-center gap-2 font-modern text-xs font-extrabold uppercase tracking-[0.22em] text-[#facc15] transition-all duration-200 hover:gap-3"
                  >
                    Learn More
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                  </Link>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* ── Service Times — Premium Dark Editorial ── */}
      <section className="relative overflow-hidden bg-[#0c0f1a] py-20">
        {/* Subtle background glows */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(225,29,72,0.12),transparent_50%),radial-gradient(ellipse_at_80%_20%,rgba(37,99,235,0.12),transparent_50%)]" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="relative mx-auto max-w-6xl px-5 sm:px-8">

          {/* Header */}
          <ScrollReveal>
            <div className="mb-12 flex flex-col items-center text-center">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-10 bg-[#e11d48]" />
                <span className="font-modern text-[9px] font-bold uppercase tracking-[0.4em] text-white/40">Join Us in Worship</span>
                <div className="h-px w-10 bg-[#e11d48]" />
              </div>
              <h2 className="font-display text-4xl font-black text-white sm:text-5xl">
                Service Times<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e11d48] to-[#facc15]"> &amp; </span>Locations
              </h2>
            </div>
          </ScrollReveal>

          {/* Campus cards */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {serviceTimings.map((loc, index) => (
              <ScrollReveal key={loc.location} delay={index * 100}>
                <div className="overflow-hidden rounded-2xl border border-white/8 bg-white/[0.04] backdrop-blur-sm">
                  {/* Header strip */}
                  <div className={`relative bg-gradient-to-r ${loc.color} px-6 py-5 overflow-hidden`}>
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,rgba(255,255,255,0.15),transparent_60%)]" />
                    <div className="relative flex items-center justify-between">
                      <div>
                        <h3 className="font-display text-xl font-black text-white tracking-tight">{loc.location}</h3>
                        <p className="mt-0.5 font-modern text-[9px] font-bold uppercase tracking-[0.3em] text-white/65">{loc.note}</p>
                      </div>
                      <span className="relative flex h-3 w-3">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-50" />
                        <span className="relative inline-flex h-3 w-3 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                      </span>
                    </div>
                  </div>

                  {/* Service rows */}
                  <div className="divide-y divide-white/[0.06] px-2 py-1">
                    {loc.services.map((service) => (
                      <div key={service.day} className="flex items-center justify-between rounded-xl px-4 py-4 transition hover:bg-white/[0.04]">
                        <div>
                          <p className="font-display text-sm font-black text-white tracking-wide">{service.day}</p>
                          <p className="font-modern text-[11px] text-white/40 mt-0.5">{service.type}</p>
                        </div>
                        <span className="rounded-full border border-white/15 bg-white/8 px-4 py-1.5 font-modern text-xs font-bold text-white/80">{service.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Monthly specials */}
          <ScrollReveal delay={200}>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {monthlyServices.map((item) => (
                <div key={item.date} className="group flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.04] px-5 py-4 backdrop-blur-sm transition hover:bg-white/[0.08] hover:border-white/15">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="font-display text-[10px] font-black uppercase tracking-[0.25em] text-white/50">{item.date}</p>
                    <p className="font-modern text-sm font-bold text-white/80 mt-0.5 leading-5">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <ScrollReveal>
            <HomeSectionHeader
              eyebrow="Kingdom Work"
              title="Our Ministries"
              subtitle="Serving every generation with the love, truth, and power of Jesus Christ."
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ministries.map((ministry, index) => (
              <ScrollReveal key={ministry.title} delay={index * 55}>
                <div className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-white shadow-[0_18px_45px_rgba(33,25,20,0.11)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(33,25,20,0.16)]">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <ImageWithFallback
                      src={ministry.image}
                      alt={ministry.title}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      fallbackClassName={`flex h-full w-full items-center justify-center bg-gradient-to-br ${ministry.color}`}
                      fallback={<span className="font-display text-5xl font-black text-white/40">{ministry.title[0]}</span>}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                  <div className={`h-1 bg-gradient-to-r ${ministry.color}`} />
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-lg font-black uppercase tracking-[0.08em] text-[#211914]">{ministry.title}</h3>
                    <p className="mt-3 flex-1 font-modern text-sm font-semibold leading-7 text-[#6f5b51]">{ministry.desc}</p>
                    <Link
                      href={`/ministries#${ministry.slug}`}
                      className="mt-5 inline-flex items-center gap-1.5 font-modern text-xs font-extrabold uppercase tracking-[0.16em] text-[#e11d48] transition-colors hover:text-[#be123c]"
                    >
                      Learn More
                      <svg className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <UdayakalaVideoSection />

      <TestimonialsSection />

      {/* ── Prayer Request — Full-width cinematic with 3D atmosphere ── */}
      <section className="relative w-full overflow-hidden">
        {/* Full-width prayer image */}
        <div className="relative w-full" style={{ minHeight: '520px' }}>
          <Image
            src="/prayer.jpeg"
            alt="Prayer"
            fill
            className="object-cover object-center"
          />
          {/* Layered atmospheric overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black/90" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(225,29,72,0.22),transparent_60%)]" />

          {/* 3D floating cross — top center */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 z-10 animate-[float_4s_ease-in-out_infinite]">
            <svg viewBox="0 0 40 60" className="h-16 w-10 opacity-25 drop-shadow-[0_0_20px_rgba(255,255,255,0.6)]" fill="white">
              <rect x="16" y="0" width="8" height="60" rx="3"/>
              <rect x="0" y="16" width="40" height="8" rx="3"/>
            </svg>
          </div>

          {/* Floating prayer hands left */}
          <div className="absolute left-[8%] top-1/2 -translate-y-1/2 text-5xl opacity-15 animate-[float_5s_ease-in-out_infinite_1s]">🙏</div>
          {/* Floating prayer hands right */}
          <div className="absolute right-[8%] top-1/2 -translate-y-1/2 text-5xl opacity-15 animate-[float_5s_ease-in-out_infinite_0.5s]">🙏</div>

          {/* 3D light rays */}
          <div className="absolute inset-0 bg-[conic-gradient(from_270deg_at_50%_0%,transparent_60deg,rgba(255,255,255,0.04)_90deg,transparent_120deg)] animate-[spin_18s_linear_infinite]" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-5 py-24 sm:py-32">
            <ScrollReveal>
              {/* Animated prayer badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-2 backdrop-blur-md">
                <span className="animate-[float_2s_ease-in-out_infinite] text-base">🙏</span>
                <span className="font-modern text-[10px] font-bold uppercase tracking-[0.35em] text-white/80">We Pray With You</span>
              </div>

              <h2 className="font-display text-4xl font-black text-white drop-shadow-2xl sm:text-5xl lg:text-6xl"
                style={{ textShadow: '0 0 60px rgba(225,29,72,0.5), 0 4px 30px rgba(0,0,0,0.8)' }}>
                Do You Need Prayer?
              </h2>

              <div className="mx-auto mt-4 h-[3px] w-16 rounded-full bg-gradient-to-r from-[#e11d48] via-[#facc15] to-[#e11d48]" />

              <p className="mt-5 mx-auto max-w-lg font-modern text-base font-medium leading-8 text-white/70">
                Share your prayer need with us. Our team prays over every request personally —<br className="hidden sm:block" /> no need is too big or too small for God.
              </p>

              {/* 3D-style buttons */}
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/prayer"
                  className="group relative inline-flex items-center gap-2.5 rounded-full bg-[#e11d48] px-10 py-4 font-modern text-sm font-extrabold uppercase tracking-[0.2em] text-white shadow-[0_8px_30px_rgba(225,29,72,0.5),0_0_0_1px_rgba(225,29,72,0.3)] transition-all duration-300 hover:shadow-[0_14px_40px_rgba(225,29,72,0.7),0_0_0_1px_rgba(225,29,72,0.5)] hover:-translate-y-1.5"
                  style={{ transform: 'perspective(600px) rotateX(3deg)' }}
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                  Submit Prayer Request
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/12 px-10 py-4 font-modern text-sm font-extrabold uppercase tracking-[0.2em] text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/22 hover:border-white/50 hover:-translate-y-1"
                >
                  Contact Us
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Scripture Bridge — light separator between two dark sections ── */}
      <section className="bg-gradient-to-b from-white to-[#fff8ed] py-14 border-t border-orange-100/60">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <ScrollReveal>
            <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left sm:gap-10">

              {/* Cross icon */}
              <div className="shrink-0 flex h-16 w-16 items-center justify-center rounded-full bg-[#e11d48]/8 border border-[#e11d48]/15">
                <svg viewBox="0 0 40 60" className="h-8 w-6 text-[#e11d48]" fill="currentColor">
                  <rect x="16" y="0" width="8" height="60" rx="2"/>
                  <rect x="0" y="16" width="40" height="8" rx="2"/>
                </svg>
              </div>

              {/* Divider line (desktop) */}
              <div className="hidden sm:block h-14 w-px bg-gradient-to-b from-transparent via-[#e11d48]/20 to-transparent shrink-0" />

              {/* Scripture */}
              <div className="flex-1">
                <p className="font-serif text-xl font-semibold italic leading-9 text-zinc-700 sm:text-2xl">
                  &ldquo;For God so loved the world that He gave His one and only Son,
                  that whoever believes in Him shall not perish but have eternal life.&rdquo;
                </p>
                <p className="mt-3 font-modern text-xs font-extrabold uppercase tracking-[0.3em] text-[#e11d48]">John 3:16</p>
              </div>

            </div>
          </ScrollReveal>
        </div>
      </section>

    </>
  )
}