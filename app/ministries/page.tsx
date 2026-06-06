'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ScrollReveal from '@/components/ScrollReveal'
import ImageWithFallback from '@/components/ImageWithFallback'

// 🚀 CLEAN DATA LAYER: Every ministry now maps to its own dedicated asset path and brand accent
const ministries = [
  {
    title: 'Bible Classes',
    image: '/bib.jpeg', // Dedicated asset node
    gradient: 'from-blue-600 via-blue-700 to-indigo-900',
    accentColor: 'text-blue-600',
    intro: "God's Word is the foundation of spiritual growth. Our Bible classes help believers understand Scripture clearly, apply it daily, and grow into mature disciples of Jesus Christ.",
    body: [
      'We teach the Bible in a simple, practical, and Spirit-led way so that new believers, youth, families, and leaders can all be strengthened.',
      'Each class is designed to build faith, answer questions, and create a deeper hunger for prayer, worship, and holy living.',
    ],
    details: ['Verse-by-verse teaching', 'New believer foundations', 'Family Bible learning', 'Personal devotion guidance'],
  },
  {
    title: 'Children Ministries',
    image: '/chi.webp',
    gradient: 'from-red-600 via-red-700 to-rose-950',
    accentColor: 'text-red-600',
    intro: 'Children are precious to God, and we believe every child should grow up knowing the love, truth, and protection of Jesus Christ.',
    body: [
      'This ministry nurtures young hearts through Bible stories, worship, prayer, creative learning, and loving guidance from trusted leaders.',
      'Our desire is to see children become joyful worshippers, strong in character, and confident in their identity in Christ.',
    ],
    details: ['Age-appropriate Bible teaching', 'Worship and creative activities', 'Prayer and discipleship', 'Safe and loving care'],
  },
  {
    title: 'Gospel Meetings',
    image: '/gospel.jpeg',
    gradient: 'from-amber-500 via-amber-600 to-amber-900',
    accentColor: 'text-amber-600',
    intro: 'Gospel meetings carry the saving message of Jesus Christ beyond the church walls and into communities that need hope.',
    body: [
      'Through anointed preaching, testimonies, worship, and prayer, people are invited to receive salvation, healing, and a new life in Christ.',
      'These gatherings are moments of harvest where families, villages, and individuals encounter the power of the Gospel.',
    ],
    details: ['Open-air Gospel crusades', 'Community evangelism', 'Healing and prayer ministry', 'Salvation altar calls'],
  },
  {
    title: 'T.V Ministries',
    image: '/churchm.jpeg',
    gradient: 'from-blue-600 via-indigo-700 to-indigo-950',
    accentColor: 'text-blue-600',
    intro: 'Through television outreach, Hosanna Mandir shares the Gospel with people who may never step into a church building.',
    body: [
      'Weekly messages, prayer, testimonies, and Gospel teaching reach homes, families, and individuals across many places.',
      'This ministry extends the church pulpit into living rooms, helping viewers find faith, comfort, healing, and spiritual direction.',
    ],
    details: ['Calvary', 'Subhavaartha TV', 'Neerekashana', 'Aradhana TV'],
    logos: [
      { name: 'Calvary', src: '/calavarytv.webp' },
      { name: 'Subhavaartha TV', src: '/Subhavaartha_Television_Logo.png' },
      { name: 'Neerekashana', src: '/Nireekshana_TV.webp' },
      { name: 'Aradhana TV', src: '/aradhanatv.png' },
    ],
  },
  {
    title: 'Youth Ministries',
    image: '/youthmini.jpeg',
    gradient: 'from-red-600 via-rose-700 to-zinc-950',
    accentColor: 'text-red-600',
    intro: 'The next generation needs purpose, courage, and a living relationship with Jesus. Our youth ministry helps young people stand strong in faith.',
    body: [
      'Young people are encouraged through worship, mentorship, prayer, leadership training, and opportunities to serve.',
      'We want to raise a generation that is bold, disciplined, compassionate, and ready to impact the world for Christ.',
    ],
    details: ['Youth worship gatherings', 'Leadership development', 'Mentorship and prayer', 'Outreach events'],
  },
  {
    title: 'Women Ministries',
    image: '/woo12.jpg',
    gradient: 'from-red-500 via-red-600 to-red-900',
    accentColor: 'text-red-500',
    intro: 'Women Ministries creates a space for women to be strengthened in prayer, encouraged in fellowship, and equipped for their God-given calling.',
    body: [
      'Through prayer meetings, Bible study, and sisterhood, women are uplifted to walk with confidence, wisdom, and spiritual authority.',
      'This ministry supports women in their homes, families, church service, and personal walk with God.',
    ],
    details: ["Monthly women's prayer", 'Wednesday prayer gatherings', 'Fellowship and encouragement', 'Women leadership training'],
  },
  {
    title: 'Pastors Meeting',
    image: '/pme.jpeg',
    gradient: 'from-blue-600 via-blue-700 to-zinc-900',
    accentColor: 'text-blue-600',
    intro: 'Pastors and leaders need fellowship, prayer, vision, and encouragement. These meetings strengthen the wider Body of Christ.',
    body: [
      'Church leaders gather for prayer, teaching, spiritual renewal, shared burden, and united mission for the region.',
      'As leaders are refreshed and equipped, churches become stronger and more effective in serving their communities.',
    ],
    details: ['Leadership prayer summits', 'Inter-church fellowship', 'Ministry training', 'Collaborative outreach'],
  },
  {
    title: 'Church Construction',
    image: '/churchcons12.jpeg',
    gradient: 'from-amber-500 via-red-600 to-blue-900',
    accentColor: 'text-amber-600',
    intro: "Church construction is more than building walls. It is preparing a place where God's people can worship, learn, pray, and serve for generations.",
    body: [
      'Every sanctuary, hall, and ministry space helps create room for growing congregations, community gatherings, and Gospel work.',
      'We build by faith, trusting God to provide for every need and using each project to bless families and communities.',
    ],
    details: ['Permanent sanctuary development', 'Community worship spaces', 'Infrastructure for ministry', 'Faith-based building projects'],
  },
]

function MinistriesHeader() {
  return (
    <div className="mx-auto mb-24 max-w-3xl text-center space-y-4">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-50 border border-zinc-200 px-3.5 py-1 text-[11px] font-black tracking-widest text-zinc-400 uppercase">
        🚀 Framework Pathways
      </span>
      <h2 className="font-sans text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl md:text-5xl">
        Pillars of Our Ministry
      </h2>
      <div className="mx-auto h-[3px] w-16 bg-gradient-to-r from-[#DC2626] via-[#EAB308] to-[#0A3D91] rounded-full" />
      <p className="mx-auto max-w-xl text-zinc-500 text-sm font-medium leading-relaxed pt-1">
        Each framework represents a clear path of service, deep prayer, and localized global outreach through which communities find lasting transformation.
      </p>
    </div>
  )
}

export default function MinistriesPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 selection:bg-red-600/10">
      
      {/* High-Contrast Clear Visual Hero Section (Preserved) */}
      <section className="relative flex min-h-[55vh] items-center justify-center overflow-hidden pt-32 pb-20 bg-zinc-950">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="/mini1234.jpeg"
            alt="Hosanna ministries"
            className="object-cover object-center"
            fallbackClassName="h-full w-full bg-[#0A0A12]"
            fallback=""
            sizes="100vw"
            priority
          />
        </div>
        <div className="absolute inset-0 z-10 bg-black/50" />

        <div className="relative z-20 mx-auto max-w-4xl px-6 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 font-sans text-[11px] font-bold tracking-[0.25em] text-blue-300 uppercase">
            Kingdom Work
          </span>
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl drop-shadow-md font-sans">
            Our Ministries
          </h1>
          <div className="mx-auto h-[3px] w-14 bg-gradient-to-r from-[#DC2626] via-[#EAB308] to-[#0A3D91] rounded-full" />
          <p className="mx-auto max-w-xl font-sans text-sm font-medium leading-relaxed text-zinc-200">
            Serving every generation with the love, truth, compassion, and power of Jesus Christ.
          </p>
        </div>
      </section>

      {/* Main Alternating Grid Content Core */}
      <section className="relative overflow-hidden bg-white py-24">
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 space-y-24">
          <ScrollReveal>
            <MinistriesHeader />
          </ScrollReveal>

          <div className="space-y-36">
            {ministries.map((ministry, index) => {
              const isEven = index % 2 === 0
              return (
                <ScrollReveal key={ministry.title} delay={50}>
                  <article id={ministry.title.toLowerCase().replace(/[\s.]+/g, '-').replace(/[^a-z0-9-]/g, '')} className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 group">
                    
                    {/* 🎨 MODERNIZED IMAGE FRAME: Minimalist presentation with premium micro-shadow bounds */}
                    <div className={`lg:col-span-5 ${!isEven ? 'lg:order-last' : ''}`}>
                      <div className="relative overflow-hidden rounded-3xl border border-zinc-200/80 bg-zinc-50 shadow-xl shadow-zinc-100/40 aspect-[4/3] w-full transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-zinc-200/60 group-hover:-translate-y-1">
                        <div className="absolute inset-0 scale-100 transition-transform duration-700 ease-out group-hover:scale-105">
                          <ImageWithFallback
                            src={ministry.image}
                            alt={ministry.title}
                            className="object-cover object-center"
                            fallbackClassName="flex h-full w-full items-center justify-center bg-zinc-950 text-zinc-500 font-sans text-xs font-bold uppercase tracking-widest"
                            fallback={ministry.title}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Copy Description Content Block */}
                    <div className="lg:col-span-7 space-y-5">
                      <div className="space-y-2">
                        <span className="text-[10px] font-black font-mono tracking-widest text-zinc-400 uppercase">
                          Pillar Framework — 0{index + 1}
                        </span>
                        <h3 className="text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl transition-colors duration-300">
                          {ministry.title}
                        </h3>
                        <div className={`h-[3px] w-16 rounded-full bg-gradient-to-r ${ministry.gradient}`} />
                      </div>

                      <p className="font-sans text-base font-bold leading-relaxed text-zinc-800">
                        {ministry.intro}
                      </p>
                      
                      <div className="space-y-4 pt-1">
                        {ministry.body.map((paragraph, pIdx) => (
                          <p key={pIdx} className="font-sans text-sm font-medium leading-relaxed text-zinc-500">
                            {paragraph}
                          </p>
                        ))}
                      </div>

                      {/* 🎨 CORE ACCENT TAG BADGES: Clean dual columns with colored responsive dots */}
                      {'logos' in ministry && ministry.logos ? (
                        <div className="grid grid-cols-2 gap-4 pt-4">
                          {(ministry.logos as { name: string; src: string }[]).map((logo) => (
                            <div key={logo.name} className="flex items-center justify-center rounded-2xl border border-zinc-100 bg-zinc-50/60 p-4 transition-all duration-300 hover:border-zinc-200 hover:bg-white hover:shadow-md">
                              <Image
                                src={logo.src}
                                alt={logo.name}
                                width={120}
                                height={48}
                                className="object-contain max-h-12 w-auto"
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                          {ministry.details.map((detail) => (
                            <div key={detail} className="flex items-center gap-2.5 rounded-2xl border border-zinc-100 bg-zinc-50/60 p-3.5 transition-all duration-300 hover:border-zinc-200 hover:bg-zinc-50">
                              <span className={`h-2 w-2 shrink-0 rounded-full bg-gradient-to-r ${ministry.gradient}`} />
                              <span className="font-sans text-xs font-bold text-zinc-800 tracking-tight">{detail}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                  </article>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Clean Call To Action Section Zone */}
      <section className="relative overflow-hidden bg-zinc-50 py-24 border-t border-zinc-200">
        <div className="absolute inset-0 z-0 opacity-5">
          <Image
            src="/church.jpg"
            alt="Serve Background"
            fill
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-zinc-50 via-white/80 to-zinc-50" />

        <div className="relative z-20 mx-auto max-w-4xl px-5 text-center sm:px-8 space-y-6">
          <ScrollReveal>
            <span className="text-[10px] font-bold tracking-widest text-amber-600 uppercase bg-amber-50 border border-amber-200 px-3 py-1 rounded-md">
              Get Involved
            </span>
            <h2 className="mt-4 font-sans text-3xl font-black tracking-tight sm:text-5xl text-zinc-950">
              Find Your Place to Serve
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-sans text-sm font-medium leading-relaxed text-zinc-500">
              Every believer has a unique spiritual gift and path. Join a dedicated ministry group today, serve with joy, and help us impact communities for Christ.
            </p>
            <div className="mt-8 flex flex-col justify-center items-center gap-4 sm:flex-row">
              <Link href="/contact" className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-xl bg-zinc-950 px-8 font-sans text-xs font-bold uppercase tracking-wider text-white transition hover:bg-zinc-800 shadow-lg">
                Contact Us to Join
              </Link>
              <Link href="/prayer" className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-xl border border-zinc-300 px-8 font-sans text-xs font-bold uppercase tracking-wider text-zinc-800 transition hover:bg-zinc-100">
                Submit Prayer Request
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}