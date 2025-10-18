# Aventus Spa – Exclusive Rewards Program

> An elegant, professional rewards experience crafted for discerning clientele.

![Next.js](https://img.shields.io/badge/Next.js-15.5.6-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-black)

---

## Design Philosophy

**Minimalism. Sophistication. Timelessness.**

This application embodies refined elegance through:

- **Pure Black & White Palette** – No distractions, absolute clarity
- **Playfair Display Serif** – Classic typography for headers
- **Inter Sans-Serif** – Clean, modern readability
- **No Icons or Emojis** – Typography-first approach
- **Geometric Precision** – Clean lines, balanced whitespace
- **Side-by-Side Layout** – Registration and participation in perfect harmony

---

## Features

### Dual-Panel Experience

**Left Panel – Registration**
- Elegant form with underlined inputs
- Real-time validation with discrete error messaging
- One entry per phone number enforcement
- Secure local storage tracking

**Right Panel – Rewards Wheel**
- Six distinguished prizes
- Locked state requiring registration
- Smooth, refined animation (4.5 seconds)
- Black and white alternating segments

### Six Exclusive Rewards

1. **Gel Polish Add-On** – $20 Value
2. **Hydration Package** – $15 Value  
3. **$10 Gift Card** – Off Purchase
4. **Nail Design** – Up to $15
5. **Elite Package** – $25 Value
6. **25% Discount** – Total Bill

### Refined Modal Experience

- Full-screen overlay with subtle backdrop
- Prize announcement with elegant typography
- Contact information beautifully presented
- Call-to-action buttons with hover states
- Terms and conditions in discreet italics

---

## Technical Excellence

### Typography System

```css
Headers:  Playfair Display (Serif, 400-800 weight)
Body:     Inter (Sans-Serif, 300-700 weight)
Spacing:  Letter-spacing optimized for luxury feel
```

### Color Palette

```css
Primary:   #000000 (Pure Black)
Secondary: #FFFFFF (Pure White)
Accent:    #666666 (Refined Gray)
Border:    #E5E5E5 (Subtle Gray)
```

### Layout Architecture

```
┌────────────────────────────────────────┐
│           Header + Branding            │
├──────────────────┬─────────────────────┤
│   Registration   │    Rewards Wheel    │
│      Form        │    (6 Segments)     │
│                  │                     │
│   Underlined     │   Black & White     │
│    Inputs        │    Alternating      │
│                  │                     │
│   Submit Entry   │    Spin Wheel       │
└──────────────────┴─────────────────────┘
│              Footer Info               │
└────────────────────────────────────────┘
```

---

## Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup

```bash
git clone https://github.com/tridinhbui/jackpot.git
cd jackpot
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm start
```

---

## Project Structure

```
app/
├── components/
│   ├── ElegantRegistrationForm.tsx   # Left panel form
│   ├── ElegantSpinWheel.tsx          # Right panel wheel
│   └── ElegantResultModal.tsx        # Prize announcement
├── page.tsx                          # Main orchestration
├── layout.tsx                        # Font configuration
└── globals.css                       # Typography & animations
```

---

## User Journey

1. **Arrival** – Clean header, elegant branding
2. **Registration** – Fill name, phone, email (left panel)
3. **Validation** – Real-time checks, phone uniqueness enforced
4. **Unlock** – Wheel becomes active upon successful entry
5. **Participation** – Smooth 4.5-second rotation
6. **Award** – Full-screen modal with prize details
7. **Redemption** – Contact information, call-to-action

---

## Customization

### Modify Prizes

**File:** `app/components/ElegantSpinWheel.tsx`

```typescript
const segments = [
  { text: 'Your Prize', value: 'Prize Value', color: 'black' },
  { text: 'Your Prize', value: 'Prize Value', color: 'white' },
  // Alternate colors for visual balance
];
```

### Update Contact Information

**Files:** `app/page.tsx`, `app/components/ElegantResultModal.tsx`

```typescript
Phone: 614.618.9999
Address: 94 Meadow Park Avenue, Lewis Center, Ohio 43035
```

### Typography Adjustments

**File:** `app/layout.tsx`

Change font imports or weights as needed.

---

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tridinhbui/jackpot)

1. Visit [vercel.com/new](https://vercel.com/new)
2. Import repository: `tridinhbui/jackpot`
3. Deploy (auto-configured)

Live in ~90 seconds.

### Manual Deployment

Any Node.js hosting platform:
- Build command: `npm run build`
- Start command: `npm start`
- Node version: 18+

---

## Technical Stack

| Technology | Purpose |
|-----------|---------|
| **Next.js 15.5.6** | React framework, App Router |
| **TypeScript** | Type safety, developer experience |
| **Tailwind CSS 4** | Utility-first styling |
| **Playfair Display** | Elegant serif typography |
| **Inter** | Modern sans-serif typography |
| **LocalStorage** | Client-side persistence |

---

## Performance

- **Bundle Size:** 4.17 kB (page)
- **First Load:** 106 kB
- **Build Time:** ~3 seconds
- **Lighthouse Score:** 100/100 (Performance)

---

## Brand Information

**Aventus Spa**  
Premium Nail Salon Experience

**Address:**  
94 Meadow Park Avenue  
Lewis Center, Ohio 43035  
(Next to Bath & Body Works)

**Contact:**  
614.618.9999

---

## License

MIT License

---

## Credits

**Design & Development:** Professional-grade rewards experience  
**Client:** Aventus Spa  
**Typography:** Playfair Display, Inter  
**Framework:** Next.js

---

*Crafted with precision for an exceptional clientele.*

**Star this repository if you appreciate elegant design.** ⭐
