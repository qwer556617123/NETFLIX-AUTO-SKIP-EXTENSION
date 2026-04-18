/**
 * Netflix Auto Skip — popup.js
 * 讀取並寫入 chrome.storage.sync，控制 toggle 狀態。
 */

const DEFAULT_SETTINGS = {
  skipIntro: true,
  autoNextEpisode: true,
  skipDelay: 1500,  // 毫秒
};

const toggleSkipIntro       = document.getElementById('toggleSkipIntro');
const toggleAutoNextEpisode = document.getElementById('toggleAutoNextEpisode');
const rangeSkipDelay        = document.getElementById('skipDelay');
const labelDelayValue       = document.getElementById('delayValue');
const labelDelayInline      = document.getElementById('skipDelayInline');
const labelNextEpInline     = document.getElementById('nextEpDelayInline');

function formatDelay(ms) {
  return (ms / 1000).toFixed(1) + ' 秒';
}

function updateDelayLabels(ms) {
  const text = formatDelay(ms);
  labelDelayValue.textContent    = text;
  labelDelayInline.textContent   = text;
  labelNextEpInline.textContent  = text;
}

// ── 初始化：從 storage 讀取狀態並反映到 UI ───────────────────
chrome.storage.sync.get(DEFAULT_SETTINGS, (result) => {
  toggleSkipIntro.checked       = result.skipIntro;
  toggleAutoNextEpisode.checked = result.autoNextEpisode;
  rangeSkipDelay.value          = result.skipDelay;
  updateDelayLabels(result.skipDelay);
});

// ── 監聽 toggle 變更，寫入 storage ──────────────────────────
toggleSkipIntro.addEventListener('change', () => {
  chrome.storage.sync.set({ skipIntro: toggleSkipIntro.checked });
});

toggleAutoNextEpisode.addEventListener('change', () => {
  chrome.storage.sync.set({ autoNextEpisode: toggleAutoNextEpisode.checked });
});

// ── 監聽滑條變更 ─────────────────────────────────────────────
rangeSkipDelay.addEventListener('input', () => {
  updateDelayLabels(Number(rangeSkipDelay.value));
});

rangeSkipDelay.addEventListener('change', () => {
  chrome.storage.sync.set({ skipDelay: Number(rangeSkipDelay.value) });
});
