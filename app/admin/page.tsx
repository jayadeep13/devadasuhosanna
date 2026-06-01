'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import AdminMediaPanel from '@/components/AdminMediaPanel'

const _k = [49, 51, 48, 52] // char codes — not plain text

function verify(input: string) {
  return input.split('').every((c, i) => c.charCodeAt(0) === _k[i]) && input.length === 4
}

function PinGate({ onUnlock }: { onUnlock: () => void }) {
  const [digits, setDigits] = useState<string[]>([])
  const [shaking, setShaking] = useState(false)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const press = (d: string) => {
    if (digits.length >= 4 || success) return
    const next = [...digits, d]
    setDigits(next)
    setError(false)

    if (next.length === 4) {
      if (verify(next.join(''))) {
        setSuccess(true)
        setTimeout(() => {
          sessionStorage.setItem('_hm_adm', btoa(Date.now().toString()))
          onUnlock()
        }, 500)
      } else {
        setShaking(true)
        setError(true)
        setTimeout(() => { setDigits([]); setShaking(false); setError(false) }, 700)
      }
    }
  }

  const back = () => { if (!success) setDigits(prev => prev.slice(0, -1)); setError(false) }

  const keys = ['1','2','3','4','5','6','7','8','9','','0','⌫']

  return (
    <div className="min-h-screen bg-[#0a0508] flex flex-col items-center justify-center px-6">
      {/* Logo */}
      <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[#CC1A1A]/60 shadow-[0_0_30px_rgba(204,26,26,0.3)] mb-8">
        <Image src="/logo.png" alt="Hosanna Mandir" fill className="object-cover" priority />
      </div>

      <p className="font-modern text-[9px] font-bold uppercase tracking-[0.4em] text-white/30 mb-2">Admin Access</p>
      <h1 className="font-display text-2xl font-black text-white mb-8">Enter PIN</h1>

      {/* Dots */}
      <div className={`flex gap-4 mb-10 transition-all duration-200 ${shaking ? 'animate-[shake_0.4s_ease-in-out]' : ''}`}>
        {[0,1,2,3].map(i => (
          <div
            key={i}
            className={`h-4 w-4 rounded-full border-2 transition-all duration-200 ${
              digits.length > i
                ? success
                  ? 'bg-emerald-400 border-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]'
                  : error
                    ? 'bg-red-500 border-red-500 shadow-[0_0_12px_rgba(239,68,68,0.8)]'
                    : 'bg-[#facc15] border-[#facc15] shadow-[0_0_12px_rgba(250,204,21,0.8)]'
                : 'bg-transparent border-white/20'
            }`}
          />
        ))}
      </div>

      {/* Keypad */}
      <div className="grid grid-cols-3 gap-3 w-full max-w-[260px]">
        {keys.map((k, i) => (
          k === '' ? (
            <div key={i} />
          ) : k === '⌫' ? (
            <button
              key={i}
              onClick={back}
              className="h-16 rounded-2xl bg-white/5 border border-white/8 text-white/50 text-xl font-bold flex items-center justify-center transition hover:bg-white/10 active:scale-95"
            >
              ⌫
            </button>
          ) : (
            <button
              key={i}
              onClick={() => press(k)}
              className="h-16 rounded-2xl bg-white/8 border border-white/10 text-white text-2xl font-black flex items-center justify-center transition hover:bg-white/15 hover:border-white/25 active:scale-95 select-none"
            >
              {k}
            </button>
          )
        ))}
      </div>

      {error && (
        <p className="mt-6 font-modern text-xs font-bold uppercase tracking-widest text-red-400">Incorrect PIN</p>
      )}
      {success && (
        <p className="mt-6 font-modern text-xs font-bold uppercase tracking-widest text-emerald-400">Access Granted ✓</p>
      )}
    </div>
  )
}

export default function AdminPage() {
  const [unlocked, setUnlocked] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    // Validate session token — must exist and be recent (within 8 hours)
    const token = sessionStorage.getItem('_hm_adm')
    if (token) {
      try {
        const ts = parseInt(atob(token))
        if (Date.now() - ts < 8 * 60 * 60 * 1000) {
          setUnlocked(true)
        } else {
          sessionStorage.removeItem('_hm_adm')
        }
      } catch { sessionStorage.removeItem('_hm_adm') }
    }
    setChecking(false)
  }, [])

  if (checking) return null

  if (!unlocked) return <PinGate onUnlock={() => setUnlocked(true)} />

  return (
    <>
      <section className="relative overflow-hidden pt-36 pb-14" style={{ background: '#FFFDF8' }}>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% -10%, rgba(204,26,26,0.12), transparent 60%)' }} />
        <div className="relative mx-auto max-w-4xl px-5 text-center">
          <p className="section-label mb-5">Media Control</p>
          <h1 className="font-display font-black text-[#1F1A17]" style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}>
            Admin <span className="gold-shimmer">Panel</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl font-modern text-lg font-semibold leading-8 text-[#5F544C]">
            Upload Gallery and Updates images. Images are converted to WebP before upload and can be deleted anytime.
          </p>
        </div>
      </section>

      <section style={{ background: '#FFF8EF' }}>
        <AdminMediaPanel />
      </section>
    </>
  )
}
