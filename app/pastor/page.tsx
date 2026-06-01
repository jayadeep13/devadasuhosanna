'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import ScrollReveal from '@/components/ScrollReveal'

/* ── Lightbox ── */
function Lightbox({ src, alt, onClose, onPrev, onNext }: {
  src: string; alt: string; onClose: () => void; onPrev: () => void; onNext: () => void
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [onClose, onPrev, onNext])

  const handleDownload = async () => {
    try {
      const res = await fetch(src)
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = src.split('/').pop() || 'pastor-photo.jpg'
      a.click()
      URL.revokeObjectURL(url)
    } catch { window.open(src, '_blank', 'noopener,noreferrer') }
  }

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/92 backdrop-blur-sm p-4" onClick={onClose}>
      {/* Close */}
      <button onClick={onClose} className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
      </button>

      {/* Prev */}
      <button onClick={(e) => { e.stopPropagation(); onPrev() }} className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
      </button>

      {/* Next */}
      <button onClick={(e) => { e.stopPropagation(); onNext() }} className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
      </button>

      {/* Image */}
      <div className="relative max-w-4xl w-full max-h-[85vh] flex items-center justify-center" onClick={e => e.stopPropagation()}>
        <img src={src} alt={alt} decoding="async" className="max-w-full max-h-[78vh] rounded-xl object-contain shadow-2xl" />
      </div>

      {/* Bottom bar — download */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10" onClick={e => e.stopPropagation()}>
        <button
          onClick={handleDownload}
          className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-2.5 font-sans text-sm font-extrabold uppercase tracking-widest text-black shadow-lg transition hover:bg-amber-400 hover:-translate-y-0.5"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" /></svg>
          Download Photo
        </button>
      </div>
    </div>
  )
}

/* ── Gallery image tile ── */
function GalleryImg({ src, alt, onClick }: { src: string; alt: string; onClick: () => void }) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <div className="flex aspect-square w-full items-center justify-center bg-zinc-100 text-zinc-300">
        <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    )
  }
  return (
    <div className="relative group cursor-pointer" onClick={onClick}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
      decoding="async"
      className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
        onError={() => setFailed(true)}
      />
      {/* Hover overlay with expand icon */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/35 transition-all duration-300">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
          <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
        </div>
      </div>
    </div>
  )
}

const pastorGallery = [
  '/pas (1).jpeg',
  '/pas (2).jpeg',
 '/pas (3).jpeg',
 '/pas (4).jpeg',
 '/pas (5).jpeg',

  '/pas (6).jpeg',
 '/pas (7).jpeg',
'/pas (8).jpeg',
'/pas (9).jpg',
'/pas (10).jpg',
'/pas (11).jpg',
 '/pas (12).jpg',
]

const milestones = [
  {
    year: '1981',
    titleTe: 'దైవ పిలుపు',
    titleEn: 'The Divine Calling',
    descTe: 'పాస్టర్ దేవదాస్ గారు దేవుని స్వరానికి లోబడి, తన జీవితాన్ని పూర్తి సమయం సేవకు అంకితం చేశారు.',
    descEn: 'Pastor Devadas Garu answered God\'s voice and dedicated his entire life to full-time spiritual service.'
  },
  {
    year: 'Early Years',
    titleTe: 'సైకిల్ ప్రయాణం',
    titleEn: 'Bicycle Journeys',
    descTe: 'వెంకటాపురం వంటి మారుమూల గ్రామాలకు పాత సైకిల్ పై వెళ్తూ ఎండనక వాననక సువార్తను ప్రకటించారు.',
    descEn: 'Traveled to remote villages like Venkatapuram on a bicycle, preaching through hot sun and heavy rains.'
  },
  {
    year: 'Growth',
    titleTe: 'ప్రార్థన - అద్భుతాలు',
    titleEn: 'Fasting & Prayers',
    descTe: 'ఉపవాస ప్రార్థనల ద్వారా ఎందరో రోగులకు స్వస్థత లభించింది, కుటుంబాలలో సమాధానం వచ్చింది.',
    descEn: 'Through regular fasting prayers, many sick people were healed and broken families found true peace.'
  },
  {
    year: '40 Years',
    titleTe: 'సజీవ సాక్ష్యం',
    titleEn: 'A Legacy of Hope',
    descTe: 'నలభై ఏళ్ల సేవ పూర్తయినప్పటికీ, నేటికీ అదే దీనమనస్సుతో నమ్మకమైన కాపరిగా కొనసాగుతున్నారు.',
    descEn: 'After forty years of continuous service, he still serves with the same deep humility and faith.'
  }
]

export default function PastorPage() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)

  const openLightbox = (i: number) => setLightboxIdx(i)
  const closeLightbox = () => setLightboxIdx(null)
  const prevImg = () => setLightboxIdx(i => i !== null ? (i - 1 + pastorGallery.length) % pastorGallery.length : null)
  const nextImg = () => setLightboxIdx(i => i !== null ? (i + 1) % pastorGallery.length : null)

  return (
    <div className="min-h-screen bg-white text-zinc-900 selection:bg-red-600/10 font-sans antialiased">
      {lightboxIdx !== null && (
        <Lightbox
          src={pastorGallery[lightboxIdx]}
          alt={`Pastor Deva Dasu Garu ${lightboxIdx + 1}`}
          onClose={closeLightbox}
          onPrev={prevImg}
          onNext={nextImg}
        />
      )}
      
      {/* 🚀 HERO SECTION */}
      <section className="relative flex min-h-[55vh] items-center justify-center overflow-hidden pt-32 pb-20 bg-zinc-950">
        <div className="absolute inset-0 z-0">
          <Image
            src="/dev1.jpg" 
            alt="Hosanna Mandir Sanctuary"
            fill
            className="object-cover object-center scale-105"
            priority
          />
        </div>
        <div className="absolute inset-0 z-10 bg-black/55" />
        
        <div className="relative z-20 max-w-4xl mx-auto px-6 text-center space-y-4">
          <span className="inline-block font-sans text-xs font-bold tracking-[0.3em] text-amber-500 uppercase">
            దైవజనుల ఆత్మీయ ప్రస్థానము · The Journey of Our Shepherd
          </span>
         <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl drop-shadow-md">
            పాస్టర్<span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-amber-500"> దేవదాస్ గారి</span> 
          </h1>
          <p className="max-w-xl mx-auto text-zinc-300 text-sm sm:text-lg font-medium tracking-wide">
            జీవాధిపతియైన యేసుతో 40 వసంతాల ఆత్మీయ ప్రయాణం <br />
            Four Decades of Faithful Spiritual Service and Devotion
          </p>
        </div>
      </section>

      {/* 📖 SECTION 1: దైవ పిలుపు / THE CALL TO SERVICE */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-5 order-last lg:order-first">
              <ScrollReveal>
                <div className="relative aspect-[3/4] w-full max-w-md mx-auto overflow-hidden rounded-2xl bg-zinc-50 shadow-2xl shadow-zinc-200/40 group">
                  <Image
                    src="/pastor.png" 
                    alt="పాస్టర్ దేవదాస్ గారు"
                    fill
                    className="object-cover object-center transition-transform duration-700 scale-105 group-hover:scale-100"
                    priority
                  />
                </div>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-7 space-y-8 text-left">
              <ScrollReveal delay={100}>
                <div>
                  <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950">
                    దైవ పిలుపు / <span className="text-zinc-500 font-bold">The Call to Service</span>
                  </h2>
                  <div className="h-[2px] w-16 bg-red-600 my-3" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-base font-normal leading-relaxed">
                  <div className="text-zinc-800 space-y-4 border-l-2 border-red-600/20 pl-4">
                    <p>
                      పాస్టర్ దేవదాస్ గారి ఆత్మీయ ప్రయాణం ఒక నిశ్శబ్దమైన మరియు వ్యక్తిగతమైన నిర్ణయంతో ప్రారంభమైంది. 1981వ సంవత్సరంలో, ఆయన తన జీవితాన్ని పూర్తిగా దేవుని సేవకు అంకితం చేయాలనే బలమైన దైవ పిలుపును అందుకున్నారు. లోకసంబంధమైన ఆశలను, వ్యక్తిగత సౌకర్యాలను మరియు ఆర్థికపరమైన భద్రతను పక్కన పెట్టి ఆయన పూర్తి సమయం పరిచర్యలోకి అడుగుపెట్టారు. దైవజనుల వద్ద ఎటువంటి లోకసంబంధమైన ఆస్తిగాని, పెద్ద ప్రణాళికలు గాని లేవు; కేవలం దేవుని నమ్మకత్వంపై మాత్రమే ఆధారపడి ఆయన ముందడుగు వేశారు.
                    </p>
                    <p>
                      పరిచర్య ప్రారంభం నుండి ఆయన జీవితం సంపూర్ణ నమ్రతతో సాగింది. ఆయన ఎన్నడూ పేరు ప్రఖ్యాతులు లేదా లోక గౌరవాల కోసం ప్రాకులాడలేదు. నిరాశ నిస్పృహలలో, అనారోగ్యాలతో మరియు ఆత్మీయ వేదనతో ఉన్న ప్రజలకు సహాయం చేయడంపైనే ఆయన తన పూర్తి దృష్టిని కేంద్రీకరించారు. గంటల తరబడి ఏకాంత ప్రార్థనలు చేయడం, దేవుని వాక్యాన్ని ధ్యానించడం ద్వారా ఆయన ఒక బలమైన ఆత్మీయ పునాదిని నిర్మించుకున్నారు, ఇది రాబోయే దశాబ్దాల సేవలో ఆయనను నమ్మకంగా నడిపించింది.
                    </p>
                  </div>
                  <div className="text-zinc-500 space-y-4">
                    <p>
                      The spiritual journey of Pastor Devadas Garu began with a quiet and personal choice. In 1981, he felt a deep, inner calling to dedicate his entire life to God. Leaving behind worldly ambitions, personal comfort, and financial security, he stepped out into full-time ministry. He had no wealth or grand plans, only a strong heart and an unshakeable trust in God\'s guidance.
                    </p>
                    <p>
                      From the very beginning, his life was defined by humility. He did not seek fame or position. Instead, he focused entirely on helping people who were hurting, lonely, or lost. By spending hours in quiet prayer and reading the scriptures, he built a life of deep spiritual discipline that would guide him through the many decades ahead.
                    </p>
                  </div>
                </div>

              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* 📖 SECTION 2: భక్తిగల తల్లిదండ్రుల పునాది / THE FOUNDATION OF RIGHTEOUS PARENTS */}
      <section className="py-20 bg-zinc-50/50">
        <div className="max-w-6xl mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-7 space-y-8 text-left">
              <ScrollReveal>
                <div>
                  <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950">
                    భక్తిగల తల్లిదండ్రుల పునాది / <span className="text-zinc-500 font-bold">The Foundation of Righteous Parents</span>
                  </h2>
                  <div className="h-[2px] w-16 bg-amber-500 my-3" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-base font-normal leading-relaxed">
                  <div className="text-zinc-800 space-y-4 border-l-2 border-amber-500/20 pl-4">
                    <p>
                      పాస్టర్ దేవదాస్ గారిని జీవితాంతం నడిపించిన ఆ గొప్ప విశ్వాసం ఆయన చిన్ననాటి ఇల్లు మరియు తల్లిదండ్రుల భక్తి నుండే ప్రారంభమైంది. ఎంతో దైవభక్తి, నీతిగల తల్లిదండ్రుల గర్భాన జన్మించడం ఆయన పొందిన మొదటి ఆశీర్వాదం. వారు ఆయనను ఎంతో క్రమశిక్షణతో, క్రీస్తు ప్రేమతో మరియు దైవభయంతో పెంచారు. చిన్నతనం నుండే ప్రార్థన యొక్క విలువను, యథార్థతను మరియు దయను ఆయనకు నేర్పించారు.
                    </p>
                    <p>
                      వారి ఇంట్లో ప్రతిరోజూ క్రమం తప్పకుండా ప్రార్థనలు జరిగేవి. తల్లిదండ్రులు స్వయంగా చూపిన ఆత్మీయ జీవితం ఆయనకు ఒక గొప్ప మాదిరిగా నిలిచేది. వారు చేసిన నిరంతర ప్రార్థనలు దైవజనుల బాల్యాన్ని కాపాడటమే కాకుండా, ఆయన హృదయంలో బలమైన విశ్వాసపు విత్తనాలను నాటాయి. తల్లిదండ్రుల నుండి వారసత్వంగా పొందిన ఆ ఆత్మీయ సంపద మరియు ప్రార్థన బలమే ఆయన దైవ పిలుపుకు లోబడటానికి, కష్టకాలంలో స్థిరంగా నిలబడటానికి తోడ్పడ్డాయి.
                    </p>
                  </div>
                  <div className="text-zinc-500 space-y-4">
                    <p>
                      The faith that carried Pastor Devadas Garu through life started in his childhood home. He was blessed with deeply spiritual and righteous parents who raised him in a loving, God-fearing environment. From a very young age, his parents taught him the true value of prayer, honesty, and kindness.
                    </p>
                    <p>
                      His parents built a faithful daily routine of prayer inside their home, showing him a real example of godly living. Their constant prayers protected him as he grew up and sowed the early seeds of faith in his heart. It was this rich family inheritance of love and righteousness that gave him the inner strength to answer God\'s call and stand firm during difficult times.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-5">
              <ScrollReveal delay={150}>
                <div className="w-full overflow-hidden rounded-2xl bg-zinc-50 shadow-2xl shadow-zinc-200/40">
                  <img
                    src="/parents.png"
                    alt="తల్లిదండ్రులు"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto block"
                  />
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* 📖 SECTION 3: పరిచర్యలో ఉమ్మడి ప్రయాణం / TRAVELING TOGETHER IN MINISTRY */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-5 order-last lg:order-first">
              <ScrollReveal>
                <div className="w-full overflow-hidden rounded-2xl bg-zinc-50 shadow-2xl shadow-zinc-200/40">
                  <img
                    src="/wife.png"
                    alt="పాస్టర్ గారు మరియు అమ్మగారు"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto block"
                  />
                </div>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-7 space-y-8 text-left">
              <ScrollReveal delay={100}>
                <div>
                  <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950">
                    పరిచర్యలో ఉమ్మడి ప్రయాణం / <span className="text-zinc-500 font-bold">Traveling Together in Ministry</span>
                  </h2>
                  <div className="h-[2px] w-16 bg-red-600 my-3" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-base font-normal leading-relaxed">
                  <div className="text-zinc-800 space-y-4 border-l-2 border-red-600/20 pl-4">
                    <p>
                      నిజమైన దైవ పరిచర్య అనేది పరస్పర ప్రేమ, త్యాగాల కలయిక. పాస్టర్ దేవదాస్ గారికి అండగా ఆయన సతీమణి నిలిచారు, ఆమెను సంఘమంతా ఎంతో ప్రేమగా "అమ్మగారు" అని పిలుచుకుంటారు. వీరిద్దరూ ఒకరికొకరు తోడుగా ఉంటూ పరిచర్యలోని ప్రతి కష్టసుఖాలను, భారాలను సమానంగా పంచుకున్నారు. ఒక నమ్మకమైన దైవ కుటుంబంగా దశాబ్దాలుగా ఈ ఆత్మీయ యాత్రలో సాగిపోతున్నారు.
                    </p>
                    <p>
                      ప్రజల చెంతకు దైవ సందేశాన్ని చేర్చడానికి వీరిద్దరూ ఎన్నో ప్రాంతాలు కలిసి ప్రయాణించారు. పాస్టర్ గారు వాక్యాన్ని ప్రకటిస్తూ ఆత్మీయ ఆహారాన్ని అందిస్తుంటే, అమ్మగారు ఎన్నో నలిగిపోయిన కుటుంబాలను ఆదరిస్తూ, ఒక తల్లి హృదయంతో ప్రజలను పరామర్శించేవారు. వారి ఇల్లు మరియు జీవితం పూర్తిగా ఇతరుల సేవకే అంకితమైంది. సంఘాన్ని తమ సొంత కుటుంబంగా భావిస్తూ, విశ్వాసులను ఆత్మీయతలో నడిపించడానికి వారు నిరంతరం శ్రమిస్తున్నారు.
                    </p>
                  </div>
                  <div className="text-zinc-500 space-y-4">
                    <p>
                      True ministry is a shared journey of love and sacrifice. Beside Pastor Devadas Garu stands his devoted wife, whom the people affectionately call Amma garu. Together, they have walked hand-in-hand through every single season of this calling, sharing every burden and every joy as a united team.
                    </p>
                    <p>
                      For years, they have traveled extensively across different regions to reach people in need. While Pastor Garu preaches and teaches, his wife brings comfort to broken families and cares for the people with a kind, motherly heart. They have given their entire lives completely to the service of others, treating the entire congregation as their own family and pouring their love into guiding the community of believers.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* 📖 SECTION 4: సైకిల్ ప్రయాణం / THE HUMBLE BICYCLE JOURNEY */}
      <section className="py-20 bg-zinc-50/50">
        <div className="max-w-6xl mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-7 space-y-8 text-left">
              <ScrollReveal>
                <div>
                  <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950">
                    సైకిల్ ప్రయాణం - కఠిన శ్రమలు / <span className="text-zinc-500 font-bold">The Humble Bicycle Journey</span>
                  </h2>
                  <div className="h-[2px] w-16 bg-amber-500 my-3" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-base font-normal leading-relaxed">
                  <div className="text-zinc-800 space-y-4 border-l-2 border-amber-500/20 pl-4">
                    <p>
                      <span className="font-bold text-zinc-950">వెంకటాపురం పరిచర్య:</span> పాస్టర్ దేవదాస్ గారి సేవా జీవితంలో అత్యంత కఠినమైన పరీక్ష పరిచర్య ప్రారంభ దినాలలోనే ఎదురైంది. ఆ రోజుల్లో ఎటువంటి ఆధునిక వాహనాలు గాని, సరైన రహదారులు గాని, ఆర్థిక వనరులు గాని లేవు. ఒక గ్రామం నుండి మరో గ్రామానికి ప్రయాణించడానికి దైవజనుల వద్ద ఉన్న ఏకైక సాధనం ఒక పాత సైకిల్ మాత్రమే.
                    </p>
                    <p>
                      ఆ సైకిల్ పైనే ఆయన మైళ్ల దూరం ప్రయాణిస్తూ ఎన్నో మారుమూల గ్రామాలకు సువార్తను మోసుకెళ్లారు. తీవ్రమైన ఎండలను, వర్షాకాలంలో బురదమయమైన దారులను లెక్కచేయకుండా ఆయన సైకిల్ తొక్కుతూ ముందుకు సాగారు. ఆ ప్రయాణాలలో ఎన్నో సార్లు ఆకలిని, అవమానాలను, ఒంటరితనాన్ని అనుభవించారు. అయినప్పటికీ, గ్రామాల్లోని చెట్ల కింద, పూరిపాకలలో నిలబడి యేసు క్రీస్తు ప్రేమను ప్రకటిస్తూనే ఉన్నారు.
                    </p>
                  </div>
                  <div className="text-zinc-500 space-y-4">
                    <p>
                      <span className="font-bold text-zinc-800">Venkatapuram Trails:</span> The true test of Pastor Devadas Garu’s dedication happened during the early years of his ministry, which were filled with extreme physical hardship. He had no modern vehicles, no comfortable roads, and no financial backing. His only way to travel from one place to another was a simple, worn-out bicycle.
                    </p>
                    <p>
                      On this bicycle, he traveled long, exhausting miles to reach remote, forgotten villages. He pedaled through the blazing summer heat of Andhra Pradesh and pushed through heavy monsoon rains on muddy, broken pathways. He often faced hunger, rejection, and deep loneliness along the way, yet he kept sharing messages of peace, hope, and love.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-5">
              <ScrollReveal delay={150}>
                <div className="relative aspect-[3/4] w-full max-w-md mx-auto overflow-hidden rounded-2xl bg-zinc-100 shadow-2xl shadow-zinc-200/40 group">
                  <Image
                    src="/pas (1).jpeg" 
                    alt="సైకిల్ ప్రయాణం"
                    fill
                    className="object-cover object-center transition-transform duration-700 scale-105 group-hover:scale-100"
                  />
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

  

      {/* 🔄 SECTION 5: PERFECT PARALLAX ALTERNATING CHRONOLOGICAL LIFE CYCLE */}
      <section className="py-24 bg-white border-t border-zinc-100 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <ScrollReveal>
            <span className="text-[11px] font-bold tracking-[0.25em] text-amber-600 uppercase block mb-2">
              ✦ HIS JOURNEY ✦
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-950 mb-3">
              ఆత్మీయ జీవిత చక్రం / <span className="text-zinc-400 font-bold font-serif">Ministry Milestones</span>
            </h2>
            <div className="mx-auto h-[2px] w-20 bg-amber-500 mb-20" />
          </ScrollReveal>

          <div className="relative max-w-4xl mx-auto">
            {/* Center Spine Timeline Track Rule */}
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-zinc-200 -translate-x-1/2" />

            <div className="space-y-16">
              {milestones.map((item, index) => {
                const isEven = index % 2 === 0
                return (
                  <div key={index} className="relative flex flex-col sm:flex-row items-start justify-between">
                    
                    {/* Node Dot Tracker Anchor */}
                    <div className="absolute left-4 sm:left-1/2 top-7 w-5 h-5 rounded-full border-4 border-white bg-amber-600 shadow-md -translate-x-1/2 z-10" />

                    {/* Alternating Card Logic Alignment */}
                    <div className={`w-full sm:w-[46%] pl-10 sm:pl-0 ${isEven ? 'sm:text-right sm:order-first' : 'sm:text-left sm:order-last'}`}>
                      <ScrollReveal delay={index * 100}>
                        <div className="rounded-3xl border border-amber-600/15 bg-[#FFF8EF]/40 p-6 sm:p-8 shadow-sm hover:bg-[#FFF8EF]/70 transition-all duration-300 text-left space-y-4">
                          <span className="text-lg font-black text-amber-600 tracking-tight block">{item.year}</span>
                          
                          <div>
                            <h3 className="text-lg sm:text-xl font-black text-zinc-950 tracking-tight uppercase leading-tight">
                              {item.titleTe}
                            </h3>
                            <h4 className="text-xs sm:text-sm font-bold text-zinc-400 uppercase tracking-wider mt-0.5">
                              {item.titleEn}
                            </h4>
                          </div>
                          
                          <div className="space-y-3 text-sm sm:text-base font-normal leading-relaxed">
                            <p className="text-zinc-800 border-l-2 border-amber-500/20 pl-3">{item.descTe}</p>
                            <p className="text-zinc-500 pl-3">{item.descEn}</p>
                          </div>
                        </div>
                      </ScrollReveal>
                    </div>

                    {/* Desktop Mirror Spacer balancing logic element */}
                    <div className="hidden sm:block w-[46%]" />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 📸 SECTION 6: PASTOR PHOTO GALLERY */}
      <section className="py-20 bg-white border-t border-zinc-100">
        <div className="max-w-6xl mx-auto px-6 sm:px-12">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-[11px] font-bold tracking-[0.25em] text-amber-600 uppercase block mb-2">✦ PHOTO GALLERY ✦</span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-950">
                పాస్టర్ దేవదాస్ గారి చిత్రాలు
              </h2>
              <p className="mt-1 text-zinc-400 font-bold text-sm sm:text-base tracking-wide">Photo Gallery — Pastor Deva Dasu Garu</p>
              <div className="mx-auto h-[2px] w-20 bg-amber-500 mt-4" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {pastorGallery.map((src, i) => (
              <ScrollReveal key={i} delay={i * 60}>
                <div className="overflow-hidden rounded-2xl bg-zinc-100 shadow-md hover:shadow-xl transition-shadow duration-300">
                  <GalleryImg src={src} alt={`Pastor Deva Dasu Garu ${i + 1}`} onClick={() => openLightbox(i)} />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 🕊️ SECTION 7: నిరీక్షణకు సజీవ సాక్ష్యం / EPILOGUE */}
      <section className="py-20 bg-zinc-50/50 text-center border-t border-zinc-100">
        <div className="max-w-5xl mx-auto px-6 space-y-4">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-zinc-950">
              నిరీక్షణకు సజీవ సాక్ష్యం / A Legacy of Hope
            </h2>
            <div className="h-[2px] w-12 bg-red-600 mx-auto my-3" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-base font-normal leading-relaxed text-left max-w-5xl mx-auto pt-4">
              <div className="text-zinc-800 space-y-4">
                <p>
                  40 వసంతాల సుదీర్ఘ పరిచర్య పూర్తయినప్పటికీ, పాస్టర్ దేవదాస్ గారి సేవా సంకల్పంలో ఎటువంటి మార్పు రాలేదు. ఆనాడు సైకిల్ పై పరిచర్య ప్రారంభించినప్పుడు ఆయనలో ఎంతటి దీనమనస్సు, విశ్వాసం, ప్రేమ ఉండేవో, నేటికీ అవే ఆత్మీయ గుణాలతో ఆయన జీవిస్తున్నారు.
                </p>
                <p>
                  నలిగిన హృదయాలను ఆదరించడం, అనారోగ్యంతో ఉన్నవారి కొరకు ప్రార్థించడం మరియు అవసరతలో ఉన్నవారికి సహాయం చేయడమే ఆయన దైనందిన సేవగా సాగుతోంది. తన నిగర్వి ఆత్మీయ జీవితం మరియు త్యాగపూరితమైన పరిచర్య ద్వారా ఎన్నో కుటుంబాల్లో దైవ కాంతిని నింపిన ఒక నమ్మకమైన కాపరిగా ఆయన నేటికీ సేవలో కొనసాగుతున్నారు.
                </p>
              </div>
              <div className="text-zinc-500 space-y-4">
                <p>
                  After forty years of service, the life of Pastor Devadas Garu remains completely unchanged in its purpose. He continues to live with the same humility, faith, and love that he had when he first started on his bicycle.
                </p>
                <p>
                  His daily focus is still on comforting the broken-hearted, praying for the sick, and helping those in need. He stands as a faithful shepherd whose simple life of sacrifice has brought light and hope to countless homes.
                </p>
              </div>
            </div>

            <div className="pt-10 space-y-1">
              <p className="font-sans font-extrabold italic text-zinc-800 text-lg sm:text-xl leading-relaxed">
                &ldquo;జీవాధిపతియైన యేసుతో మా పయనం.&rdquo;
              </p>
              <p className="text-zinc-500 text-sm sm:text-base italic">
                &ldquo;Our journey is with Jesus, the Lord of Life.&rdquo;
              </p>
              <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest pt-4">
                — Pastor Devadas Garu
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  )
}