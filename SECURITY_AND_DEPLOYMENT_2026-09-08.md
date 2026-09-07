# Suzuki 網站優先修正與部署紀錄

日期：2026-09-08。此文件接續 WEBSITE_AUDIT_2026-09-08.md，說明第二階段修正。

## 本次修正

1. 表單改為同站 `/api/notify` 接收。只有私人儲存區確認持久保存後才回傳收件成功與案件編號；儲存失敗回傳 503，前端保留輸入並顯示重試／LINE 提示。
2. 同次送件重試沿用 UUID；伺服器以不可覆寫紀錄做防重複處理，不依賴單一執行個體記憶體。同 UUID 不同內容回傳 409；同內容並行請求僅建立一筆、僅首次建立者送通知。
3. 諮詢先存入 Vercel 私人 Blob，再嘗試 Discord 通知與既有 Google 試算表同步。通知失敗不會遺失已收件資料。保留原試算表接收端，但移至伺服器環境變數；不再由瀏覽器用 no-cors 提交。
4. API 限制同源 JSON 請求、實際串流資料 4 KB、姓名 50 字、台灣手機格式與可選車款／用途／預算，加入隱藏誘捕欄位。Discord 禁止自動提及使用者，試算表姓名做公式字首防護。
5. 新建網站專用 Discord Webhook，正式環境以加密敏感變數保存。新版部署成功後已停用原有 Webhook，刪除回應 204、後續查詢 404；新 Webhook 唯讀查詢 200，使程式歷史中的舊憑證失效。
6. Next.js 更新至 16.3.4，React／React DOM 更新至 19.2.8。新增私人儲存 SDK 與測試工具後，完整 `npm audit` 仍為 0 個漏洞項目。
7. Vercel 防火牆針對 `POST /api/notify` 設定每 IP 每 10 分鐘 5 次，超額回 429；不影響正常瀏覽及 LINE／電話。Vercel 計數按區域處理，不能視為跨區全域絕對上限。
8. JSON-LD 改為正確的 script 標籤，車名、說明、起價從車款資料生成。移除未確認的營業時間、座標、全車系現貨及免付費電話宣稱，保留站名、公開聯絡方式與地址，補上 canonical。
9. 手機底部改為單一容器：比較列在上、電話／LINE 在下；補上底部內容空間與安全區域，桌面仍只顯示比較列。

本階段沿用先前已查核的 9 月優惠及規格更新。Cloudflare DNS、既有交車照片自動化與 sitemap 規則未改動。

## 私人收件儲存與維運

- Vercel 專案 `suzuki-sales-website` 的私人 Blob store：`suzuki-leads`，Tokyo `hnd1`。
- `consultations/<案件 UUID>.json` 保存需求、伺服器收件時間與內容指紋；網址不含姓名或電話，不提供公開查詢 API。
- `delivery/<案件 UUID>.json` 只記錄案件編號、通知嘗試時間與各接收端狀態，不重複保存聯絡資料。
- 可由有專案權限的使用者在 Vercel Dashboard → Storage → suzuki-leads 查看與處理收件；網站訪客無權直接讀取私人檔案。
- Discord 使用 `wait=true`，需收到訊息 ID 才記為 confirmed。Google 試算表需有明確 JSON 成功回應才記 confirmed；HTTP 200 的登入／錯誤 HTML 不算同步成功。
- `failed`、`unconfirmed`、`not_configured` 及缺少 delivery 紀錄的案件需要人工確認。Vercel 日誌 `consultation_delivery_pending` 可依案件編號追蹤，不記錄姓名、電話或憑證。
- 外部服務的逾時可能代表已收到、但回覆未抵達；為避免重複通知，不會對未知結果自動重送。持久收件仍保留，可先依案件編號核對 Discord／試算表，再處理補送。這不是跨所有外部服務的 exactly-once 保證。
- 客戶要求更正或刪除時，應一併處理私人收件、試算表與 Discord 中對應紀錄。
- 本次使用 Hobby 既有免費額度，未升級付費方案。Blob 有用量上限；達上限會暫停存取，此時表單會顯示無法確認收件並保留 LINE／電話替代入口。

必需的正式環境變數：`BLOB_READ_WRITE_TOKEN`、`DISCORD_WEBHOOK_URL`、`GOOGLE_SHEETS_WEBHOOK_URL`。全部僅供伺服器使用，值不應加入 Git、截圖、紀錄或文件。開發環境 `.env.local` 已列入忽略規則。

## 驗證

- `npm run build` 通過，含正式編譯及 TypeScript 檢查。
- `npm test` 共 13 組測試通過：正確收件、並行與後續重試、內容衝突、儲存失敗、通知失敗、來源／格式／誘捕欄位／選项驗證、超量串流、手機格式、通知回覆、試算表公式與假成功、JSON-LD 逸出，以及優惠到期邊界。
- 私人 Blob 整合實測：建立成功、同路徑第二次寫入被拒絕、原資料不被覆寫、未授權讀取回 403。只使用不含個資的維護測試檔，測後已刪除。
- 使用本機測試接收端驗證瀏覽器：503 時顯示錯誤且保留輸入；第二次成功後顯示案件編號；兩次請求 UUID 相同。本機測試不會送往 Discord 或 Google 試算表。
- 實際 CSS 視窗 360 × 780 的三車比較列及電話／LINE 列相鄰且不重疊，頁面寬度等於視窗寬度；1280 × 900 桌面比較視窗可正常操作。
- 本機正式建置輸出包含 1 個可解析 JSON-LD script、6 款車、沒有舊 JSON-LD meta；首頁不含通知或試算表接收端網址。
- `git diff --check` 通過。機密掃描僅檢查本次檔案，不將任何憑證值寫入報告。

## 正式部署結果

- 程式修正提交：[0d605c3](https://github.com/1xuan0621/suzuki-sales-website/commit/0d605c32c68f53ea2c8ab5e83649d69529b82e33)，已推送至 main。
- Vercel 自動部署 `dpl_Cr6ZcFwYgwk6GbFvuZqg4eLbuehQ` 為 Ready，正式網域及 www 別名已指向新版。[正式網站](https://suzuki-taipei.com)。
- 正式首頁、robots.txt、sitemap.xml 均回 200；首頁包含 1 個可解析 JSON-LD script、6 款車資料，無舊 JSON-LD meta 或通知接收端網址。正式瀏覽器確認新版車款內容、84 期試算選項與表單資料使用說明。
- 正式 API 連續 6 次空 JSON 請求依序回 400、400、400、400、400、429，確認資料驗證及每 IP 限流生效。未送出有效客戶資料。
- 本機 Git 憑證失效，改用既有 GitHub 連線完成推送；遠端檔案樹與本機測試版本完全相同。本機 main 已同步遠端；使用者原有未追蹤 OPERATIONS.md 保持原樣。

未主動發送測試訊息至 Discord，也未寫入測試詢價到正式試算表；外部通知採模擬回覆測試與 Webhook 唯讀有效性檢查，不宣稱已完成真實送件全鏈路測試。

## 下一步建議

1. 第一筆實際諮詢進來時，用案件編號核對私人收件、Discord 與試算表。如果需主動做全鏈路驗收，可使用明確標記的測試案件；這會建立正式通知及試算表資料。
2. 為待處理／同步失敗案件增加有權限控管的管理頁，並訂定保存期限與清理流程。既有 Google Apps Script 仍應進一步加入伺服器簽章驗證，避免歷史公開端點被繞過網站防護使用。
3. 使用 Search Console／Rich Results Test 驗證部署後結構化資料與收錄，不以本機 schema 通過推定排名或豐富搜尋結果已出現。
4. 設定 LINE、電話、表單收件的轉換統計，先取得實際漏斗數據，再安排車款獨立頁、圖片優化與實車照片改版。
5. 每月查核優惠與年式規格，搭配定期套件掃描。到期隱藏只避免舊活動繼續顯示，不會自行取得下個月優惠。

## 參考文件

- [Next.js JSON-LD](https://nextjs.org/docs/app/guides/json-ld)
- [Vercel Blob SDK](https://vercel.com/docs/vercel-blob/using-blob-sdk)
- [Vercel Blob 用量與價格](https://vercel.com/docs/vercel-blob/usage-and-pricing)
- [Vercel WAF 流量限制](https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting)
