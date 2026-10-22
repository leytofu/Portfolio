/// <reference types="node" />
// Server-only handler; vercel.json builds and routes this file directly.
import { Buffer } from 'node:buffer'
import process from 'node:process'

const SUBJECTS = ['Project Inquiry', 'Collaboration', 'Job Opportunity', 'Just Saying Hi']
const EMAIL = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/

function json(status: number, body: object, headers: Record<string, string> = {}) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store', ...headers } })
}

export default {
  async fetch(request: Request): Promise<Response> {
    if (request.method !== 'POST') {
      return json(405, { error: 'Method not allowed.' }, { Allow: 'POST' })
    }

    const origin = request.headers.get('origin')
    if ((origin && origin !== new URL(request.url).origin) || request.headers.get('sec-fetch-site') === 'cross-site') {
      return json(403, { error: 'Please submit the form from this website.' })
    }
    if (request.headers.get('content-type')?.split(';')[0].trim() !== 'application/json') {
      return json(415, { error: 'Expected a JSON request.' })
    }

    let body: unknown
    try {
      // Bound the body while reading, including requests without Content-Length.
      const reader = request.body?.getReader()
      if (!reader) return json(400, { error: 'Missing message.' })
      const chunks: Uint8Array[] = []
      let size = 0
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        size += value.byteLength
        if (size > 16_384) {
          await reader.cancel()
          return json(413, { error: 'Message is too large.' })
        }
        chunks.push(value)
      }
      body = JSON.parse(Buffer.concat(chunks).toString('utf8'))
    } catch {
      return json(400, { error: 'Invalid JSON request.' })
    }

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return json(400, { error: 'Invalid message.' })
    }
    const fields = body as Record<string, unknown>
    // Honeypot: silently discard automated submissions that fill this hidden field.
    if (fields.website) return json(200, { success: true })
    const name = typeof fields.name === 'string' ? fields.name.trim() : ''
    const email = typeof fields.email === 'string' ? fields.email.trim() : ''
    const subject = typeof fields.subject === 'string' ? fields.subject.trim() : ''
    const message = typeof fields.message === 'string' ? fields.message.trim() : ''
    if (name.length < 2 || name.length > 100 || /[\r\n]/.test(name)
      || email.length > 254 || !EMAIL.test(email)
      || !SUBJECTS.includes(subject) || message.length < 5 || message.length > 5000) {
      return json(400, { error: 'Please check your name, email, subject, and message.' })
    }

    const apiKey = process.env.RESEND_API_KEY
    const to = process.env.CONTACT_TO_EMAIL?.trim()
    const from = process.env.CONTACT_FROM_EMAIL?.trim() || 'Portfolio <onboarding@resend.dev>'
    if (!apiKey || !to || !EMAIL.test(to)) {
      return json(503, { error: 'Contact form is temporarily unavailable. Please use the direct email link.' })
    }

    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(10_000),
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: email,
          subject: `[Portfolio: ${subject}] ${name}`,
          text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
        }),
      })
      if (!response.ok) {
        // Log status only; never log credentials or the visitor's message.
        console.error('Contact email provider returned status', response.status)
        return json(502, { error: 'Could not send your message. Please try again later or use the direct email link.' })
      }
      return json(200, { success: true })
    } catch {
      return json(502, { error: 'Could not reach the email service. Please try again later or use the direct email link.' })
    }
  },
}
