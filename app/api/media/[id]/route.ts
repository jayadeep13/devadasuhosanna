import { mkdir, readFile, rm, writeFile } from 'fs/promises'
import path from 'path'
import { NextResponse } from 'next/server'
import type { MediaItem } from '../route'
import { blobDeleteItem } from '../route'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const USE_BLOB  = !!process.env.BLOB_READ_WRITE_TOKEN
const DATA_FILE = path.join(process.cwd(), 'data', 'media.json')

async function localRead(): Promise<MediaItem[]> {
  try { return JSON.parse(await readFile(DATA_FILE, 'utf8')) } catch { return [] }
}
async function localWrite(items: MediaItem[]) {
  await mkdir(path.dirname(DATA_FILE), { recursive: true })
  await writeFile(DATA_FILE, JSON.stringify(items, null, 2), 'utf8')
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  try {
    if (USE_BLOB) {
      const { list } = await import('@vercel/blob')
      const { blobs } = await list({ prefix: `hosanna/media-meta/${params.id}.json` })
      if (blobs.length === 0) return NextResponse.json({ error: 'Image not found.' }, { status: 404 })
      const res  = await fetch(blobs[0].url + '?t=' + Date.now())
      const item = (await res.json()) as MediaItem
      await blobDeleteItem(item)
    } else {
      const items = await localRead()
      const item  = items.find(e => e.id === params.id)
      if (!item) return NextResponse.json({ error: 'Image not found.' }, { status: 404 })
      if (item.fileName) {
        const fp = path.join(process.cwd(), 'public', 'uploads', item.category, item.fileName)
        try { await rm(fp, { force: true }) } catch {}
      }
      await localWrite(items.filter(e => e.id !== params.id))
    }
    return NextResponse.json({ ok: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[media DELETE]', err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}