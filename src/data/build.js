import { shuffle, sample } from '../util.js';

function withShuffledOptions(q) {
  const options = shuffle(q.options);
  return { ...q, options, answerIdx: options.findIndex((o) => o.ok) };
}

function vocabQuestions(lesson) {
  const { items, level } = lesson;
  const kids = level === 'kids';
  const asEmojiOptions = (item) => {
    const wrong = sample(items, 3, [item]);
    return shuffle([item, ...wrong]).map((x) => ({ emoji: x.emoji, ok: x === item }));
  };
  const asWordOptions = (item) => {
    const wrong = sample(items, 3, [item]);
    return shuffle([item, ...wrong]).map((x) => ({ text: x.en, ok: x === item }));
  };

  const questions = [];

  const pickItems = kids ? sample(items, 4) : sample(items, 5);
  pickItems.forEach((item) =>
    questions.push({
      kind: 'choice',
      promptKey: 'qWhatIsThis',
      stem: { emoji: item.emoji, sub: { en: '', id: item.id }, speak: item.en },
      options: asWordOptions(item),
      speakOnPick: item.en,
    }),
  );

  sample(items, kids ? 4 : 3).forEach((item) =>
    questions.push({
      kind: 'choice',
      promptKey: 'qListenPick',
      stem: { listen: item.en, autoSpeak: true },
      options: asEmojiOptions(item),
    }),
  );

  if (!kids) {
    sample(items, 3).forEach((item) =>
      questions.push({
        kind: 'choice',
        promptKey: 'qWhichMeans',
        stem: { text: item.en, speak: item.en },
        options: asEmojiOptions(item),
      }),
    );
  }

  return shuffle(questions);
}

function customQuestions(lesson) {
  return shuffle(lesson.questions);
}

// Builds a fresh, randomised list of questions for a lesson.
export function buildQuestions(lesson) {
  const raw = lesson.kind === 'vocab' ? vocabQuestions(lesson) : customQuestions(lesson);
  return raw.map((q, i) => {
    const base = q.kind === 'choice' ? withShuffledOptions(q) : { ...q, words: shuffle([...q.answer, ...(q.extra || [])]) };
    return { ...base, qid: `${lesson.id}-${i}-${Math.random().toString(36).slice(2, 6)}` };
  });
}
