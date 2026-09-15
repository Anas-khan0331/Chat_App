import { useCallback, useLayoutEffect, useRef, useState } from 'react'
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
  if (typeof window === 'undefined') return '15vw'
  if (window.innerWidth < 400) return '52px'
  if (window.innerWidth < 640) return '64px'
  if (window.innerWidth < 1024) return '12vw'
  return '15vw'
}

const LEFT_OPEN_RADIUS = {
  borderTopRightRadius: '55% 32%',
  borderBottomRightRadius: '80% 48%',
}
const RIGHT_OPEN_RADIUS = {
  borderTopLeftRadius: '55% 32%',
  borderBottomLeftRadius: '80% 48%',
}

export default function CurtainHero() {
  const leftRef = useRef(null)
  const rightRef = useRef(null)
  const leftTieRef = useRef(null)
  const rightTieRef = useRef(null)
  const sealRef = useRef(null)
  const contentRef = useRef(null)
  const busyRef = useRef(false)
  const openedRef = useRef(false)
  const introDoneRef = useRef(false)
  const [opened, setOpened] = useState(false)
  const [canToggle, setCanToggle] = useState(false)

  const openCurtains = useCallback((isIntro = false) => {
    if (busyRef.current || openedRef.current) return
    busyRef.current = true
    const width = openWidth()

    const tl = gsap.timeline({
      onComplete: () => {
        openedRef.current = true
        busyRef.current = false
        setOpened(true)
        introDoneRef.current = true
        setCanToggle(true)
      },
    })

    tl.to(sealRef.current, {
      opacity: 0,
      scale: 0.55,
      duration: isIntro ? 0.45 : 0.3,
      ease: 'power2.in',
    })
      .to(
        leftRef.current,
        {
          width,
          ...LEFT_OPEN_RADIUS,
          duration: isIntro ? 2.4 : 1.6,
          ease: 'power3.inOut',
        },
        isIntro ? 0.15 : 0
      )
      .to(
        rightRef.current,
        {
          width,
          ...RIGHT_OPEN_RADIUS,
          duration: isIntro ? 2.4 : 1.6,
          ease: 'power3.inOut',
        },
        isIntro ? 0.15 : 0
      )
      .to(
        [leftTieRef.current, rightTieRef.current],
        { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'back.out(1.6)' },
        isIntro ? 1.45 : 0.9
      )
      .fromTo(
        contentRef.current,
        { opacity: 0.35 },
        { opacity: 1, duration: 0.9, ease: 'power2.out' },
        isIntro ? 1.1 : 0.2
      )
  }, [])

  const closeCurtains = useCallback(() => {
    if (!introDoneRef.current || busyRef.current || !openedRef.current) return
    busyRef.current = true

    gsap.timeline({
      onComplete: () => {
        openedRef.current = false
        busyRef.current = false
        setOpened(false)
      },
    })
      .to([leftTieRef.current, rightTieRef.current], { autoAlpha: 0, scale: 0.7, duration: 0.2 }, 0)
      .to(
        leftRef.current,
        {
          width: '50%',
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          duration: 1.5,
          ease: 'power3.inOut',
        },
        0
      )
      .to(
        rightRef.current,
        {
          width: '50%',
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          duration: 1.5,
          ease: 'power3.inOut',
        },
        0
      )
      .to(sealRef.current, { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out' }, 1)
  }, [])

  const toggleCurtains = useCallback(() => {
    if (!introDoneRef.current || !canToggle || busyRef.current) return
    if (openedRef.current) closeCurtains()
    else openCurtains(false)
  }, [canToggle, closeCurtains, openCurtains])

  useLayoutEffect(() => {
    gsap.set(leftRef.current, {
      width: '50%',
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    })
    gsap.set(rightRef.current, {
      width: '50%',
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    })
    gsap.set([leftTieRef.current, rightTieRef.current], { autoAlpha: 0, scale: 0.6 })
    gsap.set(sealRef.current, { opacity: 1, scale: 1 })
    gsap.set(contentRef.current, { opacity: 0.35 })

    const delay = window.setTimeout(() => openCurtains(true), 700)
    return () => window.clearTimeout(delay)
  }, [openCurtains])

  const onKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggleCurtains()
    }
  }

  return (
    <section className="relative w-full min-h-[640px] h-[100svh] overflow-hidden grain">
      <div className="absolute inset-0 z-0 overflow-hidden bg-ink">
        <img
          src="/images/hero-mosque.jpg"
          alt="Grand mosque interior"
          className="h-full w-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/45 to-ink/85" />
      </div>

      <SparkleField />

      <div
        ref={contentRef}
        className="relative z-10 flex h-full min-h-[640px] flex-col items-center justify-center px-12 sm:px-20 md:px-28 lg:px-36 text-center pointer-events-none"
      >
        <p className="font-amiri text-lg sm:text-2xl text-gold-light/90 italic mb-4 sm:mb-5">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>
        <GoldDivider className="mb-4 sm:mb-5" />
        <h1 className="font-cinzel font-semibold leading-none">
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
        <GoldDivider className="mt-5 sm:mt-6 mb-4 sm:mb-5" />
        <p className="font-cormorant italic text-base sm:text-xl text-ivory/85">
          {EVENT.dateLabel}
        </p>
        <p className="font-cinzel text-[10px] sm:text-[11px] tracking-[0.22em] sm:tracking-[0.32em] uppercase text-gold/90 mt-3">
          {EVENT.venue}
        </p>
        <p className="font-cormorant text-ivory/60 mt-4 sm:mt-6 text-sm tracking-wide">
          Nikkah Ceremony
        </p>
        <div className="scroll-cue mt-8 sm:mt-10 flex flex-col items-center gap-2 text-gold/80">
          <span className="font-cinzel text-[9px] tracking-[0.4em] uppercase">Scroll</span>
          <span className="block h-8 sm:h-10 w-px bg-gradient-to-b from-gold to-transparent" />
        </div>
      </div>

      <div className="pointer-events-none absolute top-0 left-0 right-0 z-50 h-[7vh] min-h-[40px] sm:min-h-[56px] overflow-hidden">
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
        role="button"
        tabIndex={canToggle ? 0 : -1}
        aria-label={opened ? 'Close curtains' : 'Open curtains'}
        onClick={toggleCurtains}
        onKeyDown={onKey}
        className={`absolute top-0 bottom-0 left-0 z-40 w-1/2 overflow-hidden ${
          canToggle ? 'cursor-pointer' : 'cursor-default'
        }`}
        style={{ filter: 'drop-shadow(10px 0 18px rgba(0,0,0,0.5))' }}
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
        <div className="absolute inset-0 curtain-folds pointer-events-none" />
        <div
          ref={leftTieRef}
          className="pointer-events-none absolute right-2 sm:right-3 top-[46%] z-10 -translate-y-1/2"
        >
          <Holdback />
        </div>
      </div>

      <div
        ref={rightRef}
        role="button"
        tabIndex={canToggle ? 0 : -1}
        aria-label={opened ? 'Close curtains' : 'Open curtains'}
        onClick={toggleCurtains}
        onKeyDown={onKey}
        className={`absolute top-0 bottom-0 right-0 z-40 w-1/2 overflow-hidden ${
          canToggle ? 'cursor-pointer' : 'cursor-default'
        }`}
        style={{ filter: 'drop-shadow(-10px 0 18px rgba(0,0,0,0.5))' }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/images/velvet-curtain.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 curtain-folds pointer-events-none" />
        <div
          ref={rightTieRef}
          className="pointer-events-none absolute left-2 sm:left-3 top-[46%] z-10 -translate-y-1/2"
        >
          <Holdback />
        </div>
      </div>

      <button
        type="button"
        ref={sealRef}
        onClick={toggleCurtains}
        aria-label="Open curtains"
        className={`absolute left-1/2 top-1/2 z-50 flex h-20 w-20 sm:h-28 sm:w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-gold/80 bg-gradient-to-b from-burgundy to-ink shadow-gold ${
          opened || !canToggle ? 'pointer-events-none' : 'cursor-pointer'
        }`}
      >
        <span className="seal-ring pointer-events-none absolute inset-0 rounded-full border border-gold/50" />
        <span className="font-cinzel text-base sm:text-lg tracking-[0.18em] text-gold">
          A&amp;F
        </span>
      </button>
    </section>
  )
}
