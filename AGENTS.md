# AGENTS.md — Suzuki Sales Website

This file applies inside `/Users/1xuan/side_projects/suzuki-sales-website/`.

## Project Overview

- Suzuki 汽車顧問官網
- Next.js 16 + React 19 + TypeScript + Tailwind CSS v4
- Deployed on Vercel Hobby through GitHub push auto-deploy
- Domain: `suzuki-taipei.com` through Cloudflare DNS and Vercel SSL
- Operations notes live in `OPERATIONS.md`

## Commands

- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Production build: `npm run build`

Run commands from `/Users/1xuan/side_projects/suzuki-sales-website/`.

## File Map

- `src/app/page.tsx` — homepage composition
- `src/app/sitemap.ts` — sitemap generation
- `src/components/` — car comparison, modal, delivery carousel, calculator, and UI sections
- `src/data/site.ts` — public site content
- `src/data/constants.ts` — car/business constants
- `OPERATIONS.md` — deployment, SEO, Google Business Profile, automation notes

## Editing Rules

- Prefer structured data edits in `src/data/` before changing component logic.
- Preserve SEO-sensitive metadata, sitemap behavior, and public contact paths unless the owner asks to change them.
- Do not edit `.next/`, `.vercel/`, `node_modules/`, `.DS_Store`, or backup files such as `*.bak`.
- Do not push, deploy, alter Cloudflare/Vercel settings, or change production automation without explicit approval.
- Do not expose private customer photos, webhook URLs, tokens, or unpublished lead/contact data.

## Verification

- For content-only changes, inspect the rendered page or affected data usage when practical.
- For component, routing, SEO, or style changes, run `npm run build`.
- For visual changes, verify desktop and mobile layouts before reporting completion.
