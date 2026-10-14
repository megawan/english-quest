import { shuffle } from '../util.js';

function withShuffledOptions(q) {
  const options = shuffle(q.options);
  return { ...q, options, answerIdx: options.findIndex((o) => o.ok) };
}

// Builds a fresh, randomised list of questions for a lesson.
export function buildQuestions(lesson) {
  return shuffle(lesson.questions).map((q, i) => {
    const base = q.kind === 'choice' ? withShuffledOptions(q) : { ...q, words: shuffle(q.answer) };
    return { ...base, qid: `${lesson.id}-${i}-${Math.random().toString(36).slice(2, 6)}` };
  });
}
