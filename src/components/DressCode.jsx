import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GoldDivider, SectionEyebrow } from './Ornaments'

gsap.registerPlugin(ScrollTrigger)

const CARDS = [
  {
    kicker: 'The Palette',
    title: 'White Theme',
    copy: 'Ivory, champagne, soft white and muted gold. Think moonlight on marble — luminous, never loud.',
  },
  {
    kicker: 'For Her',
    title: 'Royal elegance',
    copy: 'Ivory or white ensembles with gold embroidery, pearls, and refined jewelry. Flowing silhouettes, gracious ease.',
  },
  {
    kicker: 'For Him',
    title: 'Ivory & gold',
    copy: 'A white or ivory sherwani, or a tailored ivory suit, finished with champagne or gold accents.',
  },
]

export default function DressCode() {
  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    let cleanups = []
    const ctx = gsap.context(() => {
      gsap.from('.dress-reveal', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: root, start: 'top 75%' },
      })

      const cards = gsap.utils.toArray('.attire-card')
      cleanups = cards.map((card) => {
        const shine = card.querySelector('.card-shine')
        const enter = () => {
          gsap.to(card, {
            y: -8,
            boxShadow: '0 24px 60px rgba(212,175,55,0.16)',
            duration: 0.4,
            ease: 'power2.out',
          })
          gsap.fromTo(
            shine,
            { x: '-120%' },
            { x: '120%', duration: 0.8, ease: 'power2.inOut' }
          )
        }
        const leave = () => {
          gsap.to(card, {
            y: 0,
            boxShadow: '0 0 0 rgba(0,0,0,0)',
            duration: 0.4,
            ease: 'power2.out',
          })
        }
        card.addEventListener('mouseenter', enter)
        card.addEventListener('mouseleave', leave)
        return () => {
          card.removeEventListener('mouseenter', enter)
          card.removeEventListener('mouseleave', leave)
        }
      })
    }, root)
    return () => {
      cleanups.forEach((fn) => fn())
      ctx.revert()
    }
  }, [])

  return (
    <section
      id="attire"
      ref={rootRef}
      className="relative bg-charcoal py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center text-center">
          <SectionEyebrow className="dress-reveal">Dress Code</SectionEyebrow>
          <h2 className="dress-reveal mt-4 font-cinzel text-3xl sm:text-5xl gold-text">
            White Theme &amp; Royal Elegant Attire
          </h2>
          <GoldDivider className="dress-reveal my-6" />
          <p className="dress-reveal max-w-2xl font-cormorant text-lg text-ivory/75">
            Kindly honour the sacred hour in whites and golds. Please refrain
            from bright colours so the gathering remains a single, serene
            tableau.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2 items-stretch">
          <div className="dress-reveal relative overflow-hidden min-h-[320px] lg:min-h-full">
            <img
              src="/images/white-attire.jpg"
              alt="Ivory sherwani, gold jewelry and champagne florals"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            <p className="absolute bottom-5 left-5 right-5 font-cinzel text-[10px] tracking-[0.32em] uppercase text-gold">
              Ivory · Champagne · Gold
            </p>
          </div>

          <div className="grid gap-5">
            {CARDS.map((card) => (
              <article
                key={card.title}
                className="attire-card dress-reveal relative overflow-hidden border border-gold/25 bg-ink/60 p-6 sm:p-7"
              >
                <span className="card-shine pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
                <p className="font-cinzel text-[10px] tracking-[0.35em] uppercase text-gold">
                  {card.kicker}
                </p>
                <h3 className="mt-2 font-cormorant text-2xl text-ivory">
                  {card.title}
                </h3>
                <p className="mt-3 font-outfit text-sm leading-relaxed text-ivory/70">
                  {card.copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
