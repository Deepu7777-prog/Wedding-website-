import { useState } from 'react';
import { Pause, Play, Volume2 } from 'lucide-react';
import { weddingAudio } from '../utils/weddingAudio';

export function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggle = async () => {
    if (isPlaying) {
      weddingAudio.pause();
      setIsPlaying(false);
    } else {
      const started = await weddingAudio.play();
      setIsPlaying(started);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <button
        type="button"
        onClick={handleToggle}
        aria-pressed={isPlaying}
        aria-label={isPlaying ? 'Pause wedding background music' : 'Play wedding background music'}
        className="inline-flex items-center gap-2.5 h-11 px-4 rounded-full bg-[#32080E]/92 text-[#FAF5EB] border border-[#C59B40]/60 shadow-[0_10px_28px_rgba(0,0,0,0.32)] backdrop-blur-md hover:bg-[#4A0E17] transition-colors cursor-pointer whitespace-nowrap"
      >
        <span className="w-6 h-6 rounded-full bg-[#C59B40] text-[#2A080D] flex items-center justify-center shrink-0">
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
        </span>
        <span className="text-xs font-medium tracking-[0.14em] uppercase">
          {isPlaying ? 'Pause Raga' : 'Play Music'}
        </span>
        <Volume2
          className={`w-3.5 h-3.5 text-[#E2C578] transition-opacity ${
            isPlaying ? 'opacity-100' : 'opacity-60'
          }`}
        />
      </button>
    </div>
  );
}
