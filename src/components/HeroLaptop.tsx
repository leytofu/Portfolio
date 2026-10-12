import { LaravelIcon, MysqlIcon, ReactIcon, TypescriptIcon } from './icons'

export function HeroLaptop() {
  return (
    <div className="laptop-wrap">
      {/* Background radial glow */}
      <div className="laptop-glow" aria-hidden="true">
        <div className="laptop-glow__blob laptop-glow__blob--blue" />
        <div className="laptop-glow__blob laptop-glow__blob--cyan" />
      </div>

      {/* 3D Isometric Laptop Container */}
      <div className="laptop-stage">
        <div className="laptop-motion">
          {/* Laptop SVG */}
          <svg
            viewBox="0 0 520 340"
            className="laptop-svg"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Screen glow gradient */}
              <linearGradient id="screenBg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#08142c" />
                <stop offset="45%" stopColor="#0b224d" />
                <stop offset="100%" stopColor="#030b18" />
              </linearGradient>

              <linearGradient id="screenGlow" x1="20%" y1="0%" x2="80%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#2563eb" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0.35" />
              </linearGradient>

              <linearGradient id="bodyMetallic" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="50%" stopColor="#0f172a" />
                <stop offset="100%" stopColor="#090d16" />
              </linearGradient>

              <linearGradient id="deckTop" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e2c45" />
                <stop offset="50%" stopColor="#131c2e" />
                <stop offset="100%" stopColor="#0a101d" />
              </linearGradient>

              <radialGradient id="floorLight" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.35" />
                <stop offset="40%" stopColor="#1d4ed8" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0" />
              </radialGradient>

              <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Ambient floor ellipse reflection */}
            <ellipse cx="260" cy="275" rx="190" ry="40" fill="url(#floorLight)" />

            {/* Laptop Base / Keyboard Deck */}
            <g id="laptop-base">
              <path
                d="M 60 270 L 460 270 L 440 286 L 80 286 Z"
                fill="#070c16"
                stroke="#172554"
                strokeWidth="1"
              />
              <path
                d="M 80 286 L 440 286 L 434 290 L 86 290 Z"
                fill="#1e293b"
                stroke="#334155"
                strokeWidth="0.5"
              />
              <path
                d="M 125 195 L 395 195 L 460 270 L 60 270 Z"
                fill="url(#deckTop)"
                stroke="#25354e"
                strokeWidth="1.2"
              />
              <path
                d="M 220 250 L 300 250 L 308 266 L 212 266 Z"
                fill="#0e1726"
                stroke="#334155"
                strokeWidth="0.8"
                opacity="0.9"
              />
              <path
                d="M 145 204 L 375 204 L 415 244 L 105 244 Z"
                fill="#090f1b"
                stroke="#1d2b40"
                strokeWidth="0.8"
              />
              <g opacity="0.6" stroke="#253856" strokeWidth="1">
                <line x1="140" y1="212" x2="380" y2="212" />
                <line x1="130" y1="220" x2="390" y2="220" />
                <line x1="120" y1="228" x2="400" y2="228" />
                <line x1="110" y1="236" x2="410" y2="236" />
              </g>
              <g opacity="0.4" stroke="#1d2e47" strokeWidth="1">
                {[160, 185, 210, 235, 260, 285, 310, 335, 360].map((x) => (
                  <line key={x} x1={x} y1="205" x2={x + (x - 260) * 0.25} y2="243" />
                ))}
              </g>
              <rect x="200" y="192" width="120" height="4.5" rx="2" fill="#0f172a" stroke="#334155" strokeWidth="0.8" />
            </g>

            {/* Laptop Screen (angled back) */}
            <g id="laptop-screen">
              <path
                d="M 112 55 L 408 55 L 396 195 L 124 195 Z"
                fill="#0a0f1d"
                stroke="#38bdf8"
                strokeOpacity="0.4"
                strokeWidth="1.5"
              />
              <path
                d="M 124 64 L 396 64 L 386 186 L 134 186 Z"
                fill="url(#screenBg)"
              />
              <path
                d="M 124 64 L 396 64 L 386 186 L 134 186 Z"
                fill="url(#screenGlow)"
              />
              <circle cx="260" cy="59.5" r="1.5" fill="#38bdf8" opacity="0.8" />

              {/* Glowing Code Symbol `</>` on screen */}
              <g transform="translate(260, 125)" filter="url(#neonGlow)">
                <path
                  d="M -30 -15 L -45 0 L -30 15"
                  stroke="#38bdf8"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                <path
                  d="M -6 18 L 8 -18"
                  stroke="#60a5fa"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M 30 -15 L 45 0 L 30 15"
                  stroke="#38bdf8"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </g>

              <path
                d="M 124 64 L 396 64"
                stroke="#7dd3fc"
                strokeWidth="1"
                strokeOpacity="0.6"
              />
            </g>
          </svg>

          {/* Floating Badges */}
          {/* 1. Laravel - Top Right */}
          <div className="floating-badge floating-badge--laravel">
            <div className="floating-badge__icon floating-badge__icon--laravel">
              <LaravelIcon />
            </div>
            <span className="floating-badge__label">Laravel</span>
          </div>

          {/* 2. React - Middle Right */}
          <div className="floating-badge floating-badge--react">
            <div className="floating-badge__icon floating-badge__icon--react">
              <ReactIcon />
            </div>
            <span className="floating-badge__label">React</span>
          </div>

          {/* 3. TypeScript - Left / Center Float */}
          <div className="floating-badge floating-badge--typescript">
            <div className="floating-badge__icon floating-badge__icon--typescript">
              <TypescriptIcon />
            </div>
            <span className="floating-badge__label">TypeScript</span>
          </div>

          {/* 4. MySQL - Bottom Right */}
          <div className="floating-badge floating-badge--mysql">
            <div className="floating-badge__icon floating-badge__icon--mysql">
              <MysqlIcon />
            </div>
            <span className="floating-badge__label">MySQL</span>
          </div>
        </div>
      </div>
    </div>
  )
}
