# English Quest

English at two levels, **B1 (lower-intermediate)** and **B2 (upper-intermediate)**, learned through short quests with XP, ranks, daily streaks, and achievements.

**Live:** https://megawan.github.io/english-quest/

## What you practise

Five skill tracks, 15 lessons, 116 questions:

| Track | Focus |
| --- | --- |
| Phrasal Verbs | Everyday, work and study, people and feelings |
| Idioms & Collocations | Idiom meanings, completing idioms, natural word pairs |
| Advanced Grammar | Conditionals, passive and causative, reported speech, wishes and inversion |
| Reading & Cloze | Short texts, inference questions, gap-fills |
| Word Choice & Register | Easily confused words, formal vs informal, word formation |

Each lesson starts with a short guide that explains the idea, when to use it, and gives examples. Every answer then comes with a plain-English note, and wrong answers come back at the end of the lesson.

## Gamification

XP and ranks, daily goal ring, day streaks, hearts, 1-3 star ratings per lesson, 14 achievements, and subtle animations (Framer Motion).

## Features

- Everything is in English, with a plain-English guide before each lesson and a short explanation after every answer
- Sentences can be read aloud with the browser's speech synthesis
- Keyboard friendly: press 1-4 to answer, Enter to continue
- Light and dark themes follow the system setting
- Progress is saved in `localStorage`; no account needed

## Tech

React 18, Vite, Framer Motion, canvas-confetti.

## Development

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## Deployment

Every push to `main` is built and published to GitHub Pages by `.github/workflows/deploy.yml`.
In the repository settings, set **Pages > Source** to **GitHub Actions**, then re-run the workflow
(Actions > Deploy to GitHub Pages > Run workflow).

**Blank page?** It means Pages is serving the repository files directly (Source: *Deploy from a branch*)
instead of the build output. Switch the source to *GitHub Actions* as described above.

## Adding lessons

B2 lessons live in `src/data/b2.js` and B1 lessons in `src/data/b1.js` (`src/data/levels.js` joins them; the learner switches level on the Learn screen). A track has lessons, and a lesson has questions written with the helpers in `src/data/helpers.js`:

- `fill(sentence, answer, wrongs, note)`: choose the right word or phrase for the blank (`___`)
- `mean(sentence, answer, wrongs, note)`: what does this idiom mean?
- `read(passage, question, answer, wrongs, note)`: reading comprehension
- `gap(passage, n, answer, wrongs, note)`: cloze with numbered gaps like `(1)___`
- `choose(promptKey, answer, wrongs, note)`: formal or informal register
- `ord(sentence, hint, note)`: build the sentence from tiles

## License

MIT

## Weekly lessons (word pool)

`src/data/pool.json` is a list of words and patterns to teach (`term`, `type`, `used`). A scheduled Claude Code task picks 5 unused items at random every week, writes one lesson in the "Fresh Weekly" track, marks those items `used: true` and opens a pull request for review. To steer the content, add or remove items in the file.
