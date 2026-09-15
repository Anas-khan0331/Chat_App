import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { EVENT } from '../constants'
import { GhostGoldButton, GoldDivider, SectionEyebrow } from './Ornaments'

gsap.registerPlugin(ScrollTrigger)

export default function Venue() {
  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const ctx = gsap.context(() => {
      gsap.from('.venue-reveal', {
        y: 40,
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
    <section id="venue" ref={rootRef} className="relative bg-charcoal py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14">
          <SectionEyebrow className="venue-reveal">Venue &amp; Schedule</SectionEyebrow>
          <h2 className="venue-reveal mt-4 font-cinzel text-3xl sm:text-5xl gold-text">
            {EVENT.venueShort}
          </h2>
          <GoldDivider className="venue-reveal my-6" />
          <p className="venue-reveal font-cormorant text-base sm:text-lg text-ivory/75">
            {EVENT.city} · {EVENT.dateLabel}
          </p>
        </div>

        <div className="venue-reveal relative mb-10 sm:mb-12 overflow-hidden">
          <img
            src="/images/badshahi-dusk.jpg"
            alt="Badshahi Mosque at dusk"
            className="h-52 sm:h-[42vh] min-h-[200px] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-ink/20 to-transparent" />
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="venue-reveal">
            <h3 className="font-cinzel text-xs sm:text-sm tracking-[0.28em] uppercase text-gold mb-8">
              The day unfolds
            </h3>
            <ol className="relative border-l border-gold/30 ml-2 space-y-8">
              {EVENT.schedule.map((item) => (
                <li key={item.title} className="pl-7 sm:pl-8 relative">
                  <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-gold shadow-gold" />
                  <p className="font-cinzel text-[10px] sm:text-[11px] tracking-[0.22em] sm:tracking-[0.28em] uppercase text-gold">
                    {item.time}
                  </p>
                  <h4 className="mt-1 font-cormorant text-xl sm:text-2xl text-ivory">
                    {item.title}
                  </h4>
                  <p className="mt-1 font-outfit text-sm text-ivory/65 leading-relaxed">
                    {item.detail}
                  </p>
                </li>
              ))}
            </ol>

            <div className="mt-10">
              <GhostGoldButton
                href={EVENT.mapsDirections}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto"
              >
                Get Directions
              </GhostGoldButton>
            </div>
          </div>

          <div className="venue-reveal min-w-0">
            <h3 className="font-cinzel text-xs sm:text-sm tracking-[0.28em] uppercase text-gold mb-6">
              Find us
            </h3>
            <div className="overflow-hidden border border-gold/25 bg-ink">
              <iframe
                title="Map of Badshahi Mosque, Lahore"
                src={EVENT.mapsEmbed}
                className="h-[240px] sm:h-[320px] w-full max-w-full grayscale-[30%] contrast-125"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-4 sm:px-5 py-4 border-t border-gold/20">
                <p className="font-cormorant text-ivory/80 text-sm sm:text-base">
                  {EVENT.venue}
                </p>
                <a
                  href={EVENT.mapsDirections}
                  target="_blank"
                  rel="noreferrer"
                  className="font-cinzel text-[10px] tracking-[0.28em] uppercase text-gold hover:text-gold-light"
                >
                  Open Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
