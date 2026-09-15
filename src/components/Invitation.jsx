import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { EVENT } from '../constants'
import { useCountdown } from '../hooks/useCountdown'
import { GoldDivider, OrnamentWatermark, SectionEyebrow } from './Ornaments'

gsap.registerPlugin(ScrollTrigger)

function pad(n) {
  return String(n).padStart(2, '0')
}

function TimeBox({ value, label }) {
  return (
    <div className="flex flex-col items-center min-w-[58px] sm:min-w-[96px]">
      <div className="relative w-full border border-gold/40 bg-ink/50 px-2 py-3 sm:px-3 sm:py-5">
        <span className="block font-cinzel text-2xl sm:text-5xl gold-text leading-none tabular-nums">
          {pad(value)}
        </span>
      </div>
      <span className="mt-2 font-cinzel text-[9px] sm:text-[10px] tracking-[0.32em] uppercase text-gold/80">
        {label}
      </span>
    </div>
  )
}

export default function Invitation() {
  const rootRef = useRef(null)
  const time = useCountdown(EVENT.iso)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const ctx = gsap.context(() => {
      gsap.from('.invite-reveal', {
        y: 36,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: root, start: 'top 75%' },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="invitation"
      ref={rootRef}
      className="relative overflow-hidden bg-ink py-24 sm:py-32"
    >
      <OrnamentWatermark className="absolute left-1/2 top-1/2 w-[min(520px,90vw)] -translate-x-1/2 -translate-y-1/2 opacity-20" />

      <div className="relative mx-auto max-w-3xl px-6">
        <div className="invitation-frame relative bg-ink/80 px-6 py-12 sm:px-14 sm:py-16 text-center">
          <SectionEyebrow className="invite-reveal">The Invitation</SectionEyebrow>
          <p className="invite-reveal mt-6 font-amiri text-xl text-gold-light/90 italic">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
          <GoldDivider className="invite-reveal my-6" />
          <p className="invite-reveal font-cormorant text-lg sm:text-xl italic text-ivory/80 leading-relaxed">
            With the blessings of Almighty Allah, the families of the bride and
            groom request the honour of your presence at the Nikkah of
          </p>
          <h2 className="invite-reveal mt-8 font-cinzel">
            <span className="gold-text block text-4xl sm:text-6xl">{EVENT.bride}</span>
            <span className="font-vibes text-3xl text-gold-light block my-1">&amp;</span>
            <span className="gold-text block text-4xl sm:text-6xl">{EVENT.groom}</span>
          </h2>
          <p className="invite-reveal mt-8 font-cormorant text-lg text-ivory/80">
            on {EVENT.dateLabel}
            <br />
            at {EVENT.venue}
          </p>
          <p className="invite-reveal mt-8 font-cormorant italic text-ivory/60 text-base">
            “And He placed between you affection and mercy.”
            <span className="block mt-1 not-italic font-cinzel text-[10px] tracking-[0.28em] uppercase text-gold/70">
              Qur’an 30:21
            </span>
          </p>

          <div className="invite-reveal mt-12">
            {time.done ? (
              <p className="font-cinzel tracking-[0.28em] uppercase text-gold">
                The celebration has begun
              </p>
            ) : (
              <>
                <p className="font-cinzel text-[10px] tracking-[0.4em] uppercase text-gold mb-5">
                  Counting down to forever
                </p>
                <div className="flex items-start justify-center gap-2 sm:gap-4">
                  <TimeBox value={time.days} label="Days" />
                  <span className="font-cinzel text-2xl text-gold mt-4">:</span>
                  <TimeBox value={time.hours} label="Hours" />
                  <span className="font-cinzel text-2xl text-gold mt-4">:</span>
                  <TimeBox value={time.minutes} label="Minutes" />
                  <span className="font-cinzel text-2xl text-gold mt-4">:</span>
                  <TimeBox value={time.seconds} label="Seconds" />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
