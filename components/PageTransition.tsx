'use client'

import { useEffect, useState, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

export default function PageTransition() {
  const pathname = usePathname()
  const [phase, setPhase] = useState<'idle' | 'in' | 'hold' | 'out'>('idle')
  const prevPath = useRef<string>(pathname)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (prevPath.current === pathname) return
    prevPath.current = pathname

    if (timerRef.current) clearTimeout(timerRef.current)

    // Phase 1: slide in (0–300ms)
    setPhase('in')
    timerRef.current = setTimeout(() => {
      // Phase 2: hold with logo visible (300–800ms)
      setPhase('hold')
      timerRef.current = setTimeout(() => {
        // Phase 3: slide out (800–1100ms)
        setPhase('out')
        timerRef.current = setTimeout(() => {
          setPhase('idle')
        }, 350)
      }, 500)
    }, 300)

    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [pathname])

  if (phase === 'idle') return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#06030a] pointer-events-none"
      style={{
        animation:
          phase === 'in'
            ? 'transitionSlideIn 0.3s cubic-bezier(0.16,1,0.3,1) forwards'
            : phase === 'out'
            ? 'transitionSlideOut 0.35s cubic-bezier(0.7,0,0.84,0) forwards'
            : undefined,
      }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(204,26,26,0.18),transparent_65%)]" />

      {/* Animated logo */}
      <div
        className="relative"
        style={{
          animation:
            phase === 'in' || phase === 'hold'
              ? 'logoIn 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.1s both'
              : 'logoOut 0.25s ease-in forwards',
        }}
      >
        {/* Outer glow ring */}
        <div
          className="absolute inset-0 rounded-full bg-[#CC1A1A]/25 blur-xl"
          style={{ transform: 'scale(2)', animation: phase === 'hold' ? 'pulseGlow 1.2s ease-in-out infinite' : undefined }}
        />
        {/* Logo */}
        <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[#CC1A1A]/70 shadow-[0_0_40px_rgba(204,26,26,0.5)]">
          <Image src="/logo.png" alt="Hosanna Mandir" fill className="object-cover" priority />
        </div>
      </div>

      {/* Church name */}
      <div
        className="mt-5 text-center"
        style={{
          animation:
            phase === 'in' || phase === 'hold'
              ? 'fadeUp 0.4s ease-out 0.25s both'
              : 'fadeDown 0.2s ease-in forwards',
        }}
      >
        <p className="font-modern text-[11px] font-black uppercase tracking-[0.4em] text-[#facc15]">HOSANNA</p>
        <p className="font-telugu text-sm font-bold text-white/50 mt-1 tracking-wide">దైవ సందేశాలు</p>
      </div>

      {/* Loading bar */}
      <div className="absolute bottom-0 inset-x-0 h-[2px]">
        <div
          className="h-full bg-gradient-to-r from-[#CC1A1A] via-[#facc15] to-[#CC1A1A]"
          style={{ animation: 'loadBar 0.9s ease-in-out forwards' }}
        />
      </div>
    </div>
  )
}
