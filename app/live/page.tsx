'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ScrollReveal from '@/components/ScrollReveal'

type BroadcastItem = {
  loc: string
  day: string
  time: string
  type: string
  hot: boolean
  badgeBg: string
}

type PastVideoData = {
  id: string
  url: string
  title: string
  tag: string
}

const broadcastSchedule: BroadcastItem[] = [
  { loc: 'Hanuman Junction Church', day: 'SUNDAY', time: '10:00 AM – 1:00 PM', type: 'Main Worship Service', hot: true, badgeBg: 'bg-red-600 text-white border-transparent' },
  { loc: 'Nuzvid Church', day: 'SUNDAY', time: '8:00 AM – 10:00 AM', type: 'Worship Service', hot: false, badgeBg: 'bg-blue-600 text-white border-transparent' },
  { loc: 'Hanuman Junction Church', day: 'WEDNESDAY', time: '12:00 PM – 3:00 PM', type: "Women's Prayer", hot: false, badgeBg: 'bg-zinc-50 text-zinc-700 border-zinc-200' },
  { loc: 'Nuzvid Church', day: 'WEDNESDAY', time: '12:00 PM – 2:00 PM', type: 'Micro Service', hot: false, badgeBg: 'bg-zinc-50 text-zinc-700 border-zinc-200' },
  { loc: 'Hanuman Junction Church', day: 'SATURDAY', time: '7:00 PM – 9:00 PM', type: 'Fasting Prayer', hot: false, badgeBg: 'bg-zinc-50 text-zinc-700 border-zinc-200' },
  { loc: 'Nuzvid Church', day: 'FRIDAY', time: '10:00 AM – 2:00 PM', type: 'Healing Prayer', hot: false, badgeBg: 'bg-zinc-50 text-zinc-700 border-zinc-200' },
]

export default function LivePage() {
  const [mainVideoId, setMainVideoId] = useState<string>('')
  const [pastVideosList, setPastVideosList] = useState<PastVideoData[]>([])
  const [currentLiveStatus, setCurrentLiveStatus] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function fetchLatestMediaAutomation() {
      try {
        const response = await fetch('/api/live-status')
        const data = await response.json()
        
        setCurrentLiveStatus(data.isLive || false)
        if (data.mainVideoId) setMainVideoId(data.mainVideoId)

        if (data.pastVideos && data.pastVideos.length > 0) {
          const formatted = data.pastVideos.map((vid: any, index: number) => ({
            id: vid.id,
            url: `https://www.youtube.com/embed/${vid.id}?rel=0`,
            title: vid.title,
            tag: index === 0 ? 'SUNDAY SERVICE' : index === 1 ? 'MIDWEEK LIVE' : 'SPECIAL MEETING'
          }))
          setPastVideosList(formatted)
        }
      } catch (err) {
        console.error('Automation bridge offline, loading default fallbacks.')
      } finally {
        setLoading(false)
      }
    }
    fetchLatestMediaAutomation()
  }, [])

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 selection:bg-red-600/10 pb-24 font-sans">
      
      {/* Hero Header Presentation */}
      <section className="relative pt-36 pb-16 bg-white border-b border-zinc-100 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-red-600 rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 text-center space-y-4">
          <div className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-[11px] font-bold tracking-widest uppercase ${
            currentLiveStatus ? 'bg-red-50 border-red-200 text-red-600' : 'bg-zinc-100 border-zinc-200 text-zinc-500'
          }`}>
            <span className={`h-1.5 w-1.5 rounded-full ${currentLiveStatus ? 'bg-red-500 animate-pulse' : 'bg-zinc-400'}`} /> 
            {currentLiveStatus ? 'BROADCAST ACTIVE NOW' : 'PREVIOUS LIVE STREAM ARCHIVE'}
          </div>

          <h1 className="text-4xl font-black tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
            Watch <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-amber-500">Broadcasts Live</span>
          </h1>

          <div className="mx-auto h-[3px] w-14 bg-gradient-to-r from-red-600 via-amber-500 to-blue-600 rounded-full" />
          <p className="mx-auto max-w-xl text-zinc-500 text-sm font-medium leading-relaxed">
            Join thousands of global partners in real-time intercession, prophetic worship, and divine alignment.
          </p>
        </div>
      </section>

      {/* Main Hero Video Screen */}
      <section className="w-full bg-zinc-950 relative">
        <div className="w-full mx-auto">
          <div className="relative overflow-hidden aspect-video w-full bg-zinc-950 rounded-none shadow-2xl flex items-center justify-center">
            {!loading && mainVideoId ? (
              <iframe
                src={`https://www.youtube.com/embed/${mainVideoId}?autoplay=0&mute=0&rel=0`}
                title="Hosanna Church Live Stream Presentation"
                className="absolute inset-0 w-full h-full border-0 z-10"
                allowFullScreen
              />
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 text-center py-12">
                <div className="w-10 h-10 rounded-full border-4 border-red-600 border-t-transparent animate-spin" />
                <p className="text-white font-bold text-xs tracking-wider uppercase">Loading Sanctuary Stream Coordinates...</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Rolling Text Ticker Box */}
      <div className="w-full bg-zinc-950 border-y border-zinc-900 py-4 overflow-hidden relative flex select-none">
        <div className="flex whitespace-nowrap w-max shrink-0 animate-[marquee_30s_linear_infinite] gap-12 text-white font-sans text-[11px] font-black tracking-[0.2em] uppercase justify-around items-center pr-12">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 shrink-0">
              <span>POWERED BY</span>
              <div className="relative w-3.5 h-3.5 bg-white rounded-full p-0.5">
                <Image src="/pjlogo.png" alt="Company Logo" fill className="object-contain p-0.5" />
              </div>
              <span>P & J TECHNOLOGIES</span>
              <span className="text-red-500 font-normal pl-4">✝</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Container Core Layout */}
      <main className="max-w-7xl mx-auto px-5 sm:px-8 mt-16 space-y-20">
        
        {/* Urgent Note Banner */}
        <ScrollReveal>
          <div className="w-full bg-amber-50 border border-amber-200/80 rounded-2xl p-5 text-center shadow-sm">
            <p className="font-sans font-black text-xs sm:text-sm text-amber-950 tracking-wider uppercase">
              ⚠️ NOTE: DURING ANY MEETINGS LIVE WILL BE UPDATED AUTOMATICALLY
            </p>
          </div>
        </ScrollReveal>

        {/* Previous Live History Grid Shelf Area */}
        <div className="space-y-10">
          <div className="text-center space-y-2">
            <span className="text-[11px] font-bold tracking-[0.2em] text-red-600 uppercase bg-red-50 border border-red-100 px-3 py-1 rounded-md">
              RECENT MEDIA VAULT
            </span>
            <h3 className="text-3xl font-black text-zinc-950 tracking-tight sm:text-4xl">
              Previous Live Broadcasts
            </h3>
            <div className="mx-auto h-[3px] w-12 bg-red-600 rounded-full mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pastVideosList && pastVideosList.length > 0 ? (
              pastVideosList.map((video) => (
                <ScrollReveal key={video.id}>
                  <div className="rounded-3xl border border-zinc-200/60 bg-white p-4 shadow-xl shadow-zinc-200/30 flex flex-col h-full group transition-all duration-300 hover:shadow-2xl">
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
                        <span className="inline-flex text-[9px] font-extrabold text-red-600 tracking-wider bg-red-50 border border-red-100/60 rounded px-2 py-0.5 uppercase">
                          {video.tag}
                        </span>
                        <h4 className="text-base sm:text-lg font-black text-zinc-950 tracking-tight leading-snug uppercase group-hover:text-red-600 transition-colors duration-200 line-clamp-2">
                          {video.title}
                        </h4>
                      </div>
                      <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-[11px] font-bold text-zinc-400 tracking-wider uppercase">
                        <span>CHURCH BROADCAST</span>
                        <span className="text-zinc-300">✝</span>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))
            ) : (
              [...Array(3)].map((_, idx) => (
                <div key={idx} className="animate-pulse rounded-3xl bg-zinc-200/60 h-60 border border-zinc-200" />
              ))
            )}
          </div>
        </div>

        {/* Weekly Broadcast Timetable Schedule Section */}
        <div className="space-y-8 pt-2">
          <div className="text-center space-y-2">
            <span className="text-[11px] font-bold tracking-[0.2em] text-blue-600 uppercase bg-blue-50 border border-blue-100 px-3 py-1 rounded-md">
              TIMETABLE SCHEDULE
            </span>
            <h3 className="text-3xl font-black text-zinc-950 tracking-tight">Weekly Broadcast Timeline</h3>
            <div className="mx-auto h-[3px] w-12 bg-blue-600 rounded-full mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {broadcastSchedule.map((s, idx) => (
              <ScrollReveal key={s.day + s.loc + idx}>
                <div className={`relative bg-white rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between h-full group hover:-translate-y-1 hover:shadow-2xl ${
                  s.hot 
                    ? 'border-red-500/40 shadow-xl shadow-red-500/5 ring-1 ring-red-500/10' 
                    : 'border-zinc-200/70 shadow-lg shadow-zinc-200/40 hover:border-zinc-300'
                }`}>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`text-[11px] font-black tracking-widest px-2.5 py-1 rounded-lg uppercase ${
                          s.hot ? 'bg-red-600 text-white' : 'bg-zinc-900 text-white'
                        }`}>
                          {s.day}
                        </span>
                        {s.hot && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 border border-red-100 px-2 py-0.5 text-[9px] font-bold tracking-wider text-red-600 uppercase">
                            <span className="h-1 w-1 rounded-full bg-red-500 animate-ping" />
                            Live Hub
                          </span>
                        )}
                      </div>
                      
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider border ${s.badgeBg}`}>
                        {s.hot ? 'Primary Hub' : 'Worship Sync'}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-xl font-black tracking-tight text-zinc-900 leading-snug group-hover:text-blue-600 transition-colors duration-200">
                        {s.type}
                      </h4>
                      <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1">
                        <span>📍</span> {s.loc}
                      </p>
                    </div>
                  </div>

                  <div className={`mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between ${
                    s.hot ? 'text-red-600' : 'text-zinc-700'
                  }`}>
                    <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase">TIMEFRAME</span>
                    <p className="text-base font-black font-mono tracking-tight">{s.time}</p>
                  </div>

                </div>
              </ScrollReveal>
            ))}
          </div>
          
          <div className="text-center pt-8">
            <Link 
              href="/prayer" 
              className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-950 px-8 font-sans text-[11px] font-black uppercase tracking-[0.2em] text-white transition-all hover:bg-zinc-900 shadow-xl hover:-translate-y-0.5 duration-200"
            >
              🙏 Submit Prayer Request During Service
            </Link>
          </div>
        </div>

      </main>

      <style jsx global>{`
        @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-100%); } }
      `}</style>
    </div>
  )
}