import { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { EVENT } from '../constants'
import { GoldDivider, SparkleField } from './Ornaments'

function Holdback() {
  return (
    <div className="relative h-8 w-8 sm:h-11 sm:w-11">
      <span className="absolute inset-0 rounded-full bg-gradient-to-br from-gold-light via-gold to-gold-deep shadow-gold" />
      <span className="absolute inset-[3px] rounded-full border border-ink/40 bg-gradient-to-b from-burgundy to-ink" />
      <span className="absolute inset-[6px] rounded-full border border-gold/80" />
    </div>
  )
}

function openWidth() {
  if (window.innerWidth < 400) return '52px'
  if (window.innerWidth < 640) return '64px'
  if (window.innerWidth < 1024) return '12vw'
  return '15vw'
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

    const width = openWidth()
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const leftRadius = {
      borderTopRightRadius: '55% 32%',
      borderBottomRightRadius: '80% 48%',
    }
    const rightRadius = {
      borderTopLeftRadius: '55% 32%',
      borderBottomLeftRadius: '80% 48%',
    }

    if (reduced) {
      gsap.set(leftRef.current, { width, ...leftRadius })
      gsap.set(rightRef.current, { width, ...rightRadius })
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
          width,
          ...leftRadius,
          duration: 2.2,
          ease: 'power3.inOut',
        },
        0.08
      )
      .to(
        rightRef.current,
        {
          width,
          ...rightRadius,
          duration: 2.2,
          ease: 'power3.inOut',
        },
        0.08
      )
      .to(
        [leftTieRef.current, rightTieRef.current],
        { autoAlpha: 1, scale: 1, duration: 0.55, ease: 'back.out(1.8)' },
        1.25
      )
      .fromTo(
        contentRef.current?.querySelectorAll('.hero-reveal') ?? [],
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power2.out' },
        0.95
      )
      .to(bgRef.current, { scale: 1.08, duration: 18, ease: 'none' }, 1.1)
  }, [])

  useEffect(() => {
    gsap.set([leftTieRef.current, rightTieRef.current], { autoAlpha: 0, scale: 0.6 })

    let cancelled = false
    const kick = () => {
      if (!cancelled) openCurtains()
    }
    const timer = window.setTimeout(kick, 800)
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
      className="relative h-[100svh] w-full overflow-hidden grain"
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
        className="relative z-10 flex h-full flex-col items-center justify-center px-12 sm:px-20 md:px-28 lg:px-36 text-center"
      >
        <p className="hero-reveal font-amiri text-lg sm:text-2xl text-gold-light/90 italic mb-4 sm:mb-5">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>
        <GoldDivider className="hero-reveal mb-4 sm:mb-5" />
        <h1 className="hero-reveal font-cinzel font-semibold leading-none">
          <span className="gold-text block text-[2.15rem] sm:text-6xl md:text-7xl lg:text-8xl">
            {EVENT.groom}
          </span>
          <span className="font-vibes text-3xl sm:text-5xl text-gold-light block my-1 sm:my-2">
            &amp;
          </span>
          <span className="gold-text block text-[2.15rem] sm:text-6xl md:text-7xl lg:text-8xl">
            {EVENT.bride}
          </span>
        </h1>
        <GoldDivider className="hero-reveal mt-5 sm:mt-6 mb-4 sm:mb-5" />
        <p className="hero-reveal font-cormorant italic text-base sm:text-xl text-ivory/85">
          {EVENT.dateLabel}
        </p>
        <p className="hero-reveal font-cinzel text-[10px] sm:text-[11px] tracking-[0.22em] sm:tracking-[0.32em] uppercase text-gold/90 mt-3">
          {EVENT.venue}
        </p>
        <p className="hero-reveal font-cormorant text-ivory/60 mt-4 sm:mt-6 text-sm tracking-wide">
          Nikkah Ceremony
        </p>

        <div className="hero-reveal scroll-cue mt-8 sm:mt-10 flex flex-col items-center gap-2 text-gold/80">
          <span className="font-cinzel text-[9px] tracking-[0.4em] uppercase">
            Scroll
          </span>
          <span className="block h-8 sm:h-10 w-px bg-gradient-to-b from-gold to-transparent" />
        </div>
      </div>

      <div className="pointer-events-none absolute top-0 left-0 right-0 z-50 h-[7vh] min-h-[40px] sm:h-[8.5vh] sm:min-h-[56px] overflow-hidden">
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
      </div>

      <div
        ref={leftRef}
        className="pointer-events-none absolute top-0 bottom-0 left-0 z-40 w-1/2 overflow-hidden"
        style={{
          filter: 'drop-shadow(10px 0 18px rgba(0,0,0,0.5))',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/images/velvet-curtain.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: 'scaleX(-1)',
            transformOrigin: 'center center',
          }}
        />
        <div className="absolute inset-0 curtain-folds" />
        <div
          ref={leftTieRef}
          className="absolute right-2 sm:right-3 top-[46%] z-10 -translate-y-1/2"
        >
          <Holdback />
        </div>
      </div>

      <div
        ref={rightRef}
        className="pointer-events-none absolute top-0 bottom-0 right-0 z-40 w-1/2 overflow-hidden"
        style={{
          filter: 'drop-shadow(-10px 0 18px rgba(0,0,0,0.5))',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/images/velvet-curtain.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 curtain-folds" />
        <div
          ref={rightTieRef}
          className="absolute left-2 sm:left-3 top-[46%] z-10 -translate-y-1/2"
        >
          <Holdback />
        </div>
      </div>

      <div
        ref={sealRef}
        className={`pointer-events-none absolute left-1/2 top-1/2 z-50 flex h-20 w-20 sm:h-28 sm:w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-gold/80 bg-gradient-to-b from-burgundy to-ink shadow-gold ${
          opened ? 'opacity-0' : ''
        }`}
      >
        <span className="seal-ring absolute inset-0 rounded-full border border-gold/50" />
        <span
          className="seal-ring absolute inset-[-8px] rounded-full border border-gold/20"
          style={{ animationDelay: '0.6s' }}
        />
        <span className="font-cinzel text-base sm:text-lg tracking-[0.18em] text-gold">
          A&amp;F
        </span>
      </div>
    </section>
  )
}
