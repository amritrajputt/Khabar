# KHABAR — Premium Neo-Brutalist News Portal

Khabar is a premium, high-fidelity news web application built with **Next.js 16 (App Router)** and **Tailwind CSS**. It is meticulously styled using a bold, retro-modern **Neo-Brutalist** design language, featuring heavy border offsets, grid alignments, vibrant visual markers, and fluid micro-animations.

---

## ⚡ Core Features

### 1. Neo-Brutalist Aesthetics
- Distinct offset card drop-shadows (`brutal-shadow`).
- High-contrast geometric layouts with curated HSL color schemes.
- Custom premium typography using Google Fonts (**Oxanium** for body/brand and **Geist** for headings).

### 2. Server-Side Data Fetching (Direct Server Components)
- Eliminates client-side `useEffect` layout flashes and spinner shifts.
- Fetches articles directly on the server for both the Home (`/`) page and Category (`/[category]`) pages, optimizing page loading performance and maximizing SEO crawlability.

### 3. Dynamic Navigation Highlighting
- Dynamic navigation bar component (`components/news/category-nav.tsx`) that reads browser routes using Next.js `usePathname()`.
- Highlights the active category link with offset brutalist shadows and golden HSL background markers dynamically.

### 4. Swipe-to-Scroll & Mobile Layout Adaptation
- The navigation categories list supports fluid touch-swipe horizontal scroll on mobile devices with scrollbar indicators fully hidden (`no-scrollbar`).
- The home page's **Hot News Carousel** automatically morphs its control pane from a vertical control dock on desktop, to a horizontal paging bar on mobile.

### 5. Automatic Infinite Scroll (Intersection Observer)
- All category routes support infinite scrolling.
- An `IntersectionObserver` automatically fetches subsequent pages (24 articles per page) as the user scrolls to the bottom of the grid, accompanied by a neo-brutal bounce loading animation.

### 6. Robust Filesystem Caching Layer
- Avoids rate limit exhaustion (`429 Too Many Requests`) from API developers.
- Automatically saves successful API responses in the local filesystem (`lib/news-cache/*.json`). If the API is rate-limited or down, the system immediately serves the cached real articles instead of displaying empty sections.

---

## ⚙️ Environment Configuration

Create a `.env` file in the root of the project:

```env
NEXT_PUBLIC_NEWSDATA_IO=pub_19927dfebf8048ba813fa3bca6767056
```

*Note: All legacy NewsAPI.org code has been fully removed, promoting **NewsData.io** as the sole news service provider. Category pages are configured with `force-dynamic` to fetch freshest articles on request.*

---

## 🚀 Getting Started

First, install the dependencies:
```bash
pnpm install
```

Second, run the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

---

## 🏗️ Production Build

To run the production compiler check:
```bash
pnpm build
```
The dynamic route builder maps the routes to on-demand render parameters (`/[category]`), ensuring build-time API requests are fully optimized.
