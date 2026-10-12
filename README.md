# PostCraft AI — LinkedIn Post Studio

> A focused, dark-themed creative studio that helps builders and professionals craft polished, story-driven LinkedIn posts from short notes and uploaded visuals.

![PostCraft AI Preview](src/assets/hero.png)

## ✨ Features

- **Split-Screen Workspace**: Real-time side-by-side editing and live preview designed for high-focus writing.
- **Realistic LinkedIn Preview Card**:
  - Profile identity customization (Avatar, Name, Headline, Timestamp).
  - Authentic reaction counter (👍, 💡, ❤️) and engagement actions (*Like*, *Comment*, *Repost*, *Send*).
  - Character counter aligned with LinkedIn's 3,000-character ceiling.
  - Estimated reading time indicator.
- **Multi-Image Media Collage**:
  - Supports uploading multiple visual assets (PNG, JPG, WebP, GIF, SVG).
  - Adaptive collage layouts: 1 full-width visual, 2 equal columns, 3-image hero collage, or 4+ images with `+N more` badge.
  - Interactive full-size lightbox preview on click.
- **Tone of Voice Selector**:
  - **Professional**: Polished, authoritative & industry-focused.
  - **Personal**: Authentic, relatable & honest journey.
  - **Technical**: Architecture, engineering metrics & lessons.
  - **Storytelling**: Engaging narrative, tension & resolution.
- **Post Length Selector**:
  - **Concise** (~1-2 min read)
  - **Balanced** (~3 min read)
  - **Detailed** (~4-5 min read)
- **Local Demo Generator Engine**:
  - Deterministic template matrix matching tone, length, context, and media presence.
  - Real-time keyword extraction for relevant technical hashtags.
  - "Regenerate" button to cycle through phrasing variants.
- **Privacy First (Local Studio)**:
  - All processing and asset previews run 100% locally in the browser via object URLs.
  - No backend, no databases, no external AI API calls, and no file uploads.
- **Responsive & Accessible**:
  - Tailored layout for desktop, tablet, and mobile.
  - Dedicated mobile tab switcher (`Compose` / `Preview`).
  - Semantic HTML, keyboard navigable controls, and accessible status announcements.

## 🛠 Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler**: [Vite 8](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Linter**: [Oxlint](https://oxc.rs/)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/joyelshajii/PostCraft-AI.git

# Navigate to the project directory
cd PostCraft-AI

# Install dependencies
npm install

# Start the local development server
npm run dev
```

The application will run on `http://localhost:5173`.

### Build & Lint

```bash
# Type check and production build
npm run build

# Run Oxlint
npm run lint
```

## 📄 License

MIT
