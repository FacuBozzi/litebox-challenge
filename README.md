This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). The latest deployment lives [here](https://litebox-challenge-5qjsvsjg8-facubozzis-projects.vercel.app/).

## Architecture Notes

- The landing page (`src/app/page.tsx`) is a Server Component (`"use client"` is absent) so it renders entirely on the server.
- During that render the `Home` function invokes `fetchPosts`, which requests the posts using explicit pagination parameters. The request uses ISR with a configurable revalidation window (`LITE_TECH_REVALIDATE_SECONDS`, default 300 seconds). Set the env variable to `0` if you need to force uncached SSR again.
- Because the data is loaded server-side, users see content on first paint and backend credentials stay on the server. Latency stays low thanks to the short payload (we only request 14 posts) and because responses are rendered in streaming HTML instead of waiting for client-side waterfalls.
- Each section of the homepage lives in its own component under `src/components/home`, which keeps rendering logic lean and lets us stream sections independently as soon as their data is ready.
- Mock/fallback content (hero, cards, topic pills, etc.) lives in `src/data`, so the main components stay focused on rendering and production data can replace the mocks seamlessly.

## Design Intent

The layout was designed desktop-first following the original Figma spec, and then we added explicit adjustments for small/mobile screens so key flows (hero, topics, story grid, modal) remain usable. I did not spend time perfecting tablet or "in-between" breakpoints due to the short challenge window (and I was busy with other challenges this week), so expect the best fidelity on large screens.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
