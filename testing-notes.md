# Testing Notes — The Oracle Lover

## Pages Tested
- [x] Home — Hero image loads, 3 card blocks visible, recent articles section, footer
- [x] About — Image loads, bio text renders, links work
- [x] Start Here — Image loads, 5 curated articles visible (missing Oracle Cards Are Not Fortune-Telling)
- [x] Articles — All 25 articles listed in 2-col grid, spread image loads
- [x] Article Page — Title renders once (fixed duplicate), blockquote styled, prev/next nav works
- [x] The Oracle — Image loads, content renders, links work
- [x] Connect — 3 link cards, external links work
- [x] 404 — Not tested yet

## Issues Found
1. Start Here: Only 5 articles showing — the "Oracle Cards Are Not Fortune-Telling" slug may not match
2. All images load correctly from CDN
3. No TypeScript errors
4. No console errors visible

## To Fix
- Check Start Here curated slugs match actual article slugs
