# Nexus — Learning Dashboard 🚀

A futuristic, fully-animated student learning dashboard built with **Next.js 15**, **Supabase**, **Framer Motion**, and **Tailwind CSS**.

![Next.js](https://img.shields.io/badge/Next.js-15.1.0-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-blue?logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)

## ✨ Features

- 📚 **Dynamic Course Library** — Browse courses with subtopics, progress tracking, and certificate downloads
- 🏆 **Achievements & Certificates** — Track completed courses and unlock achievement milestones with downloadable certificates
- ⚙️ **Interactive Settings** — Customize learning goals, notification preferences, course style, security settings, and email
- 🔐 **Password Management** — Change password with validation and confirmation modal
- 📊 **Dashboard Analytics** — View daily activity, learning statistics, and progress at a glance
- 🎨 **Beautiful Animations** — Spring-physics transitions, staggered entrance animations, smooth hover effects
- 📱 **Fully Responsive** — Desktop (12-col grid), Tablet (2-col + collapsed nav), Mobile (1-col + bottom nav)
- 🌓 **Dark Theme** — Carefully crafted dark mode with cyan, violet, and emerald accents
- ⚡ **Server Components** — Zero client-side data fetching overhead; courses fetched server-side
- 🔄 **Suspense Boundaries** — Skeleton loaders and streaming SSR for fast perceived performance

## 🎯 Pages & Routes

| Route | Purpose |
|-------|---------|
| `/dashboard` | Main dashboard with Bento grid layout, hero tile, stats, courses, and activity |
| `/dashboard/courses` | Browse all available courses with filtering |
| `/dashboard/courses/[id]` | Individual course details with subtopics and certificate download |
| `/dashboard/achievements` | Track earned certificates and achievement progress |
| `/dashboard/settings` | Manage account, notifications, learning preferences, and security |

## 🛠️ Tech Stack

- **Next.js 15** (App Router) — Server Components, Suspense, streaming, dynamic routes
- **React 19** — Client components with hooks (useState, useEffect)
- **TypeScript 5** — Full type safety across the codebase
- **Supabase** — PostgreSQL database via `@supabase/supabase-js`
- **Tailwind CSS 3.4** — Utility-first styling with custom design tokens
- **Framer Motion 11.15** — Spring-physics animations, layout animations, stagger effects
- **Lucide React 0.468** — Dynamic icon library (600+ icons)

## 🏗️ Architecture

### Server vs Client Components

- **Server Components**: `CoursesGrid`, `layout.tsx` — fetch data server-side, zero JS overhead
- **Client Components**: `BentoCard`, `CourseCard`, `HeroTile`, `Sidebar`, `MobileNav`, `SettingsPage` — interactive features, animations
- **Hybrid**: `CertificateDownload` — client component for download logic within server page

### Animation Philosophy

✅ **Best practices implemented:**
- Zero layout shifts: all animations use `transform` (scale, translateY) and `opacity` only
- Spring physics: `stiffness: 300, damping: 20` for natural feel
- Staggered entrance: tiles animate in sequence on page load
- Layout animations: nav highlight uses `layoutId` for smooth positional transitions
- Performance: Framer Motion `useReducedMotion` respect in CSS

### Responsive Breakpoints

```
Mobile:  < 768px   → 1-column grid, bottom nav, collapsed content
Tablet:  768-1024px → 2-column grid, icon sidebar, medium spacing
Desktop: > 1024px   → 12-column Bento grid, expanded sidebar, full layout
```

## 🚀 Quick Start

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- Supabase account (optional — demo data works out of the box)

### Installation

```bash
# Clone and install
git clone https://github.com/yourusername/nexus-dashboard
cd dashboard
npm install

# Create env file
cp .env.example .env.local
# Add your Supabase credentials (optional)
```

### Environment Variables

```env
# .env.local

# Supabase (optional — demo data is used if not provided)
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

### Running Locally

```bash
# Development server (http://localhost:3000)
npm run dev

# Production build
npm run build
npm run start

# Linting & type checking
npm run lint
npm run type-check
```

## 📦 Project Structure

```
dashboard/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home redirect to /dashboard
│   ├── globals.css             # Global styles & animations
│   └── dashboard/
│       ├── layout.tsx          # Sidebar + MobileNav wrapper
│       ├── page.tsx            # Main dashboard (Bento grid)
│       ├── courses/
│       │   ├── page.tsx        # All courses list
│       │   └── [id]/page.tsx   # Individual course detail + certificate
│       ├── achievements/page.tsx  # Achievement tracking
│       └── settings/page.tsx    # Interactive settings
├── components/
│   ├── dashboard/
│   │   ├── Sidebar.tsx         # Desktop navigation (collapsible)
│   │   ├── MobileNav.tsx       # Mobile bottom nav
│   │   ├── BentoCard.tsx       # Reusable card wrapper
│   │   ├── HeroTile.tsx        # Welcome greeting + streak
│   │   ├── StatsTile.tsx       # Learning stats
│   │   ├── ActivityTile.tsx    # Daily activity chart
│   │   ├── CourseCard.tsx      # Individual course card
│   │   ├── CoursesGrid.tsx     # Server Component fetching courses
│   │   ├── CoursesGridSkeleton.tsx  # Loading skeleton
│   │   └── CertificateDownload.tsx  # Client component for downloads
│   └── ui/
│       ├── DynamicIcon.tsx     # Lucide icon mapper
│       └── ProgressBar.tsx     # Animated progress bar
├── lib/
│   ├── supabase.ts             # Supabase client & fetch functions
│   └── supabase-client.ts      # Client-side Supabase (optional)
├── types/
│   └── index.ts                # TypeScript interfaces
└── public/                     # Static assets
```

## 💾 Supabase Setup (Optional)

If you want to connect to a real database:

1. Create a free project at [supabase.com](https://supabase.com)
2. Run this SQL in the SQL Editor:

```sql
create table courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  progress integer not null default 0,
  icon_name text not null default 'Code2',
  created_at timestamptz default now()
);

insert into courses (title, progress, icon_name) values
  ('Advanced React Patterns', 75, 'Code2'),
  ('Database Architecture & SQL', 42, 'Database'),
  ('Machine Learning Fundamentals', 88, 'Brain'),
  ('Cloud-Native Development', 31, 'Globe');
```

3. Copy your **Project URL** and **anon key** from `Settings → API`
4. Paste into `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

> If Supabase is not configured, the dashboard automatically uses demo data.

## 🎨 Design System

### Color Palette

```css
/* Dark theme base */
--bg-base: #080B10     /* Darkest background */
--bg-card: #0D1117     /* Card background */
--bg-border: #1C2128   /* Border color */

/* Accent colors */
--cyan: #00D9FF        /* Primary accent */
--violet: #8B5CF6      /* Secondary accent */
--emerald: #10F5A8     /* Success color */
--amber: #FFAA00       /* Warning color */
```

### Custom Animations

```css
/* Defined in tailwind.config.ts */
@keyframes pulse-slow { ... }      /* 3s pulse */
@keyframes shimmer { ... }         /* Loading skeleton shimmer */
@keyframes streak { ... }          /* Flame streak wobble */
```

## 🔐 Features Breakdown

### Dashboard (`/dashboard`)
- **Hero Tile**: Personalized greeting with daily learning streak
- **Stats Tile**: Overview of courses, achievements, and total hours
- **Courses Grid**: Server-fetched courses with Suspense skeleton
- **Activity Tile**: Last 30 days activity heatmap
- **Bento Layout**: 12-column grid that collapses on mobile

### Courses (`/dashboard/courses`)
- Browse all available courses
- View course progress and subtopic count
- Click to view course details

### Course Detail (`/dashboard/courses/[id]`)
- Full course information with subtopics
- Progress bar with animated percentage
- **Certificate Download** — Generate and download certificate as `.txt` file
- Static generation via `generateStaticParams()` for all 6 demo courses

### Achievements (`/dashboard/achievements`)
- Display earned certificates with "Completed" badge
- Show in-progress achievements with progress bars
- Locked achievements dimmed out
- Each achievement has title, description, and reward

### Settings (`/dashboard/settings`)
**Interactive state management with validation:**

**Account Settings**
- Toggle profile visibility
- Edit email address

**Notifications**
- Toggle course reminders
- Toggle certificate alerts

**Learning Preferences**
- Set daily learning goal (15-480 min)
- Choose preferred course style (interactive, video, reading, mixed)

**Security**
- Enable/disable two-factor authentication
- Change password with modal confirmation and validation

## 🚀 Deployment

### Vercel (Recommended)

```bash
# 1. Push to GitHub
git add .
git commit -m "Deploy dashboard"
git push origin main

# 2. Import on Vercel
# Go to https://vercel.com/new → select your repo

# 3. Add environment variables in project settings
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# 4. Deploy
# Vercel auto-deploys on every push to main
```

### Self-Hosted

```bash
npm run build
npm run start
# Runs on http://localhost:3000
```

## 📊 Performance Metrics

- ⚡ **Build**: ~40s with 16 routes compiled
- 🚀 **Dev Server Start**: ~1.7s ready time
- 📦 **Page Size**: Settings ~2.4 kB, Dashboard ~2.66 kB
- 🎬 **First Load JS**: ~105 kB (shared chunks)
- 🖼️ **Animations**: 60fps with Framer Motion spring physics

## 🛣️ Roadmap

- [ ] Backend persistence for settings (Supabase integration)
- [ ] User authentication with Supabase Auth
- [ ] Real course data loading from database
- [ ] PDF certificate generation
- [ ] Progress synchronization across devices
- [ ] Push notifications for reminders
- [ ] Social sharing for achievements
- [ ] Dark/Light theme toggle

## 📝 License

MIT — Feel free to use this dashboard as a template for your projects!

## 💬 Support

- **Documentation**: Check code comments for detailed explanations
- **Issues**: Found a bug? Open an issue on GitHub
- **Contributions**: PRs welcome!

---

**Made with ❤️ using Next.js, Framer Motion, and Tailwind CSS**
