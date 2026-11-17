import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { WEDDING_CONFIG } from '../data/weddingData';
import { PetalCanvas } from './PetalCanvas';
import { FloatingFloral, FloralCornerMotif } from './illustrations/IndianMotifs';

interface OpeningCinematicProps {
  onEnterWedding: () => void;
}

export function OpeningCinematic({ onEnterWedding }: OpeningCinematicProps) {
  const prefersReducedMotion = useReducedMotion();
  const [scene, setScene] = useState<1 | 2 | 3>(prefersReducedMotion ? 3 : 1);
  const [isBursting, setIsBursting] = useState(false);

  const burstPetals = useMemo(
    () =>
      Array.from({ length: 26 }, (_, idx) => {
        const angle = (idx / 26) * Math.PI * 2 + (idx % 3) * 0.14;
        const distance = 110 + (idx % 5) * 42;
        return {
          id: idx,
          tx: Math.cos(angle) * distance,
          ty: Math.sin(angle) * distance - 24,
          rot: (idx % 2 === 0 ? 1 : -1) * (120 + idx * 14),
          scale: 0.75 + (idx % 4) * 0.2,
          color:
            idx % 3 === 0 ? '#E88491' : idx % 3 === 1 ? '#F2B84B' : '#FAF5EB',
        };
      }),
    []
  );

  useEffect(() => {
    if (prefersReducedMotion) return;
    const t1 = window.setTimeout(() => setScene(2), 1100);
    const t2 = window.setTimeout(() => setScene(3), 2500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [prefersReducedMotion]);

  const handleOpenDoors = () => {
    if (scene === 1) {
      setScene(2);
      window.setTimeout(() => setScene(3), 1200);
    }
  };

  const handleEnterClick = () => {
    if (isBursting) return;
    if (prefersReducedMotion) {
      onEnterWedding();
      return;
    }
    setIsBursting(true);
    window.setTimeout(() => {
      onEnterWedding();
    }, 780);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#24050A] text-[#FAF5EB]"
      role="dialog"
      aria-modal="true"
      aria-label="Royal Wedding Invitation Opening"
    >
      {/* Background Warm Golden Sanctuary Glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 42%, rgba(217,183,104,0.28) 0%, rgba(107,18,32,0.55) 46%, rgba(28,5,9,0.98) 100%)',
        }}
      />

      {/* Subtle Palace Sanctuary Backdrop (revealed as doors swing open) */}
      <motion.div
        initial={{ scale: 1.08, opacity: 0.2 }}
        animate={{
          scale: scene >= 2 ? 1 : 1.08,
          opacity: scene >= 2 ? 0.55 : 0.15,
        }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/assets/aistudio/6baf8c0f925ed72d3abf4c36512d3f32_7ac2db73.jpg')",
        }}
      />

      {/* Scrim for guaranteed contrast */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-[#1D0408]/75 via-[#2C080F]/65 to-[#180307]/90"
      />

      {/* Floating Petals & Golden Diya Particles */}
      <PetalCanvas variant="gold-rose" count={20} />

      {/* Ornate Temple Frame & Floating Toran Top */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 flex justify-center"
      >
        <FloatingFloral amplitude={3.5} rotateDeg={0.6} duration={5.6} className="w-full max-w-5xl">
          <svg
            viewBox="0 0 900 110"
            className="w-full h-20 sm:h-28 text-[#D9B768]"
            fill="none"
          >
            <path
              d="M40 0 Q145 78 250 0 Q355 78 450 0 Q545 78 650 0 Q755 78 860 0"
              stroke="#D9B768"
              strokeOpacity="0.65"
              strokeWidth="2"
            />
            <path
              d="M65 0 Q155 62 245 0 Q350 62 450 0 Q550 62 655 0 Q745 62 835 0"
              stroke="#FAF5EB"
              strokeOpacity="0.5"
              strokeWidth="4"
              strokeDasharray="2 9"
              strokeLinecap="round"
            />
            {[145, 355, 545, 755].map((x) => (
              <g key={x}>
                <line x1={x} y1="36" x2={x} y2="74" stroke="#D9B768" strokeWidth="1.2" />
                <circle cx={x} cy="78" r="5" fill="#D9822B" />
                <circle cx={x} cy="88" r="3" fill="#FAF5EB" />
              </g>
            ))}
          </svg>
        </FloatingFloral>
      </div>

      {/* Floating Floral Corners */}
      <FloralCornerMotif
        position="bottom-left"
        tone="light-gold"
        className="absolute bottom-2 left-2 z-10 hidden sm:block"
      />
      <FloralCornerMotif
        position="bottom-right"
        tone="light-gold"
        className="absolute bottom-2 right-2 z-10 hidden sm:block"
      />

      {/* Scene 1 & 2: Carved Palace Entrance Doors (3D Perspective Split) */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-6 flex flex-col items-center justify-center min-h-[75vh]">
        <AnimatePresence mode="wait">
          {scene < 3 ? (
            <motion.div
              key="palace-doors"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.06, transition: { duration: 0.75 } }}
              className="relative flex flex-col items-center w-full"
            >
              {/* Archway Frame */}
              <div
                className="relative w-72 sm:w-88 h-96 sm:h-[28rem] rounded-t-[9rem] border-2 border-[#C59B40]/60 p-3 shadow-2xl bg-[#1A0408]/75"
                style={{ perspective: '1200px' }}
              >
                {/* Inner Golden Light Behind Doors */}
                <motion.div
                  animate={{ opacity: scene === 2 ? 1 : 0.25 }}
                  transition={{ duration: 1.1 }}
                  className="absolute inset-3 rounded-t-[8.5rem] flex flex-col items-center justify-center bg-gradient-to-b from-[#FAF5EB]/95 via-[#F6E4BD]/90 to-[#E2C578]/85 text-[#4A0E17] px-6 text-center"
                >
                  <p className="font-script text-3xl sm:text-4xl text-[#8F6B24]">
                    Shubh Vivaha
                  </p>
                  <p className="mt-2 font-serif text-lg sm:text-xl tracking-wide text-[#4A0E17]">
                    Welcome to Our Union
                  </p>
                </motion.div>

                {/* Left Carved Wooden Door */}
                <motion.div
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: scene === 2 ? -108 : 0 }}
                  transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformOrigin: 'left center', transformStyle: 'preserve-3d' }}
                  onClick={handleOpenDoors}
                  className="absolute top-3 bottom-3 left-3 w-[calc(50%-0.75rem)] rounded-tl-[8.5rem] bg-gradient-to-br from-[#5B1721] via-[#410E16] to-[#2B070D] border-r border-[#C59B40]/50 cursor-pointer flex items-center justify-end pr-3 shadow-inner"
                >
                  <div className="absolute inset-4 rounded-tl-[7.5rem] border border-[#C59B40]/35 pointer-events-none" />
                  <div className="w-3 h-3 rounded-full bg-[#D9B768] shadow-[0_0_12px_rgba(217,183,104,0.8)]" />
                </motion.div>

                {/* Right Carved Wooden Door */}
                <motion.div
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: scene === 2 ? 108 : 0 }}
                  transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformOrigin: 'right center', transformStyle: 'preserve-3d' }}
                  onClick={handleOpenDoors}
                  className="absolute top-3 bottom-3 right-3 w-[calc(50%-0.75rem)] rounded-tr-[8.5rem] bg-gradient-to-bl from-[#5B1721] via-[#410E16] to-[#2B070D] border-l border-[#C59B40]/50 cursor-pointer flex items-center justify-start pl-3 shadow-inner"
                >
                  <div className="absolute inset-4 rounded-tr-[7.5rem] border border-[#C59B40]/35 pointer-events-none" />
                  <div className="w-3 h-3 rounded-full bg-[#D9B768] shadow-[0_0_12px_rgba(217,183,104,0.8)]" />
                </motion.div>

                {/* Center Monogram Seal */}
                <motion.button
                  type="button"
                  onClick={handleOpenDoors}
                  animate={{
                    opacity: scene === 1 ? 1 : 0,
                    scale: scene === 1 ? 1 : 0.8,
                  }}
                  transition={{ duration: 0.45 }}
                  aria-label="Open palace doors"
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-24 h-24 rounded-full bg-[#3A0B12] border-2 border-[#D9B768] flex flex-col items-center justify-center shadow-[0_0_30px_rgba(217,183,104,0.45)] cursor-pointer hover:scale-105 transition-transform"
                >
                  <span className="font-serif text-xl tracking-widest text-[#F4DC9A]">
                    A &amp; V
                  </span>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#E2C578]/85 mt-0.5">
                    Unveil
                  </span>
                </motion.button>
              </div>

              <p className="mt-6 text-xs sm:text-sm tracking-[0.28em] uppercase text-[#E2C578]/90">
                {scene === 1 ? 'Entering the Palace Sanctuary' : 'Opening the Mandap Doors'}
              </p>
            </motion.div>
          ) : (
            /* Scene 3: Grand Title Reveal + Petal-Adorned Entrance Button */
            <motion.div
              key="couple-reveal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="text-center max-w-2xl mx-auto px-4"
            >
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="text-xs sm:text-sm tracking-[0.32em] uppercase text-[#E2C578]"
              >
                With the Blessings of Both Families
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="mt-5 font-serif text-5xl sm:text-7xl md:text-8xl font-semibold tracking-tight leading-none gold-shimmer-light"
              >
                {WEDDING_CONFIG.bride.firstName}{' '}
                <span className="inline-block text-[#E88491] text-4xl sm:text-6xl align-middle mx-1">
                  ❤️
                </span>{' '}
                {WEDDING_CONFIG.groom.firstName}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.7 }}
                className="mt-5 font-script text-3xl sm:text-5xl text-[#F7E5B8]"
              >
                {WEDDING_CONFIG.tagline}
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.65, duration: 0.7 }}
                className="mt-6 flex items-center justify-center gap-3 text-xs sm:text-sm tracking-[0.22em] uppercase text-[#FAF5EB]/85"
              >
                <span>{WEDDING_CONFIG.weddingDateDisplay}</span>
                <span aria-hidden="true">·</span>
                <span>{WEDDING_CONFIG.cityDisplay}</span>
              </motion.div>

              {/* Petal-Adorned Entrance Button — Website opens ONLY upon clicking */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.65 }}
                className="mt-10 relative inline-flex items-center justify-center"
              >
                {/* Floating Petals Orbiting the Entrance Button */}
                {!prefersReducedMotion && (
                  <>
                    <motion.span
                      aria-hidden="true"
                      animate={{ y: [-5, 5, -5], rotate: [-12, 10, -12] }}
                      transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
                      className="pointer-events-none absolute -left-6 -top-3"
                    >
                      <svg width="20" height="24" viewBox="0 0 20 26" fill="none">
                        <path
                          d="M10 1C15.5 6 19 12.5 16.5 19C14.5 24 10 25 10 25C10 25 5.5 24 3.5 19C1 12.5 4.5 6 10 1Z"
                          fill="#E88491"
                          fillOpacity="0.92"
                        />
                      </svg>
                    </motion.span>
                    <motion.span
                      aria-hidden="true"
                      animate={{ y: [5, -6, 5], rotate: [15, -10, 15] }}
                      transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
                      className="pointer-events-none absolute -right-6 -bottom-3"
                    >
                      <svg width="20" height="24" viewBox="0 0 20 26" fill="none">
                        <path
                          d="M10 1C15.5 6 19 12.5 16.5 19C14.5 24 10 25 10 25C10 25 5.5 24 3.5 19C1 12.5 4.5 6 10 1Z"
                          fill="#F2B84B"
                          fillOpacity="0.92"
                        />
                      </svg>
                    </motion.span>
                    <motion.span
                      aria-hidden="true"
                      animate={{ y: [-4, 6, -4], rotate: [8, -14, 8] }}
                      transition={{ duration: 4.1, delay: 0.4, repeat: Infinity, ease: 'easeInOut' }}
                      className="pointer-events-none absolute -right-5 -top-3"
                    >
                      <svg width="15" height="18" viewBox="0 0 20 26" fill="none">
                        <path
                          d="M10 1C15.5 6 19 12.5 16.5 19C14.5 24 10 25 10 25C10 25 5.5 24 3.5 19C1 12.5 4.5 6 10 1Z"
                          fill="#FAF5EB"
                          fillOpacity="0.88"
                        />
                      </svg>
                    </motion.span>
                    <motion.span
                      aria-hidden="true"
                      animate={{ y: [4, -5, 4], rotate: [-14, 8, -14] }}
                      transition={{ duration: 3.6, delay: 0.7, repeat: Infinity, ease: 'easeInOut' }}
                      className="pointer-events-none absolute -left-5 -bottom-2"
                    >
                      <svg width="16" height="20" viewBox="0 0 20 26" fill="none">
                        <path
                          d="M10 1C15.5 6 19 12.5 16.5 19C14.5 24 10 25 10 25C10 25 5.5 24 3.5 19C1 12.5 4.5 6 10 1Z"
                          fill="#E59F42"
                          fillOpacity="0.9"
                        />
                      </svg>
                    </motion.span>
                  </>
                )}

                {/* Celebratory Petal Shower Burst on Click */}
                {isBursting &&
                  burstPetals.map((petal) => (
                    <motion.span
                      key={petal.id}
                      aria-hidden="true"
                      initial={{ x: 0, y: 0, scale: 0.3, opacity: 1, rotate: 0 }}
                      animate={{
                        x: petal.tx,
                        y: petal.ty,
                        scale: petal.scale,
                        opacity: 0,
                        rotate: petal.rot,
                      }}
                      transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1] }}
                      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
                    >
                      <svg width="18" height="22" viewBox="0 0 20 26" fill="none">
                        <path
                          d="M10 1C15.5 6 19 12.5 16.5 19C14.5 24 10 25 10 25C10 25 5.5 24 3.5 19C1 12.5 4.5 6 10 1Z"
                          fill={petal.color}
                        />
                      </svg>
                    </motion.span>
                  ))}

                <button
                  type="button"
                  onClick={handleEnterClick}
                  className="group relative z-20 inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#C59B40] via-[#E2C578] to-[#C59B40] text-[#2A080D] font-semibold text-sm tracking-[0.2em] uppercase shadow-[0_12px_36px_rgba(197,155,64,0.38)] hover:shadow-[0_16px_42px_rgba(226,197,120,0.58)] transition-all cursor-pointer whitespace-nowrap"
                >
                  <svg width="16" height="20" viewBox="0 0 20 26" fill="none" aria-hidden="true">
                    <path
                      d="M10 1C15.5 6 19 12.5 16.5 19C14.5 24 10 25 10 25C10 25 5.5 24 3.5 19C1 12.5 4.5 6 10 1Z"
                      fill="#6B1220"
                    />
                  </svg>
                  <span>Enter Wedding</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
