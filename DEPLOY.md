# 🚀 Deploy to Vercel Guide

This guide will help you deploy your Lucky Spin Wheel to Vercel.

## Prerequisites

- A [Vercel account](https://vercel.com/signup) (free)
- Your code pushed to GitHub (already done ✅)

## Method 1: Deploy via Vercel Dashboard (Easiest)

### Step 1: Connect Your GitHub Repository

1. Go to [Vercel Dashboard](https://vercel.com/new)
2. Click **"Import Project"** or **"Add New Project"**
3. Select **"Import Git Repository"**
4. Choose **GitHub** and authorize Vercel to access your repositories
5. Find and select your repository: `tridinhbui/jackpot`

### Step 2: Configure Project

Vercel will automatically detect Next.js settings:

- **Framework Preset:** Next.js (auto-detected)
- **Build Command:** `next build` (auto-configured)
- **Output Directory:** `.next` (auto-configured)
- **Install Command:** `npm install` (auto-configured)

### Step 3: Deploy

1. Click **"Deploy"**
2. Wait 1-2 minutes for the build to complete
3. Your app will be live at: `https://your-project-name.vercel.app`

## Method 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Deploy

From your project directory:

```bash
cd /Users/buidinhtri/Desktop/luckyweheel
vercel
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Your account
- **Link to existing project?** → No
- **Project name?** → jackpot (or any name)
- **Directory?** → ./ (current directory)

### Step 4: Deploy to Production

```bash
vercel --prod
```

## Common Issues & Solutions

### Issue 1: Build Fails
**Solution:** Make sure your build works locally first:
```bash
npm run build
```

### Issue 2: Module Not Found
**Solution:** Ensure all dependencies are in package.json:
```bash
npm install
```

### Issue 3: Environment Variables
If you need environment variables, add them in:
- Vercel Dashboard → Project Settings → Environment Variables

### Issue 4: Domain Issues
- Free tier gets: `your-project.vercel.app`
- Custom domains: Vercel Dashboard → Domains → Add Domain

## After Deployment

### Your Live URLs:
- **Production:** `https://jackpot-your-username.vercel.app`
- **Preview (branches):** Auto-deployed for each branch

### Automatic Deployments:
Every push to `main` branch will automatically deploy to production!

### Check Deployment Status:
- Visit [Vercel Dashboard](https://vercel.com/dashboard)
- View build logs
- Monitor performance

## Vercel Features You Get (Free):

✅ Automatic HTTPS  
✅ Global CDN  
✅ Automatic scaling  
✅ Branch previews  
✅ Analytics (basic)  
✅ Web Vitals monitoring  

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)

---

**Ready to deploy?** Just go to [vercel.com/new](https://vercel.com/new) and import your GitHub repository!

