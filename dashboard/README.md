# Nexus — Learning Dashboard

A futuristic, animated student learning dashboard built with Next.js 15, Supabase, Framer Motion, and Tailwind CSS.

## Live Demo

Deploy on Vercel with one click, or run locally.

## Tech Stack

- **Next.js 15** (App Router) — Server Components, Suspense, streaming
- **Supabase** — PostgreSQL database via `@supabase/supabase-js`
- **Tailwind CSS** — Utility-first styling with custom design tokens
- **Framer Motion** — Spring-physics animations, layoutId micro-interactions
- **Lucide React** — Dynamic icon rendering

## Architecture Choices

### Server / Client Component Split

- `CoursesGrid` is a **Server Component** — it fetches Supabase data directly on the server with zero client JS overhead.
- `BentoCard`, `CourseCard`, `HeroTile`, `ActivityTile` are **Client Components** — they use Framer Motion which requires the browser.
- `Sidebar` and `MobileNav` are Client Components for interactivity (collapse state, active nav item).
- `Suspense` wraps `CoursesGrid` with a skeleton fallback (`CoursesGridSkeleton`) for streaming SSR.

### Animation Strategy

- **Zero layout shifts**: all hover/entrance animations use `transform` (scale, translateY) and `opacity` exclusively — never `width`, `height`, or `margin`.
- **Staggered page load**: each Bento tile has a `delay` prop that staggers the spring entrance animation.
- **Spring physics**: `type: "spring", stiffness: 300, damping: 20` on all hover states for natural feel.
- **layoutId**: Sidebar nav highlight uses `layoutId="sidebar-active-bg"` for a smooth positional transition between items.
- **Progress bars**: animate from 0 → value on mount using Framer Motion's `animate` prop.

### Responsive Design

- **Desktop (>1024px)**: Full 12-column Bento grid + expanded sidebar
- **Tablet (768–1024px)**: Sidebar collapses to icon-only; grid is 2-column
- **Mobile (<768px)**: Sidebar hidden, bottom nav bar replaces it; grid stacks to single column

## Supabase Setup

1. Create a free project at [supabase.com](https://supabase.com)
2. Run this SQL in the editor:

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

3. Copy your Project URL and `anon` key from Settings → API
4. Add them to `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

> If Supabase is not configured, the dashboard falls back to demo data automatically.

## Getting Started

```bash
npm install
cp .env.example .env.local
# fill in your Supabase credentials
npm run dev
```

## Deployment

Push to GitHub → import on [Vercel](https://vercel.com) → add the two env vars in project settings.
