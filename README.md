# jackpot

🎰 Lucky Spin Wheel Game - Aventus Spa Edition

## Features

- ⚡ Built with Next.js 15 + TypeScript + Tailwind CSS
- 🎡 Smooth spinning wheel animation with 10 prize segments
- 🎨 Elegant black & white theme
- 📱 Fully responsive design
- 🎉 Confetti celebration effect
- ✨ Modern glassmorphism UI
- 📋 Registration form with validation (Name, Phone, Email)
- 🔒 One spin per phone number restriction
- 💾 LocalStorage-based tracking system

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

## How It Works

1. **Registration:** Users must enter their name, phone number, and email
2. **Validation:** System checks if the phone number has been used before
3. **One Spin Rule:** Each phone number can only spin once
4. **Spin & Win:** After registration, users can spin the wheel
5. **Result:** Winner popup shows the prize amount
6. **Tracking:** All data is stored in browser localStorage

## Project Structure

```
├── app/
│   ├── components/
│   │   ├── RegistrationForm.tsx  # User registration form
│   │   ├── SpinWheel.tsx         # Main wheel component with 10 segments
│   │   └── ResultModal.tsx       # Winner popup modal
│   ├── page.tsx                  # Home page with logic
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
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

## 🚀 Deploy to Vercel

### Quick Deploy (2 minutes):

1. **Go to:** [vercel.com/new](https://vercel.com/new)
2. **Import** your GitHub repository: `tridinhbui/jackpot`
3. **Click Deploy** (Vercel auto-detects Next.js settings)
4. **Done!** Your app is live at `https://your-project.vercel.app`

### Detailed Instructions:
See [DEPLOY.md](./DEPLOY.md) for complete deployment guide.

### Why Deployment Works Now:

✅ All code is in English  
✅ Build tested successfully (`npm run build`)  
✅ No TypeScript/ESLint errors  
✅ Vercel config files added  
✅ Code pushed to GitHub  

## License

MIT

---

Made with ❤️ for Aventus Spa
