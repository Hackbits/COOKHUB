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
- [ ] Initialize Next.js App Router project
- [ ] Configure Tailwind CSS
- [ ] Migrate design tokens and global styles
- [ ] Create reusable components (Header, Footer, RecipeCard, etc.)
- [ ] Create pages (Home, Discovery, Fridge Raid, Community, Creator Studio, Cooking Mode, Recipe Detail, Shopping List, Library)
- [ ] Add Zustand for state management (Shopping List, User Preferences)
- [ ] Integrate Firebase Auth (Google/GitHub social login)

### Phase 2: Backend API (FastAPI)

- [ ] Set up FastAPI project structure
- [ ] Recipe CRUD endpoints
- [ ] Recipe Refactor AI endpoint (OpenAI/Gemini)
- [ ] Eco-Score calculation endpoint
- [ ] Web scraping endpoint (Recipe-Scrapers)
- [ ] User profile endpoints

### Phase 3: Database (MongoDB Atlas)

- [ ] Schema design for Users, Recipes, Notifications
- [ ] MongoDB Atlas Vector Search for semantic recipe search
- [ ] Image storage via Cloudinary

### Phase 4: Real-Time & Integrations

- [ ] Socket.io for real-time notifications
- [ ] Spoonacular/Edamam API integration for world recipes
- [ ] Stripe for Pro subscriptions

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
