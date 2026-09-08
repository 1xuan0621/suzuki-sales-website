# Suzuki 汽車顧問網站

Next.js App Router、React、TypeScript、Tailwind CSS。網站提供車款介紹與比較、照片瀏覽、貸款試算及購車諮詢。

## 本機開發

```sh
npm ci
npm run dev
```

開啟 http://localhost:3000。一般瀏覽和單元測試不需要外部服務憑證；需要串接時，參考 `.env.example` 的變數名稱，在本機另設 `.env.local`。

**本機既有環境檔可能連到正式服務。** 有效表單會寫入私人儲存並嘗試發送通知；瀏覽器測試應攔截 `/api/notify`，整合測試使用隔離接收端。

## 驗證

```sh
npm test
npm run build
git diff --check
```

`npm start` 可啟動已建置版本。單元測試採 Node test runner + tsx，外部儲存與通知以模擬依賴驗證。

`npm run test:browser` 會建置並在 3101 埠啟動隔離的正式版本，以 Chromium 驗證桌面與手機版的諮詢動線、巢狀彈窗鍵盤操作及貸款利率邊界。首次使用可執行 `npx playwright install chromium` 安裝測試瀏覽器。測試伺服器清空外部接收憑證，表單 API 另由瀏覽器攔截；報告位於已忽略的 `test-results/`。

依賴更新時另外執行 `npm audit`。支援的 Node.js 版本以已安裝 Next.js 的 `engines` 要求為準，正式建置版本需與 Vercel 專案設定核對。

## 文件入口

- [AGENTS.md](AGENTS.md)：代理協作、修改範圍與驗證規則。
- [OPERATIONS.md](OPERATIONS.md)：現況、維運流程與後續優先事項。
- [SEO 量測與發布作業](docs/SEO_MEASUREMENT.md)：搜尋基準、GA4 事件、有效諮詢定義及上線核對。
- [圖片素材紀錄](docs/IMAGE_ASSETS.md)：來源、壓縮與動態交車照片命名。
- [購車指南與 QA 研究](docs/BUYING_CONTENT_RESEARCH.md)：選題依據、官方來源、車型問答歸屬及舊網址轉址。
- [第一階段稽核](WEBSITE_AUDIT_2026-09-08.md)、[第二階段修正與部署紀錄](SECURITY_AND_DEPLOYMENT_2026-09-08.md)：保留歷史證據；當時的問題及測試數量不等於目前狀態。

## 部署

GitHub push 會觸發 Vercel 自動部署。推送、部署、Cloudflare/Vercel 設定及正式自動化變更均需明確授權。一般整理與本機驗證不會自動上線。
