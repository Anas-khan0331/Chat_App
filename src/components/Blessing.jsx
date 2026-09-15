import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { EVENT } from '../constants'
import { GoldDivider, OrnamentWatermark, SectionEyebrow } from './Ornaments'

gsap.registerPlugin(ScrollTrigger)

const VIRTUES = ['Faith', 'Mercy', 'Companionship']

export default function Blessing() {
  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const ctx = gsap.context(() => {
      gsap.from('.bless-reveal', {
        y: 32,
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
      id="blessing"
      ref={rootRef}
      className="relative overflow-hidden bg-charcoal py-16 sm:py-24 md:py-32"
    >
      <img
        src="/images/gold-florals.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-[0.12]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-ink/80 to-charcoal" />
      <OrnamentWatermark className="absolute left-1/2 top-1/2 w-[min(380px,70vw)] -translate-x-1/2 -translate-y-1/2 opacity-[0.16]" />

      <div className="relative mx-auto max-w-2xl px-5 sm:px-6 text-center">
        <SectionEyebrow className="bless-reveal">A Blessing</SectionEyebrow>
        <h2 className="bless-reveal mt-4 font-cinzel text-3xl sm:text-5xl gold-text">
          A prayer for their home
        </h2>
        <GoldDivider className="bless-reveal my-7 sm:my-8" />

        <p className="bless-reveal font-amiri text-xl sm:text-3xl leading-relaxed text-gold-light/90">
          رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا
          <br />
          وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ
        </p>
        <p className="bless-reveal mt-6 font-cormorant italic text-base sm:text-xl text-ivory/75 leading-relaxed">
          “Our Lord, grant us from among our spouses and our offspring
          comfort to our eyes, and make us an example for the righteous.”
        </p>
        <p className="bless-reveal mt-3 font-cinzel text-[9px] sm:text-[10px] tracking-[0.28em] uppercase text-gold/70">
          Qur’an 25:74
        </p>

        <ul className="bless-reveal mt-12 sm:mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:gap-x-10">
          {VIRTUES.map((item, i) => (
            <li key={item} className="flex items-center gap-6 sm:gap-10">
              {i > 0 && (
                <span className="hidden sm:block h-1 w-1 rounded-full bg-gold/70" />
              )}
              <span className="font-cinzel text-[10px] sm:text-xs tracking-[0.32em] uppercase text-gold">
                {item}
              </span>
            </li>
          ))}
        </ul>

        <p className="bless-reveal mt-12 sm:mt-14 font-cormorant text-base sm:text-lg text-ivory/70 leading-relaxed">
          May Allah bless the union of {EVENT.groom} &amp; {EVENT.bride}
          with sakīnah, fill their days with light, and let this Nikkah be
          the beginning of a home built on prayer.
        </p>
        <p className="bless-reveal mt-6 font-vibes text-3xl sm:text-4xl text-gold-light">
          Ameen
        </p>
      </div>
    </section>
  )
}
