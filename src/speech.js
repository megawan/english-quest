let voice = null;

const PREFERRED = /natural|neural|google|samantha|aria|jenny|zira|alex|daniel/i;
const LOW_QUALITY = /espeak|compact/i;

function findVoice() {
  if (!('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  const english = voices.filter((v) => v.lang && v.lang.replace('_', '-').startsWith('en'));
  const usable = english.filter((v) => !LOW_QUALITY.test(v.name));
  const pool = usable.length ? usable : english;
  const isUS = (v) => v.lang.replace('_', '-') === 'en-US';
  return (
    pool.find((v) => isUS(v) && PREFERRED.test(v.name)) ||
    pool.find((v) => PREFERRED.test(v.name)) ||
    pool.find(isUS) ||
    pool[0] ||
    null
  );
}

export function hasSpeech() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function speak(text, { slow = false } = {}) {
  if (!hasSpeech() || !text) return;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    voice = voice || findVoice();
    if (voice) u.voice = voice;
    u.lang = 'en-US';
    u.volume = 1;
    u.rate = slow ? 0.75 : 0.95;
    u.pitch = 1;
    window.speechSynthesis.speak(u);
  } catch {
    /* speech is optional */
  }
}

if (hasSpeech()) {
  window.speechSynthesis.onvoiceschanged = () => {
    voice = findVoice();
  };
}
