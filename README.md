## CFC Fasteners Website

Marketing website for CFC Fasteners built with Next.js App Router.

## Setup

Install dependencies:

```bash
npm install
```

Create `.env.local` with the required variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open `http://localhost:3000` in your browser.

Main pages live in `src/app`.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Environment Variables

Required:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Notes:

- Never commit `.env.local` or any secrets. `.gitignore` already blocks `.env*`.

## Deploy

Build and start:

```bash
npm run build
npm run start
```
