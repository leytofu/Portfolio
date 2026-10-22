import type { AvailabilitySchedule } from '@/types'

export function isOffDutyAt(now: Date, schedule: AvailabilitySchedule): boolean {
  const hour = Number(new Intl.DateTimeFormat('en-US', {
    timeZone: schedule.timeZone,
    hour: 'numeric',
    hourCycle: 'h23',
  }).format(now))
  const { offDutyStartHour: start, offDutyEndHour: end } = schedule
  return start <= end ? hour >= start && hour < end : hour >= start || hour < end
}
