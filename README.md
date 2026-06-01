# Hosanna Mandir — Premium Website

A high-end, cinematic church website built with **Next.js 14 App Router** + **Tailwind CSS only**.

## 🎨 Design Language

**Logo-Extracted Color Palette:**
- **Void Black** `#000000` / `#050508` — primary backgrounds
- **Crimson Red** `#CC1A1A` — cross, accents, CTAs (from the logo cross)
- **Metallic Gold** `#FFD700` — "HOSANNA" text, headings, shimmer
- **Globe Blue** `#1A4B8C` — depth accents from logo globe

**Typography:**
- `Cinzel` — Display headings (regal, ecclesiastical)
- `Playfair Display` — Quotes and pull text
- `Cormorant Garamond` — Body copy (refined, readable)
- `Jost` — UI labels, buttons, metadata

**Design Effects:**
- Gold shimmer text animation
- Glass morphism cards with gold borders
- Star field particle backgrounds
- Floating cross animations
- Live broadcast pulse indicator
- Scroll-reveal animations
- Hover line-draw effects on ministry cards

---

## 🚀 Setup

```bash
# 1. Unzip and enter the directory
unzip hosanna-church-website.zip
cd hosanna-church

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev
# → Open http://localhost:3000

# 4. Build for production
npm run build && npm start
```

---

## 📁 Project Structure

```
hosanna-church/
├── app/
│   ├── globals.css         ← All CSS variables, animations, premium styles
│   ├── layout.tsx          ← Root layout with Google Fonts
│   ├── page.tsx            ← Home page (hero, stats, about, services, ministries...)
│   ├── about/page.tsx
│   ├── pastor/page.tsx
│   ├── ministries/page.tsx
│   ├── gallery/page.tsx
│   ├── live/page.tsx
│   ├── prayer/page.tsx
│   ├── donation/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── Navbar.tsx          ← Sticky glass nav + mobile overlay menu
│   ├── Footer.tsx          ← Full premium footer
│   ├── SectionHeader.tsx   ← Eyebrow + title + cross divider
│   └── ScrollReveal.tsx    ← Intersection observer animations
├── public/
│   └── images/
│       └── logo.png        ← Your Hosanna logo (included!)
└── tailwind.config.js      ← Full custom color + animation config
```

---

## 🎬 Add Real Hero Video

In `app/page.tsx`, replace the hero background `<div>` with:

```tsx
<video
  autoPlay muted loop playsInline
  className="absolute inset-0 w-full h-full object-cover opacity-40"
>
  <source src="/videos/worship.mp4" type="video/mp4" />
</video>
```

Place the video file in `public/videos/worship.mp4`.

---

## 🖼️ Add Real Photos

Replace placeholder divs with:

```tsx
import Image from 'next/image'

<Image
  src="/images/church-worship.jpg"
  alt="Sunday Worship"
  fill
  className="object-cover"
/>
```

---

## 🚀 Deploy to Vercel (Free)

```bash
npm i -g vercel
vercel
# Follow prompts — live in ~2 minutes
```

Or connect your GitHub repo at vercel.com for auto-deploys.

---

## 📞 Church Info Embedded

- **Phone**: +91 9440772772 / +91 9951379777
- **Locations**: Hanuman Junction & Nuzvid, Andhra Pradesh
- **Services**: Fully mapped in all pages
- **Logo**: Real logo included in `public/images/logo.png`
