import { del, list, put } from '@vercel/blob'
import { randomUUID } from 'crypto'
import { mkdir, readFile, unlink, writeFile } from 'fs/promises'
import path from 'path'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export type PromiseItem = {
  id: string
  src: string
  caption: string
  uploadedAt: string
  fileName?: string
}

const USE_BLOB    = !!process.env.BLOB_READ_WRITE_TOKEN
const DATA_FILE   = path.join(process.cwd(), 'data', 'promises.json')
const UPLOAD_DIR  = path.join(process.cwd(), 'public', 'uploads', 'promises')
const MAX_PROMISES = 7
const META_PFX    = 'hosanna/promises-meta/'
const IMG_PFX     = 'hosanna/promises-img/'

// ── local helpers ─────────────────────────────────────────────────────────────
async function localRead(): Promise<PromiseItem[]> {
  try { return JSON.parse(await readFile(DATA_FILE, 'utf8')) } catch { return [] }
}
async function localWrite(items: PromiseItem[]) {
  await mkdir(path.dirname(DATA_FILE), { recursive: true })
  await writeFile(DATA_FILE, JSON.stringify(items, null, 2), 'utf8')
}

// ── Vercel Blob helpers (per-item blobs, no shared JSON to overwrite) ─────────
async function blobReadAll(): Promise<PromiseItem[]> {
  const { blobs } = await list({ prefix: META_PFX })
  if (blobs.length === 0) return []
  const results = await Promise.all(
    blobs.map(async (b) => {
      try {
        const r = await fetch(`${b.url}?t=${Date.now()}`)
        return (await r.json()) as PromiseItem
      } catch { return null }
    })
  )
  return results.filter((x): x is PromiseItem => x !== null)
}

async function blobWriteItem(item: PromiseItem) {
  await put(`${META_PFX}${item.id}.json`, JSON.stringify(item), {
    access: 'public', contentType: 'application/json', addRandomSuffix: false,
  })
}

async function blobDeleteItem(item: PromiseItem) {
  try { await del(item.src) } catch {}
  const { blobs } = await list({ prefix: `${META_PFX}${item.id}.json` })
  for (const b of blobs) { try { await del(b.url) } catch {} }
}

// ── GET ───────────────────────────────────────────────────────────────────────
export async function GET() {
  try {
    const items = USE_BLOB ? await blobReadAll() : await localRead()
    const sorted = [...items].sort(
      (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    )
    return NextResponse.json({ promises: sorted })
  } catch (err) {
    console.error('[promise GET]', err)
    return NextResponse.json({ promises: [] })
  }
}

// ── POST ──────────────────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file     = formData.get('file')
    const caption  = String(formData.get('caption') || '').trim()

    if (!(file instanceof File))
      return NextResponse.json({ error: 'Image file is required.' }, { status: 400 })

    const buffer   = Buffer.from(await file.arrayBuffer())
    const id       = randomUUID()
    let src        = ''
    let fileName: string | undefined

    if (USE_BLOB) {
      const result = await put(`${IMG_PFX}${id}.webp`, buffer, {
        access: 'public', contentType: 'image/webp', addRandomSuffix: false,
      })
      src = result.url
    } else {
      fileName = `${id}.webp`
      await mkdir(UPLOAD_DIR, { recursive: true })
      await writeFile(path.join(UPLOAD_DIR, fileName), buffer)
      src = `/uploads/promises/${fileName}`
    }

    const item: PromiseItem = { id, src, fileName, caption, uploadedAt: new Date().toISOString() }

    if (USE_BLOB) {
      await blobWriteItem(item)
      const all    = await blobReadAll()
      const sorted = all.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
      for (const old of sorted.slice(MAX_PROMISES)) { await blobDeleteItem(old) }
    } else {
      const existing = await localRead()
      const sorted   = [item, ...existing].sort(
        (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
      )
      for (const old of sorted.slice(MAX_PROMISES)) {
        if (old.fileName) try { await unlink(path.join(UPLOAD_DIR, old.fileName)) } catch {}
      }
      await localWrite(sorted.slice(0, MAX_PROMISES))
    }

    return NextResponse.json({ promise: item }, { status: 201 })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[promise POST]', err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// ── DELETE ────────────────────────────────────────────────────────────────────
export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })

    if (USE_BLOB) {
      const all    = await blobReadAll()
      const target = all.find(i => i.id === id)
      if (!target) return NextResponse.json({ error: 'Not found' }, { status: 404 })
      await blobDeleteItem(target)
    } else {
      const items  = await localRead()
      const target = items.find(i => i.id === id)
      if (!target) return NextResponse.json({ error: 'Not found' }, { status: 404 })
      if (target.fileName) try { await unlink(path.join(UPLOAD_DIR, target.fileName)) } catch {}
      await localWrite(items.filter(i => i.id !== id))
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[promise DELETE]', err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}