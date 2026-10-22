import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import { isOffDutyAt } from '../src/lib/availability.ts'

const { availability: schedule } = JSON.parse(readFileSync(new URL('../src/data/portfolio.json', import.meta.url), 'utf8'))

test('off-duty starts at exactly 2 AM and ends at exactly 5 AM Philippine time', () => {
  for (const [time, expected] of [
    ['2026-10-22T00:00:00+08:00', false],
    ['2026-10-22T01:59:59+08:00', false],
    ['2026-10-22T02:00:00+08:00', true],
    ['2026-10-22T04:59:59+08:00', true],
    ['2026-10-22T05:00:00+08:00', false],
    ['2026-10-22T23:59:59+08:00', false],
  ]) {
    assert.equal(isOffDutyAt(new Date(time), schedule), expected, time)
  }
})

test('schedule follows Manila time for visitors in other time zones', () => {
  for (const time of ['2026-10-21T18:00:00Z', '2026-10-21T11:00:00-07:00', '2026-10-22T03:00:00+09:00']) {
    assert.equal(isOffDutyAt(new Date(time), schedule), true, time)
  }
  assert.equal(isOffDutyAt(new Date('2026-10-21T21:00:00Z'), schedule), false)
})

