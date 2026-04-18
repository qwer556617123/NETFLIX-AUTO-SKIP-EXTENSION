# 📺 Netflix 自動跳過

> Chrome / Edge Extension（Manifest V3）  
> 自用 / 分享給身邊的人，**不上架** Chrome Web Store

---

## 功能

| 功能 | 說明 |
|------|------|
| 自動跳過片頭 | 偵測到 Skip Intro 按鈕後約 1.5 秒自動點擊 |
| 自動跳過前情提要 | 偵測到 Skip Recap 按鈕後約 1.5 秒自動點擊 |
| 自動跳過片尾 | 偵測到 Skip Epilogue 按鈕後約 1.5 秒自動點擊 |
| 自動播放下一集 | 偵測到下一集按鈕後自動觸發，不需等倒數結束 |

所有功能可在擴充功能的 Popup 介面中個別開關，設定即時生效，不需重新整理頁面。

---

## 安裝方式

### Chrome

1. 下載或 Clone 本專案到本機任意資料夾
2. 開啟 Chrome，網址列輸入 `chrome://extensions/`
3. 右上角開啟「**開發者模式**」
4. 點擊「**載入未封裝項目**」，選擇本專案資料夾
5. 完成！開啟 Netflix 播放任何劇集即生效

### Edge

1. 步驟同上，網址列改為 `edge://extensions/`
2. 左側選單開啟「**開發人員模式**」
3. 點擊「**載入解壓縮的擴充功能**」，選擇本專案資料夾

---

## 使用方式

- 播放 Netflix 劇集時，擴充功能自動在背景運作
- 點擊瀏覽器工具列的擴充功能圖示，可開啟 Popup 設定面板
- 在 Popup 中切換 toggle 即可開關各功能

---

## 技術說明

- **Manifest V3**，符合 Chrome 現行標準
- 以 `setInterval(300ms)` 輪詢 Netflix DOM，偵測跳過按鈕
- Skip 類按鈕使用原生 `.click()`；Next Episode 按鈕透過 React Fiber 呼叫合成事件
- 設定儲存於 `chrome.storage.sync`，換裝置後自動同步

---

## 注意事項

- **Netflix UI 更新**是主要維護風險。若未來自動跳過失效，可能是 Netflix 修改了 DOM class 名稱，需更新 `content.js` 中的 selector
- 本擴充功能**只讀取 DOM 元素並模擬點擊**，不收集任何個人資料，不與外部伺服器通訊
- 不建議上架商店，避免 Netflix 帳號相關的資安疑慮

---

## 開發

詳見 [PLAN.md](PLAN.md)
