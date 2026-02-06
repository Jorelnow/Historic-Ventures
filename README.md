# Historic Ventures Editor

Historic Ventures Editor is a small Next.js + TypeScript app for turning rough notes into publish-ready outputs.

## Features

- Input panel for raw notes/draft.
- Mode selector with seven modes:
  - HUMANIZER
  - PUBLISHER
  - REPORTER
  - COUNCIL
  - X MODE
  - STORYTIME
  - PULSE
- Output generator for:
  - Publish-ready article
  - 10 headlines (SAFE/SPICY/CURIOSITY)
  - 5 screenshot lines
  - 1 X post + 1 thread (8 tweets)
  - Receipts checklist (claims to verify)
- Save projects locally in browser storage with title + date.
- Export helpers:
  - Copy buttons per section
  - Copy full markdown
  - Download output as `.md`
- Settings panel with:
  - Sample **Jorel Context Pack**
  - **Do Not Mention** list: Dash & Dee

## Setup

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Usage

1. Enter a project title.
2. Select a mode.
3. Paste rough notes.
4. Click **Generate Output**.
5. Use copy/export actions.
6. Click **Save Project** to keep a local snapshot.
7. Reload saved projects from the right panel.

## Mode templates (default)

- **HUMANIZER**
  - Tone: Empathetic and clear.
  - Structure: Relatable hook → explanation → relevance.
  - Priorities: Accessibility, Emotion, Credibility.
- **PUBLISHER**
  - Tone: Confident editorial voice.
  - Structure: Lead → support → context → takeaway.
  - Priorities: Authority, Flow, Fact-based framing.
- **REPORTER**
  - Tone: Objective and precise.
  - Structure: Inverted pyramid.
  - Priorities: Clarity, Verification, Attribution.
- **COUNCIL**
  - Tone: Strategic and multi-stakeholder.
  - Structure: Issue → options → tradeoffs → recommendation.
  - Priorities: Tradeoffs, Decision support, Balanced risks.
- **X MODE**
  - Tone: Punchy and social-native.
  - Structure: Hook-heavy concise lines.
  - Priorities: Virality, Brevity, Conversation.
- **STORYTIME**
  - Tone: Narrative and immersive.
  - Structure: Setup → tension → turning point → reflection.
  - Priorities: Arc, Character moments, Memorable close.
- **PULSE**
  - Tone: Fast and trend-aware.
  - Structure: Context → change → what’s next.
  - Priorities: Timeliness, Signals, Actionability.

## Notes

- No backend is required.
- All data is stored in browser local storage only.
