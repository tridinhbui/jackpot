# 🎰 Jackpot - Aventus Spa Lucky Spin Wheel

Modern, interactive lucky spin wheel game with integrated booking system for Aventus Spa premium nail salon.

![Next.js](https://img.shields.io/badge/Next.js-15.5.6-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)

## ✨ Features

### 🎡 Interactive Spin Wheel
- Beautiful 6-segment wheel with spa service prizes
- Smooth rotation animation (4-6 rounds)
- Locked state until user registration
- Real-time prize distribution
- Confetti celebration effects

### 📋 Dual Form System
1. **Spin Registration Form** (Side-by-side with wheel)
   - Name, Phone, Email validation
   - One spin per phone number enforcement
   - Real-time error handling
   - LocalStorage tracking

2. **Booking Form** (Full appointment system)
   - Complete service booking
   - Date & time selection
   - Multiple service selection (13+ services)
   - Technician request
   - Contact information with call-to-action

### 🎁 Six Amazing Prizes

1. **Complimentary Gel Polish Add-On** - $20 value
2. **Hydration Package Upgrade** - $15 value
3. **$10 Off Gift Card Purchase**
4. **Free Simple Nail Design** - up to $15 value
5. **Aventus Elite Package Upgrade** - $25 value
6. **25% Off Total Bill**

### 🎨 Design Highlights
- Gradient purple-pink-red theme
- Glassmorphism effects
- Responsive layout (mobile to desktop)
- Custom scrollbar styling
- Animated components
- Lock/unlock wheel mechanism
- Side-by-side form + wheel layout

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/tridinhbui/jackpot.git

# Navigate to project
cd jackpot

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📱 How It Works

### User Journey

1. **Landing Page**
   - Full booking form at top
   - Scroll down to spin wheel section

2. **Spin Registration**
   - Fill name, phone, email
   - System validates phone number
   - Checks if phone already used
   - Wheel unlocks upon successful registration

3. **Spin & Win**
   - Click "SPIN NOW!" button
   - Wheel rotates 4-6 times
   - Lands on random prize
   - Confetti celebration

4. **Prize Modal**
   - Displays won prize
   - Shows spa contact info
   - Call-to-action to redeem

5. **One-Time Limit**
   - Each phone number = 1 spin only
   - Tracked via localStorage
   - Clear messaging throughout

## 🏗️ Project Structure

```
├── app/
│   ├── components/
│   │   ├── BookingSection.tsx         # Full appointment booking form
│   │   ├── SpinRegistrationForm.tsx   # Quick spin registration
│   │   ├── SpinWheel.tsx              # Main wheel component
│   │   └── ResultModal.tsx            # Winner popup modal
│   ├── page.tsx                       # Home page orchestration
│   ├── layout.tsx                     # Root layout with fonts
│   └── globals.css                    # Global styles & animations
├── public/
├── package.json
└── README.md
```

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 15.5.6** | React framework with App Router |
| **TypeScript** | Type-safe development |
| **Tailwind CSS 4** | Utility-first styling |
| **Canvas Confetti** | Celebration animations |
| **Inter Font** | Clean, modern typography |
| **LocalStorage** | Client-side data persistence |

## 🎨 Customization

### Change Prize Values

Edit `app/components/SpinWheel.tsx`:

```typescript
const segments = [
  { text: 'Your Prize', subtext: '($XX)', color: 'from-pink-400 to-pink-500', textColor: 'text-white' },
  // Add or modify segments...
];
```

### Modify Services List

Edit `app/components/BookingSection.tsx`:

```typescript
const services = [
  'Your Service 1',
  'Your Service 2',
  // Add or modify services...
];
```

### Update Spa Information

Change contact details in both components:
- Phone: `614-618-9999`
- Address: `94 Meadow Park Ave - Lewis Center, OH 43035`

## 🚀 Deploy to Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tridinhbui/jackpot)

### Manual Deploy

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import repository: `tridinhbui/jackpot`
3. Click "Deploy"
4. Done! ✅

Your app will be live at: `https://your-project.vercel.app`

### Build Status

✅ Build tested successfully  
✅ No TypeScript errors  
✅ ESLint passed  
✅ Vercel config included  
✅ Production-ready  

## 📞 Aventus Spa Contact

- **Phone:** 614-618-9999
- **Address:** 94 Meadow Park Ave, Lewis Center, OH 43035
- **Location:** Next to Bath & Body Works
- **Services:** Premium nail care, manicures, pedicures, and more

## 🔒 Privacy & Data

- All user data stored in browser localStorage only
- No server-side data collection
- Phone numbers hashed for validation
- Fully client-side validation

## 📄 License

MIT License - feel free to use for your own business!

## 🤝 Contributing

Contributions welcome! Please open an issue or submit a PR.

---

**Made with ❤️ for Aventus Spa Premium Nail Salon**

🌟 Star this repo if you find it useful!
