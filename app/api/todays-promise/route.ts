import { randomUUID } from 'crypto'
import { mkdir, readFile, writeFile, unlink } from 'fs/promises'
import path from 'path'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export type PromiseItem = {
  id: string
  src: string
  fileName: string
  caption: string
  uploadedAt: string
}

const DATA_FILE = path.join(process.cwd(), 'data', 'promises.json')
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads', 'promises')
const MAX_PROMISES = 7

async function readPromises(): Promise<PromiseItem[]> {
  try {
    const raw = await readFile(DATA_FILE, 'utf8')
    return JSON.parse(raw) as PromiseItem[]
  } catch {
    return []
  }
}

async function writePromises(items: PromiseItem[]) {
  await mkdir(path.dirname(DATA_FILE), { recursive: true })
  await writeFile(DATA_FILE, JSON.stringify(items, null, 2), 'utf8')
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
    const fileName = `${id}.webp`
    const filePath = path.join(UPLOAD_DIR, fileName)

    await mkdir(UPLOAD_DIR, { recursive: true })
    await writeFile(filePath, buffer)

    const item: PromiseItem = {
      id,
      src: `/uploads/promises/${fileName}`,
      fileName,
      caption,
      uploadedAt: new Date().toISOString(),
    }

    const items = await readPromises()
    const sorted = [item, ...items].sort(
      (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    )

    // Rolling window: remove oldest beyond MAX_PROMISES
    const toKeep = sorted.slice(0, MAX_PROMISES)
    const toRemove = sorted.slice(MAX_PROMISES)

    for (const old of toRemove) {
      try {
        await unlink(path.join(UPLOAD_DIR, old.fileName))
      } catch {}
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
  const { id } = await request.json()
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })

  const items = await readPromises()
  const target = items.find((i) => i.id === id)
  if (!target) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  try {
    await unlink(path.join(UPLOAD_DIR, target.fileName))
  } catch {}

  await writePromises(items.filter((i) => i.id !== id))
  return NextResponse.json({ ok: true })
}
