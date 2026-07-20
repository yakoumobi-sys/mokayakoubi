# 🚀 MOKA'S QUICK START (OPTION A)

**Everything you need is in this folder. Follow these steps.**

---

## 📋 THE 5-STEP SETUP (30 min)

### 1️⃣ GITHUB (2 min)
```
Go to: https://github.com/new
Name: mokayakoubi
Upload all files from this folder
Commit message: "Initial Next.js setup"
```

### 2️⃣ SUPABASE (5 min)
```
Go to: https://app.supabase.com
Create project: mokayakoubi
Get 3 API keys → save in .env.local
Go to SQL Editor → paste entire database.sql → Run
```

### 3️⃣ STRIPE (Optional - 3 min)
```
Go to: https://stripe.com
Create account with: Yakoumobi@gmail.com
Get test keys → save in .env.local
(Can skip for now, add later)
```

### 4️⃣ VERCEL (5 min)
```
Go to: https://vercel.com/new
Import: https://github.com/mokayakoubi/mokayakoubi
Add environment variables from .env.local
Click Deploy
Get live URL: https://mokayakoubi.vercel.app
```

### 5️⃣ CODESPACES (3 min)
```
Go to: GitHub repo → Code → Codespaces → Create
In terminal: npm install
In terminal: npm run dev
Click link → See your site
```

---

## 📁 FILES IN THIS FOLDER

**You need to upload ALL of these to GitHub:**

```
✓ package.json
✓ tsconfig.json
✓ next.config.js
✓ tailwind.config.ts
✓ postcss.config.js
✓ .gitignore
✓ .env.example
✓ database.sql
✓ README.md
✓ SETUP_INSTRUCTIONS.md
✓ QUICK_START.md (this file)
✓ app/ (folder with all files inside)
✓ lib/ (folder with all files inside)
```

---

## 🔑 YOUR API KEYS (From Step 2 & 3)

Save these somewhere safe. You'll need them:

```
NEXT_PUBLIC_SUPABASE_URL = (from Supabase Settings → API)
NEXT_PUBLIC_SUPABASE_ANON_KEY = (from Supabase Settings → API)
SUPABASE_SERVICE_ROLE_KEY = (from Supabase Settings → API)

NEXT_PUBLIC_STRIPE_PUBLIC_KEY = (from Stripe → Developers → API Keys)
STRIPE_SECRET_KEY = (from Stripe → Developers → API Keys)
```

---

## ✨ WHAT YOU GET AFTER SETUP

- ✅ Live website: https://mokayakoubi.vercel.app
- ✅ Newsletter signup (working!)
- ✅ Database ready for courses/blog/coaching
- ✅ Email editor (GitHub Codespaces)
- ✅ Auto-deploys (every time you push to GitHub)

---

## 📝 NEXT STEP: WHAT TO EDIT

Once live, you can:

1. **Edit homepage** → `app/page.tsx`
2. **Change colors** → `tailwind.config.ts`
3. **Add new pages** → Create `app/yourpage/page.tsx`
4. **Commit changes** → Vercel auto-deploys

---

## 🆘 IF STUCK

1. **Can't upload files?** → GitHub has "Upload files" button
2. **SQL error?** → Copy-paste ENTIRE database.sql (all of it)
3. **API keys wrong?** → Copy from exact spot shown in guide
4. **Vercel fails?** → Check environment variables are correct

---

## 📞 YOU'RE DONE WHEN:

- ✅ GitHub repo shows all your code
- ✅ Vercel URL is live
- ✅ Newsletter form works on your site
- ✅ You can edit files in Codespaces
- ✅ Changes appear on live site after commit

---

**Full instructions: See `SETUP_INSTRUCTIONS.md`**

**Now go build! 🚀**
