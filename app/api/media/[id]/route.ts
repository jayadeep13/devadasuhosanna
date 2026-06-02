import { del, list, put } from '@vercel/blob'
import { NextResponse } from 'next/server'
import type { MediaItem } from '../route'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const META_KEY = 'hosanna/metadata/media.json'

async function readMedia(): Promise<MediaItem[]> {
  try {
    const { blobs } = await list({ prefix: META_KEY })
    if (blobs.length === 0) return []
    const res = await fetch(blobs[0].url, { cache: 'no-store' })
    return (await res.json()) as MediaItem[]
  } catch {
    return []
  }
}

async function writeMedia(items: MediaItem[]) {
  await put(META_KEY, JSON.stringify(items, null, 2), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
  })
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  try {
    const items = await readMedia()
    const item = items.find((entry) => entry.id === params.id)

    if (!item) {
      return NextResponse.json({ error: 'Image not found.' }, { status: 404 })
    }

    try { await del(item.src) } catch {}

    await writeMedia(items.filter((entry) => entry.id !== params.id))
    return NextResponse.json({ ok: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[media DELETE]', err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}