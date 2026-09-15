import { EVENT } from '../constants'

const links = [
  { href: '#celebrate', label: 'Celebrate' },
  { href: '#attire', label: 'Attire' },
  { href: '#invitation', label: 'Invitation' },
  { href: '#venue', label: 'Venue' },
]

export default function Header({ visible }) {
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[70] bg-gradient-to-b from-ink/85 via-ink/40 to-transparent transition-all duration-700 ${
        visible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <a
          href="#home"
          className="font-cinzel text-sm tracking-[0.28em] text-gold"
        >
          {EVENT.bride[0]} &amp; {EVENT.groom[0]}
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-cinzel text-[10px] tracking-[0.32em] uppercase text-ivory/70 hover:text-gold transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <span className="font-cinzel text-[10px] tracking-[0.28em] text-ivory/60">
          {EVENT.dateShort}
        </span>
      </div>
      <nav className="flex md:hidden items-center justify-center gap-5 pb-3">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="font-cinzel text-[9px] tracking-[0.28em] uppercase text-ivory/70 hover:text-gold transition-colors"
          >
            {l.label}
          </a>
        ))}
      </nav>
  )
}
