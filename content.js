/**
 * Netflix Auto Skip — content.js
 * 以 setInterval 每 300ms 輪詢 DOM，偵測並自動點擊跳過 / 下一集按鈕。
 * 設定儲存於 chrome.storage.sync，toggle 即時生效。
 */

// ── 預設設定 ────────────────────────────────────────────────
const POLL_INTERVAL = 300; // ms

let settings = {
  skipIntro: true,
  autoNextEpisode: true,
  skipDelay: 1500, // ms，對應 skip cooldown ticks
};

// cooldown 計數器：防止同一按鈕在冷卻期間重複觸發
let skipCooldown = 0;       // 點擊後的固定冷卻（5 ticks ≈ 1.5s），防止重複觸發
let nextEpCooldown = 0;     // Next Episode 冷卻（10 ticks ≈ 3s）
let skipDetectedFor = 0;    // 目前這次 Skip 按鈕已連續被偵測到幾個 tick

/** 將毫秒延遲換算為 poll ticks（最少 1 tick 避免立即重觸發） */
function delayToTicks(ms) {
  return Math.max(1, Math.round(ms / POLL_INTERVAL));
}

// ── 讀取初始設定 ─────────────────────────────────────────────
chrome.storage.sync.get(['skipIntro', 'autoNextEpisode', 'skipDelay'], (result) => {
  if (result.skipIntro !== undefined) settings.skipIntro = result.skipIntro;
  if (result.autoNextEpisode !== undefined) settings.autoNextEpisode = result.autoNextEpisode;
  if (result.skipDelay !== undefined) settings.skipDelay = result.skipDelay;
});

// ── 監聽 storage 變更，toggle 即時生效 ───────────────────────
chrome.storage.onChanged.addListener((changes) => {
  if (changes.skipIntro !== undefined) {
    settings.skipIntro = changes.skipIntro.newValue;
  }
  if (changes.autoNextEpisode !== undefined) {
    settings.autoNextEpisode = changes.autoNextEpisode.newValue;
  }
  if (changes.skipDelay !== undefined) {
    settings.skipDelay = changes.skipDelay.newValue;
  }
});

// ── React Fiber onClick 呼叫輔助函式 ────────────────────────
/**
 * Netflix 的 Next Episode 按鈕由 React 合成事件驅動，
 * 原生 .click() 無效；需透過 __reactFiber$ 讀取 memoizedProps.onClick。
 * @param {Element} el
 * @returns {boolean} 是否成功觸發
 */
function triggerReactClick(el) {
  const fiberKey = Object.keys(el).find((k) => k.startsWith('__reactFiber$'));
  if (!fiberKey) return false;

  let fiber = el[fiberKey];
  // 向上遍歷 fiber tree，尋找帶有 onClick 的節點
  while (fiber) {
    const onClick = fiber.memoizedProps && fiber.memoizedProps.onClick;
    if (typeof onClick === 'function') {
      onClick({ type: 'click', bubbles: true, cancelable: true });
      return true;
    }
    fiber = fiber.return;
  }
  return false;
}

// ── 主輪詢函式 ───────────────────────────────────────────────
function poll() {
  // 冷卻倒數
  if (skipCooldown > 0) skipCooldown--;
  if (nextEpCooldown > 0) nextEpCooldown--;

  // 1. 跳過片頭 / 前情提要 / 片尾
  if (settings.skipIntro && skipCooldown === 0) {
    const skipBtn = document.querySelector('.watch-video--skip-content-button');
    if (skipBtn) {
      skipDetectedFor++;
      // 累積偵測 ticks 達到使用者設定的延遲後才點擊
      if (skipDetectedFor >= delayToTicks(settings.skipDelay)) {
        skipBtn.click();
        skipCooldown = 5;    // 點擊後固定冷卻 5 ticks ≈ 1.5s，防重複觸發
        skipDetectedFor = 0;
      }
    } else {
      skipDetectedFor = 0;   // 按鈕消失（已被點擊或 Netflix 收回），重置計數
    }
  } else {
    skipDetectedFor = 0;     // 冷卻期間重置，避免冷卻結束後立即誤觸發
  }

  // 2. 自動播放下一集（倒數中 / 靜態）
  if (settings.autoNextEpisode && nextEpCooldown === 0) {
    const nextEpBtn =
      document.querySelector('[data-uia="next-episode-seamless-button-draining"]') ||
      document.querySelector('[data-uia="next-episode-seamless-button"]');

    if (nextEpBtn) {
      const triggered = triggerReactClick(nextEpBtn);
      if (!triggered) {
        // fallback：嘗試原生 click（部分版本可能有效）
        nextEpBtn.click();
      }
      nextEpCooldown = 10; // 冷卻 10 ticks ≈ 3s
    }
  }
}

// ── 啟動輪詢 ─────────────────────────────────────────────────
setInterval(poll, 300);
