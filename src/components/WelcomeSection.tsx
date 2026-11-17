import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { WEDDING_CONFIG } from '../data/weddingData';
import { PetalCanvas } from './PetalCanvas';
import { FloralCornerMotif } from './illustrations/IndianMotifs';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(targetIso: string): TimeLeft {
  const diff = Math.max(0, new Date(targetIso).getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function MiniCountdownTile({ value, label }: { value: number; label: string }) {
  const formatted = String(value).padStart(2, '0');
  return (
    <div className="rounded-xl border border-[#C59B40]/40 bg-[#26050A]/75 px-3 py-3 text-center backdrop-blur-sm">
      <div className="relative h-9 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={formatted}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="font-serif text-2xl sm:text-3xl font-semibold text-[#F6E4AD] tabular-nums"
          >
            {formatted}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="block mt-0.5 text-[10px] tracking-[0.22em] uppercase text-[#E2C578]/85">
        {label}
      </span>
    </div>
  );
}

export function WelcomeSection() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(WEDDING_CONFIG.targetIsoDate)
  );

  useEffect(() => {
    const id = window.setInterval(() => {
      setTimeLeft(calculateTimeLeft(WEDDING_CONFIG.targetIsoDate));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="welcome"
      className="relative overflow-hidden bg-[#32080E] text-[#FAF5EB]"
    >
      {/* Royal Maroon Temple Threshold Backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-right opacity-55"
        style={{ backgroundImage: `url('${WEDDING_CONFIG.welcomeBackdrop}')` }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[#220408] via-[#3A0B12]/86 to-[#220408]/45"
      />

      <PetalCanvas variant="gold-rose" count={12} />

      <FloralCornerMotif
        position="top-left"
        tone="light-gold"
        className="absolute top-3 left-3 z-10 hidden sm:block opacity-75"
      />
      <FloralCornerMotif
        position="bottom-right"
        tone="light-gold"
        className="absolute bottom-3 right-3 z-10 hidden sm:block opacity-75"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 space-y-5"
        >
          <p className="text-xs sm:text-sm tracking-[0.28em] uppercase text-[#E2C578]">
            Shubh Vivaha Patrika · {WEDDING_CONFIG.cityDisplay}
          </p>

          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.04]">
            <span className="block text-[#FAF5EB]">{WEDDING_CONFIG.bride.fullName}</span>
            <span className="block font-script text-4xl sm:text-5xl text-[#E2C578] my-1">
              weds
            </span>
            <span className="block text-[#FAF5EB]">{WEDDING_CONFIG.groom.fullName}</span>
          </h1>

          <p className="font-serif italic text-lg sm:text-xl text-[#F2D5D9]/90 max-w-xl leading-relaxed">
            “{WEDDING_CONFIG.tagline}” — Together with our families, we invite you to celebrate our
            sacred marriage and mandap union in Udaipur.
          </p>

          <div className="text-xs sm:text-sm text-[#FAF5EB]/80 space-y-1">
            <p>{WEDDING_CONFIG.bride.parents}</p>
            <p>{WEDDING_CONFIG.groom.parents}</p>
          </div>

          <div className="pt-3 flex flex-wrap items-center gap-4">
            <a
              href="#celebrations"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-gradient-to-r from-[#C59B40] to-[#E2C578] text-[#2A080D] text-xs font-semibold tracking-[0.18em] uppercase hover:brightness-105 transition-all whitespace-nowrap"
            >
              Mandap &amp; Celebrations
            </a>
            <a
              href="#venue-map"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-[#E2C578]/55 text-[#FAF5EB] text-xs font-semibold tracking-[0.18em] uppercase hover:bg-[#FAF5EB]/10 transition-colors whitespace-nowrap"
            >
              View Location Map
            </a>
          </div>
        </motion.div>

        {/* Live Muhurat Countdown Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5"
        >
          <div className="rounded-2xl border border-[#C59B40]/50 bg-[#1F0408]/75 backdrop-blur-md p-6 sm:p-7 shadow-2xl text-center">
            <p className="font-script text-3xl text-[#F6E4AD]">{WEDDING_CONFIG.monogram}</p>
            <p className="mt-1 text-xs tracking-[0.22em] uppercase text-[#E2C578]">
              {WEDDING_CONFIG.muhuratDateDisplay}
            </p>
            <div className="mt-5 grid grid-cols-4 gap-2.5">
              <MiniCountdownTile value={timeLeft.days} label="Days" />
              <MiniCountdownTile value={timeLeft.hours} label="Hours" />
              <MiniCountdownTile value={timeLeft.minutes} label="Mins" />
              <MiniCountdownTile value={timeLeft.seconds} label="Secs" />
            </div>
            <p className="mt-4 text-xs text-[#F2D5D9]/80">
              {WEDDING_CONFIG.weddingDateDisplay} · Lake Pichola Palaces
            </p>
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 pb-6 flex justify-center">
        <a
          href="#celebrations"
          aria-label="Scroll to Mandap and Celebrations"
          className="inline-flex flex-col items-center gap-1 text-[11px] tracking-[0.24em] uppercase text-[#E2C578]/85 hover:text-[#FAF5EB] transition-colors"
        >
          <span>Explore Marriage &amp; Mandap</span>
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.span>
        </a>
      </div>
    </section>
  );
}
