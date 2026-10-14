# English Quest

Learn English the fun way: a gamified web app with XP, levels, daily streaks, badges, and quizzes for vocabulary and grammar.

**Live:** https://megawan.github.io/english-quest/

## Features

- **Three levels:** Kids (ages 5+), Beginner, and Intermediate
- **Gamification:** XP and player levels, daily goal ring, day streaks, hearts, 1-3 star ratings, 12 badges, and confetti celebrations
- **Question types:** pick the word, listen and pick the picture, fill in the blank, and build the sentence
- **Kids mode:** big pictures, read-aloud words, no hearts, and a softer look
- **Two interface languages:** Bahasa Indonesia and English, switchable any time
- **Smooth animations** with Framer Motion
- **Works offline-first in the browser:** progress is saved in `localStorage`, no account needed

## Tech

React 18, Vite, Framer Motion, canvas-confetti. Words are read aloud with the browser's Web Speech API.

## Development

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## Deployment

Every push to `main` is built and published to GitHub Pages by `.github/workflows/deploy.yml`.
In the repository settings, set **Pages → Source** to **GitHub Actions**.

## Adding lessons

Lessons live in `src/data/`:

- `kids.js`, `beginner.js`, `intermediate.js`: one array per level
- A `vocab` lesson only needs a list of `{ en, id, emoji }` items; questions are generated automatically
- A `custom` lesson uses the helpers in `helpers.js` (`fill`, `ord`, `say`)

## License

MIT
