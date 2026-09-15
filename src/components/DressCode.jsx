import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GoldDivider, OrnamentWatermark, SectionEyebrow } from './Ornaments'

gsap.registerPlugin(ScrollTrigger)

const SWATCHES = [
  { name: 'Ivory', color: '#F4EFE4' },
  { name: 'Pearl', color: '#F8F9FA' },
  { name: 'Champagne', color: '#F7E7CE' },
  { name: 'Gold', color: '#D4AF37' },
]

function GoldCorners() {
  return (
    <>
      <span className="absolute top-3 left-3 h-8 w-8 border-t border-l border-gold/80" />
      <span className="absolute top-3 right-3 h-8 w-8 border-t border-r border-gold/80" />
      <span className="absolute bottom-3 left-3 h-8 w-8 border-b border-l border-gold/80" />
      <span className="absolute bottom-3 right-3 h-8 w-8 border-b border-r border-gold/80" />
    </>
  )
}

export default function DressCode() {
  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const ctx = gsap.context(() => {
      gsap.from('.dress-reveal', {
        y: 36,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: root, start: 'top 75%' },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="attire"
      ref={rootRef}
      className="relative overflow-hidden bg-ink py-24 sm:py-32"
    >
      <OrnamentWatermark className="absolute left-1/2 top-[12%] w-[min(420px,80vw)] -translate-x-1/2 opacity-[0.18]" />

      <div className="relative mx-auto max-w-5xl px-6">
        <div className="flex flex-col items-center text-center">
          <SectionEyebrow className="dress-reveal">Dress Code</SectionEyebrow>
          <h2 className="dress-reveal mt-4 font-cinzel text-3xl sm:text-5xl gold-text">
            White Theme
          </h2>
          <p className="dress-reveal mt-2 font-cormorant italic text-xl sm:text-2xl text-ivory/80">
            Royal elegant attire
          </p>
          <GoldDivider className="dress-reveal my-8" />
        </div>

        <ul className="dress-reveal mb-14 flex flex-wrap items-end justify-center gap-8 sm:gap-12">
          {SWATCHES.map((s) => (
            <li key={s.name} className="flex flex-col items-center gap-3">
              <span
                className="h-12 w-12 sm:h-14 sm:w-14 rounded-full border border-gold/50 shadow-[0_0_0_4px_rgba(13,13,13,0.9),0_0_0_5px_rgba(212,175,55,0.35)]"
                style={{ background: s.color }}
              />
              <span className="font-cinzel text-[10px] tracking-[0.32em] uppercase text-gold/90">
                {s.name}
              </span>
            </li>
          ))}
        </ul>

        <figure className="dress-reveal relative mx-auto max-w-3xl border border-gold/35 bg-ink p-3 sm:p-4">
          <GoldCorners />
          <div className="relative overflow-hidden">
            <img
              src="/images/white-attire.jpg"
              alt="Ivory sherwani, gold jewelry and champagne florals"
              className="h-[42vh] min-h-[260px] w-full object-cover sm:h-[52vh]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
          </div>
          <figcaption className="relative pt-4 pb-1 text-center font-cinzel text-[10px] tracking-[0.38em] uppercase text-gold">
            Ivory · Champagne · Gold
          </figcaption>
        </figure>

        <div className="dress-reveal mx-auto mt-16 grid max-w-3xl gap-12 sm:grid-cols-[1fr_auto_1fr] sm:gap-0">
          <div className="text-center sm:px-8">
            <p className="font-cinzel text-[10px] tracking-[0.4em] uppercase text-gold">
              For Her
            </p>
            <h3 className="mt-3 font-cormorant text-3xl text-ivory">Grace in ivory</h3>
            <p className="mt-4 font-cormorant text-lg leading-relaxed text-ivory/70">
              White or ivory ensembles, pearls, and gold jewelry. Flowing
              silhouettes — luminous, never loud.
            </p>
          </div>

          <div className="hidden sm:block w-px bg-gradient-to-b from-transparent via-gold/70 to-transparent" />

          <div className="text-center sm:px-8">
            <p className="font-cinzel text-[10px] tracking-[0.4em] uppercase text-gold">
              For Him
            </p>
            <h3 className="mt-3 font-cormorant text-3xl text-ivory">Ivory &amp; gold</h3>
            <p className="mt-4 font-cormorant text-lg leading-relaxed text-ivory/70">
              A white or ivory sherwani, or a tailored ivory suit, finished
              with champagne or gold accents.
            </p>
          </div>
        </div>

        <p className="dress-reveal mx-auto mt-14 max-w-xl text-center font-cormorant italic text-ivory/55">
          Kindly refrain from bright colours, so the gathering remains a
          single, serene tableau.
        </p>
      </div>
    </section>
  )
}
