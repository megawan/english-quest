// Small helpers for writing lesson content compactly.

// Fill-in-the-blank multiple choice. `sentence` contains ___ .
export const fill = (sentence, answer, wrongs, hint) => ({
  kind: 'choice',
  promptKey: 'qFill',
  stem: { text: sentence, sub: hint, speak: sentence.replace('___', answer) },
  options: [{ text: answer, ok: true }, ...wrongs.map((w) => ({ text: w }))],
});

// Sentence ordering. `hint` is a { en, id } object shown as a clue.
export const ord = (sentence, hint, extra = []) => ({
  kind: 'order',
  promptKey: 'qOrder',
  hint,
  answer: sentence.split(' '),
  extra,
  speak: sentence,
});

// Pick the right English phrase for a situation.
export const say = (situation, answer, wrongs) => ({
  kind: 'choice',
  promptKey: 'qTranslate',
  stem: { text: situation },
  options: [{ text: answer, ok: true }, ...wrongs.map((w) => ({ text: w }))],
  speakAnswer: true,
});
