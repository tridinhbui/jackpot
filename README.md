# jackpot

🎰 Lucky Spin Wheel Game - Aventus Spa Edition

## Features

- ⚡ Built with Next.js 15 + TypeScript + Tailwind CSS
- 🎡 Smooth spinning wheel animation with 10 prize segments
- 🎨 Elegant black & white theme
- 📱 Fully responsive design
- 🎉 Confetti celebration effect
- ✨ Modern glassmorphism UI

## Prize Options (10 Total)

- $1000
- $500
- $300
- $250
- $200
- $150
- $100
- $75
- $50
- $25

## Getting Started

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Framework:** Next.js 15.5.6
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Canvas Confetti
- **Font:** Inter (Google Fonts)

## Project Structure

```
├── app/
│   ├── components/
│   │   ├── SpinWheel.tsx      # Main wheel component with 10 segments
│   │   └── ResultModal.tsx    # Winner popup modal
│   ├── page.tsx               # Home page
│   ├── layout.tsx             # Root layout
│   └── globals.css            # Global styles
└── package.json
```

## Customization

Edit prize values in `app/components/SpinWheel.tsx`:

```typescript
const segments = [
  { text: '$500', color: 'bg-gradient-to-br from-gray-900 to-black' },
  { text: '$50', color: 'bg-gradient-to-br from-gray-100 to-gray-200' },
  // Add or modify segments...
];
```

## License

MIT

---

Made with ❤️ for Aventus Spa
