# Sarthik Khanna — Portfolio

A dark, glassmorphic Next.js portfolio built with Tailwind CSS, Framer Motion, and Lucide icons.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000. (Requires internet access on first build — Next.js
fetches the Space Grotesk / JetBrains Mono fonts from Google Fonts at build time.)

## Adding your photos

Two slots are wired up and ready:

1. **Hero profile photo** — `components/Hero.tsx`, inside the glowing ring div.
   Drop your image in `public/profile.jpg` and swap the placeholder `<span>`
   for:
   ```tsx
   <Image src="/profile.jpg" alt={profile.name} fill className="object-cover" />
   ```
   (add `import Image from "next/image";` at the top of the file)

2. **About section photo** — `components/About.tsx`, same pattern. Drop your
   image in `public/workspace.jpg` and swap the placeholder the same way.

## Editing content

All copy — name, bio, skills, projects, achievements, contact details — lives
in one place: `lib/data.ts`. Edit that file and every section updates.

## Wiring up the contact form

`components/Contact.tsx` currently just flips a "Sent" state on submit. Point
it at a real backend by replacing the `handleSubmit` function with a call to
a form service (Formspree, Resend) or your own API route.

## Design notes

- **Palette:** near-black ink background (`#0A0B10`) with violet (`#7C5CFC`)
  and cyan (`#38E1C6`) glow accents, glassmorphic panels throughout.
- **Type:** Space Grotesk for display/body, JetBrains Mono for labels, tags,
  and the signature "typed code" element in the hero — a nod to the
  developer identity the whole site is built around.
- **Motion:** scroll-triggered reveals via Framer Motion `whileInView`, hover
  lift on cards, a slow conic-gradient spin on the profile ring, and a
  typewriter effect rendering a JS object literal of Sarthik's profile.
- Reduced-motion is respected globally (`app/globals.css`), and focus states
  are visible for keyboard navigation.

## Deploying

This is a standard Next.js 14 App Router project — deploys to Vercel with
zero config: push to a GitHub repo and import it at vercel.com/new.
