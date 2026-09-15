import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GoldDivider, SectionEyebrow } from './Ornaments'

gsap.registerPlugin(ScrollTrigger)

const BALLOONS = [
  { left: '6%', color: '#D4AF37', scale: 1, delay: 0, duration: 11 },
  { left: '14%', color: '#F7E7CE', scale: 0.78, delay: 0.35, duration: 13 },
  { left: '22%', color: '#C9A227', scale: 0.9, delay: 0.7, duration: 10 },
  { left: '31%', color: '#8B2942', scale: 0.7, delay: 0.2, duration: 14 },
  { left: '68%', color: '#F8F9FA', scale: 0.82, delay: 0.5, duration: 12 },
  { left: '76%', color: '#D4AF37', scale: 0.95, delay: 0.15, duration: 11.5 },
  { left: '84%', color: '#E8C872', scale: 0.72, delay: 0.85, duration: 13.5 },
  { left: '91%', color: '#F7E7CE', scale: 0.88, delay: 0.4, duration: 10.5 },
  { left: '40%', color: '#D4AF37', scale: 0.6, delay: 1.1, duration: 15 },
  { left: '58%', color: '#8B2942', scale: 0.65, delay: 0.95, duration: 12.8 },
]

function Balloon({ color, style, id }) {
  const gid = `balloon-grad-${id}`
  return (
    <svg
      viewBox="0 0 70 130"
      className="balloon pointer-events-none absolute bottom-0 z-[15] w-[52px] sm:w-[64px] origin-bottom"
      style={style}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.45" />
          <stop offset="45%" stopColor={color} />
          <stop offset="100%" stopColor={color} stopOpacity="0.85" />
        </linearGradient>
      </defs>
      <path
        d="M35 8c-14 0-26 13-26 30 0 14 8 26 20 30l-4 8h20l-4-8c12-4 20-16 20-30C61 21 49 8 35 8z"
        fill={`url(#${gid})`}
        stroke="rgba(255,255,255,0.25)"
      />
      <ellipse cx="26" cy="24" rx="6" ry="10" fill="white" opacity="0.28" />
      <path
        d="M35 76 C 42 92, 28 108, 35 126"
        fill="none"
        stroke="#d4af37"
        strokeWidth="1.2"
        opacity="0.7"
      />
    </svg>
  )
}

function Popper({ side }) {
  const flip = side === 'right'
  return (
    <svg
      className={`popper-${side} pointer-events-none absolute bottom-[28%] z-[25] w-16 sm:w-20 ${
        flip ? 'right-[4%] -scale-x-100' : 'left-[4%]'
      }`}
      viewBox="0 0 80 80"
      aria-hidden="true"
    >
      <path d="M8 72 L40 8 L48 16 L16 80 Z" fill="#D4AF37" />
      <path d="M16 80 L48 16 L56 24 L24 84 Z" fill="#A68629" />
      <circle cx="40" cy="12" r="6" fill="#F8E7B8" />
    </svg>
  )
}

function createConfetti(canvas) {
  const ctx = canvas.getContext('2d')
  const colors = ['#D4AF37', '#F7E7CE', '#F8F9FA', '#C9A227', '#E8C872', '#8B2942', '#FFF8DC']
  const particles = []
  let raf = 0
  let running = true

  const resize = () => {
    const { width, height } = canvas.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  const burst = (x, y, direction) => {
    const count = 90
    for (let i = 0; i < count; i += 1) {
      const spread = (Math.random() - 0.5) * 1.35
      const speed = 7 + Math.random() * 13
      particles.push({
        x,
        y,
        vx: Math.cos(direction + spread) * speed,
        vy: Math.sin(direction + spread) * speed,
        w: 5 + Math.random() * 8,
        h: 3 + Math.random() * 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.35,
        life: 1,
        decay: 0.0035 + Math.random() * 0.005,
        shape: Math.random() > 0.45 ? 'rect' : 'circle',
      })
    }
  }

  const tick = () => {
    if (!running) return
    const { width, height } = canvas.getBoundingClientRect()
    ctx.clearRect(0, 0, width, height)
    for (let i = particles.length - 1; i >= 0; i -= 1) {
      const p = particles[i]
      p.vy += 0.16
      p.vx *= 0.992
      p.x += p.vx
      p.y += p.vy
      p.rot += p.vr
      p.life -= p.decay
      if (p.life <= 0 || p.y > height + 30) {
        particles.splice(i, 1)
        continue
      }
      ctx.save()
      ctx.globalAlpha = Math.min(1, p.life * 1.6)
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rot)
      ctx.fillStyle = p.color
      if (p.shape === 'circle') {
        ctx.beginPath()
        ctx.ellipse(0, 0, p.w / 2, p.h / 2, 0, 0, Math.PI * 2)
        ctx.fill()
      } else {
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
      }
      ctx.restore()
    }
    raf = requestAnimationFrame(tick)
  }

  resize()
  tick()

  return {
    burst,
    resize,
    destroy() {
      running = false
      cancelAnimationFrame(raf)
    },
  }
}

export default function Celebration() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const fired = useRef(false)

  useEffect(() => {
    const section = sectionRef.current
    const canvas = canvasRef.current
    if (!section || !canvas) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const engine = createConfetti(canvas)
    const onResize = () => engine.resize()
    window.addEventListener('resize', onResize)

    const ctx = gsap.context(() => {
      gsap.from('.cele-reveal', {
        y: 36,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 75%' },
      })

      if (reduced) return

      const balloons = gsap.utils.toArray('.balloon')
      balloons.forEach((el, i) => {
        const conf = BALLOONS[i]
        gsap.fromTo(
          el,
          { y: 80, opacity: 0 },
          {
            y: () => -window.innerHeight - 180,
            opacity: 1,
            duration: conf.duration,
            delay: conf.delay,
            ease: 'none',
            scrollTrigger: { trigger: section, start: 'top 78%' },
          }
        )
        gsap.to(el, {
          x: i % 2 === 0 ? 18 : -18,
          rotation: i % 2 === 0 ? 8 : -8,
          duration: 2.2 + (i % 3) * 0.4,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
        })
      })

      ScrollTrigger.create({
        trigger: section,
        start: 'top 70%',
        once: true,
        onEnter: () => {
          if (fired.current) return
          fired.current = true
          const rect = canvas.getBoundingClientRect()
          engine.burst(rect.width * 0.12, rect.height * 0.62, -0.7)
          engine.burst(rect.width * 0.88, rect.height * 0.62, -Math.PI + 0.7)
          gsap.fromTo(
            '.popper-left',
            { rotate: -25 },
            { rotate: 12, duration: 0.45, ease: 'back.out(2)' }
          )
          gsap.fromTo(
            '.popper-right',
            { rotate: 25 },
            { rotate: -12, duration: 0.45, ease: 'back.out(2)' }
          )
          window.setTimeout(() => {
            engine.burst(rect.width * 0.5, rect.height * 0.28, Math.PI / 2)
          }, 350)
        },
      })
    }, section)

    return () => {
      window.removeEventListener('resize', onResize)
      engine.destroy()
      ctx.revert()
    }
  }, [])

  return (
    <section
      id="celebrate"
      ref={sectionRef}
      className="relative min-h-[90vh] overflow-hidden bg-ink py-28"
    >
      <img
        src="/images/gold-florals.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/80 to-ink" />

      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-20 h-full w-full"
      />

      {BALLOONS.map((b, i) => (
        <Balloon
          key={i}
          id={i}
          color={b.color}
          style={{
            left: b.left,
            transform: `scale(${b.scale})`,
          }}
        />
      ))}

      <Popper side="left" />
      <Popper side="right" />

      <div className="relative z-30 mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
        <SectionEyebrow className="cele-reveal">A Joyous Occasion</SectionEyebrow>
        <h2 className="cele-reveal mt-4 font-cinzel text-3xl sm:text-5xl gold-text">
          Let the celebrations begin
        </h2>
        <GoldDivider className="cele-reveal my-6" />
        <p className="cele-reveal font-cormorant text-lg sm:text-xl text-ivory/80 leading-relaxed">
          Two hearts, one prayer, and a lifetime of mercy. Join us as Anas
          &amp; Fatima begin their journey of love, faith, and togetherness —
          surrounded by the people they hold dearest.
        </p>
      </div>
    </section>
  )
}
