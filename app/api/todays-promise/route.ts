import { del, list, put } from '@vercel/blob'
import { randomUUID } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export type PromiseItem = {
  id: string
  src: string        // full Vercel Blob URL
  caption: string
  uploadedAt: string
}

const META_KEY = 'hosanna/metadata/promises.json'
const IMG_PREFIX = 'hosanna/promises/'
const MAX_PROMISES = 7

async function readPromises(): Promise<PromiseItem[]> {
  try {
    const { blobs } = await list({ prefix: META_KEY })
    if (blobs.length === 0) return []
    const res = await fetch(blobs[0].url, { cache: 'no-store' })
    return (await res.json()) as PromiseItem[]
  } catch {
    return []
  }
}

async function writePromises(items: PromiseItem[]) {
  await put(META_KEY, JSON.stringify(items, null, 2), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
  })
}

export async function GET() {
  const items = await readPromises()
  const sorted = [...items].sort(
    (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
  )
  return NextResponse.json({ promises: sorted })
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file')
    const caption = String(formData.get('caption') || '').trim()

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Image file is required.' }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const id = randomUUID()

    const { url } = await put(`${IMG_PREFIX}${id}.webp`, buffer, {
      access: 'public',
      contentType: 'image/webp',
      addRandomSuffix: false,
    })

    const item: PromiseItem = {
      id,
      src: url,
      caption,
      uploadedAt: new Date().toISOString(),
    }

    const items = await readPromises()
    const sorted = [item, ...items].sort(
      (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    )

    const toKeep = sorted.slice(0, MAX_PROMISES)
    const toRemove = sorted.slice(MAX_PROMISES)

    for (const old of toRemove) {
      try { await del(old.src) } catch {}
    }

    await writePromises(toKeep)
    return NextResponse.json({ promise: item }, { status: 201 })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[todays-promise POST]', err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })

    const items = await readPromises()
    const target = items.find((i) => i.id === id)
    if (!target) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    try { await del(target.src) } catch {}

    await writePromises(items.filter((i) => i.id !== id))
    return NextResponse.json({ ok: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[todays-promise DELETE]', err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}