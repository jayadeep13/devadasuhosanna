export default function SectionHeader({
  eyebrow, title, subtitle, centered = true, light = true,
}: {
  eyebrow: string; title: string; subtitle?: string; centered?: boolean; light?: boolean;
}) {
  return (
    <div className={`mb-16 ${centered ? 'text-center' : ''}`}>
      <p className="section-label mb-4">{eyebrow}</p>
      <h2 className={`font-cinzel font-bold leading-tight mb-5 ${light ? 'text-white' : 'text-void'}`}
        style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
        {title}
      </h2>
      <div className={`flex items-center gap-4 mb-5 ${centered ? 'justify-center' : ''}`}>
        <span className="w-16 h-px bg-gradient-to-r from-crimson/0 to-crimson/60" />
        <svg viewBox="0 0 20 20" className="w-4 h-4 text-crimson flex-shrink-0" fill="currentColor">
          <path d="M10 2 L10 18 M2 8 L18 8" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
        </svg>
        <span className="w-16 h-px bg-gradient-to-l from-crimson/0 to-crimson/60" />
      </div>
      {subtitle && (
        <p className={`font-cormorant text-xl leading-relaxed max-w-2xl ${centered ? 'mx-auto' : ''} ${light ? 'text-white/55' : 'text-void/55'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
