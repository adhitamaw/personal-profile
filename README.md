# Portfolio Adhitama Wichaksono

Website personal profile dengan Next.js dan Supabase, dilengkapi halaman admin untuk mengelola konten.

## Fitur

- **Home** — Hero section, ringkasan experience, featured projects, dan skills
- **Experience** — Career timeline, pendidikan, leadership, sertifikasi, publikasi
- **Portfolio** — Daftar proyek dengan tags dan filter featured
- **Skills** — Skill groups dengan kategori
- **Contact** — Form kontak + informasi kontak
- **Admin Panel** — Dashboard CRUD untuk profile, experience, projects, skills, dan messages

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Supabase (Database + Auth)
- Lucide React (icons)
- Framer Motion

## Quick Start

```bash
cd portfolio-adhitama
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

Tanpa Supabase, website tetap berjalan dengan data seed dari portofolio asli.

## Setup Supabase

1. Buat project di [supabase.com](https://supabase.com)
2. Jalankan `supabase/schema.sql` di SQL Editor
3. Jalankan `supabase/seed.sql` untuk data awal
4. Buat user admin di Authentication → Users
5. Copy `.env.local.example` ke `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

6. Restart dev server

## Admin Panel

- URL: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- Login dengan akun Supabase Auth yang sudah dibuat
- Kelola konten di `/admin`

## Struktur Project

```
src/
├── app/
│   ├── page.tsx              # Home
│   ├── experience/           # Experience page
│   ├── portfolio/            # Portfolio page
│   ├── skills/               # Skills page
│   ├── contact/              # Contact page
│   └── admin/
│       ├── login/            # Admin login
│       └── (panel)/          # Admin dashboard & CRUD
├── components/               # UI components
└── lib/
    ├── data.ts               # Data fetching layer
    ├── seed-data.ts          # Fallback data
    └── supabase/             # Supabase clients
```

## Deploy

Deploy ke Vercel dan set environment variables Supabase di project settings.

```bash
npm run build
```
