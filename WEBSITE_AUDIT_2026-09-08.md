# Suzuki 網站內容更新與檢查報告

> 歷史快照（第一階段）。下文「未部署」、舊版套件漏洞、表單與 JSON-LD 問題描述的是當時狀態，後續已有修正與部署；圖片也已再次更新。請以 [目前維運與待辦](OPERATIONS.md)、[部署紀錄](SECURITY_AND_DEPLOYMENT_2026-09-08.md) 及 [圖片素材紀錄](docs/IMAGE_ASSETS.md) 判斷目前狀態。

後續更新：本報告記錄第一階段檢查；四項優先問題的修正請見 [第二階段修正紀錄](SECURITY_AND_DEPLOYMENT_2026-09-08.md)。

報告日期：2026-09-08（台北時間）。資料查核於 09-07 開始，驗證跨日至 09-08。

本次已完成本機內容更新、正式建置及瀏覽器驗證。尚未 push 或部署，因此正式網站尚未套用修改。原有未追蹤的 OPERATIONS.md 保持原樣；電話、LINE、表單接收端、SEO metadata、sitemap、部署設定與正式自動化均未變動。

## 已更新內容

### 車款售價與規格

六款建議起價與 [Taiwan Suzuki 官方首頁](https://www.taiwansuzuki.com.tw/) 一致，保留 e VITARA 115 萬、SWIFT 73 萬、Jimny 84.9 萬、VITARA 104 萬、S-CROSS 98 萬、CARRY 49.9 萬。這些是建議起價，不代表實際成交價、補助後價格或庫存保證。

| 車款 | 原內容 | 本次更新 |
| --- | --- | --- |
| SWIFT | 尺寸 3,860 × 1,695 × 1,500 mm；7 氣囊；泛稱機械車位沒問題 | 尺寸 3,860 × 1,735 × 1,480 mm；6 氣囊；補上 LKA、DSBS II，提示核對車位限高、限寬與載重 |
| Jimny | 舊名稱與配備；尺寸 3,645 × 1,645 × 1,730 mm；油耗 15.6 km/L | THE NEW Jimny；尺寸 3,650 × 1,645 × 1,705 mm；油耗 14.5 km/L；補上 ACC、DSBS II、LDP、9 吋螢幕與無線手機整合 |
| VITARA | 129.2 PS／5,500 rpm；23.9 kgm／2,000 rpm；17.6 km/L | 引擎 110.02 PS／4,400 rpm；23.97 kgm／2,000–2,500 rpm；17.4 km/L |
| S-CROSS | 129.2 PS／5,500 rpm；23.9 kgm／3,000 rpm；19 km/L | 引擎 110.02 PS／4,400 rpm；23.97 kgm／2,000–2,500 rpm；19.1 km/L |
| e VITARA | 缺少充電接頭資訊；ALLGRIP-e 綠色誤列雙色 | 補上 AC Type 1／DC CCS1、快充條件；綠色更正為 ALLGRIP-e 單色，保留 2WD／四驅續航區分 |
| CARRY | 馬力簡寫 96 PS | 依規配表補為 96.6 PS／5,600 rpm，補上扭力轉速 |

VITARA、S-CROSS 的馬力是引擎規格，未把輕油電馬達輸出直接相加。所有數字採官方目前提供的台灣規配表；舊年式庫存仍應逐車確認。

另外修正 BOOSTJET 拼字為 BOOSTERJET，更新六款車色參考，補齊 Jimny、VITARA、S-CROSS 缺少的色系。「選擇顏色」改為「車色參考」，避免讓使用者以為色票能切換照片或選定訂單。

### 2026 年 9 月優惠

依 [官方 9 月活動公告](https://www.taiwansuzuki.com.tw/news/606) 更新，活動期間為 2026/09/01–09/30：

| 車款 | 更新後摘要 |
| --- | --- |
| SWIFT | 試乘贈哈根達斯 100ml 冰淇淋，需填寫資料、數量有限 |
| THE NEW Jimny | 試乘贈限量帆布袋，需填寫資料、數量有限 |
| VITARA／S-CROSS | 90 萬、84 期、貸款利率 3.50%，需審核且不得與其他優惠專案併用 |
| e VITARA | 100 萬、84 期、貸款利率 3.50%；符合購車領牌條件贈聯名鞋款，數量與尺寸有限 |
| CARRY | 40 萬、48 期、利率 3.19%、月付 8,888 元；另有指定車款萬元購車金，未承諾可併用 |

移除未能確認仍有效的零利率、郵輪抽獎、丙式險及行車紀錄器贈品說法。若有業務自訂加碼，可取得有效期間與適用條件後另列。

官方公告註記有一處不存在的「9 月 31 日」，本次採同頁各方案條款明列的 09/30。鞋款兌換期限 10/31 與購車領牌期限 09/30 分開呈現。

### 降低再次過時的處理

- 每款附官方車款頁、規配表 PDF、核對日期與測試值說明。
- 優惠資料增加開始／結束時間、活動條件與來源網址。
- 以台灣時區計算期限；10/01 00:00 起停止顯示 9 月優惠，改為洽詢最新方案。視窗持續開啟及回到背景分頁時均會重新檢查。
- 此處理只隱藏到期方案，不會自動抓取新優惠；月份更新仍需人工查核。到期判定依訪客裝置時間。
- 貸款試算增加 84 期、0%–8% 年利率與可直接輸入兩位小數的欄位，註明範例利率、未含手續費及專案額度差異。
- 比較表新增續航資訊，e VITARA 不再於油耗項目顯示空白。油耗和續航單位不同，不能直接視為能源成本比較。

## 待改善項目與優先順序

以下項目是檢查發現與後續建議，本次未重構正式接收流程、變更 SEO 或升級依賴。

| 優先度 | 發現與影響 | 建議 |
| --- | --- | --- |
| 高 | 諮詢表單捕捉錯誤後仍顯示成功，未檢查通知 API 的 HTTP 狀態；試算表採 no-cors，無法由前端判定寫入是否成功 | 改為伺服器統一接收、驗證成功才顯示送出完成；增加失敗提示、保留輸入及可識別的案件編號，並處理重試重複送件 |
| 高 | 通知服務憑證直接寫在 API 原始碼，且缺少完整輸入限制及防濫用措施 | 將憑證移至伺服器環境變數，輪替既有憑證，設定輸入長度、頻率限制與機器人防護；環境設定與憑證輪替需另行安排，本報告不收錄任何憑證值 |
| 高 | `npm audit --omit=dev` 回報 next、postcss、nanoid、sharp 共 4 個 high 套件項目；本地安裝與 lockfile 的 Next.js 均為 16.2.7 | 安排依賴修補與回歸驗證。套件公告的適用條件不同，掃描結果不代表本站已遭利用，也不等同四個獨立可利用漏洞 |
| 中 | JSON-LD 放在 metadata.other，實際輸出為 meta 標籤，而不是 JSON-LD script；資料還包含 TollFree、固定營業時間、全車系 InStock 等待核對欄位 | 改為正確的 JSON-LD script，先確認營業時間、定位及庫存宣稱，再以 Rich Results Test 驗證；與 src/data/site.ts 共用資料以避免內容漂移 |
| 中 | 手機比較列與電話／LINE 列同時固定於底部，加入比較後會蓋住聯絡列 | 合併成單一行動列，或調整高度、位置與底部預留空間，讓比較時仍可聯絡 |
| 中 | 貸款試算仍主要依車價比例計算；部分專案有固定貸款額，不能完整對應活動金額 | 增加直接輸入貸款本金與頭期款，拆開一般試算及專案試算，避免把活動月付與一般試算混為一談 |
| 中 | 缺少可見的個資用途與保存說明；彈窗沒有完整焦點限制與關閉後焦點復原 | 補上與實際作業一致的資料使用說明；改善鍵盤操作與表單標籤，讓行動與輔助工具使用者更易完成諮詢 |
| 一般 | 車款卡片主要使用示意車圖；大圖仍是 JPG 且全部輪播圖會掛載，e VITARA 內裝圖約 1.42 MiB | 卡片改用已獲授權、符合販售年式的實車圖；轉 WebP／AVIF、設定尺寸與適當延遲載入，並測量改善前後載入速度 |
| 一般 | 六款車都集中在首頁彈窗 | 建立獨立車款頁，加入常見問題、實際使用情境、版本差異和明確試乘入口，方便分享與搜尋理解；這是後續 SEO／路由改版 |
| 一般 | Instagram 仍顯示「即將開通」；「貸款／保險試算」入口實際只有貸款計算 | 確認社群是否已開通，提供真實入口或移除佔位；服務名稱調整為「貸款試算／保險諮詢」會更準確 |

SEO 格式建議依據 [Google 結構化資料文件](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)。Next.js 公告範例見 [GitHub 安全公告](https://github.com/advisories/GHSA-6gpp-xcg3-4w24)。本次沒有變更 AGENTS.md 要求保留的 SEO metadata 或 sitemap。

## 驗證結果與限制

- `npm run build`：最終版本通過編譯、TypeScript 與靜態頁面產生。
- `node --test tests/promotions.test.mjs`：2 組測試通過，包含台灣時間開始／截止的前後邊界、過期日期及無效日期。
- `git diff --check`：通過。
- 瀏覽器檢查實際 CSS 視窗 1280 × 900、390 × 844、360 × 780；新內容無頁面水平溢出，優惠區可捲動閱讀、行動按鈕可見。
- 六款車逐一開啟：9 月優惠、有效期間與官方規配表入口均存在。
- 驗證 SWIFT「我有興趣」會帶入諮詢車款及 730,000 元試算；比較表可呈現 e VITARA 的 NEDC 續航。
- 驗證 84 期、3.19% 輸入及 0%：車價 800,000 元、貸款 80%、84 期時，3.19% 顯示月付 8,511 元；0% 顯示 7,619 元，符合本息平均攤還與本金均分結果。
- 本機首頁、robots.txt、sitemap.xml 回應 200；本機輸出確認 JSON-LD 目前仍為 meta 標籤，已列後續建議。
- 正式首頁可由公開搜尋資料讀取；直接 HTTP 檢查遇到 403，因此不宣稱已完整驗證正式站即時狀態、Cloudflare、Vercel 或 Google 收錄。
- 未送出真實／測試諮詢，也未觸發正式通知。表單風險來自程式檢查，無法據此確認既有客戶資料是否曾漏收。
- 未檢查 Search Console、GA 或 Google 商家管理後台，因此未對流量、轉換率、排名或商家註冊完成度下結論。
- 未變更或重新發佈交車照片；實車圖年式及照片授權仍應由業務確認。

## 官方規格來源

目前官方車款頁所連結的規配表，已下載並逐頁視覺核對；檔案名稱可能由原廠後續替換。

- [SWIFT 最新規配表](https://www.taiwansuzuki.com.tw/uploads/car_list/178781313014.pdf)
- [THE NEW Jimny 規配表](https://www.taiwansuzuki.com.tw/uploads/car_list/178382615010.pdf)
- [VITARA 規配表](https://www.taiwansuzuki.com.tw/uploads/car_list/178418897488.pdf)
- [S-CROSS 規配表](https://www.taiwansuzuki.com.tw/uploads/car_list/178453550663.pdf)
- [e VITARA 規配表](https://www.taiwansuzuki.com.tw/uploads/car_list/178453449654.pdf)
- [CARRY 規配表](https://www.taiwansuzuki.com.tw/uploads/car_list/169336257999.pdf)

## 修改檔案

`src/data/site.ts`、`src/data/promotions.ts`、`src/components/PromotionNotice.tsx`、`src/components/CarModal.tsx`、`src/components/CompareBar.tsx`、`src/components/LoanCalculator.tsx`、`src/app/page.tsx`、`tests/promotions.test.mjs`，以及本報告。
