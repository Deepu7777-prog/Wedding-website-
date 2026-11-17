import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { WEDDING_CONFIG } from '../data/weddingData';

const NAV_ITEMS = [
  { label: 'Welcome', href: '#welcome' },
  { label: 'Mandap & Events', href: '#celebrations' },
  { label: 'Location', href: '#venue-map' },
  { label: 'RSVP', href: '#rsvp' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF5EB]/92 backdrop-blur-md border-b border-[#C59B40]/25">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#welcome"
          className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-[#4A0E17] whitespace-nowrap shrink-0"
        >
          {WEDDING_CONFIG.bride.firstName} &amp; {WEDDING_CONFIG.groom.firstName}
        </a>

        {/* Zone 2: 4 concise single-line nav links */}
        <nav
          aria-label="Wedding sections"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#4A252B]"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative py-1 hover:text-[#6B1220] transition-colors whitespace-nowrap shrink-0 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-px after:w-0 after:bg-[#C59B40] hover:after:w-full after:transition-all"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#rsvp"
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#6B1220] text-[#FAF5EB] text-xs font-semibold tracking-[0.16em] uppercase hover:bg-[#4A0E17] transition-colors whitespace-nowrap shrink-0"
          >
            RSVP
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#C59B40]/40 text-[#4A0E17] hover:bg-[#F3EAD8] transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#FAF5EB] border-t border-[#C59B40]/20 px-6 py-4 space-y-2">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2.5 text-base font-medium text-[#4A0E17] border-b border-[#C59B40]/15"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#rsvp"
            onClick={() => setMobileOpen(false)}
            className="mt-3 block w-full text-center py-3 rounded-full bg-[#6B1220] text-[#FAF5EB] text-xs font-semibold tracking-[0.18em] uppercase"
          >
            RSVP Now
          </a>
        </div>
      )}
    </header>
  );
}
