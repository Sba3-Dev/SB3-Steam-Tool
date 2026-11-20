# SB3 Steam Tool

**Current UI version:** 0.0.1

A React + Vite frontend foundation for SB3 Steam Tool.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## v0.0.1 — Initial UI foundation

- Startup Welcome screen with separate rows for update, Discord, Steam, and SB3 membership checks.
- Dedicated Discord sign-in, Steam sign-in, and membership screens (UI only).
- Main workspace with game library, downloads, changelog, and settings.
- Dark crimson visual identity and eight selectable themes.
- Theme preference is saved locally.

## Backend status

The current repository is a frontend preview. Real Discord OAuth, Steam OpenID verification, Discord membership checks, and update delivery are not connected yet. The UI labels these as unconfigured and does not claim that checks have passed.

For production, sensitive authentication and membership verification should run in a separate SB3 Steam Tool backend deployment. It must use its own environment variables, secrets, callback URLs, and storage namespace; it should not share the old tool's credentials or session store.

No Steam DRM or license-bypass functionality is included.
