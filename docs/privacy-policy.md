---
layout: default
title: Privacy Policy — Netflix Auto Skip
---

# Privacy Policy — Netflix Auto Skip

*Last updated: 2026-04-18*

## Summary

Netflix Auto Skip does **not** collect, store, transmit, or share any personal data.

## Data Collection

This extension collects **no data** of any kind. Specifically:

- No personal identification information
- No browsing history or web activity
- No Netflix account information
- No location data
- No usage analytics or telemetry

## Local Storage

The extension uses `chrome.storage.sync` solely to store your preference settings:

| Key | Type | Purpose |
|-----|------|---------|
| `skipIntro` | boolean | Whether auto-skip intro/recap/epilogue is enabled |
| `autoNextEpisode` | boolean | Whether auto-play next episode is enabled |
| `skipDelay` | integer (ms) | Configured skip delay (0–5000 ms) |

These values never leave your browser except to sync across your own signed-in Chrome devices via Google's standard chrome.storage.sync infrastructure. No third party has access to these values.

## Permissions

| Permission | Reason |
|------------|--------|
| `storage` | Save and sync the three preference settings listed above |
| `*://*.netflix.com/watch/*` | Inject the content script only on Netflix video watch pages to detect and click skip buttons |

## Third Parties

This extension does **not** communicate with any external server. No data is sent to the developer or any third party.

## Changes

If this policy changes, the updated version will be published at this URL with a new *Last updated* date.

## Contact

For questions, open an issue at [github.com/qwer556617123/NETFLIX-AUTO-SKIP-EXTENSION](https://github.com/qwer556617123/NETFLIX-AUTO-SKIP-EXTENSION/issues).
