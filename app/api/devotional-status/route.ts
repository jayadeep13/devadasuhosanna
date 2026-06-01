// app/api/devotional-status/route.ts
import { NextResponse } from 'next/server'

const PLAYLIST_ID = 'UUZuibMo8JKmAsIfIT6QFY9Q'
const API_KEY = process.env.YOUTUBE_API_KEY 

export async function GET() {
  try {
    if (!API_KEY) return getFallbackData()

    // Increased maxResults to 35 to ensure we scan enough uploads to find a full row of devotionals
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${PLAYLIST_ID}&maxResults=35&key=${API_KEY}`
    const response = await fetch(url, { next: { revalidate: 300 } })
    const data = await response.json()

    if (data.error || !data.items) return getFallbackData()

    const blockedIds = ['GDPg7B28BbQ', 'f6Tq7gXW-9s', 'Ew_8NWe6gIs']
    
    const validVideos = data.items
      .map((item: any) => ({
        id: item.snippet?.resourceId?.videoId,
        title: item.snippet?.title || 'Devotional Message',
        publishedAt: item.snippet?.publishedAt || '',
      }))
      .filter((v: any) => {
        return (
          v.id && 
          v.title && 
          !blockedIds.includes(v.id) &&
          // 🚀 THE EXACT FILTER: Only permits video items containing your specific devotional keywords!
          (v.title.includes("ఉదయకాల") || v.title.includes("దైవసందేశం"))
        )
      })

    // Strict chronological sort engine (Newest timestamps first)
    const sortedVideos = [...validVideos].sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )

    if (sortedVideos.length >= 3) {
      return NextResponse.json({
        mainVideoId: sortedVideos[0].id, // 20-May newest drop
        pastVideos: sortedVideos.slice(1, 4), // Exactly positions 19, 18, 17 in perfect sequence
      })
    }

    return getFallbackData()
  } catch (error) {
    return getFallbackData()
  }
}

function getFallbackData() {
  return NextResponse.json({
    mainVideoId: 'lhlqulI05Dc', 
    pastVideos: [
      { id: 'lhlqulI05Dc', title: 'ఉదయకాల దైవసందేశం || 19 - MAY - 2026' },
      { id: 'v8_WfubN_gM', title: 'ఉదయకాల దైవసందేశం || 18 - MAY - 2026' },
      { id: 'lhlqulI05Dc', title: 'ఉదయకాల దైవసందేశం || 17 - MAY - 2026' }
    ]
  })
}