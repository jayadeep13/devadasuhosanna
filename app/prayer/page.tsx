'use client'

import { useState } from 'react'
import Image from 'next/image'
import ScrollReveal from '@/components/ScrollReveal'

export default function PrayerPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', phone: '', category: '', request: '', consent: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const t = e.target as HTMLInputElement
    setForm((f) => ({ ...f, [t.name]: t.type === 'checkbox' ? t.checked : t.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const whatsappMessage = [
      'Hello Hosanna Mandir,',
      '',
      `Full Name: ${form.name}`,
      `Phone Number: ${form.phone || '-'}`,
      `Email Address: ${form.email || '-'}`,
      `Prayer Category: ${form.category}`,
      `Prayer Request: ${form.request}`,
    ].join('\n')

    const url = `https://wa.me/919440772772?text=${encodeURIComponent(whatsappMessage)}`
    window.open(url, '_blank', 'noopener,noreferrer')
    setSubmitted(true)
  }

  return (
    <>
      {/* Hero — styled like Contact Us */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden pt-32 pb-20 bg-zinc-950">
        <div className="absolute inset-0 z-0">
          <Image
            src="/pra.jpeg"
            alt="Hosanna Mandir prayer background"
            fill
            priority
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 z-10 bg-black/50" />

        <div className="relative z-20 mx-auto max-w-4xl px-6 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-bold tracking-[0.25em] text-red-300 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-red-400" /> We Believe in Prayer
          </span>
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl drop-shadow-md">
            Prayer Request
          </h1>
          <div className="mx-auto h-[3px] w-14 bg-gradient-to-r from-red-600 via-amber-400 to-red-600 rounded-full" />
          <p className="mx-auto max-w-2xl text-sm font-medium leading-relaxed text-zinc-200">
            Share your need with us. Our pastoral team and prayer warriors will intercede on your behalf with faith and love.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-24" style={{ background: '#FFF8EF' }}>
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <ScrollReveal>
            {submitted ? (
              <div className="glass-card p-12 text-center">
                <div className="flex justify-center mb-8">
                  <div className="w-20 h-20 rounded-full border border-gold/30 flex items-center justify-center"
                    style={{ boxShadow: '0 0 40px rgba(255,215,0,0.15)', background: 'radial-gradient(circle, rgba(255,215,0,0.05), transparent)' }}>
                    <svg viewBox="0 0 40 40" className="w-10 h-10">
                      <path d="M20 4 L20 36 M6 14 L34 14" stroke="#FFD700" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
                <h2 className="font-cinzel font-bold text-white text-3xl mb-4">Prayer Received</h2>
                <div className="divider-crimson w-16 mx-auto mb-6" />
                <p className="font-cormorant text-white/60 text-xl leading-relaxed mb-6">
                  Thank you for trusting us with your prayer. Our pastoral team will intercede for you with faith and love. May God&apos;s grace, peace, and provision surround you completely.
                </p>
                <p className="font-playfair italic text-gold/60 text-lg mb-10">
                  &ldquo;The effective, fervent prayer of a righteous man avails much.&rdquo;
                  <span className="block font-jost not-italic text-gold/30 text-xs uppercase tracking-widest mt-2">James 5:16</span>
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name:'',email:'',phone:'',category:'',request:'',consent:false }) }}
                  className="btn-ghost"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card p-8 sm:p-10 space-y-6">
                <div>
                  <p className="section-label mb-3">Your Prayer Need</p>
                  <h2 className="font-cinzel text-[rgba(20,16,12,0.92)] font-bold text-2xl">Share With Us</h2>
                </div>
                <div className="divider-gold opacity-20" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-jost text-[rgba(20,16,12,0.9)] text-xs uppercase tracking-widest block mb-2">Full Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} required placeholder="Your name"
                      className="premium-input" />
                  </div>
                  <div>
                    <label className="font-jost text-[rgba(20,16,12,0.9)] text-xs uppercase tracking-widest block mb-2">Phone Number</label>
                    <input name="phone" value={form.phone} onChange={handleChange} type="tel" placeholder="+91 XXXXXXXXXX"
                      className="premium-input" />
                  </div>
                </div>

                <div>
                  <label className="font-jost text-[rgba(20,16,12,0.9)] text-xs uppercase tracking-widest block mb-2">Email Address</label>
                  <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="your@email.com"
                    className="premium-input" />
                </div>

                <div>
                  <label className="font-jost text-[rgba(20,16,12,0.9)] text-xs uppercase tracking-widest block mb-2">Prayer Category *</label>
                  <select name="category" value={form.category} onChange={handleChange} required className="premium-input">
                    <option value="">Select a category</option>
                    <option value="healing">Healing &amp; Health</option>
                    <option value="family">Family &amp; Relationships</option>
                    <option value="financial">Financial Breakthrough</option>
                    <option value="salvation">Salvation of Loved Ones</option>
                    <option value="guidance">Guidance &amp; Direction</option>
                    <option value="deliverance">Deliverance &amp; Freedom</option>
                    <option value="marriage">Marriage &amp; Children</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="font-jost text-[rgba(20,16,12,0.9)] text-xs uppercase tracking-widest block mb-2">Your Prayer Request *</label>
                  <textarea name="request" value={form.request} onChange={handleChange} required rows={6}
                    placeholder="Share your prayer need here. Be as specific as you wish — God knows every detail, and so will we as we intercede for you with love."
                    className="premium-input resize-none" />
                </div>

                <div className="flex items-start gap-3">
                  <input type="checkbox" name="consent" id="consent" checked={form.consent} onChange={handleChange} required
                    className="mt-1.5 w-4 h-4 flex-shrink-0 accent-red-600" />
                  <label htmlFor="consent" className="font-cormorant text-[rgba(20,16,12,0.72)] text-base leading-relaxed cursor-pointer">
                    I consent to Hosanna Mandir receiving and praying over my request. I understand it will be handled with confidentiality and genuine pastoral care.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[linear-gradient(180deg,#CC1A1A,#A60F0F)] text-white text-sm py-4 font-jost font-semibold uppercase tracking-[0.18em] shadow-[0_16px_36px_rgba(204,26,26,0.24)] transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Submit My Prayer Request →
                </button>

                <p className="font-jost text-[rgba(20,16,12,0.35)] text-xs text-center tracking-wider uppercase">
                  Your request is confidential and handled with love
                </p>
              </form>
            )}
          </ScrollReveal>
        </div>
      </section>

      {/* Scripture Banner */}
      <section className="py-16 relative overflow-hidden" style={{ background: '#FFF8EF' }}>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(204,26,26,0.06), transparent)' }} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="relative max-w-3xl mx-auto px-5 text-center">
          <ScrollReveal>
            <p className="font-playfair italic text-[rgba(20,16,12,0.78)] text-2xl sm:text-3xl leading-relaxed">
              &ldquo;Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.&rdquo;
            </p>
            <p className="font-jost text-crimson text-xs uppercase tracking-widest mt-6">Philippians 4:6</p>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
