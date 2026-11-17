import { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { WeddingEvent } from '../../data/weddingData';

interface FloatingFloralProps {
  children: ReactNode;
  className?: string;
  amplitude?: number;
  rotateDeg?: number;
  duration?: number;
  delay?: number;
}

export function FloatingFloral({
  children,
  className = '',
  amplitude = 6,
  rotateDeg = 1.6,
  duration = 5.4,
  delay = 0,
}: FloatingFloralProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      animate={{
        y: [-amplitude, amplitude, -amplitude],
        rotate: [-rotateDeg, rotateDeg, -rotateDeg],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{ willChange: 'transform' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FloralCornerMotif({
  position = 'top-left',
  tone = 'maroon-gold',
  className = '',
}: {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  tone?: 'maroon-gold' | 'light-gold';
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const petalMain = tone === 'light-gold' ? '#F4B8C1' : '#B55464';
  const petalSoft = tone === 'light-gold' ? '#FCE0E4' : '#E89AA5';
  const leafFill = tone === 'light-gold' ? '#8CA87A' : '#4E6E46';
  const goldStroke = tone === 'light-gold' ? '#E2C578' : '#C59B40';

  const flipClass =
    position === 'top-right'
      ? '-scale-x-100'
      : position === 'bottom-left'
      ? '-scale-y-100'
      : position === 'bottom-right'
      ? '-scale-x-100 -scale-y-100'
      : '';

  const delay = position.includes('right') ? 0.9 : 0.2;

  return (
    <motion.div
      aria-hidden="true"
      animate={
        prefersReducedMotion
          ? undefined
          : {
              y: [-4, 5, -4],
              rotate: [-1.2, 1.4, -1.2],
            }
      }
      transition={{
        duration: 6.2,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{ willChange: 'transform' }}
      className={`pointer-events-none select-none ${className}`}
    >
      <svg
        viewBox="0 0 180 180"
        fill="none"
        className={`w-28 h-28 sm:w-36 sm:h-36 opacity-80 ${flipClass}`}
      >
        {/* Botanical Vine Stem */}
        <path
          d="M12 162C22 108 56 54 142 18"
          stroke={goldStroke}
          strokeOpacity="0.55"
          strokeWidth="1.4"
        />
        <path
          d="M26 112C54 114 82 102 104 82"
          stroke={leafFill}
          strokeOpacity="0.6"
          strokeWidth="1.2"
        />
        {/* Leaves */}
        <path
          d="M36 92C24 72 34 52 54 58C56 76 48 86 36 92Z"
          fill={leafFill}
          fillOpacity="0.52"
        />
        <path
          d="M78 44C86 24 108 20 118 36C106 50 92 52 78 44Z"
          fill={leafFill}
          fillOpacity="0.48"
        />
        <path
          d="M84 96C102 90 120 98 122 114C106 120 92 110 84 96Z"
          fill={leafFill}
          fillOpacity="0.44"
        />
        {/* Main Damask Rose / Lotus Bloom */}
        <g transform="translate(46, 50)">
          <circle cx="0" cy="0" r="18" fill={petalSoft} fillOpacity="0.72" />
          <path
            d="M0 -16C9 -9 12 2 0 14C-12 2 -9 -9 0 -16Z"
            fill={petalMain}
            fillOpacity="0.82"
          />
          <path
            d="M-15 -2C-6 -10 4 -6 10 8C-2 13 -12 8 -15 -2Z"
            fill={petalMain}
            fillOpacity="0.68"
          />
          <circle cx="0" cy="0" r="4" fill={goldStroke} />
        </g>
        {/* Secondary Blossom */}
        <g transform="translate(106, 28)">
          <circle cx="0" cy="0" r="11" fill={petalSoft} fillOpacity="0.78" />
          <circle cx="0" cy="0" r="5.5" fill={petalMain} fillOpacity="0.8" />
          <circle cx="0" cy="0" r="2.2" fill={goldStroke} />
        </g>
        {/* Delicate Buds & Jasmine */}
        <circle cx="144" cy="18" r="4" fill={petalSoft} />
        <circle cx="20" cy="136" r="4.5" fill={petalSoft} fillOpacity="0.85" />
        <circle cx="66" cy="76" r="2.5" fill={goldStroke} fillOpacity="0.7" />
      </svg>
    </motion.div>
  );
}

export function MandalaDivider({
  tone = 'gold',
  className = '',
}: {
  tone?: 'gold' | 'maroon' | 'light';
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const stroke =
    tone === 'light' ? '#E2C578' : tone === 'maroon' ? '#6B1220' : '#B58932';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`flex items-center justify-center gap-4 py-2 ${className}`}
      aria-hidden="true"
    >
      <span
        className="h-px w-16 sm:w-28 opacity-45"
        style={{ backgroundColor: stroke }}
      />
      <motion.svg
        width="64"
        height="32"
        viewBox="0 0 64 32"
        fill="none"
        className="shrink-0"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                y: [-2.5, 2.5, -2.5],
                rotate: [-1.5, 1.5, -1.5],
              }
        }
        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ willChange: 'transform' }}
      >
        {/* Central Lotus */}
        <path
          d="M32 4C35 10 37 15 32 22C27 15 29 10 32 4Z"
          stroke={stroke}
          strokeWidth="1.2"
          fill={stroke}
          fillOpacity="0.16"
        />
        <path
          d="M32 22C25 18 22 12 24 8C28 11 30 16 32 22Z"
          stroke={stroke}
          strokeWidth="1.1"
          fill={stroke}
          fillOpacity="0.1"
        />
        <path
          d="M32 22C39 18 42 12 40 8C36 11 34 16 32 22Z"
          stroke={stroke}
          strokeWidth="1.1"
          fill={stroke}
          fillOpacity="0.1"
        />
        {/* Side Kolam Paisleys */}
        <path
          d="M18 16C14 13 9 14 7 16C9 18 14 19 18 16Z"
          stroke={stroke}
          strokeWidth="1.1"
        />
        <path
          d="M46 16C50 13 55 14 57 16C55 18 50 19 46 16Z"
          stroke={stroke}
          strokeWidth="1.1"
        />
        <circle cx="32" cy="26" r="1.8" fill={stroke} />
        <circle cx="20" cy="22" r="1.2" fill={stroke} fillOpacity="0.65" />
        <circle cx="44" cy="22" r="1.2" fill={stroke} fillOpacity="0.65" />
      </motion.svg>
      <span
        className="h-px w-16 sm:w-28 opacity-45"
        style={{ backgroundColor: stroke }}
      />
    </motion.div>
  );
}

export function EventIllustration({
  eventId,
  className = '',
}: {
  eventId: WeddingEvent['id'];
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  switch (eventId) {
    case 'haldi':
      return (
        <svg
          viewBox="0 0 360 220"
          className={`w-full h-full ${className}`}
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="haldiSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFF2C2" />
              <stop offset="100%" stopColor="#FBE192" />
            </linearGradient>
            <radialGradient id="haldiSun" cx="50%" cy="40%" r="45%">
              <stop offset="0%" stopColor="#FFFDF0" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#F5BA42" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="360" height="220" fill="url(#haldiSky)" />
          <circle cx="180" cy="74" r="78" fill="url(#haldiSun)" />
          {/* Sandstone Palace Scalloped Arch */}
          <path
            d="M24 220V60C24 44 38 30 56 30H304C322 30 336 44 336 60V220H304V92C280 76 264 62 246 76C228 60 202 52 180 42C158 52 132 60 114 76C96 62 80 76 56 92V220H24Z"
            fill="#E8C688"
            fillOpacity="0.48"
            stroke="#B98732"
            strokeWidth="1.5"
          />
          {/* Gently Swaying Hanging Marigold Garlands */}
          {[76, 118, 160, 200, 242, 284].map((x, idx) => (
            <motion.g
              key={x}
              animate={
                prefersReducedMotion
                  ? undefined
                  : { y: [-2, 2.5, -2], rotate: [-1.2, 1.2, -1.2] }
              }
              transition={{
                duration: 4.2 + (idx % 3) * 0.6,
                delay: idx * 0.25,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{ transformOrigin: `${x}px 26px` }}
            >
              <line
                x1={x}
                y1="26"
                x2={x}
                y2={86 + (idx % 2) * 24}
                stroke="#62783B"
                strokeWidth="1.4"
              />
              {[42, 58, 74, ...(idx % 2 === 0 ? [90, 104] : [])].map((y, j) => (
                <circle
                  key={y}
                  cx={x}
                  cy={y}
                  r="6.5"
                  fill={j % 2 === 0 ? '#E88A1A' : '#F4B92D'}
                />
              ))}
              <path
                d={`M${x} ${92 + (idx % 2) * 24} L${x - 4} ${101 + (idx % 2) * 24} L${x + 4} ${101 + (idx % 2) * 24} Z`}
                fill="#526C32"
              />
            </motion.g>
          ))}
          {/* Courtyard Floor & Kolam */}
          <rect x="0" y="182" width="360" height="38" fill="#F2D08A" />
          <ellipse
            cx="180"
            cy="196"
            rx="62"
            ry="10"
            stroke="#B55464"
            strokeOpacity="0.55"
            strokeWidth="1.3"
            strokeDasharray="4 3"
          />
          {/* Brass Urli filled with Turmeric & Floating Marigolds */}
          <path
            d="M132 162C132 184 150 194 180 194C210 194 228 184 228 162H132Z"
            fill="#B87E24"
            stroke="#7B4E10"
            strokeWidth="1.5"
          />
          <ellipse cx="180" cy="162" rx="48" ry="10" fill="#F2A818" />
          <motion.g
            animate={prefersReducedMotion ? undefined : { y: [-1.5, 1.5, -1.5] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <circle cx="162" cy="161" r="6" fill="#E36E12" />
            <circle cx="179" cy="159" r="7" fill="#FAD24A" />
            <circle cx="196" cy="162" r="6" fill="#E36E12" />
          </motion.g>
          {/* Side Brass Lotas & Mango Leaves */}
          <path d="M90 184C84 176 85 166 96 166C107 166 108 176 102 184H90Z" fill="#C58B2B" />
          <path d="M96 166C90 156 84 154 84 154C91 154 95 160 96 166Z" fill="#4E7332" />
          <path d="M96 166C102 156 108 154 108 154C101 154 97 160 96 166Z" fill="#4E7332" />
          <path d="M258 184C252 176 253 166 264 166C275 166 276 176 270 184H258Z" fill="#C58B2B" />
          <path d="M264 166C258 156 252 154 252 154C259 154 263 160 264 166Z" fill="#4E7332" />
          <path d="M264 166C270 156 276 154 276 154C269 154 265 160 264 166Z" fill="#4E7332" />
        </svg>
      );

    case 'mehendi':
      return (
        <svg
          viewBox="0 0 360 220"
          className={`w-full h-full ${className}`}
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="mehBg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FDF0F2" />
              <stop offset="100%" stopColor="#F1D4DA" />
            </linearGradient>
          </defs>
          <rect width="360" height="220" fill="url(#mehBg)" />
          {/* Emerald Palm Fronds Gently Breathing */}
          <motion.path
            d="M0 40C42 20 82 40 96 76C62 66 28 60 0 74Z"
            fill="#325D44"
            fillOpacity="0.82"
            animate={prefersReducedMotion ? undefined : { rotate: [-1.5, 1.5, -1.5] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '0px 50px' }}
          />
          <motion.path
            d="M360 40C318 20 278 40 264 76C298 66 332 60 360 74Z"
            fill="#325D44"
            fillOpacity="0.82"
            animate={prefersReducedMotion ? undefined : { rotate: [1.5, -1.5, 1.5] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '360px 50px' }}
          />
          {/* Carved Jharokha Arch */}
          <path
            d="M74 220V78C74 44 128 36 180 22C232 36 286 44 286 78V220"
            stroke="#8F6B24"
            strokeWidth="2"
            fill="#FAF4EA"
            fillOpacity="0.55"
          />
          {/* Floral Jhoola (Swing) with Floating Motion */}
          <motion.g
            animate={
              prefersReducedMotion
                ? undefined
                : { y: [-2, 3, -2], rotate: [-1, 1, -1] }
            }
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '180px 38px' }}
          >
            <line x1="128" y1="38" x2="128" y2="162" stroke="#C59B40" strokeWidth="2.4" />
            <line x1="232" y1="38" x2="232" y2="162" stroke="#C59B40" strokeWidth="2.4" />
            {[56, 76, 96, 116, 136].map((y, idx) => (
              <g key={y}>
                <circle cx="128" cy={y} r="5.5" fill={idx % 2 === 0 ? '#D86C7E' : '#F7E7EC'} />
                <circle cx="232" cy={y} r="5.5" fill={idx % 2 === 0 ? '#D86C7E' : '#F7E7EC'} />
              </g>
            ))}
            <rect x="116" y="160" width="128" height="14" rx="4" fill="#6B1220" />
            <rect x="122" y="148" width="24" height="14" rx="4" fill="#E89A3C" />
            <rect x="214" y="148" width="24" height="14" rx="4" fill="#2F6A4A" />
          </motion.g>
          {/* Floating Lotus Medallion */}
          <motion.g
            transform="translate(180, 116)"
            animate={prefersReducedMotion ? undefined : { y: [-3, 3, -3] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <circle cx="0" cy="0" r="28" fill="#FFF8F9" stroke="#C59B40" strokeWidth="1.2" />
            <path
              d="M0 -18C6 -8 10 0 0 12C-10 0 -6 -8 0 -18Z"
              fill="#B55464"
              fillOpacity="0.25"
              stroke="#7A2334"
              strokeWidth="1.2"
            />
            <path
              d="M0 12C-12 6 -16 -4 -12 -10C-6 -6 -2 2 0 12Z"
              fill="#D88B94"
              fillOpacity="0.35"
              stroke="#7A2334"
              strokeWidth="1.1"
            />
            <path
              d="M0 12C12 6 16 -4 12 -10C6 -6 2 2 0 12Z"
              fill="#D88B94"
              fillOpacity="0.35"
              stroke="#7A2334"
              strokeWidth="1.1"
            />
            <circle cx="0" cy="0" r="3" fill="#C59B40" />
          </motion.g>
          {/* Pink Lotus Blooms */}
          <motion.g
            animate={prefersReducedMotion ? undefined : { y: [-2, 2, -2] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ellipse cx="64" cy="196" rx="22" ry="12" fill="#B55464" fillOpacity="0.2" />
            <path d="M52 192C52 178 64 170 64 170C64 170 76 178 76 192H52Z" fill="#D86C7E" />
            <path d="M284 192C284 178 296 170 296 170C296 170 308 178 308 192H284Z" fill="#D86C7E" />
          </motion.g>
        </svg>
      );

    case 'sangeet':
      return (
        <svg
          viewBox="0 0 360 220"
          className={`w-full h-full ${className}`}
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="sanSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1B060D" />
              <stop offset="65%" stopColor="#4A0E17" />
              <stop offset="100%" stopColor="#7C281E" />
            </linearGradient>
          </defs>
          <rect width="360" height="220" fill="url(#sanSky)" />
          {/* Crescent Moon & Stars */}
          <path
            d="M294 34C284 37 278 48 282 58C286 68 298 73 308 69C296 71 289 62 289 51C289 43 291 37 294 34Z"
            fill="#F6E09E"
          />
          {[
            [48, 32],
            [92, 54],
            [144, 24],
            [218, 38],
            [256, 22],
            [324, 58],
          ].map(([cx, cy], idx) => (
            <circle key={idx} cx={cx} cy={cy} r="1.4" fill="#FBEAC0" fillOpacity="0.85" />
          ))}
          {/* Swaying Brass Lanterns */}
          {[74, 286].map((x, idx) => (
            <motion.g
              key={x}
              animate={
                prefersReducedMotion
                  ? undefined
                  : { rotate: [-2.2, 2.2, -2.2], y: [-1.5, 1.5, -1.5] }
              }
              transition={{
                duration: 4.6 + idx * 0.7,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{ transformOrigin: `${x}px 0px` }}
            >
              <line x1={x} y1="0" x2={x} y2="48" stroke="#C59B40" strokeWidth="1.2" />
              <rect
                x={x - 10}
                y="48"
                width="20"
                height="28"
                rx="4"
                fill="#F7C95B"
                fillOpacity="0.88"
                stroke="#C59B40"
                strokeWidth="1.4"
              />
              <circle cx={x} cy="62" r="22" fill="#F7C95B" fillOpacity="0.18" />
            </motion.g>
          ))}
          {/* Mughal Cusped Pavilion */}
          <path
            d="M84 220V94C84 74 134 62 180 44C226 62 276 74 276 94V220"
            stroke="#C59B40"
            strokeWidth="1.6"
            fill="#2B0910"
            fillOpacity="0.55"
          />
          {/* Tabla Pair & Dholak Motif */}
          <g transform="translate(180, 152)">
            <ellipse cx="-26" cy="12" rx="22" ry="16" fill="#C59B40" stroke="#F4DC9A" strokeWidth="1.2" />
            <ellipse cx="-26" cy="4" rx="18" ry="8" fill="#FAF0DC" />
            <ellipse cx="-26" cy="4" rx="8" ry="3.5" fill="#2A1618" />
            <ellipse cx="26" cy="14" rx="18" ry="14" fill="#9E5625" stroke="#E2C578" strokeWidth="1.2" />
            <ellipse cx="26" cy="7" rx="14" ry="7" fill="#FAF0DC" />
            <ellipse cx="26" cy="7" rx="6" ry="3" fill="#2A1618" />
          </g>
          {/* Floating Lotus Petals on Water */}
          <rect x="0" y="188" width="360" height="32" fill="#1F070E" />
          <motion.g
            animate={prefersReducedMotion ? undefined : { x: [-4, 4, -4] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <line x1="60" y1="198" x2="140" y2="198" stroke="#F6E09E" strokeOpacity="0.35" strokeWidth="1.2" />
            <line x1="210" y1="204" x2="300" y2="204" stroke="#F6E09E" strokeOpacity="0.35" strokeWidth="1.2" />
          </motion.g>
        </svg>
      );

    case 'ceremony':
      return (
        <svg
          viewBox="0 0 360 220"
          className={`w-full h-full ${className}`}
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="cerBg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FBF3E4" />
              <stop offset="100%" stopColor="#EFE0C6" />
            </linearGradient>
          </defs>
          <rect width="360" height="220" fill="url(#cerBg)" />
          {/* Breathing Golden Mandala Halo */}
          <motion.g
            animate={prefersReducedMotion ? undefined : { scale: [0.98, 1.02, 0.98] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '180px 108px' }}
          >
            <circle cx="180" cy="108" r="68" stroke="#C59B40" strokeOpacity="0.32" strokeWidth="1.5" strokeDasharray="5 4" />
            <circle cx="180" cy="108" r="54" stroke="#C59B40" strokeOpacity="0.45" strokeWidth="1" />
          </motion.g>
          {/* Carved Mandap Pillars */}
          <rect x="78" y="54" width="16" height="146" fill="#B58338" />
          <rect x="266" y="54" width="16" height="146" fill="#B58338" />
          {/* Floral Canopy Arch */}
          <motion.g
            animate={prefersReducedMotion ? undefined : { y: [-1.5, 1.5, -1.5] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path
              d="M66 56C106 32 146 24 180 24C214 24 254 32 294 56"
              stroke="#6B1220"
              strokeWidth="12"
              strokeLinecap="round"
            />
            <path
              d="M74 58C110 38 148 30 180 30C212 30 250 38 286 58"
              stroke="#FAF5EB"
              strokeWidth="4"
              strokeDasharray="2 7"
              strokeLinecap="round"
            />
          </motion.g>
          {/* Bride & Groom Silhouettes seated by Sacred Fire */}
          <path d="M140 168C140 144 156 138 156 138C156 138 172 144 172 168H140Z" fill="#FAF5EB" stroke="#C59B40" strokeWidth="1.2" />
          <circle cx="156" cy="126" r="10" fill="#D6A17A" />
          <path d="M145 123C147 114 165 114 167 123" fill="#F2E4C8" stroke="#C59B40" strokeWidth="1" />
          <path d="M188 168C188 144 204 138 204 138C204 138 220 144 220 168H188Z" fill="#6B1220" stroke="#E2C578" strokeWidth="1.2" />
          <circle cx="204" cy="127" r="9.5" fill="#D6A17A" />
          <path d="M194 123C196 115 212 115 214 123L222 152" stroke="#8E1A2B" strokeWidth="3.5" strokeLinecap="round" />
          {/* Sacred Havan Kund Fire */}
          <polygon points="168,186 192,186 187,174 173,174" fill="#9E5625" />
          <motion.path
            d="M180 156C184 163 186 168 180 174C174 168 176 163 180 156Z"
            fill="#F49A24"
            animate={prefersReducedMotion ? undefined : { scaleY: [0.94, 1.08, 0.94] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '180px 174px' }}
          />
          {/* Twin Brass Kuthuvilakku Lamps */}
          {[112, 248].map((x) => (
            <g key={x}>
              <line x1={x} y1="142" x2={x} y2="188" stroke="#9B6E1F" strokeWidth="3" />
              <ellipse cx={x} cy="188" rx="10" ry="3.5" fill="#9B6E1F" />
              <ellipse cx={x} cy="142" rx="8" ry="3" fill="#C59B40" />
              <path d={`M${x} 131C${x + 3} 136 ${x + 3} 140 ${x} 142C${x - 3} 140 ${x - 3} 136 ${x} 131Z`} fill="#F6AA26" />
            </g>
          ))}
          <rect x="0" y="192" width="360" height="28" fill="#6B1220" />
        </svg>
      );

    case 'reception':
      return (
        <svg
          viewBox="0 0 360 220"
          className={`w-full h-full ${className}`}
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="recBg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#261316" />
              <stop offset="100%" stopColor="#4A1D24" />
            </linearGradient>
          </defs>
          <rect width="360" height="220" fill="url(#recBg)" />
          {/* Grand Golden Circular Floral Arch */}
          <motion.g
            animate={prefersReducedMotion ? undefined : { scale: [0.99, 1.015, 0.99] }}
            transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '180px 116px' }}
          >
            <circle cx="180" cy="116" r="74" stroke="#D9B768" strokeWidth="7" strokeDasharray="3 4" />
            <circle cx="180" cy="116" r="68" stroke="#8F6B24" strokeWidth="1.5" />
          </motion.g>
          {/* Sparkler Radiance */}
          {[-45, -25, 0, 25, 45].map((deg) => (
            <line
              key={deg}
              x1="180"
              y1="42"
              x2={180 + Math.sin((deg * Math.PI) / 180) * 42}
              y2={42 - Math.cos((deg * Math.PI) / 180) * 34}
              stroke="#FFE7A3"
              strokeOpacity="0.65"
              strokeWidth="1.4"
              strokeDasharray="2 3"
            />
          ))}
          {/* Hanging Brass Chandelier */}
          <motion.g
            animate={prefersReducedMotion ? undefined : { rotate: [-1.4, 1.4, -1.4] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '180px 0px' }}
          >
            <line x1="180" y1="0" x2="180" y2="62" stroke="#D9B768" strokeWidth="1.5" />
            <path d="M164 78C164 64 196 64 196 78H164Z" fill="#D9B768" />
          </motion.g>
          {/* Marble Palace Floor */}
          <rect x="0" y="186" width="360" height="34" fill="#F2E6D3" fillOpacity="0.18" />
          {/* Twin Candle Lanterns */}
          {[76, 284].map((x) => (
            <g key={x}>
              <rect x={x - 10} y="156" width="20" height="28" stroke="#D9B768" strokeWidth="1.2" fill="#F8D277" fillOpacity="0.25" />
              <circle cx={x} cy="170" r="4" fill="#FFE69A" />
            </g>
          ))}
        </svg>
      );
  }
}

export function BlessingsIllustration({ className = '' }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <svg
      viewBox="0 0 420 260"
      className={`w-full h-full ${className}`}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="blessGlow" cx="50%" cy="45%" r="50%">
          <stop offset="0%" stopColor="#F5D37E" stopOpacity="0.38" />
          <stop offset="100%" stopColor="#4A0E17" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="420" height="260" rx="12" fill="#32080E" />
      <circle cx="210" cy="120" r="120" fill="url(#blessGlow)" />
      {/* Carved Temple Arch */}
      <path
        d="M54 250V90C54 50 130 36 210 20C290 36 366 50 366 90V250"
        stroke="#C59B40"
        strokeWidth="2"
        strokeOpacity="0.7"
      />
      <path
        d="M72 250V100C72 64 140 50 210 36C280 50 348 64 348 100V250"
        stroke="#E2C578"
        strokeWidth="1"
        strokeOpacity="0.45"
        strokeDasharray="4 4"
      />
      {/* Hanging Temple Bells */}
      {[120, 300].map((x, idx) => (
        <motion.g
          key={x}
          animate={prefersReducedMotion ? undefined : { rotate: [-2.2, 2.2, -2.2] }}
          transition={{ duration: 4.5 + idx * 0.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: `${x}px 48px` }}
        >
          <line x1={x} y1="48" x2={x} y2="88" stroke="#C59B40" strokeWidth="1.4" />
          <path d={`M${x - 10} 106C${x - 8} 90 ${x + 8} 90 ${x + 10} 106H${x - 10}Z`} fill="#C59B40" />
          <circle cx={x} cy="109" r="2.5" fill="#F4DC9A" />
        </motion.g>
      ))}
      {/* Brass Urli with Floating Lotuses */}
      <path d="M148 206C148 232 172 242 210 242C248 242 272 232 272 206H148Z" fill="#A67422" />
      <ellipse cx="210" cy="206" rx="62" ry="12" fill="#4E161E" stroke="#E2C578" strokeWidth="1.2" />
      <motion.g
        animate={prefersReducedMotion ? undefined : { y: [-2, 2, -2] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path d="M188 206C188 194 198 188 198 188C198 188 208 194 208 206H188Z" fill="#E891A0" />
        <path d="M214 208C214 197 224 191 224 191C224 191 234 197 234 208H214Z" fill="#F4B2BE" />
      </motion.g>
      {/* Sacred Diya Flame in Center */}
      <motion.path
        d="M210 156C216 168 216 177 210 182C204 177 204 168 210 156Z"
        fill="#FAD25A"
        animate={prefersReducedMotion ? undefined : { scaleY: [0.95, 1.07, 0.95] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '210px 182px' }}
      />
      <circle cx="210" cy="170" r="18" fill="#FAD25A" fillOpacity="0.22" />
    </svg>
  );
}
