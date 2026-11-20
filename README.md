# SB3 Steam Tool

**Current UI version:** 0.0.1

SB3 Steam Tool is a Windows desktop application built with React, Vite, and Electron.

## Run the frontend

```bash
npm install
npm run dev
```

## Run the desktop shell during development

Start Vite in one terminal:

```bash
npm run dev
```

Then launch Electron in a second terminal:

```bash
npm run desktop
```

## Build a Windows installer

```bash
npm install
npm run dist:win
```

The installer is written to the `release/` directory.

## v0.0.1 — Initial UI foundation

- Startup Welcome screen with separate rows for update, Discord, Steam, and SB3 membership checks.
- Dedicated Discord sign-in, Steam sign-in, and membership screens (UI only).
- Main workspace with library, downloads, changelog, and settings.
- Dark crimson visual identity and eight selectable themes.
- Electron desktop shell with isolated renderer settings and external-link handling.

## Backend status

This first build is a frontend/desktop preview. Real Discord OAuth, Steam OpenID verification, Discord membership checks, and automatic update delivery are not connected yet. The UI labels these as unconfigured and does not claim that checks have passed.

Sensitive authentication and membership verification should run in a separate SB3 Steam Tool backend deployment. It must use its own environment variables, secrets, callback URLs, and storage namespace; it should not share the old tool's credentials or session store.

No Steam DRM or license-bypass functionality is included.
