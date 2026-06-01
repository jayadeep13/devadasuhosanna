"use client";

import Link from 'next/link'
import ImageWithFallback from '@/components/ImageWithFallback'

const NAV_LINKS = [
  { href: '/about', label: 'About Church' },
  { href: '/pastor', label: 'Pastor Deva Dasu' },
  { href: '/ministries', label: 'Ministries' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/live', label: 'Watch Live' },
  { href: '/prayer', label: 'Prayer Request' },
  { href: '/todays-promise', label: "Today's Promise" },
  { href: '/udayakala-daiva-sandesham', label: 'ఉదయకాల సందేశాలు' },
  { href: '/contact', label: 'Contact Us' },
]

const SOCIAL = [
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@Devadashosanna',
    cls: 'hover:bg-[#C61A1A] hover:border-[#C61A1A]',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/hosanna_ministries_h.junction/',
    cls: 'hover:bg-[#E1306C] hover:border-[#E1306C]',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/HosannaMandir.H.Junction',
    cls: 'hover:bg-[#1877F2] hover:border-[#1877F2]',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>,
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/919440772772',
    cls: 'hover:bg-[#25D366] hover:border-[#25D366]',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>,
  },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-[#111111] via-[#0D0D0D] to-[#070707] text-white">
      
      {/* Animated Red-Tinted Wave Streams Overlay */}
      <div className="absolute inset-x-0 top-0 h-[280px] sm:h-[360px] md:inset-0 md:h-auto z-0 pointer-events-none opacity-[0.22]">
        <svg className="footer-wave w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 400" preserveAspectRatio="xMidYMid meet">
          <path fill="none" stroke="url(#waveRedGradient)" strokeWidth="2.5" d="M0,120 C320,190 440,20 740,150 C1040,280 1180,60 1440,160" className="animate-[wave_9s_ease-in-out_infinite_alternate]" />
          <path fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" d="M0,180 C400,40 520,240 880,120 C1240,0 1200,200 1440,110" className="animate-[wave_14s_ease-in-out_infinite_alternate_1s]" />
          <defs>
            <linearGradient id="waveRedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#B81414" stopOpacity="0.1"/>
              <stop offset="50%" stopColor="#E02E2E" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#9A0F0F" stopOpacity="0.1"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Background Watermarked Logo with Adjusted Opacity for Higher Clarity */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none opacity-[0.14] scale-100 select-none animate-[float3d_14s_ease-in-out_infinite_alternate]">
        <div className="relative w-[550px] h-[550px] md:w-[700px] md:h-[700px]">
          <ImageWithFallback
            src="/logo1.png"
            alt="Main Center Background Logo"
            className="w-full h-full object-contain"
            fallbackClassName="hidden"
            fallback={<div />}
          />
        </div>
      </div>

      {/* Top-Left Corner — minimal elegant bracket */}
      <div className="absolute top-0 left-0 pointer-events-none z-[1]">
        <div className="w-52 h-52 bg-[radial-gradient(ellipse_at_0%_0%,rgba(184,20,20,0.10)_0%,transparent_70%)]" />
        <svg className="absolute top-4 left-4 w-16 h-16" viewBox="0 0 64 64" fill="none">
          <path d="M1 38 L1 1 L38 1" stroke="#FFD700" strokeWidth="0.9" strokeLinecap="round" opacity="0.45"/>
          <path d="M6 33 L6 6 L33 6" stroke="#FFD700" strokeWidth="0.5" strokeLinecap="round" opacity="0.2"/>
          <circle cx="1" cy="1" r="2" fill="#FFD700" opacity="0.55"/>
        </svg>
      </div>

      {/* Top-Right Corner — minimal elegant bracket */}
      <div className="absolute top-0 right-0 pointer-events-none z-[1]">
        <div className="w-52 h-52 bg-[radial-gradient(ellipse_at_100%_0%,rgba(184,20,20,0.10)_0%,transparent_70%)]" />
        <svg className="absolute top-4 right-4 w-16 h-16" viewBox="0 0 64 64" fill="none">
          <path d="M63 38 L63 1 L26 1" stroke="#FFD700" strokeWidth="0.9" strokeLinecap="round" opacity="0.45"/>
          <path d="M58 33 L58 6 L31 6" stroke="#FFD700" strokeWidth="0.5" strokeLinecap="round" opacity="0.2"/>
          <circle cx="63" cy="1" r="2" fill="#FFD700" opacity="0.55"/>
        </svg>
      </div>

      <style jsx global>{`
        @keyframes wave {
          0% { transform: translateY(-10px) rotate(-0.5deg); }
          100% { transform: translateY(14px) rotate(0.5deg); }
        }
        @keyframes float3d {
          0% { transform: scale(0.98) translateY(-8px) rotate3d(1, 1, 0, -2deg); }
          100% { transform: scale(1.02) translateY(8px) rotate3d(1, 1, 0, 2deg); }
        }
        .footer-wave path {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
      `}</style>

      <div className="relative z-10 mx-auto max-w-7xl px-5 pt-16 sm:px-8">
        
        {/* Content Structure Layout Grid */}
        <div className="grid grid-cols-1 gap-12 border-b border-white/[0.06] py-14 md:grid-cols-2 lg:grid-cols-[1.3fr_1.3fr_1fr] lg:gap-16">

          {/* Column 1 — Brand Identity info */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 flex-shrink-0">
                <ImageWithFallback
                  src="/logo1.png"
                  alt="Hosanna Logo"
                  className="h-full w-full object-cover rounded-full"
                  fallbackClassName="flex h-full w-full items-center justify-center bg-[#111111]"
                  fallback={
                    <svg viewBox="0 0 40 40" fill="none" width="24" height="24">
                      <path d="M20 4 L20 36 M8 16 L32 16" stroke="#B81414" strokeWidth="4" strokeLinecap="round" />
                    </svg>
                  }
                />
              </div>
              <div>
                {/* Yellow Colored Heading and Larger Telugu script font text scaling */}
                <p className="font-sans text-xl font-black tracking-[0.2em] text-[#FFD700] uppercase">Hosanna</p>
                <p className="font-sans text-[0.85rem] font-extrabold tracking-[0.14em] text-[#E02E2E] uppercase mt-1">దైవ సందేశాలు</p>
              </div>
            </div>

            <p className="font-sans text-sm leading-relaxed text-white/70 max-w-xs">
              Where lives are transformed by the power and grace of Jesus Christ. Serving Andhra Pradesh and the world.
            </p>

            <blockquote className="border-l-2 border-[#E02E2E] pl-4">
              <p className="font-serif text-sm italic text-white/80">&ldquo;For God so loved the world…&rdquo;</p>
              <p className="mt-1 font-sans text-[10px] uppercase tracking-widest text-[#E02E2E]/70">John 3:16</p>
            </blockquote>

            {/* Social channels handles */}
            <div>
              <p className="font-sans text-[10px] font-bold uppercase tracking-[0.25em] text-white/40 mb-3">Follow Us</p>
              <div className="flex gap-2.5">
                {SOCIAL.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className={`flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 transition-all duration-200 hover:text-white hover:scale-110 shadow-sm ${s.cls}`}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2 — Clean Links Index Over Logo Background */}
          <div>
            <p className="font-sans text-[10px] font-bold uppercase tracking-[0.25em] text-white/40 border-b border-white/[0.06] pb-2 mb-6">Explore Directory</p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="group flex items-center gap-2.5 font-sans text-[13px] font-medium text-white/80 transition-colors hover:text-white"
                >
                  <span className="h-px w-2 bg-white/30 transition-all duration-300 group-hover:w-3.5 group-hover:bg-[#E02E2E]" />
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3 — Contact panel and active deep-linked Google maps links */}
          <div>
            <p className="font-sans text-[10px] font-bold uppercase tracking-[0.25em] text-white/40 border-b border-white/[0.06] pb-2 mb-6">Contact Panel</p>
            <div className="space-y-4">
              {['+91 94407 72772', '+91 99513 79777'].map((num, i) => (
                <a key={i} href={`tel:${num.replace(/\s/g, '')}`} className="group flex items-center gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 group-hover:bg-[#B81414] group-hover:border-[#B81414] text-white/50 group-hover:text-white transition-all">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <span className="font-sans text-sm font-semibold text-white/80 group-hover:text-[#E02E2E] transition-colors">{num}</span>
                </a>
              ))}

              {/* Added active tracking anchor strings forwarding to Google Maps destination queries */}
              <div className="pt-2 space-y-2 text-white/50 font-medium">
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Hosanna+Church+Hanuman+Junction+Andhra+Pradesh"
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-sans text-xs flex items-center gap-2 hover:text-[#E02E2E] transition-colors group"
                >
                  <span className="transition-transform group-hover:scale-125">📍</span> Hanuman Junction, AP
                </a>
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Hosanna+Church+Nuzvid+Andhra+Pradesh"
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-sans text-xs flex items-center gap-2 hover:text-[#E02E2E] transition-colors group"
                >
                  <span className="transition-transform group-hover:scale-125">📍</span> Nuzvid, AP
                </a>
              </div>

              {/* Rich Red Velvet Action CTA Button */}
              <Link
                href="/prayer"
                className="mt-4 flex items-center justify-center rounded-xl bg-gradient-to-r from-[#B81414] via-[#D32F2F] to-[#9A0F0F] hover:from-[#D32F2F] hover:to-[#B81414] px-5 py-3.5 font-sans text-[11px] font-bold uppercase tracking-widest text-white shadow-lg shadow-black/50 transition-all hover:scale-[1.01] active:scale-95"
              >
                Submit Prayer Request
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 py-6 text-center sm:flex-row sm:text-left relative z-10 text-[11px] font-sans tracking-wide">
          <div className="flex items-center gap-1.5 text-white/30">
            <span>© {new Date().getFullYear()} Hosanna Mandir · All Rights Reserved</span>
          </div>

          {/* Center — Designer credit with logo, linked to P&J website */}
          <a
            href="https://www.pandjtechnologies.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors group"
          >
            <span className="text-white/10">|</span>
            <span>Designed &amp; Developed By</span>
            <span className="relative inline-block w-6 h-6 flex-shrink-0">
              <ImageWithFallback
                src="/pjlogo.png"
                alt="P & J Technologies"
                className="object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                fallbackClassName="hidden"
                fallback={<div />}
              />
            </span>
            <strong className="text-white/60 group-hover:text-white font-semibold transition-colors">P &amp; J Technologies</strong>
          </a>

          {/* Right — Built with red heart */}
          <div className="flex items-center gap-1 text-white/40">
            <span>Built with</span>
            <span className="text-red-500 text-sm">&#10084;</span>
            <span>for His Kingdom</span>
          </div>
        </div>
      </div>
    </footer>
  )
}