'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ImageWithFallback from '@/components/ImageWithFallback'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/pastor ', label: 'Pastor ' },
  { href: '/ministries', label: 'Ministries' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/updates', label: 'Updates' },
  { href: '/todays-promise', label: "Today's Promise", special: true },
  { href: '/udayakala-daiva-sandesham', label: 'ఉదయకాల దైవ సందేశం' },
  { href: '/contact', label: 'Contact' },
]

const udayakalaButton = {
  href: '/udayakala-daiva-sandesham',
  label: 'ఉదయకాల దైవ సందేశం',
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'
  const isContactHero = pathname === '/contact'
  const isMinistriesHero = pathname === '/ministries'
  const isPrayerHero = pathname === '/prayer'
  const isPastorHero = pathname === '/pastor' || pathname === '/pastor '
  const isAboutHero = pathname === '/about'
  const isUpdatesHero = pathname === '/updates'
  const isGalleryHero = pathname === '/gallery'
  const useTransparentHeroNav = isHome || isContactHero || isMinistriesHero || isPrayerHero || isPastorHero || isAboutHero || isUpdatesHero || isGalleryHero
  const isHeroState = useTransparentHeroNav && !scrolled && !menuOpen

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])
const navBg = isHeroState ? 'bg-transparent border-transparent' : 'bg-white'
  return (
    <>
      <nav className={`absolute top-0 left-0 right-0 z-50 transition-all duration-700 ${navBg}`}>
        <div className="max-w-[112rem] mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-20 lg:h-24">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3.5 group flex-shrink-0">
              <div className="relative w-14 h-14 lg:w-[3.25rem] lg:h-[3.25rem] rounded-full overflow-hidden border-2 border-crimson/60 group-hover:border-gold transition-colors duration-500 shadow-crimson">
                <ImageWithFallback
                  src="/images/logo.png"
                  alt="Hosanna Mandir Logo"
                  className="object-cover"
                  priority
                  fallbackClassName="flex h-full w-full items-center justify-center bg-[#FFF8EC]"
                  fallback={
                    <svg viewBox="0 0 40 40" fill="none" width="28" height="28" aria-hidden="true">
                      <path d="M20 4 L20 36 M8 16 L32 16" stroke="#CC1A1A" strokeWidth="4" strokeLinecap="round" />
                    </svg>
                  }
                />
              </div>
              <div className="leading-none">
                <p className="font-modern text-xl font-extrabold leading-none tracking-[0.17em] text-gold lg:text-lg">HOSANNA</p>
                <p className="font-telugu mt-1 text-[1rem] font-semibold leading-tight tracking-[0.01em] text-crimson drop-shadow-[0_0_10px_rgba(204,26,26,0.45)] lg:text-base">దైవ సందేశాలు</p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex flex-1 items-center justify-center gap-0 px-4 xl:px-6">
              {navItems.filter((item) => item.href !== udayakalaButton.href).map((item) => {
                const active = pathname === item.href
                if (item.special) {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`relative whitespace-nowrap px-2 py-1.5 font-modern text-[10px] font-extrabold uppercase tracking-[0.10em] transition-all duration-300 group xl:px-3 xl:text-[11px] xl:tracking-[0.12em] ${
                        active
                          ? 'text-gold drop-shadow-[0_0_10px_rgba(212,175,55,0.9)]'
                          : isHeroState
                            ? 'text-gold/90 hover:text-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.6)] hover:drop-shadow-[0_0_14px_rgba(212,175,55,0.9)]'
                            : 'text-gold hover:text-gold drop-shadow-[0_0_6px_rgba(212,175,55,0.5)] hover:drop-shadow-[0_0_12px_rgba(212,175,55,0.8)]'
                      }`}
                    >
                      <span className="mr-1 text-[9px] xl:text-[10px]">✦</span>
                      {item.label}
                      <span className="mr-1 text-[9px] xl:text-[10px]">✦</span>
                      <span className={`absolute bottom-0 left-2 right-2 h-px bg-gradient-to-r from-transparent via-gold to-transparent transition-transform duration-300 origin-center ${
                        active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`} />
                    </Link>
                  )
                }
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative whitespace-nowrap px-1.5 py-2 font-modern text-[10px] font-bold uppercase tracking-[0.10em] transition-all duration-300 group xl:px-2.5 xl:text-[11px] xl:tracking-[0.12em] ${
                      active
                        ? 'text-gold'
                        : isHeroState
                          ? 'text-[rgba(255,255,255,0.82)] hover:text-gold'
                          : 'text-[rgba(31,26,23,0.72)] hover:text-crimson'
                    }`}
                  >
                    {item.label}
                    <span className={`absolute bottom-0 left-4 right-4 h-px bg-gold transition-transform duration-300 origin-center ${
                      active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`} />
                  </Link>
                )
              })}
            </div>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-3">
              <Link
                href="/live"
                className="flex min-h-11 items-center gap-2 rounded-full bg-crimson px-4 py-2 font-modern text-[11px] font-extrabold uppercase tracking-[0.16em] text-white shadow-[0_4px_20px_rgba(204,26,26,0.45),inset_0_1px_0_rgba(255,255,255,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-crimson/90 hover:shadow-[0_8px_28px_rgba(204,26,26,0.55)] whitespace-nowrap xl:px-5 xl:text-[12px]"
              >
                <span className="live-dot" />
                Join Live
              </Link>
              <Link
                href={udayakalaButton.href}
                className={`font-telugu flex min-h-11 max-w-[14.5rem] items-center justify-center rounded-full border px-4 py-2 text-[13px] font-bold leading-tight tracking-[0.01em] shadow-[0_14px_34px_rgba(0,0,0,0.12)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 xl:max-w-[17rem] xl:px-5 xl:text-[15px] ${
                  pathname === udayakalaButton.href
                    ? 'border-gold/70 bg-gold/80 text-black shadow-gold'
                    : isHeroState
                      ? 'border-gold/42 bg-white/8 text-gold shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_16px_42px_rgba(0,0,0,0.22)] hover:border-gold/70 hover:bg-gold/18 hover:text-gold'
                      : 'border-gold/30 bg-white/44 text-[var(--text-primary)] shadow-[inset_0_1px_0_rgba(255,255,255,0.78),0_16px_40px_rgba(73,55,24,0.08)] hover:border-gold/48 hover:bg-white/68 hover:text-[var(--text-primary)]'
                }`}
              >
                <span className="truncate">{udayakalaButton.label}</span>
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              className={`lg:hidden grid h-11 w-11 place-items-center border transition-all duration-300 ${
                menuOpen
                  ? 'border-crimson/30 bg-white/80 text-crimson shadow-[0_10px_30px_rgba(204,26,26,0.14)]'
                  : isHeroState
                    ? 'border-gold/25 bg-black/20 text-gold backdrop-blur-md'
                    : 'border-gold/30 bg-white/70 text-crimson shadow-[0_10px_30px_rgba(73,55,24,0.08)]'
              }`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`block h-px bg-current transition-all duration-400 ${menuOpen ? 'rotate-45 translate-y-2.5 bg-crimson' : ''}`} style={{ transformOrigin: 'center' }} />
                <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
                <span className={`block h-px bg-current transition-all duration-400 ${menuOpen ? '-rotate-45 -translate-y-2 bg-crimson' : ''}`} style={{ transformOrigin: 'center' }} />
              </div>
            </button>
          </div>
        </div>

        {/* Gold accent line */}
        <div className={`h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent transition-opacity duration-700 ${scrolled ? 'opacity-100' : 'opacity-0'}`} />
      </nav>

      {/* Mobile Menu — full-width, zero-gap, premium dark drawer */}
      <div className={`fixed left-0 right-0 top-20 z-40 lg:hidden flex flex-col transition-all duration-500 ${menuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-3'}`}
        style={{ height: 'calc(100dvh - 5rem)' }}
      >
        {/* Dark premium background */}
        <div className="absolute inset-0 bg-[#0d0906]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(204,26,26,0.14),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(212,175,55,0.08),transparent_55%)]" />
        {/* Top accent line — connects to navbar bottom */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-[#CC1A1A] via-[#D4AF37] to-[#CC1A1A]" />

        {/* Nav links */}
        <div className="relative flex-1 overflow-y-auto px-6 pt-6 pb-4">
          {navItems.filter((item) => item.href !== udayakalaButton.href).map((item) => {
            const active = pathname === item.href
            if (item.special) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between border-b py-5 font-modern text-xl font-black uppercase tracking-[0.1em] transition-colors duration-200 ${
                    active
                      ? 'border-gold/30 text-gold'
                      : 'border-white/8 text-gold/70 hover:text-gold'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-[10px] text-gold/60">✦</span>
                    {item.label}
                    <span className="text-[10px] text-gold/60">✦</span>
                  </span>
                  {active && <span className="h-1.5 w-1.5 rounded-full bg-gold" />}
                </Link>
              )
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between border-b py-5 font-modern text-xl font-black uppercase tracking-[0.08em] transition-colors duration-200 ${
                  active
                    ? 'border-crimson/30 text-white'
                    : 'border-white/8 text-white/55 hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                {active
                  ? <span className="h-1.5 w-1.5 rounded-full bg-crimson" />
                  : <svg className="h-3.5 w-3.5 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                }
              </Link>
            )
          })}
        </div>

        {/* Bottom CTAs — pinned */}
        <div className="relative border-t border-white/10 px-6 py-5 grid grid-cols-2 gap-3">
          <Link
            href="/live"
            className="flex items-center justify-center gap-2 rounded-xl bg-crimson py-3.5 font-modern text-sm font-extrabold uppercase tracking-widest text-white shadow-lg shadow-crimson/30 transition hover:bg-crimson/85"
          >
            <span className="live-dot" /> Join Live
          </Link>
          <Link
            href={udayakalaButton.href}
            className={`font-telugu flex items-center justify-center rounded-xl border px-3 py-3.5 text-sm font-bold leading-tight text-center transition ${
              pathname === udayakalaButton.href
                ? 'border-gold bg-gold text-black'
                : 'border-gold/40 bg-gold/10 text-gold hover:bg-gold/18'
            }`}
          >
            <span className="truncate">{udayakalaButton.label}</span>
          </Link>
        </div>
      </div>
    </>
  )
}
