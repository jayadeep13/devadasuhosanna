import { NextResponse } from 'next/server'

const CHANNEL_ID = 'UCZuibMo8JKmAsIfIT6QFY9Q'
const PLAYLIST_ID = 'UUZuibMo8JKmAsIfIT6QFY9Q'
const API_KEY = process.env.YOUTUBE_API_KEY 

export async function GET() {
  try {
    if (!API_KEY) return getLiveFallback()

    // 1. Radar check to see if the church is actively broadcasting live right now
    const liveCheck = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&type=video&eventType=live&key=${API_KEY}`,
      { next: { revalidate: 60 } }
    )
    const liveData = await liveCheck.json()

    // 2. Fetch recent uploads to extract the previous live stream archives
    const archiveCheck = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${PLAYLIST_ID}&maxResults=35&key=${API_KEY}`,
      { next: { revalidate: 300 } }
    )
    const archiveData = await archiveCheck.json()

    const blockedIds = ['GDPg7B28BbQ', 'f6Tq7gXW-9s', 'Ew_8NWe6gIs']
    let allLiveServices: { id: string; title: string; publishedAt: string }[] = []

    if (archiveData.items && archiveData.items.length > 0) {
      allLiveServices = archiveData.items
        .map((item: any) => ({
          id: item.snippet?.resourceId?.videoId,
          title: item.snippet?.title || 'Church Live Service',
          publishedAt: item.snippet?.publishedAt || ''
        }))
        .filter((v: any) => {
          return (
            v.id && 
            v.title && 
            !blockedIds.includes(v.id) &&
            // 🚀 EXCLUSIVE FILTER: Skips morning devotionals, only accepts main services or fasting prayers
            !v.title.includes("ఉదయకాల") && 
            !v.title.includes("దైవసందేశం")
          )
        })

      // Force chronological ordering (Newest full services first)
      allLiveServices.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    }

    // Fallback protection array if YouTube fails
    if (allLiveServices.length === 0) {
      return getLiveFallback()
    }

    // 🔴 SCENARIO A: Channel is actively LIVE right now
    if (liveData.items && liveData.items.length > 0) {
      return NextResponse.json({
        isLive: true,
        mainVideoId: liveData.items[0].id.videoId, // Active Live stream video string
        pastVideos: allLiveServices.slice(0, 3) // Top 3 previous services below
      })
    }

    // ⚪ SCENARIO B: Channel is OFFLINE (Standard Loop Mode)
    return NextResponse.json({
      isLive: false,
      mainVideoId: allLiveServices[0].id, // Most recent previous live service goes to main player
      pastVideos: allLiveServices.slice(1, 4) // Next 3 consecutive services render in order below
    })

  } catch (error) {
    return getLiveFallback()
  }
}

function getLiveFallback() {
  return NextResponse.json({
    isLive: false,
    mainVideoId: 'lhlqulI05Dc',
    pastVideos: [
      { id: 'lhlqulI05Dc', title: 'Sunday Worship Service Gathering' },
      { id: 'v8_WfubN_gM', title: 'Friday Fasting Prayer Service' },
      { id: 'lhlqulI05Dc', title: 'Weekly Live Prayer Gathering' }
    ]
  })
}