import { list, put } from '@vercel/blob'
import { randomUUID } from 'crypto'
import { mkdir, readFile, writeFile } from 'fs/promises'
import path from 'path'
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
  src: string
  fileName?: string
  createdAt: string
}

const USE_BLOB    = !!process.env.BLOB_READ_WRITE_TOKEN
const DATA_FILE   = path.join(process.cwd(), 'data', 'media.json')
const UPLOAD_ROOT = path.join(process.cwd(), 'public', 'uploads')
const META_PFX    = 'hosanna/media-meta/'

// ── local helpers ─────────────────────────────────────────────────────────────
async function localRead(): Promise<MediaItem[]> {
  try { return JSON.parse(await readFile(DATA_FILE, 'utf8')) } catch { return [] }
}
async function localWrite(items: MediaItem[]) {
  await mkdir(path.dirname(DATA_FILE), { recursive: true })
  await writeFile(DATA_FILE, JSON.stringify(items, null, 2), 'utf8')
}

// ── Vercel Blob helpers (per-item blobs, no shared JSON to overwrite) ─────────
async function blobReadAll(): Promise<MediaItem[]> {
  const { blobs } = await list({ prefix: META_PFX })
  if (blobs.length === 0) return []
  const results = await Promise.all(
    blobs.map(async (b) => {
      try {
        const r = await fetch(`${b.url}?t=${Date.now()}`)
        return (await r.json()) as MediaItem
      } catch { return null }
    })
  )
  return results.filter((x): x is MediaItem => x !== null)
}

async function blobWriteItem(item: MediaItem) {
  await put(`${META_PFX}${item.id}.json`, JSON.stringify(item), {
    access: 'public', contentType: 'application/json', addRandomSuffix: false,
  })
}


// ── GET ───────────────────────────────────────────────────────────────────────
export async function GET(request: NextRequest) {
  try {
    const category    = request.nextUrl.searchParams.get('category')
    const subcategory = request.nextUrl.searchParams.get('subcategory')
    const all         = USE_BLOB ? await blobReadAll() : await localRead()

    let filtered = category === 'gallery' || category === 'updates'
      ? all.filter(item => item.category === category)
      : all

    if (subcategory && subcategory !== 'all')
      filtered = filtered.filter(item => item.subcategory === subcategory)

    return NextResponse.json({
      items: filtered.sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    })
  } catch (err) {
    console.error('[media GET]', err)
    return NextResponse.json({ items: [] })
  }
}

// ── POST ──────────────────────────────────────────────────────────────────────
function isCategory(v: FormDataEntryValue | null): v is MediaCategory {
  return v === 'gallery' || v === 'updates'
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const category = formData.get('category')
    const file     = formData.get('file')

    if (!isCategory(category))
      return NextResponse.json({ error: 'Invalid media category.' }, { status: 400 })
    if (!(file instanceof File))
      return NextResponse.json({ error: 'Image file is required.' }, { status: 400 })

    const buffer = Buffer.from(await file.arrayBuffer())
    const id     = randomUUID()
    let src      = ''
    let fileName: string | undefined

    if (USE_BLOB) {
      const result = await put(`hosanna/media-img/${category}/${id}.webp`, buffer, {
        access: 'public', contentType: 'image/webp', addRandomSuffix: false,
      })
      src = result.url
    } else {
      fileName        = `${id}.webp`
      const uploadDir = path.join(UPLOAD_ROOT, category)
      await mkdir(uploadDir, { recursive: true })
      await writeFile(path.join(uploadDir, fileName), buffer)
      src = `/uploads/${category}/${fileName}`
    }

    const rawSub = String(formData.get('subcategory') || '').trim()
    const item: MediaItem = {
      id,
      category,
      subcategory: rawSub || undefined,
      title:       String(formData.get('title') || '').trim() || 'Hosanna Update',
      description: String(formData.get('description') || '').trim(),
      src,
      fileName,
      createdAt: new Date().toISOString(),
    }

    if (USE_BLOB) {
      await blobWriteItem(item)
    } else {
      const items = await localRead()
      items.push(item)
      await localWrite(items)
    }

    return NextResponse.json({ item }, { status: 201 })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[media POST]', err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}