import { list, put } from '@vercel/blob'
import { randomUUID } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type MediaCategory = 'gallery' | 'updates'

export type MediaItem = {
  id: string
  category: MediaCategory
  subcategory?: string
  title: string
  description: string
  src: string        // full Vercel Blob URL
  createdAt: string
}

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

function isCategory(value: FormDataEntryValue | null): value is MediaCategory {
  return value === 'gallery' || value === 'updates'
}

export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get('category')
  const subcategory = request.nextUrl.searchParams.get('subcategory')
  const items = await readMedia()

  let filtered =
    category === 'gallery' || category === 'updates'
      ? items.filter((item) => item.category === category)
      : items

  if (subcategory && subcategory !== 'all') {
    filtered = filtered.filter((item) => item.subcategory === subcategory)
  }

  return NextResponse.json({
    items: filtered.sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
  })
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const category = formData.get('category')
    const file = formData.get('file')

    if (!isCategory(category)) {
      return NextResponse.json({ error: 'Invalid media category.' }, { status: 400 })
    }

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Image file is required.' }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const id = randomUUID()

    const { url } = await put(`hosanna/${category}/${id}.webp`, buffer, {
      access: 'public',
      contentType: 'image/webp',
      addRandomSuffix: false,
    })

    const rawSubcategory = String(formData.get('subcategory') || '').trim()
    const item: MediaItem = {
      id,
      category,
      subcategory: rawSubcategory || undefined,
      title: String(formData.get('title') || '').trim() || 'Hosanna Update',
      description: String(formData.get('description') || '').trim(),
      src: url,
      createdAt: new Date().toISOString(),
    }

    const items = await readMedia()
    items.push(item)
    await writeMedia(items)

    return NextResponse.json({ item }, { status: 201 })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[media POST]', err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}