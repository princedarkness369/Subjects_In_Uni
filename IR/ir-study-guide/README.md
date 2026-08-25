# IR Study Guide

An interactive study website generated from the lecture **"Introducing Information Retrieval and Web Search."**
All content (concepts, definitions, examples, comparisons, flashcards, and summaries) is derived strictly
from the uploaded lecture slides — nothing has been added from outside sources.

## Tech stack

- React 18 + TypeScript
- Vite
- Tailwind CSS (dark mode via class strategy)
- Framer Motion
- React Router
- lucide-react icons

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## What's inside

- **Home** — lecture overview, concept/section counts, estimated study time, progress bar.
- **Concepts** — every concept from the lecture as a searchable, filterable card grid; each concept page
  includes a definition, simple explanation, why it matters, main goal, advantages/disadvantages (where
  mentioned), real-world examples, notes, common confusions, keywords, a memory trick, and an importance rating.
- **Comparisons** — five comparison tables (Precision vs. Recall, Structured vs. Unstructured Data,
  Query vs. Information Need, Boolean vs. Ranked Retrieval, Biword vs. Positional Index).
- **Flashcards** — 30 auto-generated flip flashcards, filterable by section, with shuffle.
- **Summary** — "Smart Notes" per section: quick summary, important concepts, common mistakes, what the
  professor tends to focus on, keywords to memorize, and last-minute revision bullets.
- **Search** — press the search icon (or the sidebar search box) to search concepts, definitions, keywords,
  and examples from anywhere in the app.
- **Dark mode** and **progress tracking** (which concepts you've opened) persist locally in your browser.

## Editing content

All lecture content lives in `src/data/`:

- `concepts.ts` — the concept catalogue
- `comparisons.ts` — comparison tables
- `flashcards.ts` — flashcard deck
- `summaries.ts` — per-section Smart Notes

Everything else in `src/` is presentation — edit those files freely without touching the data shape.
