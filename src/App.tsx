import { useEffect, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { OpeningCinematic } from './components/OpeningCinematic';
import { Navbar } from './components/Navbar';
import { WelcomeSection } from './components/WelcomeSection';
import { CelebrationsAndMapSection } from './components/CelebrationsAndMapSection';
import { RsvpSection } from './components/RsvpSection';
import { FinalBlessingsSection } from './components/FinalBlessingsSection';
import { MusicToggle } from './components/MusicToggle';

export default function App() {
  const [showOpening, setShowOpening] = useState(true);
  const [quotaExceeded, setQuotaExceeded] = useState(false);

  useEffect(() => {
    const handleQuota = () => setQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuota);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuota);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF5EB] text-[#241416]">
      {quotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      <AnimatePresence>
        {showOpening && (
          <OpeningCinematic onEnterWedding={() => setShowOpening(false)} />
        )}
      </AnimatePresence>

      <Navbar />

      <main>
        <WelcomeSection />
        <CelebrationsAndMapSection />
        <RsvpSection />
      </main>

      <FinalBlessingsSection
        onReplayOpening={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setShowOpening(true);
        }}
      />

      <MusicToggle />
    </div>
  );
}
