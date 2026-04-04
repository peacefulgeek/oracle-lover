# Rebuild TODO

## Phase 1: Generate Sacred Images
- [x] Hero image — luminous golden light, sacred feminine, oracle cards on velvet
- [x] About portrait — warm candlelit scene, hands holding cards with reverence
- [x] Oracle spread — overhead view of beautiful card spread on dark velvet with crystals
- [x] Books and wisdom — ancient books with golden light streaming through window
- [x] Journal and reflection — intimate journaling scene with soft morning light
- [x] Sacred space — altar with candles, crystals, cards, incense, flowers
- [x] Starfield/cosmos — ethereal night sky for section backgrounds
- [x] Golden mandala — decorative element for dividers and accents

## Phase 2: Complete CSS Redesign
- [x] Rich warm palette — deep plum, burnished gold, cream, rose, sage
- [x] Textured backgrounds — subtle linen, paper, grain overlays
- [x] Golden accent system — borders, dividers, hover states
- [x] Typography — elegant serif + clean sans pairing
- [x] Depth — layered shadows, glass effects, warm glows
- [x] Animations — fade-ins, parallax, hover lifts, smooth scrolling

## Phase 3: Rebuild All Pages
- [x] Home — full-bleed hero with overlay text, animated sections, rich cards
- [x] About — editorial layout with pull quotes and portrait
- [x] Start Here — guided pathway with numbered steps
- [x] Articles — magazine-style grid with hover effects
- [x] Article Page — beautiful reading experience with drop caps
- [x] The Oracle — showcase with card deck imagery
- [x] Connect — warm invitation with clear CTAs
- [x] Layout/Nav — refined navigation with golden accents

## Phase 4: Test & Push
- [x] All images loading
- [x] All pages beautiful on desktop and mobile
- [x] Animations smooth
- [x] Push to peacefulgeek/oracle-lover

## Phase 5: MySQL Migration (Railway)
- [x] Add mysql2 dependency
- [x] Create server/db.ts with Railway MySQL connection (RAILWAY_DATABASE_URL)
- [x] Add API endpoints: GET /api/articles, GET /api/articles/:slug
- [x] Create useArticles/useArticle hooks for frontend API fetching
- [x] Create ArticleSkeleton loading component
- [x] Update Articles.tsx to fetch from API
- [x] Update ArticlePage.tsx to fetch from API
- [x] Update Home.tsx recent articles to fetch from API
- [x] Update StartHere.tsx to fetch from API
- [x] Remove static @/data/articles imports from all pages
- [x] Railway MySQL has 29 articles with full body content
- [x] Cron jobs configured (daily publish + weekly health article gen)
- [ ] Push updated code to GitHub (susandrurylove/susan-website)
