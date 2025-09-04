# Personal Notes Manager – Frontend

Next.js app for creating, editing, searching, and managing personal notes.

## Features
- User authentication (mocked local client state, ready for REST backend integration)
- Create, edit, delete notes
- List and search notes
- Categories derived from notes
- Responsive, minimal, modern UI
- Floating action button to add notes
- Light theme with colors:
  - Primary: #0070f3
  - Accent: #f5a623
  - Secondary: #1a1a1a

## Development
- Install dependencies: `npm install`
- Run dev server: `npm run dev`
- Build: `npm run build`
- Start: `npm run start`

## Structure
- `src/app` – App Router pages
  - `/auth` – Sign in / Sign up
  - `/notes` – Notes list + search
  - `/notes/new` – Create note
  - `/notes/[id]/edit` – Edit note
- `src/components` – Reusable UI components
- `src/hooks` – `useAuth`, `useNotes`
- `src/lib/api.ts` – Client API layer (localStorage backed; replace with real REST)
- `src/lib/types.ts` – Shared TS types

## Backend integration
Replace functions in `src/lib/api.ts` with real fetch calls to your backend.
Example:

```ts
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiListNotes() {
  const res = await fetch(`${BASE_URL}/notes`, { credentials: "include" });
  if (!res.ok) return { ok: false, error: await res.text() };
  return { ok: true, data: await res.json() };
}
```

Set required env in `.env.local`:

```
NEXT_PUBLIC_API_URL=https://your-backend.example.com
```

Ensure CORS and auth tokens/cookies are configured server-side.
