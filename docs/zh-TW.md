# 📺 Netflix Auto Skip — 繁體中文

> [English](../README.md) · [简体中文](zh-CN.md) · 繁體中文

---

## 功能

| 功能 | 說明 |
|------|------|
| 自動跳過片頭 | 偵測到 Skip Intro 按鈕後按設定延遲自動點擊 |
| 自動跳過前情提要 | 偵測到 Skip Recap 按鈕後按設定延遲自動點擊 |
| 自動跳過片尾 | 偵測到 Skip Epilogue 按鈕後按設定延遲自動點擊 |
| 自動播放下一集 | 偵測到下一集按鈕後立即觸發，不需等倒數結束 |

所有功能可在擴充功能的 Popup 介面中個別開關，設定即時生效，不需重新整理頁面。

## 相容性

支援**全球所有 Netflix 地區**（`*.netflix.com/watch/*`）。  
Netflix 在全球使用相同的 DOM 選擇器，無論您在台灣、日本、韓國、歐美或其他地區，擴充功能皆可正常運作。

## 安裝方式

### Chrome Web Store（推薦）

在 [Chrome Web Store](https://chromewebstore.google.com/detail/netflix-auto-skip/hcjplbkgooihebpcnnhfkdecajbcmjoh) 直接安裝，不需開發者模式。

### 手動安裝（Load unpacked）

**Chrome**
1. 下載或 Clone 本專案到本機任意資料夾
2. 開啟 Chrome，網址列輸入 `chrome://extensions/`
3. 右上角開啟「**開發者模式**」
4. 點擊「**載入未封裝項目**」，選擇本專案資料夾

**Edge**
1. 步驟同上，網址列改為 `edge://extensions/`
2. 左側選單開啟「**開發人員模式**」
3. 點擊「**載入解壓縮的擴充功能**」，選擇本專案資料夾

## 使用設定

點擊瀏覽器工具列的擴充功能圖示，開啟 Popup 設定面板：

- 開關**自動跳過片頭 / 前情提要 / 片尾**
- 開關**自動播放下一集**
- 拖動**跳過延遲**滑條（0 – 5 秒，預設 1.5 秒）設定按鈕出現後多久自動點擊

## 技術說明

- **Manifest V3**，符合 Chrome 現行標準
- 以 `setInterval(300ms)` 輪詢 Netflix DOM，比 `MutationObserver` 在 React 高頻 re-render 下更穩定
- Skip 類按鈕使用原生 `.click()`；Next Episode 按鈕透過 React Fiber 呼叫合成事件
- 設定儲存於 `chrome.storage.sync`，換裝置後自動同步

## ⚠️ 注意事項

- **Netflix UI 更新**是主要維護風險。若自動跳過失效，可能是 Netflix 修改了 DOM class 名稱，需更新 `content.js` 中的 selector。
- 本擴充功能**只讀取 DOM 元素並模擬點擊**，不收集任何個人資料，不與外部伺服器通訊。

## 封裝說明

透過 Chrome 封裝擴充功能（`chrome://extensions/` → **封裝擴充功能**）會產生兩個檔案：

| 檔案 | 用途 |
|------|------|
| `netflix-auto-skip.crx` | 可安裝的擴充功能封裝檔 |
| `netflix-auto-skip.pem` | **私鑰** — 請妥善保管，絕對不要 commit 到 git |

`.pem` 用於在更新時維持擴充功能的唯一 ID，兩個檔案均已透過 `.gitignore` 排除於 Repository 之外。
