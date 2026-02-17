# COOKHUB - Professional Tech Stack Migration Plan

## Current State

- Static HTML pages: index, discovery, fridge-raid, community, creator-studio, cooking-mode, recipe-detail, shopping-list, library
- Single `app.js` (2410 lines) with all logic (CookHubApp class + CookHubData store)
- `styles.css` with CSS variables/design tokens
- Tailwind CSS via CDN
- No backend, no database, no auth — all data is hardcoded

## Target Tech Stack

### Phase 1: Next.js Frontend (Current Phase)

- [x] Plan created
- [x] Initialize Next.js App Router project
- [x] Configure Tailwind CSS
- [x] Migrate design tokens and global styles
- [x] Create reusable components (Header, Footer, RecipeCard, etc.)
- [x] Create pages (Home, Discovery, Fridge Raid, Community, Creator Studio, Cooking Mode, Recipe Detail, Shopping List, Library)
- [x] Add Zustand for state management (Shopping List, User Preferences)
- [x] Integrate Firebase Auth (Google/GitHub social login)

### Phase 2: Backend API (Vercel AI SDK + Next.js)

> **Architecture Change**: Migrated from FastAPI to Next.js API Routes and Server Actions using the Vercel AI SDK, eliminating the need for a separate Python backend.

- [x] Recipe Refactor AI endpoint — `src/app/api/ai/refactor/route.ts` (Vercel AI SDK + Google Gemini 2.5 Flash)
- [x] Web scraping — `src/actions/scrape-recipe.ts` (Server Action using Cheerio with LD+JSON parsing)
- [x] Eco-Score calculation endpoint — `src/app/api/ecoscore/route.ts`
- [x] Recipe CRUD endpoints — `src/app/api/recipes/route.ts` + `src/app/api/recipes/[id]/route.ts`
- [x] User profile endpoints — `src/app/api/user/route.ts` + `saved/` + `cooked/`

### Phase 3: Database (Firebase Firestore + Storage)

> **Architecture Change**: Migrated from the planned MongoDB Atlas to **Firebase Firestore** + **Firebase Storage**, consolidating all backend services on the Firebase platform already used for Auth.

- [x] Firestore service modules — `recipe-service.ts`, `user-service.ts`, `review-service.ts`, `storage-service.ts`
- [x] Seed script — `scripts/seed-firestore.ts` (firebase-admin)
- [x] API routes migrated to Firestore service calls
- [x] Page components migrated to Firestore service calls
- [x] Types updated (number → string IDs)
- [x] Zustand stores updated (number → string IDs)
- [x] Add Firebase Storage domain to `next.config.ts`
- [x] Implement collections in Firestore
- [x] Add loading states to fridge-raid + discovery pages

### Phase 4: Real-Time & Integrations

- [ ] Socket.io for real-time notifications
- [ ] Spoonacular/Edamam API integration for world recipes
- [ ] Stripe for Pro subscriptions

### Phase 5: Advanced AI Intelligence

- [ ] AI-Powered "Fridge Raid" (Vector Embeddings & Semantic Search)
- [ ] Smart Ingredient Extraction (Computer Vision: Google Vision/YOLO)
- [ ] "Recipe Refactor" Engine (GenAI: GPT-4o/Gemini)
- [ ] Personalized "Taste Profile" (ML: Content-based Filtering)
- [ ] Automated Nutritional & Eco-Labeling (Data Mapping & Analysis)

### Phase 6: Future AI Concepts

- [ ] Hands-Free "AI Sous-Chef" (Voice Assistant)
- [ ] "Plate Rater" (Aesthetics Scoring via Vision API)
- [ ] "Fail Fixer" (Culinary Rescue Bot)
- [ ] Smart Party Planner & Menu Generator (Constraint Satisfaction)
- [ ] Dynamic Beverage Pairing (Sommelier AI)
- [ ] "Recipe Remix" for Creators (Video-to-Recipe Generation)

### Phase 7: Automation & DevOps

- [ ] **Vercel Deployment** — Connect GitHub repo. **Requires Env Vars**: `CRON_SECRET`, `FIREBASE_SERVICE_ACCOUNT_KEY`, `NEXT_PUBLIC_SENTRY_DSN`.
- [x] **GitHub Actions CI/CD** — `.github/workflows/ci.yml` runs `tsc --noEmit` + `eslint` + `next build` on every push/PR
- [x] **Pre-Commit Hooks** — `husky` + `lint-staged` auto-lints and formats staged files before every commit
- [x] **Dependency Updates** — `.github/dependabot.yml` for weekly npm + monthly GitHub Actions automated PR creation
- [x] **Error Monitoring** — Integrated Sentry (Next.js SDK)
- [x] **Vercel Cron Jobs** — Defined in `vercel.json` (scrapers, digests, cleanup, backups)
- [x] **Automated DB Backups** — `src/app/api/cron/backup-firestore/route.ts` triggers Firestore export to Storage bucket (requires `FIREBASE_SERVICE_ACCOUNT_KEY`)

### Phase 8: Analytics, SEO & Notifications

- [ ] **Vercel Analytics / PostHog** — Track page views, user flows, and Core Web Vitals
- [ ] **Auto-Generated Sitemap & Robots.txt** — Next.js `sitemap.ts` + `robots.ts` for search engine indexing
- [ ] **Dynamic OG Images** — `opengraph-image.tsx` + `generateMetadata()` for per-recipe social sharing cards
- [ ] **Email Automation** — Resend or SendGrid for welcome emails, weekly recipe digests, and cooking reminders
- [ ] **Uptime Monitoring** — BetterUptime or UptimeRobot to alert if the site goes down

---

## Phase 1 Detailed Steps (Starting Now)

### Step 1: Initialize Next.js Project

```bash
npx -y create-next-app@latest ./ --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```

### Step 2: Tailwind Config

- Migrate color palette (primary, accent, slate-black, warm-cream, soft-cream)
- Migrate font families (Plus Jakarta Sans, Playfair Display)
- Migrate border radius tokens

### Step 3: Global Styles

- Move CSS variables and base styles
- Add Google Fonts via next/font
- Material Symbols integration

### Step 4: Component Architecture

```
src/
├── app/
│   ├── layout.tsx          (Root layout with header/footer)
│   ├── page.tsx            (Home page)
│   ├── discovery/page.tsx
│   ├── fridge-raid/page.tsx
│   ├── community/page.tsx
│   ├── creator-studio/page.tsx
│   ├── cooking-mode/page.tsx
│   ├── recipe/[id]/page.tsx
│   ├── shopping-list/page.tsx
│   └── library/page.tsx
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── recipes/
│   │   ├── RecipeCard.tsx
│   │   ├── RecipeGrid.tsx
│   │   └── RecipeDetail.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── SearchBar.tsx
│   │   ├── Modal.tsx
│   │   └── Tag.tsx
│   └── auth/
│       └── AuthModal.tsx
├── lib/
│   ├── data.ts             (Recipe data - temporary until backend)
│   ├── firebase.ts         (Firebase config)
│   └── types.ts            (TypeScript types)
└── store/
    ├── useShoppingStore.ts
    └── useUserStore.ts
```
