# AGENTS.md — Suzuki Sales Website

This file applies to this repository and its subdirectories. Run commands from the repository root.

## Project Overview

- Suzuki 汽車顧問官網
- Next.js 16 + React 19 + TypeScript + Tailwind CSS v4
- Deployed on Vercel through GitHub push auto-deploy; existing records say Hobby. Current plan and commercial-use eligibility need confirmation (see `OPERATIONS.md`).
- Domain: `suzuki-taipei.com` through Cloudflare DNS and Vercel SSL
- Start with `README.md`; current operations and follow-up priorities live in `OPERATIONS.md`.
- Dated audit reports are historical snapshots, not the current issue list.

## Commands

- Reproduce locked dependencies: `npm ci` (use `npm install` when intentionally changing dependencies)
- Start dev server: `npm run dev`
- Production build: `npm run build`
- Serve the production build locally: `npm start`
- Optional full data/logic suite: `npm test`; select affected files with `npx tsx --test tests/<name>.test.ts`
- Core browser regressions (11 checks: 1 HTTP + 5 desktop/mobile flows): `npm run test:browser` (builds and starts an isolated production server on port 3101; Chromium must be installed)
- Dependency scan: `npm audit` (do not apply `--force` fixes without reviewing the changes)

## File Map

- `src/app/page.tsx`, `src/components/HomePageClient.tsx` — homepage metadata and interactive composition
- `src/app/cars/[slug]/`, `src/app/guides/[slug]/`, `src/app/visit/beitou/` — public SEO content pages
- `src/app/sitemap.ts` — sitemap generation
- `src/app/layout.tsx`, `src/data/seo.ts` — metadata and JSON-LD
- `src/app/api/notify/route.ts`, `src/lib/consultation*.ts` — private lead storage and notification delivery
- `src/app/api/delivery/route.ts` — dynamically discovers public delivery photos
- `src/components/` — car comparison, modal, delivery carousel, calculator, and UI sections
- `src/data/site.ts` — public site content
- `src/data/content.ts` — page copy, related links, source review dates and meaningful update dates
- `src/components/ConsultationProvider.tsx` — in-memory consultation state across client navigation
- `src/components/SiteHeader.tsx`, `src/components/ContactLinks.tsx` — shared navigation and the single LINE/phone action group on content pages; homepage retains separate phone, LINE and map cards
- `src/lib/analytics.ts`, `src/components/Analytics.tsx` — production-only GA4 allowlist and event deduplication
- `src/data/constants.ts` — car/business constants
- `src/data/promotions.ts` — campaign periods in Taiwan time
- `tests/` — maintained regression tests, not disposable test artifacts
- `docs/IMAGE_ASSETS.md` — image sources, compression and naming rules
- `OPERATIONS.md` — deployment, SEO, Google Business Profile, automation notes
- `docs/SEO_MEASUREMENT.md` — search baseline, analytics activation, qualified leads and release checks

## Editing Rules

- Prefer structured data edits in `src/data/` before changing component logic.
- Preserve SEO-sensitive metadata, sitemap behavior, and public contact paths unless the owner asks to change them.
- Do not hand-edit generated files or tool state: `.next/`, `.vercel/`, `node_modules/`, `next-env.d.ts`, `*.tsbuildinfo`, or `.DS_Store`. Normal build/install commands may regenerate them.
- Use Git history instead of source backups. Keep `*.bak`, build caches and browser test reports out of Git; remove confirmed obsolete backups when cleanup is authorized.
- Do not delete public assets solely because a text search finds no reference: `delivery-N.jpg` files are discovered dynamically, and icons/share images have public URL consumers. Preserve deliberate reserve images unless their removal is requested.
- Verify price/specification/campaign changes against Taiwan Suzuki official sources. Keep source URLs and review dates accurate; use explicit `+08:00` campaign boundaries and an exclusive end. Expiry hides an offer but does not fetch its replacement.
- Keep credentials server-only. `.env.example` contains names and empty values only; do not print `.env.local` or copy real webhook URLs into source, fixtures or documentation.
- Keep consultation success tied to durable storage and preserve request-ID deduplication. Notification failure must not discard stored leads. Local unit tests must use mocked storage and delivery.
- Local environment files may contain production credentials. Do not submit valid test consultations or trigger real Discord/Sheets delivery without explicit authorization; intercept the API for browser checks.
- Do not push, deploy, alter Cloudflare/Vercel settings, or change production automation without explicit approval.
- Do not expose private customer photos, webhook URLs, tokens, or unpublished lead/contact data.

## Verification

- 預設不新增測試，先修改或補充既有案例。新增前說明：要攔住哪個核心錯誤，以及最接近的現有測試為何攔不住。
- 文案、排版、圖示、固定選項、版本更新或單純重構，不因此增加測試。
- 新實作取代舊實作時，同輪移除過時或重複測試，保留仍有效的獨有保護。
- 一般更新只跑受影響的測試；全套限大範圍變更、測試大量刪減、必要發布檢查或使用者明確要求。
- For content-only changes, inspect the rendered page or affected data usage when practical.
- For component, routing, SEO, or style changes, run `npm run build`.
- Select affected tests by file. Content/FAQ edits: `npx tsx --test tests/content.test.ts`; SEO data: `npx tsx --test tests/seo.test.ts`; campaigns: `npx tsx --test tests/promotions.test.mjs`; swipe logic: `npx tsx --test tests/photo-gestures.test.ts`.
- The owner requested deletion of consultation storage/retry/notification/input-validation, JSON-LD security and analytics regression tests. Do not recreate them as routine cleanup or require them for unrelated website updates.
- For visual changes, verify desktop and mobile layouts before reporting completion.
- For interaction changes, select the affected browser file or scenario, e.g. `npm run test:browser -- site.spec.ts --grep "loan"`. Use desktop and mobile for affected UI. Keep test receivers isolated and reports ignored.
- Browser tests already build the production app; do not also run a separate build for the same unchanged revision.
- Run `git diff --check` and report what was actually checked; local verification does not prove production deployment or external delivery.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
