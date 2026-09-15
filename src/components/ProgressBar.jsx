import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function ProgressBar() {
  const barRef = useRef(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? window.scrollY / max : 0
      gsap.set(bar, { scaleX: p })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[80] h-[3px] bg-transparent">
      <div
        ref={barRef}
        className="h-full origin-left scale-x-0 gold-hairline"
      />
    </div>
  )
}
