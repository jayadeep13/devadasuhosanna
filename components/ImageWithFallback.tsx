'use client'

import { useState } from 'react'
import Image from 'next/image'

type ImageWithFallbackProps = {
  src: string
  alt: string
  className?: string
  priority?: boolean
  fallback?: React.ReactNode
  fallbackClassName?: string
  sizes?: string
}

export default function ImageWithFallback({
  src,
  alt,
  className,
  priority = false,
  fallback,
  fallbackClassName,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
}: ImageWithFallbackProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return <div className={fallbackClassName}>{fallback}</div>
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className={className}
      priority={priority}
      onError={() => setFailed(true)}
    />
  )
}
