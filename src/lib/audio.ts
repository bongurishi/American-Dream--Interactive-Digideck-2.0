let audioCtx: AudioContext | null = null;
let isUnlocked = false;
let isMuted = false;

export const toggleAudioMute = () => {
  isMuted = !isMuted;
  return isMuted;
};

export const getIsMuted = () => isMuted;

export const initAudio = () => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  return audioCtx;
};

// Unlock audio robustly
if (typeof window !== 'undefined') {
  const unlockAudio = () => {
    const ctx = initAudio();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().then(() => {
        isUnlocked = true;
        document.removeEventListener('click', unlockAudio);
        document.removeEventListener('touchstart', unlockAudio);
      }).catch(() => {});
    } else if (ctx && ctx.state === 'running') {
      isUnlocked = true;
      document.removeEventListener('click', unlockAudio);
      document.removeEventListener('touchstart', unlockAudio);
    }
  };
  document.addEventListener('click', unlockAudio);
  document.addEventListener('touchstart', unlockAudio);
  document.addEventListener('keydown', unlockAudio);
}

export const playHoverSound = () => {
  if (!isUnlocked || isMuted) return;
  try {
    const ctx = initAudio();
    if (!ctx || ctx.state !== 'running') return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1000, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.02);
    
    gain.gain.setValueAtTime(0, ctx.currentTime);
    // Slight bump in baseline volume so it can be heard over ambient noise
    gain.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.02);
  } catch (e) {
    // Ignore
  }
};

export const playClickSound = () => {
  if (isMuted) return;
  try {
    const ctx = initAudio();
    if (!ctx) return;
    
    // Always attempt to resume on explicit user action
    if (ctx.state === 'suspended') {
      ctx.resume().then(() => { isUnlocked = true; }).catch(() => {});
    }
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.05);
    
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch (e) {
    // Ignore
  }
};
