# 🚀 MOKAYAKOUBI - COMPLETE SETUP GUIDE

**Total time: ~30 minutes**  
**No terminal needed - all via web interface**

---

## 📋 WHAT YOU'LL DO

1. **GitHub** (2 min) - Create repo + upload code
2. **Supabase** (5 min) - Database setup
3. **Stripe** (3 min) - Payment setup (optional for now)
4. **Vercel** (5 min) - Deploy live
5. **GitHub Codespaces** (3 min) - Start coding on iPhone

---

## ✅ STEP 1: GITHUB SETUP (2 min)

### Create Repository

1. Go to https://github.com/new
2. **Repository name:** `mokayakoubi`
3. **Description:** "Personal brand site with courses, blog, coaching"
4. **Visibility:** Public
5. Click **Create repository**

### Upload Code

1. You're now on the empty repo page
2. Click **Upload files** button (middle of page)
3. Upload all files from the `mokayakoubi-starter` folder:
   - `package.json`
   - `tsconfig.json`
   - `next.config.js`
   - `tailwind.config.ts`
   - `postcss.config.js`
   - `.gitignore`
   - `.env.example`
   - `database.sql`
   - `SETUP_INSTRUCTIONS.md`
   - The entire `app/`, `lib/` folders

4. In the commit message box, type: `Initial Next.js setup`
5. Click **Commit changes**

**✓ Your code is now on GitHub!**

---

## ✅ STEP 2: SUPABASE DATABASE (5 min)

### Create Project

1. Go to https://app.supabase.com
2. Click **New Project**
3. **Name:** `mokayakoubi`
4. **Database password:** Generate strong one (save it somewhere safe!)
5. **Region:** Pick closest to you (Europe recommended)
6. Click **Create new project**
7. ⏳ Wait 2-3 minutes for it to spin up

### Get API Keys

Once ready, go to **Settings → API** (left sidebar)

Copy these THREE values into `.env.local` (your local file):

```
NEXT_PUBLIC_SUPABASE_URL = https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY = eyJhbGc...
```

### Import Database Schema

1. Go to **SQL Editor** (left sidebar)
2. Click **New Query**
3. Copy the ENTIRE content of `database.sql` (from the folder)
4. Paste it into the SQL editor
5. Click **Run**
6. Wait for ✓ Success message

**✓ Your database is ready!**

### Enable Auth

1. Go to **Authentication** (left sidebar)
2. Click **Providers**
3. Email should already be enabled (default)
4. Go to **Settings → Auth**
5. **Site URL:** Set to `http://localhost:3000` (for local testing)
6. **Redirect URLs:** Add `http://localhost:3000/**`

---

## ✅ STEP 3: STRIPE (Optional for now - 3 min)

### Create Stripe Account

1. Go to https://stripe.com
2. Click **Get Started**
3. Create account with `Yakoumobi@gmail.com`
4. Fill in basic info
5. Activate account

### Get Test Keys

1. Go to **Developers → API Keys** (left sidebar)
2. Copy **Publishable key** → paste in `.env.local`:
   ```
   NEXT_PUBLIC_STRIPE_PUBLIC_KEY = pk_test_xxxxx
   ```
3. Copy **Secret key** → paste in `.env.local`:
   ```
   STRIPE_SECRET_KEY = sk_test_xxxxx
   ```

**Note:** You can do this step later - it's not needed for basic site.

---

## ✅ STEP 4: VERCEL DEPLOYMENT (5 min)

### Connect Repo

1. Go to https://vercel.com/new
2. Click **Import Git Repository**
3. Paste: `https://github.com/mokayakoubi/mokayakoubi`
4. Click **Continue**

### Add Environment Variables

Before deploying, scroll down to **Environment Variables**

Add these from your `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL = (from Step 2)
NEXT_PUBLIC_SUPABASE_ANON_KEY = (from Step 2)
SUPABASE_SERVICE_ROLE_KEY = (from Step 2)
NEXT_PUBLIC_STRIPE_PUBLIC_KEY = (from Step 3, or skip for now)
STRIPE_SECRET_KEY = (from Step 3, or skip for now)
NEXT_PUBLIC_APP_URL = https://mokayakoubi.vercel.app
```

### Deploy

1. Click **Deploy**
2. ⏳ Wait 2-3 minutes
3. You'll get a URL: `https://mokayakoubi.vercel.app`
4. Click it → Your site is LIVE! 🎉

**✓ Your site is deployed!**

---

## ✅ STEP 5: GITHUB CODESPACES - CODE ON iPhone 📱

### Open Codespaces

1. Go to https://github.com/mokayakoubi/mokayakoubi
2. Click green **Code** button (top right)
3. Click **Codespaces** tab
4. Click **Create codespace on main**
5. Wait 30 seconds for VSCode to load in browser

### First Install

In the terminal at the bottom, type:

```bash
npm install
```

Wait for it to finish.

### Test Locally

```bash
npm run dev
```

You'll see: `ready - started server on 0.0.0.0:3000`

In Codespaces, click the link that appears → See your site in the browser!

---

## 🔄 WORKFLOW: HOW TO UPDATE

### Every time you make changes:

1. Open Codespaces (as above)
2. Make changes to files
3. At bottom left, click the "Source Control" icon (branch symbol)
4. Write a commit message (e.g., "Add hero section")
5. Click **Commit and Push**
6. Vercel auto-deploys in 1-2 minutes
7. Your live site updates: https://mokayakoubi.vercel.app

**That's it! No terminal knowledge needed.**

---

## 📝 WHAT FILES TO EDIT

### Home Page
- File: `app/page.tsx`
- Change: Hero text, newsletter form, stats

### Global Styles
- File: `app/globals.css`
- Change: Colors, fonts, animations

### Add New Pages
- Create: `app/about/page.tsx`
- Same format as `app/page.tsx`

### Environment Variables
- File: `.env.example` (shows what you need)
- File: `.env.local` (your actual secrets - don't push to GitHub)

---

## 🆘 TROUBLESHOOTING

### "Module not found"
→ In Codespaces terminal: `npm install`

### "Cannot connect to Supabase"
→ Check `.env.local` has correct URLs (copy from Supabase Settings)

### "Vercel deployment failed"
→ Check build logs on Vercel dashboard

### "Email subscription doesn't work"
→ Make sure Supabase `newsletter_subscribers` table exists (run database.sql again)

---

## 🚀 NEXT: WHAT TO BUILD

Once live, here's what to add next:

### Week 1:
- [ ] Add `/about` page
- [ ] Add `/blog` page + a few posts
- [ ] Add `/courses` page

### Week 2:
- [ ] Create Mux account (video hosting)
- [ ] Upload first course videos
- [ ] Add course enrollment

### Week 3:
- [ ] Setup email sequences (SendGrid)
- [ ] Add `/coaching/book` page
- [ ] Stripe payment integration

---

## ✨ YOU'RE DONE!

Your site is now:
- ✅ Live on Vercel
- ✅ Database ready (Supabase)
- ✅ Editable on iPhone (Codespaces)
- ✅ Auto-deploys on code push

**Next message:** Tell me you completed this, and I'll help you build the next features!

---

## 📞 FILES CHECKLIST

You should have these in your GitHub repo:

```
mokayakoubi/
├── app/
│   ├── page.tsx (home page)
│   ├── layout.tsx
│   ├── globals.css
│   └── api/
│       └── emails/
│           └── subscribe/
│               └── route.ts
├── lib/
│   └── supabase.ts
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
├── postcss.config.js
├── .gitignore
├── .env.example
├── database.sql
└── SETUP_INSTRUCTIONS.md
```

If you're missing any, upload them via GitHub's "Upload files" button.

---

**Ready? Go build! 🚀**
