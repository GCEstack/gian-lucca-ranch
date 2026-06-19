# Gian Lucca's Ranch

A magical, interactive ranch website built just for Gian Lucca. It features animal friends, bedtime stories, learning games, music, and videos — all wrapped in a warm, kid-friendly design.

![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=white)

## Features

- 🏠 **Home** — Welcome hero, ranch friends, explore cards, and Daddy's story collection with an audio player.
- 🎬 **Videos** — Watch "The Sleepy Little Bear" and other ranch adventures.
- 🎨 **Learning** — ABCs, numbers, colors, shapes, and interactive quizzes.
- 📖 **Stories** — Read-along stories with generated narration.
- 🎵 **Music** — Listen to original songs like *Gianluca Love*.
- 🔊 **Synthesized Animal Sounds** — Bear growl, chicken cluck, and turkey gobble using the Web Audio API (no external sound files needed).

## Tech Stack

- [Vite](https://vitejs.dev/) for fast development and builds
- [React 19](https://react.dev/) with TypeScript
- [React Router](https://reactrouter.com/) for client-side navigation
- [Tailwind CSS v4](https://tailwindcss.com/) for styling
- [ElevenLabs](https://elevenlabs.io/) for story narration generation

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build
```

## Generating Story Audio

Stories can be narrated with ElevenLabs. Copy `.env.example` to `.env` and add your credentials:

```bash
cp .env.example .env
```

Edit `.env` with your ElevenLabs API key and voice ID, then run:

```bash
node scripts/generate-stories.mjs
```

## Project Structure

```
├── public/              # Static assets and audio files
├── scripts/             # Story generation scripts
├── src/
│   ├── components/      # Layout, Navbar, Footer
│   ├── lib/             # Sound utilities
│   ├── pages/           # Home, Videos, Learning, Stories, Music
│   ├── index.css        # Tailwind theme and custom utilities
│   └── main.tsx         # App entry point with hash router
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Deployment

This project is configured for deployment on [Vercel](https://vercel.com/) using the Vite framework preset.

---

Made with ❤️ for Gian Lucca.
