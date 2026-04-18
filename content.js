/**
 * Netflix Auto Skip — content.js
 * 以 setInterval 每 300ms 輪詢 DOM，偵測並自動點擊跳過 / 下一集按鈕。
 * 設定儲存於 chrome.storage.sync，toggle 即時生效。
 */

// ── 預設設定 ────────────────────────────────────────────────
let settings = {
  skipIntro: true,
  autoNextEpisode: true,
};

// cooldown 計數器：防止同一按鈕在冷卻期間重複觸發
let skipCooldown = 0;       // Skip 類按鈕冷卻（5 ticks ≈ 1.5s）
let nextEpCooldown = 0;     // Next Episode 冷卻（10 ticks ≈ 3s）

// ── 讀取初始設定 ─────────────────────────────────────────────
chrome.storage.sync.get(['skipIntro', 'autoNextEpisode'], (result) => {
  if (result.skipIntro !== undefined) settings.skipIntro = result.skipIntro;
  if (result.autoNextEpisode !== undefined) settings.autoNextEpisode = result.autoNextEpisode;
});

// ── 監聽 storage 變更，toggle 即時生效 ───────────────────────
chrome.storage.onChanged.addListener((changes) => {
  if (changes.skipIntro !== undefined) {
    settings.skipIntro = changes.skipIntro.newValue;
  }
  if (changes.autoNextEpisode !== undefined) {
    settings.autoNextEpisode = changes.autoNextEpisode.newValue;
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
      skipBtn.click();
      skipCooldown = 5; // 冷卻 5 ticks ≈ 1.5s
    }
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
