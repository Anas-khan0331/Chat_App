import { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { EVENT } from '../constants'
import { GoldDivider, SparkleField } from './Ornaments'

export default function CurtainHero({ onOpened }) {
  const leftRef = useRef(null)
  const rightRef = useRef(null)
  const valanceRef = useRef(null)
  const sealRef = useRef(null)
  const contentRef = useRef(null)
  const bgRef = useRef(null)
  const openedRef = useRef(false)
  const [opened, setOpened] = useState(false)

  const openCurtains = useCallback(() => {
    if (openedRef.current) return
    openedRef.current = true

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced) {
      gsap.set(leftRef.current, { xPercent: -100 })
      gsap.set(rightRef.current, { xPercent: 100 })
      gsap.set([valanceRef.current, sealRef.current], { autoAlpha: 0 })
      gsap.set('.hero-reveal', { opacity: 1, y: 0 })
      document.body.style.overflow = ''
      setOpened(true)
      onOpened?.()
      return
    }

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = ''
        setOpened(true)
        onOpened?.()
      },
    })

    tl.to(sealRef.current, {
      scale: 0.55,
      opacity: 0,
      duration: 0.45,
      ease: 'power2.in',
    })
      .to(
        leftRef.current,
        { xPercent: -100, duration: 2.25, ease: 'power3.inOut' },
        0.12
      )
      .to(
        rightRef.current,
        { xPercent: 100, duration: 2.25, ease: 'power3.inOut' },
        0.12
      )
      .to(
        valanceRef.current,
        { yPercent: -110, duration: 1.55, ease: 'power3.inOut' },
        0.28
      )
      .fromTo(
        contentRef.current?.querySelectorAll('.hero-reveal') ?? [],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.05, stagger: 0.11, ease: 'power2.out' },
        1.05
      )
      .to(
        bgRef.current,
        { scale: 1.08, duration: 18, ease: 'none' },
        1.2
      )
  }, [onOpened])

  useEffect(() => {
    let cancelled = false
    document.body.style.overflow = 'hidden'
    const kick = () => {
      if (!cancelled) openCurtains()
    }
    const timer = window.setTimeout(kick, 2400)
    window.addEventListener('wheel', kick, { once: true, passive: true })
    window.addEventListener('touchmove', kick, { once: true, passive: true })
    window.addEventListener('keydown', kick, { once: true })

    return () => {
      cancelled = true
      window.clearTimeout(timer)
      window.removeEventListener('wheel', kick)
      window.removeEventListener('touchmove', kick)
      window.removeEventListener('keydown', kick)
      document.body.style.overflow = ''
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
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <p className="hero-reveal font-amiri text-xl sm:text-2xl text-gold-light/90 italic mb-5">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>
        <p className="hero-reveal font-cinzel text-[11px] sm:text-xs tracking-[0.5em] uppercase text-gold mb-3">
          Save the Date
        </p>
        <GoldDivider className="hero-reveal mb-5" />
        <h1 className="hero-reveal font-cinzel font-semibold leading-none">
          <span className="gold-text block text-5xl sm:text-7xl md:text-8xl">
            {EVENT.bride}
          </span>
          <span className="font-vibes text-4xl sm:text-5xl text-gold-light block my-2">
            &amp;
          </span>
          <span className="gold-text block text-5xl sm:text-7xl md:text-8xl">
            {EVENT.groom}
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

        <div
          className={`hero-reveal scroll-cue mt-12 flex flex-col items-center gap-2 text-gold/80 ${
            opened ? 'opacity-100' : ''
          }`}
        >
          <span className="font-cinzel text-[9px] tracking-[0.4em] uppercase">
            Scroll
          </span>
          <span className="block h-10 w-px bg-gradient-to-b from-gold to-transparent" />
        </div>
      </div>

      {/* Valance */}
      <div
        ref={valanceRef}
        className={`absolute top-0 left-0 right-0 z-50 h-[8.5vh] min-h-[56px] overflow-hidden ${
          opened ? 'pointer-events-none' : ''
        }`}
      >
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

      {/* Left curtain */}
      <div
        ref={leftRef}
        className={`absolute inset-y-0 left-0 z-40 w-1/2 overflow-hidden will-change-transform ${
          opened ? 'pointer-events-none' : ''
        }`}
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
        <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-black/40 to-transparent" />
        <div className="absolute top-0 right-0 bottom-0 w-[3px] bg-gradient-to-b from-gold-light via-gold to-gold-deep" />
      </div>

      {/* Right curtain */}
      <div
        ref={rightRef}
        className={`absolute inset-y-0 right-0 z-40 w-1/2 overflow-hidden will-change-transform ${
          opened ? 'pointer-events-none' : ''
        }`}
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
        <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black/40 to-transparent" />
        <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-gradient-to-b from-gold-light via-gold to-gold-deep" />
      </div>

      {/* Wax seal */}
      <button
        ref={sealRef}
        type="button"
        onClick={openCurtains}
        aria-label="Open the invitation"
        className={`absolute left-1/2 top-1/2 z-50 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-gold/80 bg-gradient-to-b from-burgundy to-ink shadow-gold ${
          opened ? 'pointer-events-none' : ''
        }`}
      >
        <span className="seal-ring pointer-events-none absolute inset-0 rounded-full border border-gold/50" />
        <span className="seal-ring pointer-events-none absolute inset-[-8px] rounded-full border border-gold/20" style={{ animationDelay: '0.6s' }} />
        <span className="font-cinzel text-lg tracking-[0.2em] text-gold">
          F&amp;A
        </span>
        <span className="mt-1 font-cinzel text-[8px] tracking-[0.35em] uppercase text-champagne/80">
          Open
        </span>
      </button>
    </section>
  )
}
