# Moka Yakoubi - Personal Brand Site

Personal brand platform with courses, blog, newsletter, and coaching booking.

**Tech Stack:** Next.js 14 · Supabase · Stripe · Tailwind CSS · Vercel

---

## 🚀 Quick Start

1. **Read `SETUP_INSTRUCTIONS.md`** - Complete setup guide
2. **Follow the 5 steps** - GitHub → Supabase → Stripe → Vercel
3. **Start coding** - Edit files in GitHub Codespaces

---

## 📁 Project Structure

```
app/
├── page.tsx           # Home page (hero + newsletter)
├── layout.tsx         # Root layout
├── globals.css        # Global styles
└── api/
    └── emails/
        └── subscribe/ # Newsletter signup endpoint

lib/
└── supabase.ts        # Supabase client

package.json           # Dependencies
tsconfig.json          # TypeScript config
tailwind.config.ts     # Tailwind CSS config
database.sql           # Supabase schema (run in SQL editor)
```

---

## 📚 Features

### Current (MVP)
- ✅ Home page with hero section
- ✅ Newsletter signup (Supabase integration)
- ✅ Responsive design (Tailwind CSS)
- ✅ SEO optimized metadata

### Coming Soon
- 📝 Blog posts (database ready)
- 🎓 Courses with video lessons
- 💰 Stripe payment integration
- 📧 Email sequences (SendGrid)
- 💬 Coaching booking (Calendly)
- 👤 User dashboard
- 🔐 Authentication

---

## 🛠️ Development

### Local Setup

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Fill in your actual values

# Run development server
npm run dev
```

Open http://localhost:3000

### Production Build

```bash
npm run build
npm start
```

---

## 🔐 Environment Variables

See `.env.example` for all required variables:

- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role (for admin operations)
- `NEXT_PUBLIC_STRIPE_PUBLIC_KEY` - Stripe publishable key
- `STRIPE_SECRET_KEY` - Stripe secret key
- `SENDGRID_API_KEY` - SendGrid API key (for emails)
- `NEXT_PUBLIC_APP_URL` - Your site URL

---

## 📡 API Routes

### Email
- `POST /api/emails/subscribe` - Subscribe to newsletter

### Coming Soon
- `POST /api/courses/[id]/enroll` - Enroll in course
- `POST /api/coaching/book` - Book coaching session
- `POST /api/payment/checkout` - Stripe checkout

---

## 🎨 Customization

### Colors
Edit `tailwind.config.ts`:
```ts
colors: {
  primary: '#000000',
  secondary: '#FFD700', // Gold
  accent: '#F5A623',
}
```

### Fonts
Edit `app/globals.css`:
```css
font-family: 'Your Font', sans-serif;
```

### Content
- Homepage: `app/page.tsx`
- Global layout: `app/layout.tsx`
- Styles: `app/globals.css`

---

## 📦 Deployment

Deployed on **Vercel** with automatic deployments on GitHub push.

- Production: https://mokayakoubi.vercel.app
- Preview: Created automatically on pull requests

---

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes
3. Commit: `git commit -m "Add feature"`
4. Push: `git push origin feature/your-feature`
5. Create Pull Request on GitHub

---

## 📞 Support

For issues or questions, check:
1. `SETUP_INSTRUCTIONS.md` - Setup help
2. GitHub Issues - Report bugs
3. Supabase Docs - Database questions
4. Next.js Docs - Framework questions

---

## 📄 License

Private project © 2024 Moka Yakoubi

---

**Ready to build? Start with `SETUP_INSTRUCTIONS.md`** 🚀
