import type { CSSProperties } from 'react'

interface IconProps {
  className?: string
  style?: CSSProperties
  title?: string
}

function svg(children: React.ReactNode, { className, style, title }: IconProps = {}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      style={style}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  )
}

function monogram(
  label: string,
  bg: string,
  fg: string,
  fontSize = 9.5,
  { className, style, title }: IconProps = {},
) {
  return svg(
    <>
      <rect x="1.5" y="1.5" width="21" height="21" rx="5" fill={bg} />
      <text
        x="12"
        y="12"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="'Segoe UI', Inter, sans-serif"
        fontSize={fontSize}
        fontWeight="700"
        letterSpacing="-0.3"
        fill={fg}
      >
        {label}
      </text>
    </>,
    { className, style, title },
  )
}

export function LaravelIcon(p: IconProps = {}) {
  return svg(
    <g fill="#FF2D20">
      <path d="M4.1 3.4h4.6v9.2l4.1 4.1V7.5h4.6v9.9l-4.1 4.1H4.1V3.4Z" />
      <path d="M17.4 3.4h2.5v4.1h-2.5z" />
      <path d="M17.4 9.9h2.5v4.1h-2.5z" />
    </g>,
    p,
  )
}

export function PhpIcon(p: IconProps = {}) {
  return svg(
    <>
      <ellipse cx="12" cy="12" rx="11" ry="6.4" fill="#777BB4" />
      <text
        x="12"
        y="12.4"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="'Segoe UI', Inter, sans-serif"
        fontSize="7.6"
        fontStyle="italic"
        fontWeight="700"
        fill="#fff"
      >
        php
      </text>
    </>,
    p,
  )
}

export function ReactIcon(p: IconProps = {}) {
  return svg(
    <g stroke="#61DAFB" strokeWidth="1.15" fill="none">
      <ellipse cx="12" cy="12" rx="10.3" ry="4" />
      <ellipse cx="12" cy="12" rx="10.3" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10.3" ry="4" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="2.05" fill="#61DAFB" stroke="none" />
    </g>,
    p,
  )
}

export function TypescriptIcon(p: IconProps = {}) {
  return monogram('TS', '#3178C6', '#ffffff', 9.5, p)
}

export function JavascriptIcon(p: IconProps = {}) {
  return monogram('JS', '#F7DF1E', '#000000', 9, p)
}

export function MysqlIcon(p: IconProps = {}) {
  return svg(
    <>
      <rect x="1.5" y="1.5" width="21" height="21" rx="5" fill="#00758F" />
      <g fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round">
        <ellipse cx="12" cy="7.4" rx="6" ry="2.4" />
        <path d="M6 7.4v9.2c0 1.3 2.7 2.4 6 2.4s6-1.1 6-2.4V7.4" />
        <path d="M6 12c0 1.3 2.7 2.4 6 2.4s6-1.1 6-2.4" />
      </g>
    </>,
    p,
  )
}

export function PostgresIcon(p: IconProps = {}) {
  return svg(
    <>
      <rect x="1.5" y="1.5" width="21" height="21" rx="5" fill="#336791" />
      <g fill="#fff">
        <path d="M8.1 6.6c-1.9.5-3.1 2.2-3.1 4.4 0 2.3 1.2 4.2 3 4.9v2.5c0 .9.7 1.6 1.6 1.6.5 0 1-.3 1.3-.7.4.4.9.7 1.5.7 1.9 0 3.4-1.5 3.4-3.4v-1.4c.9-.7 1.4-1.9 1.4-3.4 0-2.4-1.4-4.5-3.4-5.4-.6.6-1.4 1-2.3 1.1-.6-.6-1.4-1-2.3-1.2-.1 0-.2-.1-.4-.1Z" />
        <path d="M8.4 17.1c-.5 0-.9.4-.9.9s.4.9.9.9.9-.4.9-.9-.4-.9-.9-.9Zm6.2 0c-.5 0-.9.4-.9.9s.4.9.9.9.9-.4.9-.9-.4-.9-.9-.9Z" fill="#336791" />
        <circle cx="9.4" cy="11.3" r=".95" fill="#336791" />
        <circle cx="14.1" cy="11.3" r=".95" fill="#336791" />
      </g>
    </>,
    p,
  )
}

export function GitIcon(p: IconProps = {}) {
  return svg(
    <path
      fill="#F05032"
      d="M23.546 10.93 13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.606 0-.719-.719-.719-1.879 0-2.598.177-.18.387-.316.607-.406V8.835c-.22-.09-.43-.225-.606-.401-.544-.545-.674-1.342-.404-2.002L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"
    />,
    p,
  )
}

export function VscodeIcon(p: IconProps = {}) {
  return svg(
    <path
      fill="#0098FF"
      d="M23.15 2.587 18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a1 1 0 0 0-1.276.057L.327 7.26a1 1 0 0 0 0 1.48L3.9 12 .326 15.26a1 1 0 0 0 0 1.48l1.324 1.2a1 1 0 0 0 1.276.058l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352Zm-5.146 14.861L10.826 12l7.178-5.448v10.896Z"
    />,
    p,
  )
}

export function PythonIcon(p: IconProps = {}) {
  return svg(
    <>
      <path
        fill="#3776AB"
        d="M11.9 2C9.3 2 7.5 2.6 7.5 4.7v2.1H12v.7H5.6C3.4 7.5 2 8.9 2 11.5s1.4 4 3.6 4h1.6v-2.4c0-2.1 1.8-3.7 3.9-3.7h4.4c1.7 0 3.1-1.4 3.1-3.1V4.7C18.6 3 16.9 2 14.3 2h-2.4ZM9.6 3.6c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9Z"
      />
      <path
        fill="#FFD43B"
        d="M12.1 22c2.6 0 4.4-.6 4.4-2.7v-2.1H12v-.7h6.4c2.2 0 3.6-1.4 3.6-4s-1.4-4-3.6-4h-1.6v2.4c0 2.1-1.8 3.7-3.9 3.7H8.5c-1.7 0-3.1 1.4-3.1 3.1v2.3c0 1.7 1.7 2.7 4.3 2.7h2.4Zm2.3-1.6c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9Z"
      />
    </>,
    p,
  )
}

export function FirebaseIcon(p: IconProps = {}) {
  return svg(
    <>
      <path fill="#FFC24A" d="M4.3 18.9 6.7 4.7c.12-.7.98-.77 1.24-.11l2.05 3.86-5.69 10.45Z" />
      <path fill="#FFA000" d="M9.6 12.2 11.8 4.5c.16-.64 1-.6 1.13.05l3.83 13.42-7.16 1.68-.6-7.45Z" />
      <path fill="#F57C00" d="m14.6 17.4 1.72-6.24c.14-.5.82-.53 1-.07l2.36 6.86c.63 1.84-.8 3.75-2.73 3.75-.98 0-1.9-.53-2.38-1.4l-.6-2.03-.37-.87Z" />
    </>,
    p,
  )
}

export function TailwindIcon(p: IconProps = {}) {
  return svg(
    <g fill="#38BDF8">
      <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35C13.39 10.86 14.52 12 17 12c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C15.61 7.14 14.48 6 12 6Zm-5 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35C8.39 16.86 9.52 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C10.61 13.14 9.48 12 7 12Z" />
    </g>,
    p,
  )
}

export function HtmlIcon(p: IconProps = {}) {
  return monogram('5', '#E34F26', '#ffffff', 12, p)
}

export function CssIcon(p: IconProps = {}) {
  return monogram('3', '#1572B6', '#ffffff', 12, p)
}

export function ViteIcon(p: IconProps = {}) {
  return svg(
    <>
      <path fill="#FFC24A" d="m21.3 3.4-8.7 1.1c-.2 0-.4.2-.5.4l-1.6 6.3 2.9-2.5c.2-.1.4-.1.6 0l5.7 4.3V4.4c0-.3-.3-.5-.5-.5l-1.9-.5Z" />
      <path fill="#BD34FE" d="M3.4 3.4c-.2 0-.4.2-.4.5v16.3c0 .2.1.4.3.5l8.7 1.6c.2 0 .4-.1.5-.3l1.6-6.3-2.9 2.5c-.2.1-.4.1-.6 0L3.4 3.4Z" />
      <path fill="#41D1FF" d="m14.6 8.6-2.9 2.5c-.2.1-.4.1-.6 0l-1.8-1.4 5.7-4.3c.2-.1.4-.1.6 0l2.1 1.6-3.1 1.6Z" />
    </>,
    p,
  )
}

export function MaplibreIcon(p: IconProps = {}) {
  return svg(
    <>
      <rect x="1.5" y="1.5" width="21" height="21" rx="5" fill="#396CB2" />
      <path
        d="M12 5.4c-2.7 0-4.9 2.2-4.9 4.9 0 3.6 4.9 8.3 4.9 8.3s4.9-4.7 4.9-8.3c0-2.7-2.2-4.9-4.9-4.9Zm0 6.7a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6Z"
        fill="#fff"
      />
    </>,
    p,
  )
}

export function PytorchIcon(p: IconProps = {}) {
  return monogram('PT', '#EE4C2C', '#ffffff', 9, p)
}

export function GgufIcon(p: IconProps = {}) {
  return monogram('GG', '#8E5CFF', '#ffffff', 9, p)
}

export function NineRouterIcon(p: IconProps = {}) {
  return monogram('9R', '#22C55E', '#062b14', 9, p)
}

export function FirebaseNameUnknownIcon(p: IconProps = {}) {
  return monogram('?', '#555', '#fff', 11, p)
}

const MAP: Record<string, (p: IconProps) => React.ReactElement> = {
  laravel: LaravelIcon,
  'laravel 12': LaravelIcon,
  php: PhpIcon,
  react: ReactIcon,
  typescript: TypescriptIcon,
  javascript: JavascriptIcon,
  mysql: MysqlIcon,
  postgresql: PostgresIcon,
  git: GitIcon,
  'vs code': VscodeIcon,
  python: PythonIcon,
  firebase: FirebaseIcon,
  'tailwind css': TailwindIcon,
  tailwind: TailwindIcon,
  html: HtmlIcon,
  'html/css': HtmlIcon,
  css: CssIcon,
  vite: ViteIcon,
  maplibre: MaplibreIcon,
  'maplibre gl': MaplibreIcon,
  pytorch: PytorchIcon,
  gguf: GgufIcon,
  '9router': NineRouterIcon,
}

export function TechIcon({
  name,
  className,
  style,
  title,
}: {
  name: string
} & IconProps) {
  const key = name.trim().toLowerCase()
  const Icon = MAP[key] ?? monogramFallback(key)
  return Icon({ className, style, title })
}

function monogramFallback(key: string) {
  const letters = key
    .replace(/[^a-z0-9 ]/g, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
  const hue = [...key].reduce((a, c) => a + c.charCodeAt(0), 0) % 360
  return (p: IconProps = {}) => monogram(letters || '?', `hsl(${hue} 60% 42%)`, '#fff', 9.5, p)
}
