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
  fileName: string
  createdAt: string
}

const DATA_FILE = path.join(process.cwd(), 'data', 'media.json')
const UPLOAD_ROOT = path.join(process.cwd(), 'public', 'uploads')

async function readMedia(): Promise<MediaItem[]> {
  try {
    const raw = await readFile(DATA_FILE, 'utf8')
    return JSON.parse(raw) as MediaItem[]
  } catch {
    return []
  }
}

async function writeMedia(items: MediaItem[]) {
  await mkdir(path.dirname(DATA_FILE), { recursive: true })
  await writeFile(DATA_FILE, JSON.stringify(items, null, 2), 'utf8')
}

function isCategory(value: FormDataEntryValue | null): value is MediaCategory {
  return value === 'gallery' || value === 'updates'
}

export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get('category')
  const subcategory = request.nextUrl.searchParams.get('subcategory')
  const items = await readMedia()
  let filtered = category === 'gallery' || category === 'updates'
    ? items.filter((item) => item.category === category)
    : items

  if (subcategory && subcategory !== 'all') {
    filtered = filtered.filter((item) => item.subcategory === subcategory)
  }

  return NextResponse.json({ items: filtered.sort((a, b) => b.createdAt.localeCompare(a.createdAt)) })
}

export async function POST(request: NextRequest) {
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
  const fileName = `${id}.webp`
  const uploadDir = path.join(UPLOAD_ROOT, category)
  const filePath = path.join(uploadDir, fileName)

  await mkdir(uploadDir, { recursive: true })
  await writeFile(filePath, buffer)

  const rawSubcategory = String(formData.get('subcategory') || '').trim()
  const item: MediaItem = {
    id,
    category,
    subcategory: rawSubcategory || undefined,
    title: String(formData.get('title') || '').trim() || 'Hosanna Update',
    description: String(formData.get('description') || '').trim(),
    src: `/uploads/${category}/${fileName}`,
    fileName,
    createdAt: new Date().toISOString(),
  }

  const items = await readMedia()
  items.push(item)
  await writeMedia(items)

  return NextResponse.json({ item }, { status: 201 })
}
