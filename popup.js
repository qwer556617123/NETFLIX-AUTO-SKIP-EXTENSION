/**
 * Netflix Auto Skip — popup.js
 * 讀取並寫入 chrome.storage.sync，控制 toggle 狀態。
 */

const DEFAULT_SETTINGS = {
  skipIntro: true,
  autoNextEpisode: true,
};

const toggleSkipIntro      = document.getElementById('toggleSkipIntro');
const toggleAutoNextEpisode = document.getElementById('toggleAutoNextEpisode');

// ── 初始化：從 storage 讀取狀態並反映到 UI ───────────────────
chrome.storage.sync.get(DEFAULT_SETTINGS, (result) => {
  toggleSkipIntro.checked       = result.skipIntro;
  toggleAutoNextEpisode.checked = result.autoNextEpisode;
});

// ── 監聽 toggle 變更，寫入 storage ──────────────────────────
toggleSkipIntro.addEventListener('change', () => {
  chrome.storage.sync.set({ skipIntro: toggleSkipIntro.checked });
});

toggleAutoNextEpisode.addEventListener('change', () => {
  chrome.storage.sync.set({ autoNextEpisode: toggleAutoNextEpisode.checked });
});
