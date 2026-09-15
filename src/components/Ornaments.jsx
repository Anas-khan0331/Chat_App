export function GoldDivider({ className = '' }) {
  return (
    <div
      className={`flex items-center justify-center gap-3 ${className}`}
      aria-hidden="true"
    >
      <span className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent to-gold" />
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path
          d="M11 1.5L12.9 8.3L20 11L12.9 13.7L11 20.5L9.1 13.7L2 11L9.1 8.3L11 1.5Z"
          fill="#D4AF37"
        />
      </svg>
      <span className="h-px w-10 sm:w-16 bg-gradient-to-l from-transparent to-gold" />
    </div>
  )
}

export function CrescentMark({ className = 'w-8 h-8' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M28 6.5c-9.4 1.8-16.4 10-16.4 19.9 0 11 8.9 19.9 19.9 19.9 3.4 0 6.6-.9 9.4-2.4C36.2 39.8 28 32 28 22.2c0-6.4 3.4-12 8.5-15.2C33.9 6.2 31 5.8 28 6.5Z"
        fill="#D4AF37"
      />
    </svg>
  )
}

export function SectionEyebrow({ children, className = '' }) {
  return (
    <p className={`font-cinzel text-[11px] tracking-[0.42em] uppercase text-gold ${className}`}>
      {children}
    </p>
  )
}

export function GoldButton({ href, children, className = '', ...props }) {
  const Comp = href ? 'a' : 'button'
  return (
    <Comp
      href={href}
      className={`group relative inline-flex items-center justify-center overflow-hidden px-7 py-3 font-cinzel text-[11px] tracking-[0.28em] uppercase text-ink bg-gold hover:bg-gold-light transition-colors duration-300 ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-full transition-transform duration-700" />
    </Comp>
  )
}

export function GhostGoldButton({ href, children, className = '', ...props }) {
  const Comp = href ? 'a' : 'button'
  return (
    <Comp
      href={href}
      className={`inline-flex items-center justify-center px-7 py-3 font-cinzel text-[11px] tracking-[0.28em] uppercase text-gold border border-gold/70 hover:bg-gold hover:text-ink transition-colors duration-300 ${className}`}
      {...props}
    >
      {children}
    </Comp>
  )
}

export function SparkleField() {
  const dots = [
    { left: '12%', top: '22%', delay: '0s', size: 3 },
    { left: '22%', top: '68%', delay: '0.6s', size: 2 },
    { left: '78%', top: '18%', delay: '1.1s', size: 3 },
    { left: '86%', top: '62%', delay: '0.3s', size: 2 },
    { left: '48%', top: '14%', delay: '1.6s', size: 2 },
    { left: '64%', top: '78%', delay: '0.9s', size: 3 },
    { left: '8%', top: '48%', delay: '1.4s', size: 2 },
    { left: '92%', top: '40%', delay: '0.2s', size: 2 },
    { left: '36%', top: '84%', delay: '1.8s', size: 3 },
    { left: '70%', top: '30%', delay: '0.5s', size: 2 },
  ]

  return (
    <div className="pointer-events-none absolute inset-0 z-[3]" aria-hidden="true">
      {dots.map((d, i) => (
        <span
          key={i}
          className="sparkle absolute rounded-full bg-gold-light"
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            animationDelay: d.delay,
            boxShadow: '0 0 10px 2px rgba(212,175,55,0.55)',
          }}
        />
      ))}
    </div>
  )
}

export function OrnamentWatermark({ className = '' }) {
  return (
    <img
      src="/images/gold-ornament.jpg"
      alt=""
      className={`pointer-events-none select-none mix-blend-screen opacity-40 ${className}`}
    />
  )
}
