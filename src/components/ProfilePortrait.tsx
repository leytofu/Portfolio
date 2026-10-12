import { useEffect, useState } from 'react'

/** Where the portrait lives. Drop your photo at public/images/mypfp.jpg */
export const PROFILE_PATH = '/images/mypfp.jpg'

interface ProfilePortraitProps {
  /** Alt text; defaults to the site owner's name. */
  alt?: string
  /** Initials shown on the fallback silhouette. */
  initials?: string
}

/**
 * Professional portrait frame for the hero.
 *
 * - Uses object-fit: cover with a face-friendly object-position.
 * - Falls back to a neutral SVG silhouette if the image is missing,
 *   so visitors never see a broken image.
 * - Renders a skeleton block before load to avoid layout shift.
 * - Styling lives in .profile-portrait (src/index.css) and uses the
 *   existing theme tokens, so it adapts to light/dark automatically.
 */
export function ProfilePortrait({ alt = 'Profile photo', initials }: ProfilePortraitProps) {
  const [status, setStatus] = useState<'loading' | 'ready' | 'missing'>('loading')

  useEffect(() => {
    let cancelled = false
    const img = new Image()
    img.onload = () => {
      if (!cancelled) setStatus('ready')
    }
    img.onerror = () => {
      if (!cancelled) setStatus('missing')
    }
    img.src = PROFILE_PATH
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className={`profile-portrait profile-portrait--${status}`}>
      {status === 'ready' && (
        <img
          className="profile-portrait__img"
          src={PROFILE_PATH}
          alt={alt}
          width={480}
          height={480}
          decoding="async"
          // Only the hero image is above the fold; still avoid blocking paint.
          loading="eager"
          fetchPriority="high"
        />
      )}

      {status === 'missing' && (
        <svg
          className="profile-portrait__fallback"
          viewBox="0 0 400 400"
          role="img"
          aria-label={`${alt} placeholder`}
        >
          <defs>
            <linearGradient id="pp-bg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#111c33" />
              <stop offset="100%" stopColor="#0a1122" />
            </linearGradient>
            <linearGradient id="pp-rim" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect width="400" height="400" fill="url(#pp-bg)" />
          <ellipse cx="200" cy="60" rx="220" ry="150" fill="url(#pp-rim)" />
          <g fill="#1c2b47">
            <circle cx="200" cy="160" r="66" />
            <path d="M200 244c-58 0-104 33-104 74v42h208v-42c0-41-46-74-104-74z" />
          </g>
          {initials && (
            <text
              x="200"
              y="180"
              textAnchor="middle"
              dominantBaseline="central"
              fontFamily="'JetBrains Mono', monospace"
              fontSize="64"
              fontWeight="700"
              fill="#3b82f6"
              opacity="0.85"
            >
              {initials}
            </text>
          )}
        </svg>
      )}
    </div>
  )
}
