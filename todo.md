# The Oracle Lover — TODO

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

## Phase 4: MySQL Migration (web-db-user upgrade)
- [x] Upgrade project to web-db-user template (tRPC + Drizzle + Manus Auth)
- [x] Resolve merge conflicts (Home.tsx, NotFound.tsx, package.json, db.ts)
- [x] Add articles table to TiDB (snake_case schema)
- [x] Create API endpoints: GET /api/articles, GET /api/articles/:slug
- [x] Auto-seed 29 articles from TypeScript file into TiDB on first boot
- [x] Update frontend pages to fetch from API (Articles, ArticlePage, Home, StartHere)
- [x] Create useArticles hook and ArticleSkeleton loading component
- [x] Cron jobs: daily publish check + weekly health article generation
- [x] Verify all pages render correctly with API data
- [x] Keep custom NotFound page (oracle-themed, not template default)

## Phase 5: Push & Deploy
- [x] Save checkpoint
- [x] Push to GitHub (susandrurylove/susan-website)
