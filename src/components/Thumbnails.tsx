export function AboutAvatar({ className = '' }: { className?: string }) {
  return (
    <div className={`about-avatar ${className}`}>
      <svg
        viewBox="0 0 320 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="about-avatar__svg"
      >
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0b1026" />
            <stop offset="35%" stopColor="#1e1847" />
            <stop offset="65%" stopColor="#4c1d68" />
            <stop offset="85%" stopColor="#832769" />
            <stop offset="100%" stopColor="#be4364" />
          </linearGradient>
          <linearGradient id="sunGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f472b6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="mountainBack" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#311749" />
            <stop offset="100%" stopColor="#150a22" />
          </linearGradient>
          <linearGradient id="mountainMid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e0e31" />
            <stop offset="100%" stopColor="#0d0417" />
          </linearGradient>
          <linearGradient id="personGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#121829" />
            <stop offset="100%" stopColor="#070913" />
          </linearGradient>
          <filter id="cloudSoft">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {/* Sunset Sky */}
        <rect width="320" height="320" fill="url(#skyGrad)" />

        {/* Ambient Sun glow */}
        <circle cx="160" cy="220" r="90" fill="url(#sunGlow)" />

        {/* Stars in upper sky */}
        <g fill="#fff" opacity="0.75">
          <circle cx="35" cy="40" r="1.2" />
          <circle cx="90" cy="25" r="0.9" />
          <circle cx="145" cy="50" r="1.4" />
          <circle cx="210" cy="30" r="1" />
          <circle cx="270" cy="55" r="1.3" />
          <circle cx="295" cy="25" r="0.8" />
          <circle cx="65" cy="80" r="1" />
          <circle cx="240" cy="85" r="0.9" />
        </g>

        {/* Distant Clouds */}
        <ellipse cx="60" cy="180" rx="90" ry="24" fill="#6d286d" opacity="0.45" filter="url(#cloudSoft)" />
        <ellipse cx="260" cy="170" rx="100" ry="28" fill="#882a6d" opacity="0.4" filter="url(#cloudSoft)" />

        {/* Distant Mountains */}
        <path
          d="M0 240 L45 205 L110 235 L175 190 L240 230 L320 185 L320 320 L0 320 Z"
          fill="url(#mountainBack)"
        />

        {/* Mid-range Ridge */}
        <path
          d="M0 265 L70 235 L150 255 L220 225 L320 250 L320 320 L0 320 Z"
          fill="url(#mountainMid)"
        />

        {/* Stylized Anime Silhouette from Back */}
        <g id="character-back" transform="translate(160, 260)">
          <path
            d="M -55 60 C -50 25 -32 5 0 5 C 32 5 50 25 55 60 Z"
            fill="url(#personGrad)"
          />
          <path
            d="M -22 8 L -14 2 L 0 5 L 14 2 L 22 8 L 18 16 L -18 16 Z"
            fill="#1e293b"
            stroke="#38bdf8"
            strokeWidth="0.5"
            strokeOpacity="0.4"
          />
          <path d="M -10 5 L -10 -10 L 10 -10 L 10 5 Z" fill="#1e1b30" />
          <ellipse cx="0" cy="-22" rx="20" ry="22" fill="#090c17" />
          <path
            d="M -22 -20 C -24 -36 -12 -46 0 -46 C 12 -46 24 -36 22 -20 C 26 -16 24 -8 20 -4 C 18 0 10 -2 8 -6 C 5 -1 -4 -1 -8 -6 C -12 -1 -18 -3 -20 -8 Z"
            fill="#05070e"
            stroke="#1d263b"
            strokeWidth="0.8"
          />
          <path
            d="M -20 -28 C -14 -42 0 -44 14 -42"
            stroke="#e879f9"
            strokeWidth="1.2"
            fill="none"
            opacity="0.65"
          />
          <path
            d="M 16 -38 C 22 -30 24 -18 20 -8"
            stroke="#f472b6"
            strokeWidth="1.2"
            fill="none"
            opacity="0.6"
          />
        </g>
      </svg>
    </div>
  )
}

export function ProjectThumbnail({ id, className = '' }: { id: string; className?: string }) {
  if (id === 'islasafe-emergency') {
    return (
      <div className={`project-card__thumb ${className} project-card__thumb--map`}>
        <img
          src="/images/islasafe-cpg-map.png"
          srcSet="/images/islasafe-cpg-map.png 1x, /images/islasafe-cpg-map@2x.png 2x"
          width={1200}
          height={675}
          alt="Map of President Carlos P. Garcia, Bohol, showing Lapinpin Island and its surrounding islets."
          className="project-card__map-img"
          loading="lazy"
          decoding="async"
        />
        <div className="project-card__map-ui">
          <div className="project-card__map-head">
            <span className="project-card__map-feed">
              <span className="project-card__map-dot" />
              Incident feed
            </span>
            <span className="project-card__map-meta">
              10.1222° N · 124.5522° E
              <span className="project-card__map-credit">© OpenStreetMap · Esri</span>
            </span>
          </div>
          <span className="project-card__map-pin" aria-hidden="true" />
        </div>
      </div>
    )
  }

  // Generic fallback for projects without a bespoke thumbnail
  return (
    <div className={`project-card__thumb ${className}`}>
      <svg
        viewBox="0 0 480 270"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        className="project-card__thumb-svg"
      >
        <defs>
          <linearGradient id="genericBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#080c16" />
            <stop offset="50%" stopColor="#11162b" />
            <stop offset="100%" stopColor="#050811" />
          </linearGradient>
        </defs>
        <rect width="480" height="270" fill="url(#genericBg)" />
        <rect x="24" y="20" width="432" height="230" rx="8" fill="#060913" stroke="#1e293b" strokeWidth="1.2" />
        <rect x="24" y="20" width="432" height="28" rx="8" fill="#0d1424" />
        <circle cx="42" cy="34" r="4.5" fill="#ef4444" />
        <circle cx="56" cy="34" r="4.5" fill="#eab308" />
        <circle cx="70" cy="34" r="4.5" fill="#22c55e" />
        <text x="92" y="38" fill="#94a3b8" fontSize="10" fontFamily="monospace">project — preview</text>
        <text x="42" y="82" fill="#38bdf8" fontSize="11" fontFamily="monospace">$ npm run build</text>
        <text x="42" y="104" fill="#64748b" fontSize="10" fontFamily="monospace">[INFO] compiling sources…</text>
        <text x="42" y="126" fill="#64748b" fontSize="10" fontFamily="monospace">[INFO] bundling assets…</text>
        <text x="42" y="148" fill="#22c55e" fontSize="10" fontFamily="monospace">[DONE] build finished</text>
        <rect x="42" y="176" width="396" height="8" rx="4" fill="#1e293b" />
        <rect x="42" y="176" width="264" height="8" rx="4" fill="#38bdf8" />
        <rect x="42" y="202" width="8" height="14" fill="#38bdf8" opacity="0.85" />
      </svg>
    </div>
  )
}
