# 📺 Netflix Auto Skip

> Chrome / Edge Extension (Manifest V3) · Personal use · **Not published** on Chrome Web Store

**[English](#english) · [简体中文](#simplified-chinese) · [繁體中文](#traditional-chinese)**

---

## English <a name="english"></a>

### Features

| Feature | Description |
|---------|-------------|
| Auto-skip intro | Clicks "Skip Intro" after the configured delay |
| Auto-skip recap | Clicks "Skip Recap" after the configured delay |
| Auto-skip epilogue | Clicks "Skip Epilogue" after the configured delay |
| Auto-play next episode | Triggers the next-episode button immediately — no countdown needed |

All features can be toggled individually in the popup. Settings take effect instantly — no page refresh needed.

### Compatibility

Works on **all regional Netflix sites worldwide** (`*.netflix.com/watch/*`).  
Netflix uses the same DOM selectors globally, so the extension works identically in the US, Taiwan, Japan, Korea, Europe, and everywhere else.

### Installation

**Chrome**
1. Download or clone this repo to a local folder
2. Open `chrome://extensions/`
3. Enable **Developer mode** (top-right toggle)
4. Click **Load unpacked** → select the project folder

**Edge**
1. Open `edge://extensions/`
2. Enable **Developer mode** (left sidebar)
3. Click **Load unpacked** → select the project folder

### Settings

Open the extension popup by clicking its icon in the toolbar:

- Toggle **Auto-skip intro / recap / epilogue** on or off
- Toggle **Auto-play next episode** on or off
- Drag the **Skip delay** slider (0 – 5 s, default 1.5 s) to set how long after the button appears before it is clicked

### Technical Notes

- **Manifest V3**, Chrome's current standard
- `setInterval(300 ms)` polling — more stable than `MutationObserver` on Netflix's high-frequency React re-renders
- Skip buttons: native `.click()`; Next-episode button: React Fiber synthetic event via `__reactFiber$`
- Settings stored in `chrome.storage.sync` — automatically synced across devices

### ⚠️ Notes

- **Netflix UI updates** are the main maintenance risk. If auto-skip stops working, Netflix may have changed DOM class names — update the selectors in `content.js`.
- This extension **only reads DOM elements and simulates clicks**. No personal data is collected; no external servers are contacted.
- Not recommended for publishing to the Chrome Web Store to avoid security concerns tied to Netflix accounts.

### Packaging

When Chrome packages the extension (`chrome://extensions/` → **Pack extension**), it generates two files:

| File | Purpose |
|------|---------|
| `netflix-auto-skip.crx` | Installable extension package |
| `netflix-auto-skip.pem` | **Private key** — keep this secret, never commit to git |

The `.pem` file maintains the extension's unique ID across updates. Both files are excluded from this repository via `.gitignore`.

---

## 简体中文 <a name="simplified-chinese"></a>

### 功能

| 功能 | 说明 |
|------|------|
| 自动跳过片头 | 检测到 Skip Intro 按钮后按设定延迟自动点击 |
| 自动跳过前情提要 | 检测到 Skip Recap 按钮后按设定延迟自动点击 |
| 自动跳过片尾 | 检测到 Skip Epilogue 按钮后按设定延迟自动点击 |
| 自动播放下一集 | 检测到下一集按钮后立即触发，无需等待倒计时 |

所有功能均可在扩展弹窗中单独开关，设置即时生效，无需刷新页面。

### 兼容性

支持**全球所有 Netflix 地区**（`*.netflix.com/watch/*`）。  
Netflix 在全球使用相同的 DOM 选择器，无论您在中国大陆（需 VPN）、台湾、日本、韩国、欧美还是其他地区，扩展功能完全一致。

### 安装方式

**Chrome**
1. 下载或 Clone 本项目到本地任意文件夹
2. 打开 `chrome://extensions/`
3. 右上角开启**开发者模式**
4. 点击**加载已解压的扩展程序** → 选择项目文件夹

**Edge**
1. 打开 `edge://extensions/`
2. 左侧菜单开启**开发人员模式**
3. 点击**加载解压缩的扩展功能** → 选择项目文件夹

### 设置

点击浏览器工具栏中的扩展图标打开设置面板：

- 开关**自动跳过片头 / 前情提要 / 片尾**
- 开关**自动播放下一集**
- 拖动**跳过延迟**滑块（0 – 5 秒，默认 1.5 秒）设置按钮出现后多久自动点击

### 技术说明

- **Manifest V3**，符合 Chrome 最新标准
- `setInterval(300ms)` 轮询，比 `MutationObserver` 在 Netflix React 高频重渲染下更稳定
- Skip 类按钮使用原生 `.click()`；下一集按钮通过 React Fiber 合成事件触发
- 设置存储于 `chrome.storage.sync`，跨设备自动同步

### ⚠️ 注意事项

- **Netflix UI 更新**是主要维护风险。若自动跳过失效，可能是 Netflix 修改了 DOM class 名称，需更新 `content.js` 中的选择器。
- 本扩展**仅读取 DOM 元素并模拟点击**，不收集任何个人数据，不与外部服务器通信。
- 不建议上架 Chrome 应用商店，以避免与 Netflix 账号相关的安全隐患。

### 打包说明

通过 Chrome 打包扩展（`chrome://extensions/` → **打包扩展程序**）会生成两个文件：

| 文件 | 用途 |
|------|------|
| `netflix-auto-skip.crx` | 可安装的扩展包 |
| `netflix-auto-skip.pem` | **私钥** — 请妥善保管，切勿提交到 git |

`.pem` 文件用于在更新时保持扩展的唯一 ID，两个文件均已通过 `.gitignore` 排除在仓库之外。

---

## 繁體中文 <a name="traditional-chinese"></a>

### 功能

| 功能 | 說明 |
|------|------|
| 自動跳過片頭 | 偵測到 Skip Intro 按鈕後按設定延遲自動點擊 |
| 自動跳過前情提要 | 偵測到 Skip Recap 按鈕後按設定延遲自動點擊 |
| 自動跳過片尾 | 偵測到 Skip Epilogue 按鈕後按設定延遲自動點擊 |
| 自動播放下一集 | 偵測到下一集按鈕後立即觸發，不需等倒數結束 |

所有功能可在擴充功能的 Popup 介面中個別開關，設定即時生效，不需重新整理頁面。

### 相容性

支援**全球所有 Netflix 地區**（`*.netflix.com/watch/*`）。  
Netflix 在全球使用相同的 DOM 選擇器，無論您在台灣、日本、韓國、歐美或其他地區，擴充功能皆可正常運作。

### 安裝方式

**Chrome**
1. 下載或 Clone 本專案到本機任意資料夾
2. 開啟 Chrome，網址列輸入 `chrome://extensions/`
3. 右上角開啟「**開發者模式**」
4. 點擊「**載入未封裝項目**」，選擇本專案資料夾

**Edge**
1. 步驟同上，網址列改為 `edge://extensions/`
2. 左側選單開啟「**開發人員模式**」
3. 點擊「**載入解壓縮的擴充功能**」，選擇本專案資料夾

### 使用設定

點擊瀏覽器工具列的擴充功能圖示，開啟 Popup 設定面板：

- 開關**自動跳過片頭 / 前情提要 / 片尾**
- 開關**自動播放下一集**
- 拖動**跳過延遲**滑條（0 – 5 秒，預設 1.5 秒）設定按鈕出現後多久自動點擊

### 技術說明

- **Manifest V3**，符合 Chrome 現行標準
- 以 `setInterval(300ms)` 輪詢 Netflix DOM，比 `MutationObserver` 在 React 高頻 re-render 下更穩定
- Skip 類按鈕使用原生 `.click()`；Next Episode 按鈕透過 React Fiber 呼叫合成事件
- 設定儲存於 `chrome.storage.sync`，換裝置後自動同步

### ⚠️ 注意事項

- **Netflix UI 更新**是主要維護風險。若自動跳過失效，可能是 Netflix 修改了 DOM class 名稱，需更新 `content.js` 中的 selector。
- 本擴充功能**只讀取 DOM 元素並模擬點擊**，不收集任何個人資料，不與外部伺服器通訊。
- 不建議上架商店，避免 Netflix 帳號相關的資安疑慮。

### 封裝說明

透過 Chrome 封裝擴充功能（`chrome://extensions/` → **封裝擴充功能**）會產生兩個檔案：

| 檔案 | 用途 |
|------|------|
| `netflix-auto-skip.crx` | 可安裝的擴充功能封裝檔 |
| `netflix-auto-skip.pem` | **私鑰** — 請妥善保管，絕對不要 commit 到 git |

`.pem` 用於在更新時維持擴充功能的唯一 ID，兩個檔案均已透過 `.gitignore` 排除於 Repository 之外。

---

## Development

See [PLAN.md](PLAN.md)
