import assert from 'node:assert/strict'
import { afterEach, test } from 'node:test'
import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import contact from '../src/api/contact.ts'
import ts from 'typescript'

const originalFetch = globalThis.fetch
const originalEnv = { ...process.env }
test('API typechecks independently without automatic Node global types', () => {
  const file = new URL('../src/api/contact.ts', import.meta.url)
  const program = ts.createProgram([fileURLToPath(file)], {
    noEmit: true,
    target: ts.ScriptTarget.ES2023,
    module: ts.ModuleKind.NodeNext,
    types: [],
    skipLibCheck: true,
  })
  const diagnostics = ts.getPreEmitDiagnostics(program)
  assert.deepEqual(diagnostics.map((item) => ts.flattenDiagnosticMessageText(item.messageText, '\n')), [])
})
test('Vercel builds the src handler and routes API before the SPA fallback', () => {
  const config = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'))
  assert.equal(existsSync(new URL('../api', import.meta.url)), false)
  assert.ok(config.builds.some((build) => build.src === 'src/api/contact.ts' && build.use === '@vercel/node'))
  assert.ok(config.builds.some((build) => build.use === '@vercel/static-build' && build.config.distDir === 'dist'))
  assert.equal(config.routes[0].dest, '/src/api/contact.ts')
  assert.ok(new RegExp(`^${config.routes[0].src}$`).test('/api/contact'))
  assert.equal(config.routes[1].handle, 'filesystem')
  const fallback = new RegExp(`^${config.routes[2].src}$`)
  assert.equal(fallback.test('/api/contact'), false)
  assert.equal(fallback.test('/contact'), true)
})
afterEach(() => {
  globalThis.fetch = originalFetch
  for (const key of ['RESEND_API_KEY', 'CONTACT_TO_EMAIL', 'CONTACT_FROM_EMAIL']) {
    if (originalEnv[key] === undefined) delete process.env[key]
    else process.env[key] = originalEnv[key]
  }
})

const valid = { name: 'Visitor', email: 'visitor@example.com', subject: 'Project Inquiry', message: 'Let us build a website.', website: '' }
function request(body = valid, headers = {}) {
  return new Request('https://portfolio.example/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Origin: 'https://portfolio.example', ...headers },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  })
}
function configure() {
  process.env.RESEND_API_KEY = 'test-key-not-a-real-secret'
  process.env.CONTACT_TO_EMAIL = 'owner@example.com'
  delete process.env.CONTACT_FROM_EMAIL
}

test('rejects unsupported methods, cross-origin requests, and content types', async () => {
  const get = await contact.fetch(new Request('https://portfolio.example/api/contact'))
  assert.equal(get.status, 405)
  assert.equal(get.headers.get('allow'), 'POST')
  assert.equal((await contact.fetch(request(valid, { Origin: 'https://other.example' }))).status, 403)
  assert.equal((await contact.fetch(request(valid, { 'Content-Type': 'text/plain' }))).status, 415)
})

test('rejects malformed, oversized, and invalid submissions before sending', async () => {
  globalThis.fetch = () => { throw new Error('Must not call provider') }
  for (const body of ['{bad', null, [], { ...valid, email: 'invalid' }, { ...valid, name: 'x\nInjected' },
    { ...valid, subject: 'Injected' }, { ...valid, message: 'x'.repeat(5001) }, { ...valid, name: 12 }]) {
    assert.equal((await contact.fetch(request(body))).status, 400)
  }
  assert.equal((await contact.fetch(request('x'.repeat(16_385)))).status, 413)
})

test('discards honeypot submissions without calling the email service', async () => {
  globalThis.fetch = () => { throw new Error('Must not call provider') }
  const response = await contact.fetch(request({ ...valid, website: 'spam.example' }))
  assert.equal(response.status, 200)
  assert.deepEqual(await response.json(), { success: true })
})

test('reports unavailable configuration without exposing secrets', async () => {
  delete process.env.RESEND_API_KEY
  const response = await contact.fetch(request())
  assert.equal(response.status, 503)
  assert.equal(response.headers.get('cache-control'), 'no-store')
})

test('sends only to configured recipient with visitor as reply-to and plain text', async () => {
  configure()
  let calls = 0
  globalThis.fetch = async (url, options) => {
    calls++
    assert.equal(url, 'https://api.resend.com/emails')
    assert.equal(options.headers.Authorization, 'Bearer test-key-not-a-real-secret')
    const body = JSON.parse(options.body)
    assert.deepEqual(body.to, ['owner@example.com'])
    assert.equal(body.from, 'Portfolio <onboarding@resend.dev>')
    assert.equal(body.reply_to, valid.email)
    assert.match(body.text, /<script>/)
    assert.equal(body.html, undefined)
    return Response.json({ id: 'mock-message-id' })
  }
  const response = await contact.fetch(request({ ...valid, message: '<script>user text</script>', to: 'attacker@example.com' }))
  assert.equal(response.status, 200)
  assert.deepEqual(await response.json(), { success: true })
  assert.equal(calls, 1)
})

test('handles provider rejection and network timeout without leaking provider errors', async () => {
  configure()
  globalThis.fetch = async () => Response.json({ error: 'private-provider-detail' }, { status: 403 })
  const rejected = await contact.fetch(request())
  assert.equal(rejected.status, 502)
  assert.doesNotMatch(await rejected.text(), /private-provider-detail|test-key/)
  globalThis.fetch = async () => { throw new DOMException('timeout', 'TimeoutError') }
  assert.equal((await contact.fetch(request())).status, 502)
})
