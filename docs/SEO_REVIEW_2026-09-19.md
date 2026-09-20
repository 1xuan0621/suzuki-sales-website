# SEO 成效檢查與改善 — 2026-09-19

本次唯讀查閱正式 Search Console、GA4 及公開網站；程式改善已在本機完成。未推送、部署、修改分析帳戶或提交索引，未發送真實測試諮詢。

## 成效：搜尋流量增加，仍是小樣本

Search Console 資源 `sc-domain:suzuki-taipei.com`，搜尋類型「網路」、國家「台灣」、全部裝置。以下日期從比較對話框的欄位確認，未使用圖表的 `Invalid Date` 無障礙文字。

| 指標 | 2026/07/23–08/19 | 2026/08/20–09/16 | 變化 |
| --- | ---: | ---: | ---: |
| 曝光 | 192 | 532 | +177.1% |
| 點擊 | 9 | 31 | +244.4% |
| CTR | 4.7% | 5.8% | +1.1 個百分點 |
| 平均排序 | 5.7 | 7.1 | 數值上升，並未改善 |

這是報表觀測，不能把增長全部歸因於改版；最近一期同時涵蓋改版前後。平均排序受查詢、頁面與裝置組成影響，沒有同查詢比較前，不應直接推論既有關鍵字掉排名。

裝置拆分：行動裝置 133 → 349 曝光、6 → 18 點擊；桌面 57 → 179 曝光、3 → 13 點擊；平板 2 → 4 曝光、皆 0 點擊。

逐頁表可見 Jimny 32 曝光／2 點擊、CARRY 11／2、首頁 15／1、北投到店頁 14／0、VITARA 11／0。查詢 `jimny 2026 價格` 與 `jimny 2026` 各 8 曝光／1 點擊；`台北賞車` 8／0、`suzuki 北投` 4／0。這些樣本適合列入觀察，尚不足以大幅重寫目前有效的標題。

**報表限制**：相同篩選下，逐頁表 10 列合計 91 曝光／5 點擊，與資源總計 532／31 不一致；9/8 基準也有此現象。本次保留各自原值，不以表格加總替代總計、不把未列出的查詢推定為零。後續應以相同日期的匯出資料及頁面篩選核對差異原因。

來源：[Search Console 成效](https://search.google.com/search-console/performance/search-analytics?resource_id=sc-domain%3Asuzuki-taipei.com)；既有基準見 [SEO_MEASUREMENT.md](SEO_MEASUREMENT.md)。

## 收錄與技術狀況

- 正式 sitemap 現有 **15 個內容 URL**，全部 HTTP 200、唯一 H1、自身 canonical、獨立 title／description，以及伺服器輸出的主文與連結。
- robots 指向 sitemap 並允許內容檢索；HTTP／www 轉向 HTTPS 裸網域，未知路徑回 404 並帶 noindex，未發現致命索引阻擋。
- GSC 索引總覽最後更新 **9/14**：12 個已收錄、3 個因重新導向排除；後者不是 3 篇新指南。
- Sitemap 報表顯示 9/9 最後讀取成功、探索 12 頁；它落後於目前正式 XML 的 15 頁，不能據此判定新頁未收錄。
- 對三篇新指南另外進行唯讀「網址檢查」，全部顯示**網頁已編入索引**、擷取成功、允許索引，Google canonical 等於自身 URL，參照網頁均為 `/guides`。

| 新指南 | 網址檢查顯示的上次檢索時間（介面時間） | Sitemap 欄位 |
| --- | --- | --- |
| `/guides/suv-selection` | 2026/09/19 16:37:25 | 暫時性處理錯誤 |
| `/guides/car-maintenance` | 2026/09/19 17:29:43 | 未偵測到任何參照 Sitemap |
| `/guides/powertrain-choice` | 2026/09/19 18:42:58 | 未偵測到任何參照 Sitemap |

Sitemap 欄位的異常值得追蹤，但這三頁已透過內鏈被發現並收錄。本次未要求重新索引；不用反覆提交已收錄 URL。Google 提醒重新檢索需時間，重複提交不會加速。[Google 重新檢索說明](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)

GSC 的手機及桌面 Core Web Vitals 仍無資料，無法宣稱真實使用者載入速度已改善。

## 自然搜尋帶來的站內行為

GA4 資源 `553150800`，期間 **2026/09/09–09/18**、全部國家，使用「流量開發／工作階段主要管道群組」。排除 9/8 啟用當日；仍無法保證之後完全沒有內部造訪。此期間與 GSC 不同，不逐日或逐人連接。

| Organic Search 指標 | 觀測值 |
| --- | ---: |
| 工作階段 | 25 |
| 互動工作階段 | 18 |
| 參與度 | 72% |
| 平均單次工作階段參與時間 | 2 分 17 秒 |
| LINE 點擊 `line_click` | 1 |
| 電話點擊 `phone_click` | 1 |
| 表單收件 `generate_lead` | 1 |

`generate_lead` 已在報表中單獨選取確認，不是從所有事件推估。GA4 顯示自然搜尋已有收件事件；本次未讀私人案件或外部通知紀錄，因此不能宣稱它已核實為有效購車需求、成功聯絡或成交。LINE、電話點擊也不能和收件相加當作三位客戶。

來源：[GA4](https://analytics.google.com/analytics/web/#/p553150800/reports/intelligenthome)。

## 本機已實作

### 1. 增加 16 條情境相關內鏈

六款車各增加兩篇對應指南：SWIFT 接首購與動力；Jimny 接首購與家庭用車；e VITARA 接動力與保養；VITARA／S-CROSS 接家庭用車與動力；CARRY 接換車與保養。

家庭休旅指南另直接連回 VITARA／S-CROSS，動力指南連回 SWIFT／e VITARA。讀者可以從選車問題回到車款價格、規格與試乘入口。全部使用伺服器輸出的真實連結與描述文字，沿用原清單版型。[Google 連結建議](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)

對應檔案：`src/data/content.ts`、`src/data/guides.ts`、車款及指南頁。八個實際變更頁面更新 `updatedAt`，sitemap／Article 日期沿用原產生方式；價格、規格與來源核對日期未冒充重新查核。

### 2. 移除全站 JavaScript 裡不需要的完整文章

原先 Analytics 與首頁從內容資料模組取路由／介紹，連帶把指南正文送進共享 client bundle。現在由 Server Component 只傳需要的 `path/title/siteUrl` 與首頁介紹，保留既有路由單一來源、事件白名單及收件去重。

| 頁面 | 修改前 JS gzip bytes | 修改後 | 減少 |
| --- | ---: | ---: | ---: |
| 首頁 | 192,311 | 165,967 | 26,344（13.7%） |
| SWIFT | 182,296 | 155,986 | 26,310（14.4%） |
| 首購指南 | 171,495 | 145,185 | 26,310（15.3%） |

同一本機專案既有 build 與本次 build 比較，按初始 HTML 的唯一 `<script src>` 加總、排除 `noModule`，逐檔 gzip level 9。首頁原始 JS bytes 614,622 → 553,838；已確認抽查指南正文不再出現在產出 JS。這是靜態資源體積，未包含 inline HTML／RSC、後續 prefetch 或第三方 GA，**不是載入時間、Lighthouse 分數或排名提升**。

### 3. 補上本次成效與維運基準

新增本報告並更新維運／量測入口，區分正式站、延遲報表與本機待發布修改。先前文件中標為「未部署」的歷史紀錄不能再用來判斷所有內容的現況；目前公開網站已能取得 9/11 新指南。

## 下一步與判斷標準

| 優先順序 | 行動 | 檢查時間與依據 |
| --- | --- | --- |
| 1 | 經本輪明確發布授權後部署本機改動，核對正式頁面與 JS | 發布當日；本機通過不等於正式生效 |
| 2 | 追蹤 sitemap 報表更新及三篇新指南曝光 | 9/26；已收錄先觀察，若 sitemap 持續處理錯誤，再針對報表診斷 |
| 3 | 顧問核對自然收件是否有效及是否成功收到通知 | 依既有私人收件紀錄，不把案件資料放 Git 或 GA4 |
| 4 | 優先觀察 Jimny／CARRY、北投到店頁與新指南 | 10/17 以 9/17–10/14 對 8/20–9/16，保持台灣／Web／完整 28 天；有足夠同查詢曝光後再調整摘要與標題 |
| 5 | 量測手機載入瓶頸，再決定字型或圖片優化 | 目前外部字型 CSS 是候選，但無實測前不估算 LCP 改善 |

## 驗證

- `npx tsx --test tests/content.test.ts tests/seo.test.ts`：3/3 通過；只補既有內容連結檢查。
- `npm run test:browser -- http.spec.ts seo.spec.ts guides-faq.spec.ts --grep 'all content|internal navigation|guide entrance'`：5/5 通過，包含一次正式建置、15 頁 HTML／metadata／sitemap、桌面與手機導覽、表單草稿與車款預選。
- 404 檢查出現既有 `NoFallbackError` 伺服器訊息，實際 HTTP 404 斷言通過。
- 本機正式版人工檢視 1280 × 900／360 × 780 新連結版面與車款↔指南操作；使用無真實接收憑證的伺服器，未提交表單。
- `git diff --check` 通過。未新增被要求刪除的分析或收件回歸測試。
