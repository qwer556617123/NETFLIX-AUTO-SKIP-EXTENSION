# 📺 Netflix Auto Skip — 简体中文

> [English](../README.md) · 简体中文 · [繁體中文](zh-TW.md)

---

## 功能

| 功能 | 说明 |
|------|------|
| 自动跳过片头 | 检测到 Skip Intro 按钮后按设定延迟自动点击 |
| 自动跳过前情提要 | 检测到 Skip Recap 按钮后按设定延迟自动点击 |
| 自动跳过片尾 | 检测到 Skip Epilogue 按钮后按设定延迟自动点击 |
| 自动播放下一集 | 检测到下一集按钮后按设定延迟自动点击 |

所有功能均可在扩展弹窗中单独开关，设置即时生效，无需刷新页面。

## 兼容性

支持**全球所有 Netflix 地区**（`*.netflix.com/watch/*`）。  
Netflix 在全球使用相同的 DOM 选择器，无论您在中国大陆（需 VPN）、台湾、日本、韩国、欧美还是其他地区，扩展功能完全一致。

## 安装方式

### Chrome Web Store（推荐）

在 [Chrome Web Store](https://chromewebstore.google.com/detail/ldfngohmjbighjekjmdafeelggifklfk) 直接安装，无需开发者模式。

### 手动安装（Load unpacked）

**Chrome**
1. 下载或 Clone 本项目到本地任意文件夹
2. 打开 `chrome://extensions/`
3. 右上角开启**开发者模式**
4. 点击**加载已解压的扩展程序** → 选择项目文件夹

**Edge**
1. 打开 `edge://extensions/`
2. 左侧菜单开启**开发人员模式**
3. 点击**加载解压缩的扩展功能** → 选择项目文件夹

## 设置

点击浏览器工具栏中的扩展图标打开设置面板：

- 开关**自动跳过片头 / 前情提要 / 片尾**
- 开关**自动播放下一集**
- 拖动**跳过延迟**滑块（0 – 5 秒，默认 1.5 秒）设置按钮出现后多久自动点击

## 技术说明

- **Manifest V3**，符合 Chrome 最新标准
- `setInterval(300ms)` 轮询，比 `MutationObserver` 在 Netflix React 高频重渲染下更稳定
- Skip 类按钮使用原生 `.click()`；下一集按钮通过 React Fiber 合成事件触发
- 设置存储于 `chrome.storage.sync`，跨设备自动同步

## ⚠️ 注意事项

- **Netflix UI 更新**是主要维护风险。若自动跳过失效，可能是 Netflix 修改了 DOM class 名称，需更新 `content.js` 中的选择器。
- 本扩展**仅读取 DOM 元素并模拟点击**，不收集任何个人数据，不与外部服务器通信。

