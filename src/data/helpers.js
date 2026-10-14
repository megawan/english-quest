// Small helpers for writing lesson content compactly.
// Every question may carry a short `note` that explains the answer.

const opts = (answer, wrongs) => [{ text: answer, ok: true }, ...wrongs.map((w) => ({ text: w }))];

// Fill-in-the-blank. `sentence` contains ___ .
export const fill = (sentence, answer, wrongs, note) => {
  const full = sentence.replace('___', answer);
  return { kind: 'choice', promptKey: 'qFill', stem: { text: sentence, speak: full }, options: opts(answer, wrongs), note, speakOnPick: full };
};

// What does this idiom or phrase mean?
export const mean = (sentence, answer, wrongs, note) => ({
  kind: 'choice',
  promptKey: 'qIdiom',
  stem: { text: sentence, speak: sentence },
  options: opts(answer, wrongs),
  note,
  speakOnPick: sentence,
});

// Pick the best option for a prompt such as qFormal / qInformal.
export const choose = (promptKey, answer, wrongs, note) => ({ kind: 'choice', promptKey, stem: {}, options: opts(answer, wrongs), note });

// Reading comprehension question about a passage.
export const read = (passage, question, answer, wrongs, note) => ({
  kind: 'choice',
  promptKey: 'qRead',
  stem: { passage, text: question },
  options: opts(answer, wrongs),
  note,
});

// Cloze: pick the word for gap number `n` in a passage containing (1)___ (2)___ ...
export const gap = (passage, n, answer, wrongs, note) => ({
  kind: 'choice',
  promptKey: 'qGap',
  stem: { passage, gap: n },
  options: opts(answer, wrongs),
  note,
});

// Build the sentence from word tiles.
export const ord = (sentence, hint, note) => ({
  kind: 'order',
  promptKey: 'qOrder',
  hint,
  answer: sentence.split(' '),
  speak: sentence,
  note,
});
