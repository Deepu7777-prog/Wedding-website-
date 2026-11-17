import { motion } from 'motion/react';
import { RotateCcw } from 'lucide-react';
import { WEDDING_CONFIG } from '../data/weddingData';
import {
  FloatingFloral,
  FloralCornerMotif,
  MandalaDivider,
} from './illustrations/IndianMotifs';

interface FinalBlessingsSectionProps {
  onReplayOpening: () => void;
}

export function FinalBlessingsSection({ onReplayOpening }: FinalBlessingsSectionProps) {
  return (
    <footer className="relative bg-[#2B070D] text-[#FAF5EB] overflow-hidden">
      <FloralCornerMotif
        position="top-left"
        tone="light-gold"
        className="absolute top-4 left-4 z-10 hidden sm:block opacity-75"
      />
      <FloralCornerMotif
        position="top-right"
        tone="light-gold"
        className="absolute top-4 right-4 z-10 hidden sm:block opacity-75"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 py-16 sm:py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs tracking-[0.28em] uppercase text-[#E2C578]">
            Divine Grace &amp; Gratitude
          </p>
          <h2 className="mt-2 font-serif text-4xl sm:text-5xl font-semibold text-[#FAF5EB]">
            Blessings from Above
          </h2>
          <MandalaDivider tone="light" className="my-4" />

          <FloatingFloral
            amplitude={4}
            rotateDeg={0.6}
            duration={6.4}
            className="mt-6 max-w-xs sm:max-w-sm mx-auto rounded-t-[10rem] rounded-b-2xl overflow-hidden border-2 border-[#C59B40]/60 shadow-2xl bg-[#FAF5EB]"
          >
            <img
              src="/assets/aistudio/fcb83de4b554c14ce3440be0d57754e8_a8ffeed4.jpg"
              alt="Divine blessings with sacred lotus blossoms and floral arch"
              referrerPolicy="no-referrer"
              className="w-full aspect-[9/14] object-cover object-center"
            />
          </FloatingFloral>

          <p className="mt-7 font-serif italic text-lg sm:text-xl text-[#F2D5D9]/90 leading-relaxed max-w-xl mx-auto">
            “Your presence and blessings are the greatest gifts as we step into our lifelong
            journey together.”
          </p>

          <p className="mt-4 font-script text-4xl sm:text-5xl text-[#E2C578]">
            {WEDDING_CONFIG.bride.firstName} &amp; {WEDDING_CONFIG.groom.firstName}
          </p>

          <div className="mt-6">
            <button
              type="button"
              onClick={onReplayOpening}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#C59B40]/45 text-xs tracking-[0.18em] uppercase text-[#E2C578] hover:bg-[#C59B40]/15 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Replay Opening</span>
            </button>
          </div>
        </motion.div>

        <div className="mt-12 pt-5 border-t border-[#C59B40]/20 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#FAF5EB]/60">
          <span>
            {WEDDING_CONFIG.hashtag} · {WEDDING_CONFIG.conciergeEmail}
          </span>
          <span>Sharma &amp; Rao Families · 2027</span>
        </div>
      </div>
    </footer>
  );
}
