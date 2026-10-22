import { useEffect, useState } from 'react'
import portfolio from '@/data/portfolio.json'
import { isOffDutyAt } from '@/lib/availability'

const schedule = portfolio.availability

export function useAvailability() {
  const [isOffDuty, setIsOffDuty] = useState(() => isOffDutyAt(new Date(), schedule))

  useEffect(() => {
    const update = () => setIsOffDuty(isOffDutyAt(new Date(), schedule))
    const timer = window.setInterval(update, 1000)
    window.addEventListener('focus', update)
    document.addEventListener('visibilitychange', update)
    return () => {
      window.clearInterval(timer)
      window.removeEventListener('focus', update)
      document.removeEventListener('visibilitychange', update)
    }
  }, [])

  return { isOffDuty, label: isOffDuty ? schedule.offDutyLabel : schedule.onlineLabel }
}
