// Simple synthesized animal sounds using the Web Audio API
// No external sound files needed — works in all modern browsers.

function getAudioCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctx = (window as unknown as { AudioContext?: typeof AudioContext; webkitAudioContext?: typeof AudioContext }).AudioContext
    || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  return Ctx ? new Ctx() : null;
}

export function playBearGrowl() {
  const ctx = getAudioCtx();
  if (!ctx) return;

  const now = ctx.currentTime;

  // Low oscillator for the growl body
  const osc = ctx.createOscillator();
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(120, now);
  osc.frequency.exponentialRampToValueAtTime(70, now + 0.4);

  // Filter to make it rumble
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(300, now);
  filter.frequency.linearRampToValueAtTime(120, now + 0.4);

  // Gain envelope
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.35, now + 0.08);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.5);
}

export function playChickenCluck() {
  const ctx = getAudioCtx();
  if (!ctx) return;

  const now = ctx.currentTime;

  // Two quick high chirps
  for (let i = 0; i < 2; i++) {
    const osc = ctx.createOscillator();
    osc.type = "triangle";
    const start = now + i * 0.12;
    osc.frequency.setValueAtTime(900, start);
    osc.frequency.exponentialRampToValueAtTime(1400, start + 0.05);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(0.2, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.01, start + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(start);
    osc.stop(start + 0.12);
  }
}

export function playTurkeyGobble() {
  const ctx = getAudioCtx();
  if (!ctx) return;

  const now = ctx.currentTime;

  // Rapid descending bursts
  for (let i = 0; i < 3; i++) {
    const osc = ctx.createOscillator();
    osc.type = "square";
    const start = now + i * 0.13;
    osc.frequency.setValueAtTime(250, start);
    osc.frequency.exponentialRampToValueAtTime(90, start + 0.1);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(0.18, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.01, start + 0.13);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(start);
    osc.stop(start + 0.14);
  }
}

const soundMap: Record<string, () => void> = {
  bear: playBearGrowl,
  chicken: playChickenCluck,
  turkey: playTurkeyGobble,
};

export function playAnimalSound(name: string) {
  const key = name.toLowerCase();
  if (key.includes("bear")) soundMap.bear();
  else if (key.includes("chicken")) soundMap.chicken();
  else if (key.includes("turkey")) soundMap.turkey();
}
