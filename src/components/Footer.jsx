import { EVENT } from '../constants'
import { GoldDivider } from './Ornaments'

export default function Footer() {
  return (
    <footer className="relative bg-ink py-16 text-center overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px gold-hairline opacity-70" />
      <div className="mx-auto max-w-xl px-6">
        <p className="font-amiri text-lg text-gold/80 italic mb-4">إن شاء الله</p>
        <p className="font-vibes text-4xl text-gold-light">
          {EVENT.groom} &amp; {EVENT.bride}
        </p>
        <GoldDivider className="my-5" />
        <p className="font-cormorant text-ivory/65">
          We look forward to celebrating with you.
        </p>
        <p className="mt-3 font-cinzel text-[10px] tracking-[0.35em] uppercase text-gold/70">
          {EVENT.dateShort} · {EVENT.venueShort}
        </p>
      </div>
    </footer>
  )
}
