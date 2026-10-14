let ctx = null;

function getCtx() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function tone(freq, start, dur, type = 'sine', gain = 0.15) {
  const c = getCtx();
  if (!c) return;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.value = freq;
  g.gain.setValueAtTime(0, c.currentTime + start);
  g.gain.linearRampToValueAtTime(gain, c.currentTime + start + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + start + dur);
  o.connect(g).connect(c.destination);
  o.start(c.currentTime + start);
  o.stop(c.currentTime + start + dur + 0.05);
}

export function playSound(name) {
  try {
    if (name === 'correct') {
      tone(660, 0, 0.12);
      tone(880, 0.1, 0.2);
    } else if (name === 'wrong') {
      tone(220, 0, 0.18, 'sawtooth', 0.08);
      tone(165, 0.14, 0.25, 'sawtooth', 0.08);
    } else if (name === 'win') {
      [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.12, 0.25, 'triangle'));
    } else if (name === 'tap') {
      tone(500, 0, 0.05, 'sine', 0.06);
    }
  } catch {
    /* sound is optional */
  }
}
