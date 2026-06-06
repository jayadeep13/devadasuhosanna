'use client'

import { useState } from 'react'
import Image from 'next/image'
import ScrollReveal from '@/components/ScrollReveal'

type ChurchCard = {
  title: string
  lines: string[]
  href: string
  cta: string
  cardBgClass: string
  icon: 'phone' | 'pin' | 'clock'
  num: string
  textColorClass: string
  btnClass: string
  iconColorClass: string
}

const HANUMAN_MAPS_URL = 'https://maps.google.com/?q=Hosanna+Mandir+Hanuman+Junction'
const NUZVID_MAPS_URL = 'https://maps.google.com/?q=Hosanna+Mandir+Nuzvid'
const PRAYER_GARDEN_MAPS_URL = 'https://www.google.com/maps/place/Hosanna+Prayer+Garden/@16.785211,80.8717336,17z/data=!3m1!4b1!4m6!3m5!1s0x3a3675007996bdbb:0xb876610c381ff23b!8m2!3d16.785211!4d80.8743139!16s%2Fg%2F11x7phmy0f'

const infoCards: ChurchCard[] = [
  {
    title: 'Phone',
    lines: ['+91 94407 72772', '+91 99513 79777'],
    href: 'tel:+919440772772',
    cta: 'CALL NOW',
    cardBgClass: 'bg-gradient-to-br from-red-600 via-red-700 to-red-950 border border-red-500/30', // Box 1: Red
    icon: 'phone',
    num: '01',
    textColorClass: 'text-white',
    iconColorClass: 'text-red-600',
    btnClass: 'bg-zinc-950 border border-amber-400/40 text-amber-400 hover:bg-amber-400 hover:text-black transition-all duration-200',
  },
  {
    title: 'Hanuman Junction Church',
    lines: ['Hanuman Junction', 'Andhra Pradesh, India'],
    href: HANUMAN_MAPS_URL,
    cta: 'GET DIRECTIONS',
    cardBgClass: 'bg-gradient-to-br from-blue-600 via-blue-700 to-blue-950 border border-blue-500/30', // Box 2: Blue
    icon: 'pin',
    num: '02',
    textColorClass: 'text-white',
    iconColorClass: 'text-blue-600',
    btnClass: 'bg-zinc-950 border border-blue-400/40 text-blue-400 hover:bg-blue-400 hover:text-white transition-all duration-200',
  },
  {
    title: 'Nuzvid Church',
    lines: ['Nuzvid', 'Andhra Pradesh, India'],
    href: 'https://www.google.com/maps/place/Hosanna+Mandir+Nuzvid/@16.7834349,80.716085,12z/data=!4m10!1m2!2m1!1sHosanna+Mandir,+nuzvid!3m6!1s0x3a36752cf47ba555:0xb0a36a438f3d40ed!8m2!3d16.7834349!4d80.8602806!15sChZIb3Nhbm5hIE1hbmRpciwgbnV6dmlkkgEGY2h1cmNo4AEA!16s%2Fg%2F11h1yx7yll?entry=ttu&g_ep=EgoyMDI2MDQyNi4wIKXMDSoASAFQAw%3D%3D',
    cta: 'PRAYER REQUEST',
    cardBgClass: 'bg-white border-2 border-zinc-200/90 shadow-2xl shadow-zinc-200/50', // Box 3: White
    icon: 'pin',
    num: '03',
    textColorClass: 'text-zinc-900',
    iconColorClass: 'text-zinc-700',
    btnClass: 'bg-zinc-950 text-white hover:bg-zinc-800 border border-transparent transition-all duration-200',
  },
  {
    title: 'Office Hours',
    lines: ['Mon-Sat: 9 AM - 6 PM', 'Sunday: After service'],
    href: '/prayer',
    cta: 'GET INVOLVED',
    // Exact crisp true yellow gold matching the brand logo lettering payload palette
    cardBgClass: 'bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500 border border-yellow-300/40 shadow-xl shadow-amber-500/10', // Box 4: True Logo Yellow
    icon: 'clock',
    num: '04',
    textColorClass: 'text-zinc-950 font-black',
    iconColorClass: 'text-amber-500',
    btnClass: 'bg-zinc-950 border border-red-500/40 text-red-500 hover:bg-red-600 hover:text-white transition-all duration-200',
  },
]

const campusSchedules = [
  {
    title: 'Hanuman Junction Church',
    subtitle: 'MAIN WORSHIP CAMPUS',
    headerBg: 'from-red-600 to-red-800',
    events: [
      { day: 'SUNDAY', desc: 'Worship Service', time: '10:00 AM - 1:00 PM' },
      { day: 'WEDNESDAY', desc: "Women's Prayer", time: '12:00 PM - 3:00 PM' },
      { day: 'SATURDAY', desc: 'Fasting Prayer', time: '7:00 PM - 9:00 PM' },
    ]
  },
  {
    title: 'Nuzvid Church',
    subtitle: 'PRAYER AND HEALING CAMPUS',
    headerBg: 'from-blue-600 to-blue-800',
    events: [
      { day: 'SUNDAY', desc: 'Worship Service', time: '8:00 AM - 10:00 AM' },
      { day: 'WEDNESDAY', desc: 'Midweek Service', time: '12:00 PM - 2:00 PM' },
      { day: 'FRIDAY', desc: 'Healing Prayer', time: '10:00 AM - 2:00 PM' },
    ]
  }
]

function CardIcon({ icon, colorClass }: { icon: ChurchCard['icon']; colorClass: string }) {
  const baseStyles = `h-6 w-6 ${colorClass}`
  if (icon === 'phone') {
    return (
      <svg viewBox="0 0 24 24" className={baseStyles} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    )
  }
  if (icon === 'clock') {
    return (
      <svg viewBox="0 0 24 24" className={baseStyles} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" className={baseStyles} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleWhatsAppSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const whatsappMessage = [
      'Hello Hosanna Mandir,',
      '',
      `Name: ${formData.name}`,
      `Phone: ${formData.phone || '-'}`,
      `Email: ${formData.email || '-'}`,
      `Subject: ${formData.subject}`,
      `Message: ${formData.message}`,
    ].join('\n')

    const url = `https://wa.me/919440772772?text=${encodeURIComponent(whatsappMessage)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900 selection:bg-blue-600/10 pb-24 font-sans">
      
      {/* High-Impact Hero Segment */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden pt-32 pb-20 bg-zinc-950">
        <div className="absolute inset-0 z-0">
          <Image
            src="/cont12.png"
            alt="Contact Background"
            fill
            priority
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 z-10 bg-black/50" />

        <div className="relative z-20 mx-auto max-w-4xl px-6 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-bold tracking-[0.25em] text-blue-300 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400" /> Reach Out
          </span>
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl drop-shadow-md">
            Contact<span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-amber-500"> Us</span> 
          </h1>

          <div className="mx-auto h-[3px] w-14 bg-gradient-to-r from-red-600 via-amber-450 to-blue-600 rounded-full" />
          <p className="mx-auto max-w-2xl text-sm font-medium leading-relaxed text-zinc-200">
            Connect across our active sanctuaries. Find our localized coordinate systems and operational charts below.
          </p>
        </div>
      </section>

      {/* Grid Action Cards Array */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-24 pb-16">
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center max-w-5xl mx-auto">
          
          {/* Central Logo Ring overlay */}
          <div className="hidden lg:flex absolute inset-0 items-center justify-center z-30 pointer-events-none">
            <div className="relative h-56 w-56 rounded-full bg-white p-2 shadow-2xl pointer-events-auto border border-zinc-100">
              <Image
                src="/logo1.png"
                alt="Hosanna Logo"
                fill
                className="object-contain p-2 rounded-full"
              />
            </div>
          </div>

          {infoCards.map((card, i) => (
            <ScrollReveal key={card.title} delay={i * 80}>
              <div className={`relative overflow-hidden rounded-[2rem] p-8 shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col justify-between ${card.cardBgClass} ${card.textColorClass}`}>
                
                {card.num === '01' && <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-transparent opacity-40 mix-blend-multiply" />}
                {card.num === '02' && <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-transparent opacity-40 mix-blend-multiply" />}
                {card.num === '04' && <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-30 mix-blend-overlay" />}

                <div className="relative z-10 flex items-start gap-5">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white shadow-md transition-transform duration-300 hover:scale-105">
                    <CardIcon icon={card.icon} colorClass={card.iconColorClass} />
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-extrabold tracking-tight">{card.title}</h3>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${card.num === '03' ? 'bg-zinc-100 text-zinc-500' : card.num === '04' ? 'bg-black/10 text-zinc-900/60' : 'bg-black/20 text-white/75'}`}>{card.num}</span>
                    </div>
                    
                    <div className={`h-[3px] w-12 rounded-full my-2 ${card.num === '04' ? 'bg-gradient-to-r from-red-600 via-amber-600 to-blue-600' : 'bg-gradient-to-r from-yellow-400 via-red-500 to-blue-500'}`} />
                    
                    <div className="space-y-1 pt-0.5">
                      {card.lines.map((line) => (
                        <p key={line} className={`text-sm font-bold tracking-wide ${card.num === '03' ? 'text-zinc-600' : card.num === '04' ? 'text-zinc-900/90' : 'text-white/95 drop-shadow-sm'}`}>
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="relative z-10 mt-8">
                  <a
                    href={card.href}
                    target={card.href.startsWith('http') ? '_blank' : undefined}
                    rel={card.href.startsWith('http') ? 'noreferrer' : undefined}
                    className={`flex h-11 items-center justify-center rounded-full text-xs font-bold tracking-widest transition-all shadow-md ${card.btnClass}`}
                  >
                    {card.cta}
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Social Media Strip */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 mt-4 mb-4">
        <div className="rounded-3xl bg-zinc-950 px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-white/30 mb-1">Connect With Us</p>
            <p className="text-white font-black text-xl tracking-tight">Follow Our Ministry Online</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {[
              {
                label: 'YouTube', href: 'https://www.youtube.com/@Devadashosanna', bg: 'hover:bg-[#FF0000]', border: 'border-[#FF0000]/40',
                icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>,
              },
              {
                label: 'Instagram', href: 'https://www.instagram.com/hosanna_ministries_h.junction/', bg: 'hover:bg-[#E1306C]', border: 'border-[#E1306C]/40',
                icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>,
              },
              {
                label: 'Facebook', href: 'https://www.facebook.com/HosannaMandir.H.Junction', bg: 'hover:bg-[#1877F2]', border: 'border-[#1877F2]/40',
                icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>,
              },
              {
                label: 'WhatsApp', href: 'https://wa.me/919440772772', bg: 'hover:bg-[#25D366]', border: 'border-[#25D366]/40',
                icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>,
              },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 rounded-full border ${s.border} bg-white/5 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white transition-all duration-200 ${s.bg} hover:border-transparent hover:scale-105`}
              >
                {s.icon}
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Grid Height Symmetric Core Wrapper: Left Form Layout / Right Maps Stack */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column Form Wrapper */}
          <div className="lg:col-span-7 bg-zinc-50 border border-zinc-200/80 rounded-3xl p-6 sm:p-10 shadow-sm flex flex-col justify-between h-full">
            <div className="w-full">
              <div className="mb-8 text-center">
                <span className="text-[10px] font-bold tracking-widest text-blue-600 uppercase bg-blue-50 px-2.5 py-1 rounded-md">
                  SECURE PORTAL
                </span>
                <h2 className="mt-3 text-3xl font-black text-zinc-950 tracking-tight">Send a Message</h2>
              </div>

              <form onSubmit={handleWhatsAppSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="block text-zinc-700 text-xs font-bold uppercase tracking-wider">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="Write your name"
                      className="w-full rounded-xl border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 focus:border-zinc-900 focus:ring-0 transition-all shadow-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-zinc-700 text-xs font-bold uppercase tracking-wider">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                      placeholder="Write phone number"
                      className="w-full rounded-xl border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 focus:border-zinc-900 focus:ring-0 transition-all shadow-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-zinc-700 text-xs font-bold uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="name@domain.com"
                    className="w-full rounded-xl border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 focus:border-zinc-900 focus:ring-0 transition-all shadow-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-zinc-700 text-xs font-bold uppercase tracking-wider">Why are you writing? *</label>
                  <select
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData((prev) => ({ ...prev, subject: e.target.value }))}
                    className="w-full rounded-xl border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-600 focus:border-zinc-900 focus:ring-0 transition-all shadow-sm"
                  >
                    <option value="">Choose a topic</option>
                    <option value="General Inquiry">General Question</option>
                    <option value="Visit Our Church">Visit Our Church</option>
                    <option value="Prayer Request">Need Prayer</option>
                    <option value="Ministry Partnership">Ministry Partnership</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-zinc-700 text-xs font-bold uppercase tracking-wider">Your Message *</label>
                  <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                    placeholder="Write everything you want to say here..."
                    className="w-full rounded-xl border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 focus:border-zinc-900 focus:ring-0 transition-all resize-none shadow-sm"
                  />
                </div>

                <button type="submit" className="w-full h-12 mt-4 rounded-xl bg-zinc-950 font-sans text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-zinc-900 shadow-md">
                  SUBMIT
                </button>
              </form>
            </div>
          </div>

          {/* Right Column Vertically Stacked Maps Area */}
          <div className="lg:col-span-5 flex flex-col gap-6 h-full justify-between">
            
            {/* Campus Map 1 */}
            <ScrollReveal className="flex-1 flex flex-col">
              <div className="rounded-3xl border border-zinc-200 bg-white overflow-hidden shadow-sm flex flex-col justify-between h-full flex-1">
                <div className="relative w-full flex-1 min-h-[12rem] bg-zinc-100">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3821.432109876543!2d80.954321!3d16.64321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDM4JzM1LjUiTiA4MMKwNTcnMTUuNiJF!5e0!3m2!1sen!2sin!4v1700000000000"
                    title="Hanuman Junction Map Terminal"
                    className="absolute inset-0 h-full w-full"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 flex items-center justify-between gap-4 bg-white border-t border-zinc-100 shrink-0">
                  <div>
                    <h4 className="font-bold text-zinc-900 text-sm">Hanuman Junction Church</h4>
                    <p className="text-[11px] text-zinc-400 font-medium mt-0.5">Andhra Pradesh, India</p>
                  </div>
                  <a href={HANUMAN_MAPS_URL} target="_blank" rel="noreferrer" className="inline-flex h-9 px-4 items-center rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-800 text-xs font-bold uppercase tracking-wider transition-colors hover:bg-zinc-900 hover:text-white hover:border-zinc-900 shrink-0">
                    MAPS
                  </a>
                </div>
              </div>
            </ScrollReveal>

            {/* Campus Map 2 */}
            <ScrollReveal delay={100} className="flex-1 flex flex-col">
              <div className="rounded-3xl border border-zinc-200 bg-white overflow-hidden shadow-sm flex flex-col justify-between h-full flex-1">
                <div className="relative w-full flex-1 min-h-[12rem] bg-zinc-100">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3817.543210987654!2d80.84321!3d16.78321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDQ2JzU5LjUiTiA4MMKwNTAnMzUuNiJF!5e0!3m2!1sen!2sin!4v1700000000001"
                    title="Nuzvid Sanctuary Map Terminal"
                    className="absolute inset-0 h-full w-full"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 flex items-center justify-between gap-4 bg-white border-t border-zinc-100 shrink-0">
                  <div>
                    <h4 className="font-bold text-zinc-900 text-sm">Nuzvid Church</h4>
                    <p className="text-[11px] text-zinc-400 font-medium mt-0.5">Andhra Pradesh, India</p>
                  </div>
                  <a href={NUZVID_MAPS_URL} target="_blank" rel="noreferrer" className="inline-flex h-9 px-4 items-center rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-800 text-xs font-bold uppercase tracking-wider transition-colors hover:bg-zinc-900 hover:text-white hover:border-zinc-900 shrink-0">
                    MAPS
                  </a>
                </div>
              </div>
            </ScrollReveal>

            {/* Campus Map 3 — Hosanna Prayer Garden */}
            <ScrollReveal delay={200} className="flex-1 flex flex-col">
              <div className="rounded-3xl border border-zinc-200 bg-white overflow-hidden shadow-sm flex flex-col justify-between h-full flex-1">
                <div className="relative w-full flex-1 min-h-[12rem] bg-zinc-100">
                  <iframe
                    src="https://maps.google.com/maps?q=Hosanna+Prayer+Garden,16.785211,80.8743139&z=16&output=embed"
                    title="Hosanna Prayer Garden Map Terminal"
                    className="absolute inset-0 h-full w-full"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 flex items-center justify-between gap-4 bg-white border-t border-zinc-100 shrink-0">
                  <div>
                    <h4 className="font-bold text-zinc-900 text-sm">Hosanna Prayer Garden</h4>
                    <p className="text-[11px] text-zinc-400 font-medium mt-0.5">Andhra Pradesh, India</p>
                  </div>
                  <a href={PRAYER_GARDEN_MAPS_URL} target="_blank" rel="noreferrer" className="inline-flex h-9 px-4 items-center rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-800 text-xs font-bold uppercase tracking-wider transition-colors hover:bg-zinc-900 hover:text-white hover:border-zinc-900 shrink-0">
                    MAPS
                  </a>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* Weekly Campus Worship Schedules */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {campusSchedules.map((campus, idx) => (
            <ScrollReveal key={campus.title} delay={idx * 100}>
              <div className="bg-white border border-zinc-200/70 rounded-3xl shadow-lg shadow-zinc-100 overflow-hidden h-full flex flex-col">
                <div className={`bg-gradient-to-r ${campus.headerBg} p-6 text-white relative`}>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white opacity-90 animate-ping" />
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white" />
                  <h3 className="font-black text-2xl tracking-tight">{campus.title}</h3>
                  <p className="text-[10px] font-bold tracking-widest uppercase opacity-85 mt-0.5">{campus.subtitle}</p>
                </div>
                
                <div className="p-6 flex-1 bg-zinc-50/40 divide-y divide-zinc-100">
                  {campus.events.map((event) => (
                    <div key={event.day} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <p className="font-extrabold text-sm text-zinc-900 tracking-wide">{event.day}</p>
                        <p className="text-xs font-medium text-zinc-500 mt-0.5">{event.desc}</p>
                      </div>
                      <span className="inline-flex items-center justify-center bg-[#FFF8EF] border border-amber-200/60 rounded-full px-4 py-1.5 text-xs font-bold text-amber-800 tracking-wide">
                        {event.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

    </div>
  )
}