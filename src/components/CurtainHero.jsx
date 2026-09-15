import { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { EVENT } from '../constants'
import { GoldDivider, SparkleField } from './Ornaments'

const LEFT_CLIP_CLOSED =
  'polygon(0% 0%, 100% 0%, 100% 14%, 100% 38%, 100% 50%, 100% 62%, 100% 86%, 100% 100%, 0% 100%)'
const LEFT_CLIP_OPEN =
  'polygon(0% 0%, 100% 0%, 78% 14%, 46% 38%, 34% 50%, 46% 62%, 78% 86%, 100% 100%, 0% 100%)'
const RIGHT_CLIP_CLOSED =
  'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 86%, 0% 62%, 0% 50%, 0% 38%, 0% 14%)'
const RIGHT_CLIP_OPEN =
  'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 22% 86%, 54% 62%, 66% 50%, 54% 38%, 22% 14%)'

function Holdback() {
  return (
    <div className="relative h-11 w-11">
      <span className="absolute inset-0 rounded-full bg-gradient-to-br from-gold-light via-gold to-gold-deep shadow-gold" />
      <span className="absolute inset-[3px] rounded-full border border-ink/40 bg-gradient-to-b from-burgundy to-ink" />
      <span className="absolute inset-[7px] rounded-full border border-gold/80" />
    </div>
  )
}

export default function CurtainHero() {
  const leftRef = useRef(null)
  const rightRef = useRef(null)
  const leftTieRef = useRef(null)
  const rightTieRef = useRef(null)
  const sealRef = useRef(null)
  const contentRef = useRef(null)
  const bgRef = useRef(null)
  const openedRef = useRef(false)
  const [opened, setOpened] = useState(false)

  const openCurtains = useCallback(() => {
    if (openedRef.current) return
    openedRef.current = true

    const rest = window.innerWidth < 640 ? -72 : -63
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced) {
      gsap.set(leftRef.current, { xPercent: rest, clipPath: LEFT_CLIP_OPEN })
      gsap.set(rightRef.current, { xPercent: -rest, clipPath: RIGHT_CLIP_OPEN })
      gsap.set(sealRef.current, { autoAlpha: 0 })
      gsap.set([leftTieRef.current, rightTieRef.current], { autoAlpha: 1 })
      gsap.set('.hero-reveal', { opacity: 1, y: 0 })
      setOpened(true)
      return
    }

    const tl = gsap.timeline({
      onComplete: () => setOpened(true),
    })

    tl.to(sealRef.current, {
      scale: 0.55,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
    })
      .to(
        leftRef.current,
        {
          xPercent: rest,
          clipPath: LEFT_CLIP_OPEN,
          duration: 2.3,
          ease: 'power3.inOut',
        },
        0.08
      )
      .to(
        rightRef.current,
        {
          xPercent: -rest,
          clipPath: RIGHT_CLIP_OPEN,
          duration: 2.3,
          ease: 'power3.inOut',
        },
        0.08
      )
      .to(
        [leftTieRef.current, rightTieRef.current],
        { autoAlpha: 1, scale: 1, duration: 0.6, ease: 'back.out(1.8)' },
        1.35
      )
      .fromTo(
        contentRef.current?.querySelectorAll('.hero-reveal') ?? [],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.05, stagger: 0.11, ease: 'power2.out' },
        1.05
      )
      .to(bgRef.current, { scale: 1.08, duration: 18, ease: 'none' }, 1.2)
  }, [])

  useEffect(() => {
    gsap.set(leftRef.current, { clipPath: LEFT_CLIP_CLOSED })
    gsap.set(rightRef.current, { clipPath: RIGHT_CLIP_CLOSED })
    gsap.set([leftTieRef.current, rightTieRef.current], { autoAlpha: 0, scale: 0.6 })

    let cancelled = false
    const kick = () => {
      if (!cancelled) openCurtains()
    }
    const timer = window.setTimeout(kick, 900)
    window.addEventListener('wheel', kick, { passive: true })
    window.addEventListener('touchmove', kick, { passive: true })
    window.addEventListener('scroll', kick, { passive: true })

    return () => {
      cancelled = true
      window.clearTimeout(timer)
      window.removeEventListener('wheel', kick)
      window.removeEventListener('touchmove', kick)
      window.removeEventListener('scroll', kick)
    }
  }, [openCurtains])

  return (
    <section
      id="home"
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden grain"
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          ref={bgRef}
          src="/images/hero-mosque.jpg"
          alt="Grand mosque interior"
          className="h-full w-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/45 to-ink/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(13,13,13,0.55)_100%)]" />
      </div>

      <SparkleField />

      <div
        ref={contentRef}
        className="relative z-10 flex h-full flex-col items-center justify-center px-[18vw] text-center"
      >
        <p className="hero-reveal font-amiri text-xl sm:text-2xl text-gold-light/90 italic mb-5">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>
        <p className="hero-reveal font-cinzel text-[11px] sm:text-xs tracking-[0.5em] uppercase text-gold mb-3">
          Save the Date
        </p>
        <GoldDivider className="hero-reveal mb-5" />
        <h1 className="hero-reveal font-cinzel font-semibold leading-none">
          <span className="gold-text block text-4xl sm:text-6xl md:text-8xl">
            {EVENT.groom}
          </span>
          <span className="font-vibes text-4xl sm:text-5xl text-gold-light block my-2">
            &amp;
          </span>
          <span className="gold-text block text-4xl sm:text-6xl md:text-8xl">
            {EVENT.bride}
          </span>
        </h1>
        <GoldDivider className="hero-reveal mt-6 mb-5" />
        <p className="hero-reveal font-cormorant italic text-lg sm:text-xl text-ivory/85">
          {EVENT.dateLabel}
        </p>
        <p className="hero-reveal font-cinzel text-[11px] tracking-[0.32em] uppercase text-gold/90 mt-3">
          {EVENT.venue}
        </p>
        <p className="hero-reveal font-cormorant text-ivory/60 mt-6 text-sm tracking-wide">
          Nikkah Ceremony
        </p>

        <div className="hero-reveal scroll-cue mt-10 flex flex-col items-center gap-2 text-gold/80">
          <span className="font-cinzel text-[9px] tracking-[0.4em] uppercase">
            Scroll
          </span>
          <span className="block h-10 w-px bg-gradient-to-b from-gold to-transparent" />
        </div>
      </div>

      <div className="pointer-events-none absolute top-0 left-0 right-0 z-50 h-[8.5vh] min-h-[56px] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/images/velvet-curtain.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'top center',
          }}
        />
        <div className="absolute inset-0 bg-black/25 curtain-folds" />
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold-deep via-gold-light to-gold-deep" />
        <div className="absolute -bottom-[10px] left-0 right-0 flex justify-around">
          {Array.from({ length: 18 }).map((_, i) => (
            <span
              key={i}
              className="block h-3 w-[2px] bg-gradient-to-b from-gold to-transparent"
            />
          ))}
        </div>
      </div>

      <div
        ref={leftRef}
        className="pointer-events-none absolute inset-y-0 left-0 z-40 w-1/2 will-change-transform"
        style={{
          clipPath: LEFT_CLIP_CLOSED,
          filter: 'drop-shadow(12px 0 22px rgba(0,0,0,0.55))',
        }}
      >
        <div
          className="absolute inset-0 origin-left"
          style={{
            backgroundImage: 'url(/images/velvet-curtain.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'left center',
            transform: 'scaleX(-1) scale(1.1)',
          }}
        />
        <div className="absolute inset-0 curtain-folds" />
        <div
          ref={leftTieRef}
          className="absolute right-[10%] top-1/2 z-10 -translate-y-1/2"
        >
          <Holdback />
        </div>
      </div>

      <div
        ref={rightRef}
        className="pointer-events-none absolute inset-y-0 right-0 z-40 w-1/2 will-change-transform"
        style={{
          clipPath: RIGHT_CLIP_CLOSED,
          filter: 'drop-shadow(-12px 0 22px rgba(0,0,0,0.55))',
        }}
      >
        <div
          className="absolute inset-0 scale-110 origin-right"
          style={{
            backgroundImage: 'url(/images/velvet-curtain.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'left center',
          }}
        />
        <div className="absolute inset-0 curtain-folds" />
        <div
          ref={rightTieRef}
          className="absolute left-[10%] top-1/2 z-10 -translate-y-1/2"
        >
          <Holdback />
        </div>
      </div>

      <div
        ref={sealRef}
        className={`pointer-events-none absolute left-1/2 top-1/2 z-50 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-gold/80 bg-gradient-to-b from-burgundy to-ink shadow-gold ${
          opened ? 'opacity-0' : ''
        }`}
      >
        <span className="seal-ring absolute inset-0 rounded-full border border-gold/50" />
        <span
          className="seal-ring absolute inset-[-8px] rounded-full border border-gold/20"
          style={{ animationDelay: '0.6s' }}
        />
        <span className="font-cinzel text-lg tracking-[0.18em] text-gold">
          A&amp;F
        </span>
      </div>
    </section>
  )
}
