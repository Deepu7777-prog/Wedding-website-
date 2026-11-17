/**
 * Synthesizes a serene, warm Indian classical ambient soundscape
 * (Tanpura Sa-Pa-Sa drone + gentle Santoor / Bansuri Raga Yaman pentatonic phrases)
 * purely via the browser Web Audio API so zero external audio files are required.
 */
class WeddingAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private droneOscs: OscillatorNode[] = [];
  private melodyTimer: number | null = null;
  private isPlaying = false;

  // Raga Bhupali / Yaman warm pentatonic scale frequencies (C4, D4, E4, G4, A4, C5, D5, E5)
  private readonly ragaNotes = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25];
  private stepIdx = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
  }

  private startTanpuraDrone() {
    if (!this.ctx || !this.masterGain || this.droneOscs.length > 0) return;

    // Gentle low-pass filter for warm acoustic resonance
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(420, this.ctx.currentTime);
    filter.connect(this.masterGain);

    // Pa (G2), Sa (C3), Sa (C3 detuned), Sa (C2)
    const freqs = [98.0, 130.81, 131.35, 65.41];
    const gains = [0.06, 0.08, 0.06, 0.05];

    freqs.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      osc.type = idx % 2 === 0 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      oscGain.gain.setValueAtTime(gains[idx], this.ctx.currentTime);
      osc.connect(oscGain);
      oscGain.connect(filter);
      osc.start();
      this.droneOscs.push(osc);
    });
  }

  private pluckSantoorNote() {
    if (!this.ctx || !this.masterGain || !this.isPlaying) return;

    const now = this.ctx.currentTime;
    const pattern = [0, 2, 4, 5, 4, 2, 1, 3, 5, 7, 5, 4, 2, 0];
    const noteFreq = this.ragaNotes[pattern[this.stepIdx % pattern.length]];
    this.stepIdx += 1;

    const osc = this.ctx.createOscillator();
    const harmonic = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(noteFreq, now);

    harmonic.type = 'triangle';
    harmonic.frequency.setValueAtTime(noteFreq * 2, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1800, now);
    filter.frequency.exponentialRampToValueAtTime(480, now + 2.4);

    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.linearRampToValueAtTime(0.085, now + 0.045);
    noteGain.gain.exponentialRampToValueAtTime(0.0008, now + 2.8);

    const harmonicGain = this.ctx.createGain();
    harmonicGain.gain.setValueAtTime(0.22, now);

    osc.connect(filter);
    harmonic.connect(harmonicGain);
    harmonicGain.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc.start(now);
    harmonic.start(now);
    osc.stop(now + 2.9);
    harmonic.stop(now + 2.9);
  }

  public async play(): Promise<boolean> {
    this.initContext();
    if (!this.ctx || !this.masterGain) return false;

    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    this.isPlaying = true;
    this.startTanpuraDrone();

    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(Math.max(this.masterGain.gain.value, 0.0001), now);
    this.masterGain.gain.linearRampToValueAtTime(0.75, now + 1.4);

    if (this.melodyTimer === null) {
      this.pluckSantoorNote();
      this.melodyTimer = window.setInterval(() => {
        if (this.isPlaying) {
          this.pluckSantoorNote();
        }
      }, 1900);
    }
    return true;
  }

  public pause(): void {
    this.isPlaying = false;
    if (this.melodyTimer !== null) {
      clearInterval(this.melodyTimer);
      this.melodyTimer = null;
    }
    if (this.ctx && this.masterGain) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.8);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const weddingAudio = new WeddingAudioEngine();
