# 📺 Netflix 自動跳過 — 開發計畫

> 最後更新：2026-04-18

---

## 目標

建立一個 Chrome/Edge Extension（Manifest V3），以 `setInterval` 輪詢 Netflix DOM，自動點擊跳過片頭/前情提要/片尾按鈕與下一集按鈕。提供 Popup UI 可個別開關功能，本機 sideload 使用，不上架商店。

---

## 技術選型

### 穩定的 DOM Selectors（2024–2026 實測）

| 按鈕 | Selector | 點擊方式 |
|------|----------|----------|
| Skip Intro / Recap / Epilogue | `.watch-video--skip-content-button` | 原生 `.click()` |
| Next Episode（倒數中） | `[data-uia="next-episode-seamless-button-draining"]` | React Fiber onClick |
| Next Episode（靜態） | `[data-uia="next-episode-seamless-button"]` | React Fiber onClick |

> **注意**：`data-uia="player-skip-intro"` 等屬性在 Netflix 生產環境不可靠，勿使用。
>
> **注意**：Next Episode 無法用原生 `.click()`，Netflix 按鈕由 React 合成事件驅動，需透過 `__reactFiber$` 讀取 `memoizedProps.onClick` 呼叫。

### 輪詢策略

- `setInterval(fn, 300ms)` + cooldown 計數器
- 比 MutationObserver 更穩定——Netflix React 高頻 re-render 會造成 MutationObserver callback 洪水
- Skip 按鈕觸發後 cooldown = 5 ticks（≈ 1.5 秒）再恢復
- Next Episode 觸發後 cooldown = 10 ticks（≈ 3 秒）再恢復

### 設定儲存

- `chrome.storage.sync`：跨裝置同步 toggle 狀態
- content.js 監聽 `chrome.storage.onChanged`，toggle 即時生效，不需重新整理頁面

---

## 專案結構

```
netflix-auto-skip/
  manifest.json     ← MV3，只在 netflix.com/watch/* 注入
  content.js        ← 核心邏輯：輪詢 + 點擊
  popup.html        ← 設定 UI（2 個 toggle）
  popup.js          ← 讀寫 chrome.storage.sync
  icons/
    icon16.png
    icon48.png
    icon128.png
  PLAN.md
  README.md
```

---

## 實作步驟

### Phase 1 — 核心邏輯
- [ ] 建立 `manifest.json`
  - MV3、`run_at: document_idle`
  - content_scripts matches `*://*.netflix.com/watch/*`
  - permissions: `storage`
- [ ] 建立 `content.js`
  - 啟動時讀取 `chrome.storage.sync` 取得設定
  - `setInterval` 每 300ms 執行，cooldown 計數器防止重複觸發
  - Skip 按鈕：`.watch-video--skip-content-button` → `.click()`
  - Next Episode：React Fiber onClick
  - `chrome.storage.onChanged` 監聽讓 toggle 即時生效

### Phase 2 — Popup UI
- [ ] 建立 `popup.html`
  - 深色風格，符合 Netflix 視覺語言
  - Toggle 1：「自動跳過片頭 / 前情提要 / 片尾」（預設開）
  - Toggle 2：「自動播放下一集」（預設開）
- [ ] 建立 `popup.js`
  - 讀取 `chrome.storage.sync` 渲染初始 toggle 狀態
  - toggle 變更時寫入 storage

### Phase 3 — 圖示與說明
- [ ] 建立 `icons/`（16、48、128 px PNG）
- [ ] 完善 `README.md`

---

## 驗證清單

- [ ] Chrome：擴充功能 → 開發者模式 → 載入未封裝項目
- [ ] 播放有片頭的劇集，確認約 1.5s 後自動跳過
- [ ] 播完一集，確認自動播下一集
- [ ] 關閉 Popup toggle，確認功能即時停用（不需重新整理）
- [ ] Edge：edge://extensions → 開發人員模式 → 同樣測試

---

## 排除範圍

- 不上架 Chrome Web Store
- 不支援 Firefox
- 不做跳過廣告功能

---

## 已知風險

| 風險 | 說明 |
|------|------|
| Netflix UI 更新 | `.watch-video--skip-content-button` class 可能改名，這是唯一的維護點 |
| React Fiber key 變動 | `__reactFiber$` 是 React 內部實作，理論穩定但非官方 API |
| CSP 限制（MV3） | 不得使用 `eval()`、`innerHTML` 注入 script 標籤 |
