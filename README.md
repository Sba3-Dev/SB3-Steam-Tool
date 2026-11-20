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

## v0.0.1 UI

- Dark crimson visual identity based on the SB3 Quest Completer reference.
- Discord sign-in screen and a separate server-membership gate screen (UI only).
- Welcome dashboard with account, server-membership and update-status cards.
- All-games, downloads and changelog sections.
- Settings modal with eight selectable themes and saved theme preference.

## Not connected yet

Discord OAuth, real server-membership verification, account profile data, live update checks, game catalogue and download services require the backend integration. Current status cards explicitly show pending/preview state; they do not claim a user is authenticated or a server member.

No third-party Steam unlocking or license-bypass component is bundled.