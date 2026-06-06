'use client'

import Link from 'next/link'
import Image from 'next/image'
import ScrollReveal from '@/components/ScrollReveal'

const milestones = [
  { 
    number: '2', 
    labelTe: 'ఆరాధన కేంద్రాలు', 
    labelEn: 'Worship Centers', 
    detailTe: 'హనుమాన్ జంక్షన్ మరియు నూజివీడు', 
    detailEn: 'Hanuman Junction and Nuzvid',
    color: 'from-rose-500 to-orange-600'
  },
  { 
    number: '8', 
    labelTe: 'క్రియాశీల పరిచర్యలు', 
    labelEn: 'Active Ministries', 
    detailTe: 'ప్రతి ఒక్కరికీ ఆత్మీయ సేవలు', 
    detailEn: 'Serving every age and family',
    color: 'from-blue-500 to-indigo-600'
  },
  { 
    number: '21', 
    labelTe: 'ఉజ్జీవ కూడికలు', 
    labelEn: 'Days of Revival', 
    detailTe: 'ప్రతి జూలైలో 21 రోజుల ఉపవాస ప్రార్థనలు', 
    detailEn: 'Prayer, fasting, and healing every July',
    color: 'from-amber-400 to-red-600'
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 selection:bg-red-600/10 font-sans antialiased">
      
      {/* 🚀 HERO SECTION */}
      <section className="relative flex min-h-[55vh] items-center justify-center overflow-hidden pt-36 pb-16 bg-[#fffcf7]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/church.jpg"
            alt="Hosanna Mandir Structure"
            fill
            priority
            className="object-cover object-center opacity-30 mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-[#fffcf7]/40 to-[#fff8ed]" />
        </div>

        <div className="relative z-20 mx-auto max-w-5xl px-6 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 px-4 py-1 text-[11px] font-bold tracking-[0.2em] text-amber-700 uppercase">
            ● OUR STORY · మన కథ
          </div>
          
          <h1 className="text-4xl sm:text-7xl font-black text-zinc-900 tracking-tight leading-none uppercase">
            హోసన్నా <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-amber-500">మందిరం</span>
          </h1>
          
          <p className="mx-auto max-w-3xl text-sm sm:text-xl font-semibold leading-relaxed text-zinc-600">
            Rooted in faith, growing in love, and reaching the world with the Gospel of Jesus Christ from Andhra Pradesh.
          </p>
          <div className="flex justify-center items-center gap-1.5 pt-2">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            <div className="h-[1px] w-16 bg-gradient-to-r from-amber-500 to-transparent" />
            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
            <div className="h-[1px] w-16 bg-gradient-to-l from-red-500 to-transparent" />
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
          </div>
        </div>
      </section>

      {/* 📖 SECTION 1: MILESTONES & FOUNDATION PANEL */}
      <section className="relative overflow-hidden bg-[#fff8ed] py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            
            {/* Left Column Layout: Curved Cards Stack */}
            <ScrollReveal>
              <div className="grid gap-4">
                {milestones.map((item) => (
                  <div key={item.labelEn} className="rounded-[1.5rem] bg-white p-5 shadow-[0_10px_30px_rgba(33,25,20,0.05)] border border-amber-500/5">
                    <div className="flex items-center gap-5">
                      <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} font-sans text-3xl font-black text-white shadow-sm`}>
                        {item.number}
                      </div>
                      <div className="text-left space-y-0.5">
                        <h3 className="font-sans text-lg sm:text-xl font-black text-[#211914] leading-tight">
                          {item.labelTe} <span className="text-zinc-400 font-bold text-xs sm:text-base sm:ml-1">/ {item.labelEn}</span>
                        </h3>
                        <p className="font-sans text-xs sm:text-sm font-medium text-[#766055] leading-snug">
                          {item.detailTe} <span className="text-zinc-400 block font-normal text-xs mt-0.5">{item.detailEn}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Right Column Layout: Parallel Text Panel */}
            <ScrollReveal delay={140}>
              <div className="text-left space-y-3">
                <p className="font-sans text-xs font-extrabold uppercase tracking-[0.2em] text-[#e11d48]">
                  OUR BEGINNINGS / <span className="text-red-600">ఆలయ ఆరంభం</span>
                </p>
                <h2 className="font-sans text-3xl sm:text-5xl font-black tracking-tight text-[#211914]">
                  Founded in <span className="text-[#e11d48]">Faith</span>
                </h2>
                <div className="h-[2px] w-16 bg-gradient-to-r from-[#e11d48] to-[#facc15]" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm sm:text-base font-normal leading-relaxed pt-2">
                  <div className="text-zinc-800 space-y-3 border-l-2 border-red-600/20 pl-4">
                    <p>
                      హోసన్నా మందిరం కేవలం ఇటుకలు, రాళ్లతో నిర్మించబడిన కట్టడం కాదు; అది వేలాది నలిగిన హృదయాలకు ఆత్మీయ ఆశ్రయం. ఒక చిన్న గదిలో కొద్దిమంది విశ్వాసులతో ప్రారంభమైన ఈ ప్రార్థన కూడికలు, దేవుని అపారమైన కృపను బట్టి రోజురోజుకూ విస్తరించాయి.
                    </p>
                    <p>
                      పాస్టర్ దేవదాస్ గారి మోకాళ్ల ప్రార్థన, ఉపవాస దీక్షల ఫలితంగా హనుమాన్ జంక్షన్ కేంద్రంగా ఈ అద్భుతమైన ఆలయ పునాది పడింది. ప్రతి వారం జరిగే ప్రత్యేక ప్రార్థనలలో వేలాది మంది ప్రజలు పాల్గొని క్రీస్తు ప్రేమను అనుభవిస్తున్నారు.
                    </p>
                  </div>
                  <div className="text-zinc-500 space-y-3">
                    <p>
                      Hosanna Mandir was born out of a divine calling to bring the transforming power of Jesus Christ to the people of Andhra Pradesh. What began as a small prayer gathering has grown into a flourishing congregation.
                    </p>
                    <p>
                      Every milestone is a testimony to God&apos;s absolute faithfulness. From the first service to the launch of our TV ministry, from opening our Nuzvid center to the annual fasting revival, each chapter has been written by grace.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* 🖼️ TRANSITIONAL IMAGE BLOCK */}
      <section className="bg-[#fff8ed] pb-12 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal delay={200}>
            <div className="relative h-[220px] sm:h-[340px] w-full overflow-hidden rounded-[2rem] shadow-[0_15px_40px_rgba(0,0,0,0.04)]">
              <Image
                src="/hoooo.webp"
                alt="Hosanna Mandir Fellowship Background"
                fill
                className="object-cover object-center"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 📖 SECTION 2: PRAYER & MIRACLES */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-12">
          <ScrollReveal>
            <div className="text-left space-y-2 mb-6">
              <span className="text-xs font-bold tracking-widest text-amber-600 uppercase block">
                01 . ఆలయ ముఖ్య ఉద్దేశం
              </span>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-zinc-950 leading-tight">
                A Center for Miracles & Deliverance
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl border border-amber-600/10 bg-[#fffbf4]/40 p-5 sm:p-8 shadow-sm">
              <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm sm:text-base font-normal leading-relaxed text-left">
                <div className="text-zinc-800 space-y-3 border-l-2 border-amber-500/30 pl-4">
                  <p>
                    ఈ మందిరం యొక్క ప్రధాన ఉద్దేశం రోగులకు దైవిక స్వస్థతను, బంధకాలలో ఉన్నవారికి విడుదలను అందించడం. ఎందరో వైద్యుల చేత వదిలేయబడిన రోగులు ఇక్కడ ప్రార్థన ద్వారా దైవిక స్వస్థతను పొందారు.
                  </p>
                  <p>
                    దురాత్మల శక్తుల నుండి విడుదల, చీకటి బంధకాల నుండి విముక్తి మరియు నెమ్మది లేని కుటుంబాలలో క్రీస్తు సమాధానం కలిగించే ఒక గొప్ప ఆత్మీయ విప్లవ కేంద్రంగా ఈ ఆలయం వర్ధిల్లుతోంది.
                  </p>
                </div>
                <div className="text-zinc-500 space-y-3">
                  <p>
                    The main purpose of this sanctuary is to bring divine healing to the sick and total deliverance to those bound by dark spiritual forces. Many long-term patients given up on by doctors have received absolute healing through the faithful prayers here.
                  </p>
                  <p>
                    The church stands as a powerful center breaking negative spiritual chains, casting out dark elements, and restoring complete peace to broken, restless homes across the entire region.
                  </p>
                </div>
              </div>
              
              <div className="lg:col-span-5 relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-zinc-50 shadow-sm">
                <Image
                  src="/unnamed.webp"
                  alt="Sanctuary Miracles Prayer Hours"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 📖 NEW SECTION: THE NUZVID BRANCH EXTENSION */}
      <section className="py-16 bg-white border-t border-zinc-100">
        <div className="max-w-6xl mx-auto px-6 sm:px-12">
          <ScrollReveal>
            <div className="text-left space-y-2 mb-6">
              <span className="text-xs font-bold tracking-widest text-blue-600 uppercase block">
                02 . నూజివీడు శాఖ విస్తరణ
              </span>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-zinc-950 leading-tight">
                The Nuzvid Expansion · Prayer & Healing Campus
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl border border-blue-600/10 bg-[#f4f8ff]/50 p-5 sm:p-8 shadow-sm">
              <div className="lg:col-span-5 relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-zinc-50 shadow-sm order-last lg:order-first">
                <Image
                  src="/nuzv.jpeg"
                  alt="Nuzvid Hosanna Mandir Campus"
                  fill
                  className="object-cover object-center"
                />
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm sm:text-base font-normal leading-relaxed text-left">
                <div className="text-zinc-800 space-y-3 border-l-2 border-blue-500/30 pl-4">
                  <p>
                    దేవుడు ఇచ్చిన దర్శనము మరియు ప్రజల ఆత్మీయ అవసరతలను బట్టి హోసన్నా పరిచర్య నూజివీడు ప్రాంతానికి విస్తరించింది. హనుమాన్ జంక్షన్ రాలేని ఎందరో విశ్వాసులకు ఈ ప్రాంతం ఒక గొప్ప దీవెనగా మారింది.
                  </p>
                  <p>
                    ప్రత్యేక ప్రార్థనలు, స్వస్థత కూడికల ద్వారా ఈ ప్రాంగణం ఎందరికో ఆదరణ కలిగిస్తూ, క్రీస్తు ప్రేమను చాటిచెప్పే బలమైన రెండవ ఆరాధన కేంద్రంగా ఎదుగుతోంది.
                  </p>
                </div>
                <div className="text-zinc-500 space-y-3">
                  <p>
                    According to the vision given by God and the growing spiritual needs of the people, the ministry expanded to the Nuzvid region. This campus has become a massive blessing for believers who cannot travel long distances.
                  </p>
                  <p>
                    Through regular fasting prayers and dedicated healing services, this secondary center continues to welcome broken hearts, expanding the kingdom work with power and grace.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 📖 NEW SECTION: NUZVID FOUNDATION STONE CEREMONY */}
      <section className="py-16 bg-[#f4f8ff]/60 border-t border-zinc-100">
        <div className="max-w-6xl mx-auto px-6 sm:px-12">
          <ScrollReveal>
            <div className="text-left space-y-2 mb-6">
              <span className="text-xs font-bold tracking-widest text-blue-600 uppercase block">
                02.1 . నూజివీడు మందిర పునాది రాయి
              </span>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-zinc-950 leading-tight">
                Nuzvid <span className="text-blue-600">మందిర పునాది రాయి కార్యక్రమం</span>
              </h2>
              <p className="text-sm sm:text-base font-semibold text-zinc-500">Foundation Stone Laying Ceremony</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl border border-blue-600/10 bg-white p-5 sm:p-8 shadow-sm">
              <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm sm:text-base font-normal leading-relaxed text-left">
                <div className="text-zinc-800 space-y-3 border-l-2 border-blue-500/30 pl-4">
                  <p>
                    దేవుని కృపతో, నూజివీడులో నూతన ఆరాధన మందిరానికి పునాది రాయి ఘనంగా వేయబడింది. పాస్టర్లు, పెద్దలు మరియు వందలాది మంది విశ్వాసులు ఈ చారిత్రాత్మక ఘట్టంలో పాల్గొని, ప్రార్థనలతో, స్తుతి ఆరాధనలతో దేవునికి మహిమ చెల్లించారు.
                  </p>
                  <p>
                    ఈ నూతన మందిరం నూజివీడు మరియు పరిసర ప్రాంతాల ప్రజలకు ఆత్మీయ ఆశ్రయంగా, స్వస్థత, విడుదల కేంద్రంగా మారి, వేలాది హృదయాలకు దీవెనగా నిలవాలని విశ్వాసులు హృదయపూర్వకంగా ప్రార్థించారు.
                  </p>
                </div>
                <div className="text-zinc-500 space-y-3">
                  <p>
                    By God&apos;s amazing grace, the foundation stone for the new Hosanna worship sanctuary in Nuzvid was laid in a glorious ceremony. Pastors, church elders, and hundreds of believers gathered for this historic moment — filled with prayer, worship, and praise to God.
                  </p>
                  <p>
                    The congregation prayed earnestly that this new sanctuary would rise as a place of healing, deliverance, and spiritual refuge — a lasting blessing for the people of Nuzvid and the surrounding region for generations to come.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 grid grid-cols-2 gap-3">
                {[1, 14, 5].map((n, i) => (
                  <div key={n} className={`relative overflow-hidden rounded-2xl bg-zinc-50 shadow-sm ${i === 0 ? 'col-span-2 aspect-[16/9]' : 'aspect-square'}`}>
                    <Image
                      src={`/nuzvid-foundation-stone/nuzvid-foundation-${n}.jpeg`}
                      alt="Nuzvid Mandir Foundation Stone Ceremony"
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 font-sans text-xs font-extrabold uppercase tracking-[0.22em] text-blue-700 transition-all duration-200 hover:gap-3"
              >
                View Full Gallery — Nuzvid మందిర పునాది రాయి కార్యక్రమం
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 📖 SECTION 3: THE ANNUAL REVIVAL FLAME */}
      <section className="py-16 bg-zinc-50/40 border-t border-b border-zinc-100">
        <div className="max-w-6xl mx-auto px-6 sm:px-12">
          <ScrollReveal>
            <div className="text-left space-y-2 mb-6">
              <span className="text-xs font-bold tracking-widest text-red-600 uppercase block">
                03 . ఉపవాస ప్రార్థన ఉజ్జీవం
              </span>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-zinc-950 leading-tight">
                The Sacred Seasons of Revival
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center rounded-3xl border border-red-600/10 bg-[#fffbfa] p-5 sm:p-8 shadow-sm">
              <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm sm:text-base font-normal leading-relaxed text-left">
                <div className="text-zinc-800 space-y-3 border-l-2 border-red-600/30 pl-4">
                  <p>
                    హోసన్నా మందిరంలో అత్యంత ప్రాముఖ్యమైన ఘట్టం వార్షిక జూలై నెల ఉపవాస ప్రార్థనలు. 21 రోజుల పాటు జరిగే ఈ ప్రత్యేక స్వస్థత కూడికలకు ఆంధ్రప్రదేశ్ నలుమూలల నుండి మరియు ఇతర రాష్ట్రాల నుండి కూడా ప్రజలు తండోపతండాలుగా తరలివస్తారు.
                  </p>
                  <p>
                    ఈ కూడికలలో దేవుని వాక్యం శక్తివంతంగా ప్రకటించబడుతుంది. రాత్రింబవళ్ళు జరిగే విజ్ఞాపన ప్రార్థనల ద్వారా లభించే అద్భుతాలు సంఘాన్ని మరింత బలపరుస్తున్నాయి.
                  </p>
                </div>
                <div className="text-zinc-500 space-y-3">
                  <p>
                    The most significant season at Hosanna Mandir is the annual July fasting prayer revival. During these unique 21-day healing meetings, crowds of people travel from all corners of Andhra Pradesh and neighboring states to seek divine intervention.
                  </p>
                  <p>
                    God&apos;s Word is proclaimed with unmatched authority, and the continuous day-and-night intercessory prayers trigger life-changing miracles that continuously strengthen the faith of the congregation.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-zinc-50 shadow-sm">
                <Image
                  src="/women.webp"
                  alt="July Fasting Prayers Revival"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ⏰ NEW SECTION: CAMPUS SERVICE TIMINGS (Matches image_a9a158.png perfectly) */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-12">
          <ScrollReveal>
            <div className="text-center space-y-2 mb-10">
              <span className="text-xs font-bold tracking-widest text-amber-600 uppercase block">
                ఆరాధన సమయాలు
              </span>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-zinc-950">
                Church Service Timings
              </h2>
              <div className="h-[2px] w-12 bg-amber-500 mx-auto mt-2" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto text-left">
              
              {/* Hanuman Junction Card Layout */}
              <div className="bg-white rounded-[2rem] shadow-[0_15px_45px_rgba(0,0,0,0.05)] border border-zinc-100 overflow-hidden">
                <div className="bg-[#bd1e24] p-6 text-white relative">
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight">Hanuman Junction Church</h3>
                  <p className="text-xs font-bold text-red-100 uppercase tracking-wider mt-0.5">Main Worship Campus</p>
                  <div className="absolute right-6 top-7 h-2 w-2 rounded-full bg-white opacity-80" />
                </div>
                <div className="p-6 sm:p-8 space-y-6">
                  <div className="flex justify-between items-center border-b border-zinc-100 pb-4">
                    <div>
                      <h4 className="font-sans text-sm font-black text-zinc-950">SUNDAY</h4>
                      <p className="text-xs font-semibold text-zinc-400 mt-0.5">Worship Service</p>
                    </div>
                    <span className="bg-amber-500/10 border border-amber-500/20 text-amber-800 text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full">10:00 AM - 1:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-zinc-100 pb-4">
                    <div>
                      <h4 className="font-sans text-sm font-black text-zinc-950">WEDNESDAY</h4>
                      <p className="text-xs font-semibold text-zinc-400 mt-0.5">Women&apos;s Prayer</p>
                    </div>
                    <span className="bg-amber-500/10 border border-amber-500/20 text-amber-800 text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full">12:00 PM - 3:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-sans text-sm font-black text-zinc-950">SATURDAY</h4>
                      <p className="text-xs font-semibold text-zinc-400 mt-0.5">Fasting Prayer</p>
                    </div>
                    <span className="bg-amber-500/10 border border-amber-500/20 text-amber-800 text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full">7:00 PM - 9:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Nuzvid Campus Card Layout */}
              <div className="bg-white rounded-[2rem] shadow-[0_15px_45px_rgba(0,0,0,0.05)] border border-zinc-100 overflow-hidden">
                <div className="bg-[#1e5ecb] p-6 text-white relative">
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight">Nuzvid Church</h3>
                  <p className="text-xs font-bold text-blue-100 uppercase tracking-wider mt-0.5">Prayer and Healing Campus</p>
                  <div className="absolute right-6 top-7 h-2 w-2 rounded-full bg-white opacity-80" />
                </div>
                <div className="p-6 sm:p-8 space-y-6">
                  <div className="flex justify-between items-center border-b border-zinc-100 pb-4">
                    <div>
                      <h4 className="font-sans text-sm font-black text-zinc-950">SUNDAY</h4>
                      <p className="text-xs font-semibold text-zinc-400 mt-0.5">Worship Service</p>
                    </div>
                    <span className="bg-amber-500/10 border border-amber-500/20 text-amber-800 text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full">8:00 AM - 10:00 AM</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-zinc-100 pb-4">
                    <div>
                      <h4 className="font-sans text-sm font-black text-zinc-950">WEDNESDAY</h4>
                      <p className="text-xs font-semibold text-zinc-400 mt-0.5">Midweek Service</p>
                    </div>
                    <span className="bg-amber-500/10 border border-amber-500/20 text-amber-800 text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full">12:00 PM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-sans text-sm font-black text-zinc-950">FRIDAY</h4>
                      <p className="text-xs font-semibold text-zinc-400 mt-0.5">Healing Prayer</p>
                    </div>
                    <span className="bg-amber-500/10 border border-amber-500/20 text-amber-800 text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full">10:00 AM - 2:00 PM</span>
                  </div>
                </div>
              </div>

            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 🕊️ LIGHT PREMIUM INVITATION FOOTER — STYLISH 3D PARALLAX DESIGN */}
      <section className="relative overflow-hidden bg-[#fffcf7] py-20 sm:py-28 text-zinc-900 border-t border-amber-500/10 [perspective:1000px]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] sm:w-[750px] sm:h-[750px] bg-gradient-to-tr from-amber-500/15 via-orange-400/5 to-transparent rounded-full blur-[110px] pointer-events-none animate-pulse-slow [transform:translateZ(-100px)]" />
        <div className="absolute -top-12 left-1/4 w-80 h-80 bg-amber-500/5 rounded-full blur-[70px] pointer-events-none" />
        <div className="absolute -bottom-12 right-1/4 w-80 h-80 bg-red-500/5 rounded-full blur-[70px] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center [transform-style:preserve-3d] [transform:rotateX(2deg)]">
          <div className="flex justify-center items-center gap-2 mb-6 [transform:translateZ(20px)]">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-amber-500/40 to-amber-500" />
            <span className="text-xs text-amber-600 drop-shadow-[0_3px_6px_rgba(217,119,6,0.3)] font-sans font-black">✦</span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent via-amber-500/40 to-amber-500" />
          </div>

          <p className="font-sans text-xs sm:text-sm font-extrabold uppercase tracking-[0.3em] text-amber-700 drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)] mb-4 [transform:translateZ(30px)]">
            మీకు మా ఆత్మీయ స్వాగతం <span className="text-amber-400/60 mx-1.5">•</span> YOU ARE WELCOME
          </p>

          <h2 className="text-4xl sm:text-7xl font-black tracking-tight text-zinc-950 uppercase leading-none mb-8 [transform:translateZ(60px)] drop-shadow-[0_2px_1px_#e5e7eb,0_4px_1px_#e5e7eb,0_6px_1px_#d1d5db,0_8px_1px_#d1d5db,0_12px_20px_rgba(0,0,0,0.08)]">
            COME & <span className="text-transparent bg-clip-text bg-gradient-to-b from-amber-500 via-amber-600 to-amber-700 drop-shadow-[0_2px_10px_rgba(217,119,6,0.25)]">EXPERIENCE</span>
          </h2>

          <div className="space-y-4 max-w-2xl mx-auto mb-12 [transform:translateZ(40px)]">
            <p className="text-sm sm:text-xl font-semibold leading-relaxed text-zinc-700 drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]">
              There is a place for you at Hosanna Mandir. Come as you are, worship with us, and experience the pure love of God.
            </p>
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent mx-auto" />
            <p className="text-xs sm:text-base font-black text-amber-800 tracking-wide leading-relaxed drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]">
              హోసన్నా మందిరంలో మీకు ఎల్లప్పుడూ స్థానం ఉంటుంది. వచ్చి దైవ ఆరాధనలో పాలుపొండి దేవుని ప్రేమను అనుభవించండి.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-xs sm:max-w-none mx-auto [transform:translateZ(50px)]">
            <Link 
              href="/contact" 
              className="group relative inline-flex h-14 w-full sm:w-auto sm:px-12 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600 font-sans text-xs font-black uppercase tracking-widest text-zinc-950 shadow-[0_5px_15px_rgba(245,158,11,0.35)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_8px_22px_rgba(245,158,11,0.45)] border-b-4 border-amber-700 active:border-b-0 active:translate-y-[4px]"
            >
              <span className="relative z-10 drop-shadow-[0_1px_1px_rgba(255,255,255,0.3)]">GET IN TOUCH</span>
              <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            
            <Link 
              href="/live" 
              className="inline-flex h-14 w-full sm:w-auto sm:px-12 items-center justify-center rounded-xl border border-zinc-300 bg-white hover:bg-zinc-50 font-sans text-xs font-black uppercase tracking-widest text-zinc-800 shadow-[0_4px_10px_rgba(0,0,0,0.04)] transition-all duration-300 hover:scale-[1.03] hover:border-zinc-400 border-b-4 border-zinc-400/60 active:border-b-0 active:translate-y-[4px]"
            >
              WATCH LIVE
            </Link>
          </div>

        </div>
      </section>
    </div>
  )
}