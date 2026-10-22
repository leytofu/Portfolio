import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

function parsePort(value: string | undefined, fallback: number, name: string) {
  if (!value?.trim()) return fallback

  const port = Number(value)
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(`${name} must be an integer between 1 and 65535`)
  }

  return port
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ['DEV_', 'PREVIEW_', 'VITE_BASE_PATH'])
  const base = env.VITE_BASE_PATH?.trim() || '/'

  if (!base.startsWith('/') || base.startsWith('//') || /[?#\\]/.test(base)) {
    throw new Error('VITE_BASE_PATH must be an absolute pathname, such as / or /portfolio/')
  }

  return {
    base: `${base.replace(/\/+$/, '')}/`,
    plugins: [react()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      port: parsePort(env.DEV_PORT, 5173, 'DEV_PORT'),
    },
    preview: {
      port: parsePort(env.PREVIEW_PORT, 4173, 'PREVIEW_PORT'),
    },
  }
})
