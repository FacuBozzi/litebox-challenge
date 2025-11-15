This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). The latest deployment lives at https://litebox-challenge-5qjsvsjg8-facubozzis-projects.vercel.app/.

## Architecture Notes

- The landing page (`src/app/page.tsx`) is a Server Component (`"use client"` is absent) so it renders entirely on the server.
- During that render the `Home` function invokes `fetchPosts`, which requests 14 posts from `GET /api/posts` with explicit pagination params. The same helper powers the article route so both pages reuse the cache entry. The request uses ISR with a configurable revalidation window (`LITE_TECH_REVALIDATE_SECONDS`, default 300 seconds). Set the env variable to `0` if you need to force uncached SSR again.
- Related posts (`GET /api/posts/related`) fetches via `fetchRelatedPosts`, which always performs a `cache: "no-store"` request so the modal and article sidebar reflect the latest curation.
- Because the data is loaded server-side, users see content on first paint and backend credentials stay on the server. Latency stays low thanks to the short payload (we only request 14 posts) and because responses are rendered in streaming HTML instead of waiting for client-side waterfalls.
- Each section of the homepage lives in its own component under `src/components/home`, which keeps rendering logic lean and lets us stream sections independently as soon as their data is ready.
- Mock/fallback content (hero, cards, topic pills, etc.) lives in `src/data`, so the main components stay focused on rendering and production data can replace the mocks seamlessly.

## Design Intent

The layout was designed desktop-first following the original Figma spec, and then we added explicit adjustments for small/mobile screens so key flows (hero, topics, story grid, modal) remain usable. I did not spend time perfecting tablet or "in-between" breakpoints due to the short challenge window (and I was busy with other challenges this week), so expect the best fidelity on large screens.

## TODO

- Improve mobile responsiveness, especially StoryCards and the hero section, so layouts stay balanced in smaller breakpoints.
- Increase horizontal padding on mobile screens throughout the home page.
- Polish the remaining visual details to reach pixel-perfect parity with the design.

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
