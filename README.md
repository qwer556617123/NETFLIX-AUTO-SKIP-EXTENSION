# 📺 Netflix Auto Skip

> Chrome / Edge Extension (Manifest V3) · Available on the Chrome Web Store

**[English](README.md) · [简体中文](docs/zh-CN.md) · [繁體中文](docs/zh-TW.md)**

---

## Features

| Feature | Description |
|---------|-------------|
| Auto-skip intro | Clicks "Skip Intro" after the configured delay |
| Auto-skip recap | Clicks "Skip Recap" after the configured delay |
| Auto-skip epilogue | Clicks "Skip Epilogue" after the configured delay |
| Auto-play next episode | Triggers the next-episode button immediately — no countdown needed |

All features can be toggled individually in the popup. Settings take effect instantly — no page refresh needed.

## Installation

### Chrome Web Store (Recommended)

Install directly from the [Chrome Web Store](https://chromewebstore.google.com/detail/netflix-auto-skip/hcjplbkgooihebpcnnhfkdecajbcmjoh) — no developer mode required.

### Load unpacked (Manual)

**Chrome**
1. Download or clone this repo to a local folder
2. Open `chrome://extensions/`
3. Enable **Developer mode** (top-right toggle)
4. Click **Load unpacked** → select the project folder

**Edge**
1. Open `edge://extensions/`
2. Enable **Developer mode** (left sidebar)
3. Click **Load unpacked** → select the project folder

## Compatibility

Works on **all regional Netflix sites worldwide** (`*.netflix.com/watch/*`).  
Netflix uses the same DOM selectors globally — the extension works identically in the US, Taiwan, Japan, Korea, Europe, and everywhere else.

## Settings

Open the extension popup by clicking its icon in the toolbar:

- Toggle **Auto-skip intro / recap / epilogue** on or off
- Toggle **Auto-play next episode** on or off
- Drag the **Skip delay** slider (0 – 5 s, default 1.5 s) to set how long after the button appears before it is clicked

## Technical Notes

- **Manifest V3**, Chrome's current standard
- `setInterval(300 ms)` polling — more stable than `MutationObserver` on Netflix's high-frequency React re-renders
- Skip buttons: native `.click()`; Next-episode button: React Fiber synthetic event via `__reactFiber$`
- Settings stored in `chrome.storage.sync` — automatically synced across devices

## ⚠️ Notes

- **Netflix UI updates** are the main maintenance risk. If auto-skip stops working, Netflix may have changed DOM class names — update the selectors in `content.js`.
- This extension **only reads DOM elements and simulates clicks**. No personal data is collected; no external servers are contacted.

## Packaging

When Chrome packages the extension (`chrome://extensions/` → **Pack extension**), it generates two files:

| File | Purpose |
|------|---------|
| `netflix-auto-skip.crx` | Installable extension package |
| `netflix-auto-skip.pem` | **Private key** — keep this secret, never commit to git |

The `.pem` file maintains the extension's unique ID across updates. Both files are excluded from this repository via `.gitignore`.

---

## Development

See [PLAN.md](PLAN.md)
