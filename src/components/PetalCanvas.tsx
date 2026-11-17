import { useMemo } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface PetalCanvasProps {
  variant?: 'gold-rose' | 'marigold' | 'night-ember';
  count?: number;
  className?: string;
}

export function PetalCanvas({
  variant = 'gold-rose',
  count = 16,
  className = '',
}: PetalCanvasProps) {
  const prefersReducedMotion = useReducedMotion();

  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, idx) => {
      const seed = (idx * 37 + 13) % 100;
      const isEmber = idx % 3 === 0;
      return {
        id: idx,
        left: `${(idx * 17 + (seed % 11)) % 96 + 2}%`,
        delay: (idx * 0.65) % 8,
        duration: 9 + (idx % 6) * 1.8,
        size: isEmber ? 4 + (idx % 3) * 2 : 11 + (idx % 4) * 3,
        driftX: (idx % 2 === 0 ? 1 : -1) * (18 + (idx % 4) * 12),
        rotate: (idx % 2 === 0 ? 1 : -1) * (140 + idx * 18),
        isEmber,
      };
    });
  }, [count]);

  if (prefersReducedMotion) return null;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {particles.map((p) => {
        const petalFill =
          variant === 'marigold'
            ? p.id % 2 === 0
              ? '#E69A28'
              : '#F2C14E'
            : variant === 'night-ember'
            ? p.isEmber
              ? '#F3D27A'
              : '#B55464'
            : p.isEmber
            ? '#E2C578'
            : p.id % 2 === 0
            ? '#D87A88'
            : '#E59F42';

        return (
          <motion.div
            key={p.id}
            initial={{
              y: -40,
              x: 0,
              opacity: 0,
              rotate: 0,
            }}
            animate={{
              y: ['0vh', '105vh'],
              x: [0, p.driftX, -p.driftX * 0.5, p.driftX * 0.4],
              opacity: [0, 0.85, 0.75, 0],
              rotate: [0, p.rotate],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              position: 'absolute',
              top: '-5%',
              left: p.left,
              willChange: 'transform, opacity',
            }}
          >
            {p.isEmber ? (
              <span
                className="block rounded-full"
                style={{
                  width: p.size,
                  height: p.size,
                  backgroundColor: petalFill,
                  boxShadow: `0 0 10px 2px ${petalFill}`,
                }}
              />
            ) : (
              <svg
                width={p.size}
                height={p.size * 1.25}
                viewBox="0 0 20 26"
                fill="none"
              >
                <path
                  d="M10 1C15.5 6 19 12.5 16.5 19C14.5 24 10 25 10 25C10 25 5.5 24 3.5 19C1 12.5 4.5 6 10 1Z"
                  fill={petalFill}
                  fillOpacity="0.78"
                />
                <path
                  d="M10 3C12 9 12 16 10 23"
                  stroke="#FFF7E2"
                  strokeOpacity="0.35"
                  strokeWidth="0.8"
                />
              </svg>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
