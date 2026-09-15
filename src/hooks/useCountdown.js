import { useEffect, useState } from 'react'

function calc(targetIso) {
  const diff = new Date(targetIso).getTime() - Date.now()
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true }
  }
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1000),
    done: false,
  }
}

export function useCountdown(targetIso) {
  const [time, setTime] = useState(() => calc(targetIso))

  useEffect(() => {
    const id = setInterval(() => setTime(calc(targetIso)), 1000)
    return () => clearInterval(id)
  }, [targetIso])

  return time
}
