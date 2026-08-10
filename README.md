# Leaf Digital — website

Business website for Leaf Digital (leafdigital.co): the apps portfolio, thesis
narrative, and agency services. Next.js 15 (App Router) + Tailwind v4.

## Context
- Replaces the static v1 site (repo: archive-site-v1-static) — which stays LIVE
  until domain cutover. Do not break it; do not archive it before cutover.
- Milestone 1 (blocks the alt-text app's Sep 5 App Store submission):
  /apps/alt-text landing page, /privacy, /support — deployed on a preview
  domain so the URLs exist for the submission.
- Milestone 2: port homepage positioning + the AI-shopping-agent widget + lead
  form from the v1 site (check what the current form posts to first), then
  domain cutover, then archive the v1 repo.
- Milestone 3: umbrella build-out — Products-primary IA, email capture.
- Content library (LinkedIn posts, salvaged docs): private repo leafdigital/business.

## Dev
npm install && npm run dev
