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
  if (id === 'laravel-food-reservation') {
    return (
      <div className={`project-card__thumb ${className} project-card__thumb--1`}>
        <svg
          viewBox="0 0 480 270"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
          className="project-card__thumb-svg"
        >
          <defs>
            <linearGradient id="foodBg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1a120c" />
              <stop offset="50%" stopColor="#2b180d" />
              <stop offset="100%" stopColor="#100b08" />
            </linearGradient>
            <radialGradient id="tableGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ea580c" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="480" height="270" fill="url(#foodBg)" />
          <ellipse cx="240" cy="150" rx="200" ry="90" fill="url(#tableGlow)" />
          <ellipse cx="240" cy="180" rx="210" ry="70" fill="#291a10" stroke="#452715" strokeWidth="2" />
          <ellipse cx="240" cy="165" rx="75" ry="34" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />
          <ellipse cx="240" cy="165" rx="60" ry="26" fill="#fef08a" opacity="0.9" />
          <ellipse cx="225" cy="162" rx="28" ry="14" fill="#b45309" />
          <ellipse cx="255" cy="165" rx="24" ry="12" fill="#d97706" />
          <circle cx="230" cy="158" r="6" fill="#15803d" />
          <circle cx="250" cy="160" r="5" fill="#dc2626" />
          <circle cx="240" cy="166" r="4" fill="#16a34a" />
          <ellipse cx="120" cy="155" rx="42" ry="20" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
          <ellipse cx="120" cy="154" rx="34" ry="14" fill="#b91c1c" />
          <circle cx="116" cy="152" r="5" fill="#facc15" />
          <ellipse cx="360" cy="155" rx="45" ry="22" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
          <ellipse cx="360" cy="155" rx="36" ry="16" fill="#047857" />
          <ellipse cx="362" cy="154" rx="20" ry="8" fill="#f97316" />
          <rect x="24" y="20" width="170" height="42" rx="8" fill="#0b1120" fillOpacity="0.85" stroke="#334155" strokeWidth="1" />
          <circle cx="44" cy="41" r="5" fill="#22c55e" />
          <text x="56" y="38" fill="#e2e8f0" fontSize="11" fontWeight="600" fontFamily="sans-serif">Table #04 Confirmed</text>
          <text x="56" y="52" fill="#94a3b8" fontSize="9" fontFamily="monospace">7:30 PM • 4 Guests</text>
          <rect x="360" y="20" width="96" height="26" rx="6" fill="#dc2626" fillOpacity="0.25" stroke="#ef4444" strokeWidth="1" />
          <text x="408" y="37" textAnchor="middle" fill="#fca5a5" fontSize="10" fontWeight="700" fontFamily="sans-serif">Laravel 12</text>
        </svg>
      </div>
    )
  }

  if (id === 'islasafe-emergency') {
    return (
      <div className={`project-card__thumb ${className} project-card__thumb--2`}>
        <svg
          viewBox="0 0 480 270"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
          className="project-card__thumb-svg"
        >
          <defs>
            <linearGradient id="oceanBg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#041527" />
              <stop offset="50%" stopColor="#06253c" />
              <stop offset="100%" stopColor="#02101e" />
            </linearGradient>
            <radialGradient id="radarPulse" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3" />
              <stop offset="70%" stopColor="#0284c7" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="480" height="270" fill="url(#oceanBg)" />
          <g stroke="#1e3a5f" strokeWidth="0.75" strokeDasharray="3 3">
            <line x1="80" y1="0" x2="80" y2="270" />
            <line x1="180" y1="0" x2="180" y2="270" />
            <line x1="280" y1="0" x2="280" y2="270" />
            <line x1="380" y1="0" x2="380" y2="270" />
            <line x1="0" y1="65" x2="480" y2="65" />
            <line x1="0" y1="135" x2="480" y2="135" />
            <line x1="0" y1="205" x2="480" y2="205" />
          </g>
          <path
            d="M 60 50 Q 110 30 140 70 Q 160 110 130 150 Q 90 170 70 120 Z"
            fill="#154030"
            stroke="#22c55e"
            strokeWidth="1.2"
          />
          <path
            d="M 220 80 Q 280 60 310 110 Q 340 180 290 220 Q 240 230 210 170 Q 190 120 220 80 Z"
            fill="#133d2e"
            stroke="#22c55e"
            strokeWidth="1.2"
          />
          <path
            d="M 360 40 Q 420 30 440 80 Q 430 130 380 110 Z"
            fill="#154030"
            stroke="#22c55e"
            strokeWidth="1.2"
          />
          <circle cx="260" cy="135" r="85" fill="url(#radarPulse)" />
          <circle cx="260" cy="135" r="55" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="4 4" />
          <circle cx="260" cy="135" r="95" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.25" />
          <g transform="translate(260, 135)">
            <circle cx="0" cy="0" r="14" fill="#ef4444" fillOpacity="0.25" />
            <circle cx="0" cy="0" r="7" fill="#ef4444" />
            <path d="M0 -12 L0 -6" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
            <circle cx="0" cy="-15" r="1" fill="#fff" />
          </g>
          <g transform="translate(120, 100)">
            <circle cx="0" cy="0" r="10" fill="#22c55e" fillOpacity="0.25" />
            <circle cx="0" cy="0" r="5" fill="#22c55e" />
          </g>
          <rect x="20" y="16" width="180" height="36" rx="6" fill="#040f1a" fillOpacity="0.9" stroke="#1e3a5f" strokeWidth="1" />
          <circle cx="36" cy="34" r="4" fill="#ef4444" />
          <text x="48" y="32" fill="#e2e8f0" fontSize="10" fontWeight="700" fontFamily="sans-serif">INCIDENT LIVE FEED</text>
          <text x="48" y="44" fill="#38bdf8" fontSize="8.5" fontFamily="monospace">14.5995° N, 120.9842° E</text>
        </svg>
      </div>
    )
  }

  // TMC-LLM Local AI Model default
  return (
    <div className={`project-card__thumb ${className} project-card__thumb--3`}>
      <svg
          viewBox="0 0 480 270"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
          className="project-card__thumb-svg"
        >
        <defs>
          <linearGradient id="aiBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#080c16" />
            <stop offset="50%" stopColor="#11162b" />
            <stop offset="100%" stopColor="#050811" />
          </linearGradient>
        </defs>
        <rect width="480" height="270" fill="url(#aiBg)" />
        <rect x="24" y="20" width="432" height="230" rx="8" fill="#060913" stroke="#1e293b" strokeWidth="1.2" />
        <rect x="24" y="20" width="432" height="28" rx="8" fill="#0d1424" />
        <circle cx="42" cy="34" r="4.5" fill="#ef4444" />
        <circle cx="56" cy="34" r="4.5" fill="#eab308" />
        <circle cx="70" cy="34" r="4.5" fill="#22c55e" />
        <text x="92" y="38" fill="#94a3b8" fontSize="10" fontFamily="monospace">tmc-llm-local — v1.4.0 (GGUF Q4_K_M)</text>
        <text x="42" y="74" fill="#38bdf8" fontSize="11" fontFamily="monospace">$ python infer.py --model tmc-knowledge.gguf --ctx 4096</text>
        <text x="42" y="96" fill="#64748b" fontSize="10" fontFamily="monospace">[INFO] CUDA detected: using 32 offloaded GPU layers</text>
        <text x="42" y="116" fill="#a855f7" fontSize="10.5" fontFamily="monospace">&gt;&gt;&gt; User: What are the degree requirements for BSIT Year 3?</text>
        <text x="42" y="140" fill="#e2e8f0" fontSize="10.5" fontFamily="monospace">&gt; TMC-LLM: Year 3 focuses on Advanced Systems Integration, Web</text>
        <text x="42" y="158" fill="#e2e8f0" fontSize="10.5" fontFamily="monospace">  Development (Laravel/React), and Capstone Research.</text>
        <text x="42" y="184" fill="#22c55e" fontSize="10" fontFamily="monospace">[Tokens: 42/s | Latency: 12ms | VRAM: 3.4GB / 8GB]</text>
        <rect x="42" y="202" width="8" height="14" fill="#38bdf8" opacity="0.85" />
      </svg>
    </div>
  )
}
