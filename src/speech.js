let voice = null;

function findVoice() {
  if (!('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find((v) => v.lang === 'en-US') ||
    voices.find((v) => v.lang && v.lang.startsWith('en')) ||
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
    u.rate = slow ? 0.7 : 0.9;
    u.pitch = slow ? 1.15 : 1;
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
