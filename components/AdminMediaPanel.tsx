'use client'

import { useEffect, useMemo, useState } from 'react'

type MainTab = 'updates' | 'gallery' | 'promise'
type Category = 'gallery' | 'updates'

const GALLERY_SUBCATEGORIES = [
  { value: 'all', label: 'All' },
  { value: 'children', label: 'Children' },
  { value: 'gospel-meetings', label: 'Gospel Meetings' },
  { value: 'pastors-meeting', label: 'Pastors Meeting' },
  { value: 'church-construction', label: 'Church Construction' },
  { value: 'others', label: 'Others' },
]

type MediaItem = {
  id: string
  category: Category
  subcategory?: string
  title: string
  description: string
  src: string
  createdAt: string
}

type PromiseItem = {
  id: string
  src: string
  caption: string
  uploadedAt: string
}

async function convertToWebP(file: File): Promise<File> {
  const imageUrl = URL.createObjectURL(file)
  const image = new Image()
  image.src = imageUrl
  await image.decode()

  const canvas = document.createElement('canvas')
  canvas.width = image.naturalWidth
  canvas.height = image.naturalHeight
  const context = canvas.getContext('2d')

  if (!context) throw new Error('Could not prepare image conversion.')
  context.drawImage(image, 0, 0)
  URL.revokeObjectURL(imageUrl)

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((value) => (value ? resolve(value) : reject(new Error('Could not convert image to WebP.'))), 'image/webp', 0.88)
  })

  return new File([blob], file.name.replace(/\.[^.]+$/, '.webp'), { type: 'image/webp' })
}

function shareToWhatsApp(item: MediaItem) {
  const url = new URL(item.src, window.location.origin).toString()
  const message = [item.title, item.description, url].filter(Boolean).join('\n\n')
  window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

// ─── Today's Promise sub-panel ───────────────────────────────────────────────
function PromisePanel() {
  const [promises, setPromises] = useState<PromiseItem[]>([])
  const [caption, setCaption] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState('')

  const load = async () => {
    const r = await fetch('/api/todays-promise', { cache: 'no-store' })
    const d = await r.json()
    setPromises(d.promises || [])
  }

  useEffect(() => { load() }, [])

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) { setMsg('Please choose an image.'); return }
    setBusy(true)
    setMsg('Converting image to WebP...')
    try {
      const webpFile = await convertToWebP(file)
      const formData = new FormData()
      formData.set('file', webpFile)
      formData.set('caption', caption)
      const r = await fetch('/api/todays-promise', { method: 'POST', body: formData })
      if (!r.ok) {
        const body = await r.json().catch(() => ({}))
        throw new Error(body.error || `Upload failed (${r.status}).`)
      }
      setCaption('')
      setFile(null)
      const input = document.getElementById('promise-image-upload') as HTMLInputElement | null
      if (input) input.value = ''
      await load()
      setMsg('Today\'s Promise uploaded successfully!')
    } catch (err) {
      setMsg(err instanceof Error ? err.message : 'Upload failed.')
    } finally {
      setBusy(false)
    }
  }

  const handleDelete = async (item: PromiseItem) => {
    if (!window.confirm('Delete this promise? It will be removed from the Today\'s Promise page.')) return
    setBusy(true)
    try {
      const r = await fetch('/api/todays-promise', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: item.id }) })
      if (!r.ok) throw new Error('Delete failed.')
      await load()
      setMsg('Promise deleted.')
    } catch (err) {
      setMsg(err instanceof Error ? err.message : 'Delete failed.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      {/* Upload form */}
      <form onSubmit={handleUpload} className="mb-12 overflow-hidden rounded-[1.75rem] bg-white shadow-[0_24px_70px_rgba(33,25,20,0.12)]">
        <div className="bg-gradient-to-r from-amber-500 to-red-600 p-8 text-white">
          <p className="font-modern text-xs font-extrabold uppercase tracking-[0.22em] text-white/80">Admin Upload</p>
          <h2 className="mt-2 font-display text-4xl font-black">Upload Today&apos;s Promise</h2>
          <p className="mt-1 font-modern text-sm text-white/70">
            The latest upload becomes today&apos;s featured promise. Oldest is auto-removed after 7 days.
          </p>
        </div>

        <div className="grid gap-5 p-8 lg:grid-cols-2">
          <div className="lg:col-span-2">
            <label className="font-modern text-xs font-extrabold uppercase tracking-[0.18em] text-[#6f5b51] mb-2 block">
              Promise Poster Image *
            </label>
            <input
              id="promise-image-upload"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="premium-input"
            />
          </div>
          <div className="lg:col-span-2">
            <label className="font-modern text-xs font-extrabold uppercase tracking-[0.18em] text-[#6f5b51] mb-2 block">
              Scripture / Caption (optional)
            </label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="e.g. &quot;For I know the plans I have for you...&quot; — Jeremiah 29:11"
              rows={3}
              className="premium-input resize-none w-full"
            />
          </div>
          <button disabled={busy} className="btn-gold rounded-full py-4 disabled:opacity-60 lg:col-span-2">
            {busy ? 'Please wait...' : 'Convert to WebP and Publish'}
          </button>
          {msg && (
            <p className={`font-modern text-sm font-bold lg:col-span-2 ${msg.includes('success') ? 'text-green-600' : 'text-[#e11d48]'}`}>
              {msg}
            </p>
          )}
        </div>
      </form>

      {/* Promise grid */}
      <div className="mb-4">
        <p className="font-modern text-xs font-extrabold uppercase tracking-[0.18em] text-[#6f5b51]">
          Published Promises ({promises.length} / 7)
        </p>
        <p className="mt-1 font-modern text-sm text-[#9f8f87]">
          The top card is today&apos;s featured promise. Oldest entries are auto-removed when a new one is added beyond 7.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {promises.map((item, idx) => (
          <article key={item.id} className="overflow-hidden rounded-[1.5rem] bg-white shadow-[0_18px_45px_rgba(33,25,20,0.12)] relative">
            {idx === 0 && (
              <div className="absolute top-3 left-3 z-10 rounded-full bg-amber-500 px-3 py-1 font-modern text-[10px] font-extrabold uppercase tracking-widest text-white shadow">
                Today
              </div>
            )}
            <div className="aspect-[4/3] bg-zinc-100 overflow-hidden">
              <img src={item.src} alt="Promise" className="h-full w-full object-cover" />
            </div>
            <div className="p-5">
              <p className="font-modern text-[10px] font-extrabold uppercase tracking-widest text-amber-600 mb-2">
                {formatDate(item.uploadedAt)}
              </p>
              {item.caption && (
                <p className="font-modern text-sm font-semibold leading-6 text-[#6f5b51] line-clamp-3">{item.caption}</p>
              )}
              <div className="mt-4">
                <button
                  onClick={() => handleDelete(item)}
                  disabled={busy}
                  className="rounded-full bg-[#211914] px-4 py-2 font-modern text-xs font-extrabold uppercase tracking-[0.12em] text-white disabled:opacity-50"
                >
                  Delete
                </button>
              </div>
            </div>
          </article>
        ))}
        {promises.length === 0 && (
          <p className="col-span-full text-center font-modern text-sm font-semibold text-[#6f5b51] py-10">
            No promises uploaded yet. Upload your first one above.
          </p>
        )}
      </div>
    </div>
  )
}

// ─── Main admin panel ─────────────────────────────────────────────────────────
export default function AdminMediaPanel() {
  const [mainTab, setMainTab] = useState<MainTab>('updates')
  const [category, setCategory] = useState<Category>('updates')
  const [gallerySubcategory, setGallerySubcategory] = useState('children')
  const [viewSubcategory, setViewSubcategory] = useState('all')
  const [items, setItems] = useState<MediaItem[]>([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')

  const currentItems = useMemo(() => {
    const categoryItems = items.filter((item) => item.category === category)
    if (category === 'gallery' && viewSubcategory !== 'all') {
      return categoryItems.filter((item) => item.subcategory === viewSubcategory)
    }
    return categoryItems
  }, [items, category, viewSubcategory])

  const loadItems = async () => {
    const response = await fetch('/api/media', { cache: 'no-store' })
    const data = await response.json()
    setItems(data.items || [])
  }

  useEffect(() => {
    loadItems()
  }, [])

  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!file) {
      setMessage('Please choose an image.')
      return
    }

    setBusy(true)
    setMessage('Converting image to WebP...')

    try {
      const webpFile = await convertToWebP(file)
      const formData = new FormData()
      formData.set('category', category)
      if (category === 'gallery') {
        formData.set('subcategory', gallerySubcategory)
      }
      formData.set('title', title)
      formData.set('description', description)
      formData.set('file', webpFile)

      const response = await fetch('/api/media', { method: 'POST', body: formData })
      if (!response.ok) {
        const body = await response.json().catch(() => ({}))
        throw new Error(body.error || `Upload failed (${response.status}).`)
      }

      setTitle('')
      setDescription('')
      setFile(null)
      const input = document.getElementById('admin-image-upload') as HTMLInputElement | null
      if (input) input.value = ''
      await loadItems()
      setMessage('Uploaded successfully as WebP.')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Upload failed.')
    } finally {
      setBusy(false)
    }
  }

  const handleDelete = async (item: MediaItem) => {
    const confirmed = window.confirm(`Delete this image? This will remove it from the ${item.category} page.`)
    if (!confirmed) return

    setBusy(true)
    try {
      const response = await fetch(`/api/media/${item.id}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Delete failed.')
      await loadItems()
      setMessage('Image deleted.')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Delete failed.')
    } finally {
      setBusy(false)
    }
  }

  const uploadSubcategoryLabel = category === 'gallery'
    ? GALLERY_SUBCATEGORIES.find((s) => s.value === gallerySubcategory)?.label ?? gallerySubcategory
    : 'Updates'

  return (
    <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">

      {/* Main tab selector */}
      <div className="mb-8 flex flex-wrap gap-3">
        {([
                    { value: 'promise', label: "Today's Promise" },
          { value: 'updates', label: 'Updates' },
          { value: 'gallery', label: 'Gallery' },

        ] as { value: MainTab; label: string }[]).map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => {
              setMainTab(tab.value)
              if (tab.value !== 'promise') {
                setCategory(tab.value as Category)
                setViewSubcategory('all')
              }
            }}
            className={`rounded-full px-7 py-3 font-modern text-xs font-extrabold uppercase tracking-[0.18em] transition ${
              mainTab === tab.value
                ? tab.value === 'promise'
                  ? 'bg-amber-500 text-white shadow-lg'
                  : 'bg-[#e11d48] text-white shadow-lg'
                : 'bg-white text-[#211914] shadow'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Today's Promise panel */}
      {mainTab === 'promise' && <PromisePanel />}

      {/* Gallery / Updates panels */}
      {mainTab !== 'promise' && (
        <>
          {/* Gallery subcategory view filter */}
          {category === 'gallery' && (
            <div className="mb-8 flex flex-wrap gap-2">
              {GALLERY_SUBCATEGORIES.map((sub) => (
                <button
                  key={sub.value}
                  type="button"
                  onClick={() => setViewSubcategory(sub.value)}
                  className={`rounded-full px-5 py-2 font-modern text-xs font-extrabold uppercase tracking-[0.14em] transition ${
                    viewSubcategory === sub.value ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-600 shadow'
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>
          )}

          {/* Upload form */}
          <form onSubmit={handleUpload} className="mb-12 overflow-hidden rounded-[1.75rem] bg-white shadow-[0_24px_70px_rgba(33,25,20,0.12)]">
            <div className="bg-gradient-to-r from-[#e11d48] to-[#f97316] p-8 text-white">
              <p className="font-modern text-xs font-extrabold uppercase tracking-[0.22em] text-white/80">Admin Upload</p>
              <h2 className="mt-2 font-display text-4xl font-black">
                Upload to {category === 'gallery' ? `Gallery › ${uploadSubcategoryLabel}` : 'Updates'}
              </h2>
            </div>

            <div className="grid gap-5 p-8 lg:grid-cols-2">
              {/* Gallery subcategory selector inside form */}
              {category === 'gallery' && (
                <div className="lg:col-span-2">
                  <p className="font-modern text-xs font-extrabold uppercase tracking-[0.18em] text-[#6f5b51] mb-3">Gallery Section</p>
                  <div className="flex flex-wrap gap-2">
                    {GALLERY_SUBCATEGORIES.filter((s) => s.value !== 'all').map((sub) => (
                      <button
                        key={sub.value}
                        type="button"
                        onClick={() => setGallerySubcategory(sub.value)}
                        className={`rounded-full px-5 py-2 font-modern text-xs font-extrabold uppercase tracking-[0.14em] transition ${
                          gallerySubcategory === sub.value ? 'bg-[#e11d48] text-white shadow' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                        }`}
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title (optional)" className="premium-input" />
              <input
                id="admin-image-upload"
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="premium-input"
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description or message (optional)"
                rows={3}
                className="premium-input resize-none lg:col-span-2"
              />
              <button disabled={busy} className="btn-gold rounded-full py-4 disabled:opacity-60 lg:col-span-2">
                {busy ? 'Please wait...' : 'Convert to WebP and Upload'}
              </button>
              {message && <p className="font-modern text-sm font-bold text-[#e11d48] lg:col-span-2">{message}</p>}
            </div>
          </form>

          {/* Image grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {currentItems.map((item) => (
              <article key={item.id} className="overflow-hidden rounded-[1.5rem] bg-white shadow-[0_18px_45px_rgba(33,25,20,0.12)]">
                <div className="aspect-[4/3] bg-[#fff7ed]">
                  <img src={item.src} alt={item.title} className="h-full w-full object-cover" />
                </div>
                <div className="p-5">
                  {item.subcategory && (
                    <span className="inline-block rounded-full bg-zinc-100 px-3 py-1 font-modern text-[10px] font-extrabold uppercase tracking-widest text-zinc-500 mb-2">
                      {GALLERY_SUBCATEGORIES.find((s) => s.value === item.subcategory)?.label ?? item.subcategory}
                    </span>
                  )}
                  <h3 className="font-display text-xl font-black text-[#211914]">{item.title}</h3>
                  {item.description && <p className="mt-1 font-modern text-sm font-semibold leading-6 text-[#6f5b51]">{item.description}</p>}
                  <div className="mt-4 flex flex-wrap gap-3">
                    {item.category === 'updates' && (
                      <button onClick={() => shareToWhatsApp(item)} className="rounded-full bg-[#25D366] px-4 py-2 font-modern text-xs font-extrabold uppercase tracking-[0.12em] text-white">
                        WhatsApp
                      </button>
                    )}
                    <button onClick={() => handleDelete(item)} className="rounded-full bg-[#211914] px-4 py-2 font-modern text-xs font-extrabold uppercase tracking-[0.12em] text-white">
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
            {currentItems.length === 0 && (
              <p className="col-span-full text-center font-modern text-sm font-semibold text-[#6f5b51] py-10">
                No images in this section yet.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  )
}
