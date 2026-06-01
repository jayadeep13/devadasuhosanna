'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import ScrollReveal from '@/components/ScrollReveal'

type PastVideoData = {
  id: string
  url: string
  title: string
  tag: string
}

export default function DevotionalPage() {
  const [mainVideoId, setMainVideoId] = useState<string>('')
  const [pastVideosList, setPastVideosList] = useState<PastVideoData[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function fetchLatestDevotionalsAutomation() {
      try {
        const response = await fetch('/api/devotional-status')
        const data = await response.json()
        
        if (data.mainVideoId && data.mainVideoId !== 'f5v8eD_8NWe') {
          setMainVideoId(data.mainVideoId)
        } else if (data.pastVideos && data.pastVideos.length > 0) {
          setMainVideoId(data.pastVideos[0].id)
        }

        if (data.pastVideos && data.pastVideos.length > 0) {
          const formatted = data.pastVideos.map((vid: any) => ({
            id: vid.id,
            url: `https://www.youtube.com/embed/${vid.id}?rel=0`,
            title: vid.title, 
            tag: 'DAILY MANNA'
          }))
          setPastVideosList(formatted)
        }
      } catch (err) {
        console.error('Automation bridge offline, using client fallback slots.')
      } finally {
        setLoading(false)
      }
    }

    fetchLatestDevotionalsAutomation()
  }, [])

  return (
    <div className="min-h-screen bg-white text-zinc-900 selection:bg-amber-600/10 pb-24 font-sans">
      
      {/* Premium Elegant Gold Accented Devotional Hero */}
      <section className="relative pt-36 pb-14 border-b border-zinc-100 bg-gradient-to-b from-amber-50/30 to-white overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-6 text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200 px-3.5 py-1 text-[11px] font-bold tracking-widest text-amber-700 uppercase">
            🌅 DAILY MORNING MANNA
          </div>
        
          <h1 className="text-4xl font-black tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
            ఉదయకాల <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-amber-500">దైవసందేశం</span>
          </h1>
          <div className="mx-auto h-[3px] w-14 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 rounded-full" />
          <p className="mx-auto max-w-xl text-zinc-500 text-sm font-medium leading-relaxed">
            Start your day with an anointed word of power, wisdom, and divine encouragement delivered every morning by Pastor Devadas Garu.
          </p>
        </div>
      </section>

      {/* Main Latest Daily Message Player */}
      <section className="w-full bg-zinc-950 relative">
        <div className="w-full mx-auto max-w-6xl md:py-8 md:px-4">
          <div className="relative overflow-hidden aspect-video w-full bg-zinc-950 md:rounded-3xl border border-zinc-800 shadow-2xl flex items-center justify-center">
            
            {!loading && mainVideoId ? (
              <iframe
                src={`https://www.youtube.com/embed/${mainVideoId}?autoplay=0&mute=0&rel=0`}
                title="Latest Morning Devotional Message"
                className="absolute inset-0 w-full h-full border-0 z-10"
                allowFullScreen
              />
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 text-center px-6 py-12">
                <div className="w-12 h-12 rounded-full border-4 border-amber-500 border-t-transparent animate-spin" />
                <p className="text-white font-bold text-base tracking-wide uppercase">Verifying Latest Devotional Stream Elements...</p>
                <p className="text-zinc-500 text-xs">Connecting securely to YouTube Data automation servers.</p>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* Corporate Credit Line */}
      <div className="w-full bg-zinc-950 border-y border-zinc-900 py-4 overflow-hidden relative flex select-none">
        <div className="flex whitespace-nowrap w-max shrink-0 animate-[marquee_30s_linear_infinite] gap-12 text-white font-sans text-[11px] font-black tracking-[0.2em] uppercase justify-around items-center pr-12">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 shrink-0">
              <span>POWERED BY</span>
              <div className="relative w-3.5 h-3.5 bg-white rounded-full p-0.5">
                <Image src="/pjlogo.png" alt="Company Logo" fill className="object-contain p-0.5" />
              </div>
              <span>P & J TECHNOLOGIES</span>
              <span className="text-amber-500 font-normal pl-4">🌅</span>
            </div>
          ))}
        </div>
      </div>

      {/* Devotional Video Grid List */}
      <main className="max-w-7xl mx-auto px-5 sm:px-8 mt-16 space-y-16">
        <div className="space-y-10">
          <div className="text-center space-y-2">
            <span className="text-[11px] font-bold tracking-[0.2em] text-amber-600 uppercase bg-amber-50 border border-amber-100 px-3 py-1 rounded-md">
              DEVOTIONAL ARCHIVES
            </span>
            <h3 className="text-3xl font-black text-zinc-950 tracking-tight sm:text-4xl">
              Recent Morning Messages
            </h3>
            <div className="mx-auto h-[3px] w-12 bg-amber-500 rounded-full mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 🚀 THE VISUAL ORDER SAFEGUARD: Maps items sequentially as delivered by the sorted API */}
            {pastVideosList && pastVideosList.length > 0 ? (
              pastVideosList.map((video) => (
                <ScrollReveal key={video.id}>
                  <div className="rounded-3xl border border-zinc-200/90 bg-white p-4 shadow-xl shadow-zinc-100/50 flex flex-col h-full group">
                    <div className="relative overflow-hidden aspect-video w-full rounded-2xl bg-zinc-950 border border-zinc-100 mb-4 shrink-0">
                      <iframe 
                        src={video.url} 
                        title={video.title} 
                        className="absolute inset-0 w-full h-full border-0 z-10" 
                        allowFullScreen 
                      />
                    </div>
                    <div className="flex flex-col justify-between flex-1 space-y-3 pt-1 px-1">
                      <div className="space-y-2">
                        <span className="inline-flex text-[9px] font-extrabold text-amber-700 tracking-wider bg-amber-50 border border-amber-200/60 rounded px-2 py-0.5 uppercase">
                          {video.tag}
                        </span>
                        <h4 className="text-base sm:text-lg font-black text-zinc-950 tracking-tight leading-snug line-clamp-2 uppercase">
                          {video.title}
                        </h4>
                      </div>
                      <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-[11px] font-bold text-zinc-400 tracking-wider uppercase">
                        <span>MORNING DEVOTIONAL</span>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))
            ) : (
              // Stable layout filler row if network arrays load slowly
              [...Array(3)].map((_, idx) => (
                <div key={idx} className="animate-pulse rounded-3xl bg-zinc-100 h-64 border border-zinc-200" />
              ))
            )}
          </div>
        </div>
      </main>

      <style jsx global>{`
        @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-100%); } }
      `}</style>
    </div>
  )
}