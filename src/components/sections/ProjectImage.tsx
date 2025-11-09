"use client"

import Image from 'next/image'
import { MEDIA_BLUR_DATA_URL, MEDIA_FALLBACK } from '@/lib/media'

type ProjectImageProps = {
  src: string
  alt: string
  priority?: boolean
  className?: string
}

export default function ProjectImage({
  src,
  alt,
  priority = false,
  className = 'object-cover rounded-t',
}: ProjectImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className={className}
      priority={priority}
      placeholder="blur"
      blurDataURL={MEDIA_BLUR_DATA_URL}
      onError={({ currentTarget }) => {
        if (currentTarget.dataset.fallbackApplied === 'true') return
        currentTarget.dataset.fallbackApplied = 'true'
        currentTarget.src = MEDIA_FALLBACK
      }}
    />
  )
}
