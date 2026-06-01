import { readFile, rm, writeFile } from 'fs/promises'
import path from 'path'
import { NextResponse } from 'next/server'
import type { MediaItem } from '../route'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const DATA_FILE = path.join(process.cwd(), 'data', 'media.json')
const PUBLIC_ROOT = path.join(process.cwd(), 'public')

async function readMedia(): Promise<MediaItem[]> {
  try {
    const raw = await readFile(DATA_FILE, 'utf8')
    return JSON.parse(raw) as MediaItem[]
  } catch {
    return []
  }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const items = await readMedia()
  const item = items.find((entry) => entry.id === params.id)

  if (!item) {
    return NextResponse.json({ error: 'Image not found.' }, { status: 404 })
  }

  const nextItems = items.filter((entry) => entry.id !== params.id)
  const filePath = path.normalize(path.join(PUBLIC_ROOT, item.src))

  if (filePath.startsWith(PUBLIC_ROOT)) {
    await rm(filePath, { force: true })
  }

  await writeFile(DATA_FILE, JSON.stringify(nextItems, null, 2), 'utf8')
  return NextResponse.json({ ok: true })
}
