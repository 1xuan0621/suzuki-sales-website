# 文章精簡與 Google AI 內容規範查核

日期：2026-09-22。第一版精簡已部署（`96b6d05a9ecf77722653ea77d12b6a815fa5baac`）；業主回饋流程與計算反而難讀，後續改為以下認知負荷導向的編排。本文件保留兩次處理的紀錄；維運現況見 [OPERATIONS.md](../OPERATIONS.md)。

## 第二版：流程與計算重新編排

業主指出，原本的流程圖變成文字目錄，且同一句塞入舊車售價、貸款、可用餘額、新車自備款與收款條件，必須一邊讀一邊記數字。第一版只減少字數，未解決理解負擔。下方 42% 減幅是第一版歷史數字，不是本版成果。

- 六篇恢復有連線與箭頭的步驟圖：桌面橫向、手機直向；每格只顯示階段與下一個動作，點選直接到該段。
- 每段用一個具體問題帶出重點；行動清單將標籤與說明分行。比較資訊採同一組欄位，手機依序呈現。
- 首購自備款、舊車換新車、油費價差都改用完整數字範例：每列一項費用、金額靠右、運算符號與結果分開；不要求讀者自己在段落中抽取算式。
- 換車例先呈現 `25 − 10 = 15`，再呈現 `36 − 15 = 21`。第二步事先寫明自備款與可抵款前提；尚未收到且無法抵款時，另列「先備 36 萬」。金額皆明示為假設，沒有冒充實際報價。
- 估價文件、跨縣市交付、電池種類、油費推導等次要資訊預設收合。費用適用條件、領牌期限、行車安全等必要提醒仍直接可見。
- 保留全部網址、SEO 標題／描述、段落 ID、連結、日期與來源；收合內容仍在伺服器輸出的 HTML。沒有新增客戶端 JavaScript 或圖片形式的文字。

設計依據是將相關資訊放在一起、使用完整示範、減少不必要資訊與逐步揭露：[NSW 教育部認知負荷實務指南](https://education.nsw.gov.au/about-us/education-data-and-research/cese/publications/practical-guides-for-educators/cognitive-load-theory-in-practice.html)、[NN/g 資訊分組](https://www.nngroup.com/articles/chunking/)、[NN/g 漸進揭露](https://www.nngroup.com/articles/progressive-disclosure/)。教學研究與網站可用性原則在此作為設計依據，尚未做本站讀者測試，不宣稱已量測認知負荷下降或 SEO 排名提升。

第二版發布前驗證：內容／SEO 3 項、指南／FAQ／HTTP 瀏覽器 5 項通過（包含正式建置）；既有指南案例補入補充資訊的 Enter／Space 開關操作，未新增測試檔。六篇以 1280／360 px 檢查畫面、錨點與水平溢出，計算及期限段另查 768／320 px。`git diff --check` 通過，未提交真實諮詢。

## 判斷

不能單憑文章使用 AI 或字數多，就判定本站被 Google 降權。Google 說明評估重點是內容品質與用途；以操縱排名為目的、大量產生缺乏價值的內容，才是明確風險。[Google 對 AI 內容的說明](https://developers.google.com/search/blog/2023/02/google-search-and-ai-content)、[規模化內容濫用政策](https://developers.google.com/search/docs/essentials/spam-policies#scaled-content)

Google 沒有偏好的文章字數。原創資訊、可靠來源與讀者能否完成目的，比湊字數重要；沒有實質變更時，也不應只改日期製造新鮮感。[實用、可靠、以讀者為優先的內容](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)

AI 可協助研究、組織內容，但仍須檢查正確性與新增價值。此次不採用 AI 偵測器分數作為 SEO 指標，也不以同義詞替換或虛構經驗假裝人工撰寫。[Google 生成式 AI 內容指南](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content)

這是內容與程式檢查，**未登入本次 Search Console 查核人工處置或搜尋成效**，不能宣稱目前沒有處罰。人工處置看 Search Console 對應報表；沒有人工處置也不代表排名不會因演算法評估改變。[人工處置報表](https://support.google.com/webmasters/answer/9044175?hl=zh-Hant)

## 盤點與處理

盤點 6 篇指南、6 款車頁及 45 題獨立 QA（22 題通用、23 題車型），並檢查文章模板、導覽、來源與日期用法。全站目前 16 個標準內容網址。

| 範圍 | 發現與決定 |
| --- | --- |
| 六篇指南 | 開場鋪陳、重複提醒較多；改成直接回答問題、短段落、可操作清單。 |
| SWIFT、Jimny | 有台灣版本規格、實際來源與新舊配備比較；保留這些具體資訊，不為縮字刪除。 |
| e VITARA、VITARA、S-CROSS、CARRY | 用途、限制與試乘清單已有分段；此次不改價格、規格、優惠與正文。 |
| 通用與車型 QA | 已提供搜尋、分類及原生收合；答案導向對應指南或車型頁，維持既有歸屬。 |
| 原創經驗 | 指南多為資訊整理，還缺少可驗證的實車測量、試放照片與實際案例；精簡改善閱讀，不代表已補足這類證據。 |

沒有看到需要因「AI」標籤而整批刪頁或 noindex 的依據。六篇主題皆與購車服務相關，並非只替換地名或關鍵字的近似頁面；這是本站內容判斷，不是 Google 的安全認證。

## 公開文章與閱讀方式參考

以下為本次頁面可見的累積瀏覽數快照，不是獨立讀者、閱讀完成率、自然搜尋流量或熱門排名；文章年份不同，不能直接比較成效。

| 公開文章 | 可見瀏覽數 | 可借鏡的呈現方式 |
| --- | ---: | --- |
| [Mobile01：小資熟女的交車筆記](https://www.mobile01.com/topicdetail.php?f=397&t=5989165)（2019） | 19,811 | 按購車階段列檢查事項，有實際照片及表格。只參考資訊編排，不採用個人流程、舊費用、里程判定或吉凶說法作通則。 |
| [Mobile01：第一次購買二手車，心得分享](https://www.mobile01.com/topicdetail.php?f=397&t=6613059)（2022） | 24,203 | 承諾事項與實際交付逐項對照，問題具體。僅用來理解讀者在意的交付落差，不引用對店家或個人的指控。 |

這些樣本不足以證明「短文排名較好」。更直接的閱讀依據是 NN/g 的使用者研究：明確小標、一段一件事、結論在前、容易掃讀的清單，有助讀者找資訊；該研究是可用性研究，不能把改善百分比換算成 SEO 增幅。[How Users Read on the Web](https://www.nngroup.com/articles/how-users-read-on-the-web/)

## 第一版精簡結果（歷史紀錄）

字數採相同方式計算：開場、段落標題、正文、清單標籤／內容、提醒及諮詢範例的非空白字元，包含標點與數字；不含 SEO 描述、目錄、來源、共用頁首頁尾。比例四捨五入。

| 指南 | 修改前 | 修改後 | 減少 |
| --- | ---: | ---: | ---: |
| 第一次買車 | 1,767 | 1,113 | 37% |
| 舊車換新車 | 1,572 | 867 | 45% |
| 選車牌與領牌 | 1,699 | 980 | 42% |
| 家庭休旅選擇 | 1,397 | 714 | 49% |
| 汽油、油電與純電 | 1,492 | 929 | 38% |
| 第一次保養 | 1,289 | 733 | 43% |
| 合計 | 9,216 | 5,336 | 42% |

- 保留所有指南網址、主標題、SEO 描述、段落 ID、站內連結及官方來源。未增加重複頁面。
- 保留自備款、舊車貸款及能源費算式，並保留假設條件；保留領牌期限、貸款與保險差異、保養及操作限制。
- 手機目錄改為兩欄，桌面三欄；保留可點擊錨點與鍵盤焦點。清單改成粗體標籤接短說明，正文維持 16px。
- 文章開頭顯示內容整理網站與實際修改日期，連回既有顧問介紹首頁；不新增「專家已審核」或「親身實測」等未經確認的聲明。
- 六篇有實質改寫，`updatedAt` 改為 2026-09-22，沿用既有機制同步 Article `dateModified` 與 sitemap。`reviewedAt` 沿用原值，避免把抽查誤寫成所有引用均重新核對。

本次另抽查[財政部換購條件](https://www.etax.nat.gov.tw/etwmain/tax-info/understanding/tax-saving-secret/re5JYe3)、[消保會購車提醒](https://cpc.ey.gov.tw/Page/E9F89E01AAE23194/3e4100ad-fb9f-4f2c-8e3b-3cb893c32b18)、[強制汽車責任保險法](https://law.fsc.gov.tw/LawContent.aspx?id=FL006889)、[Suzuki SWIFT](https://www.taiwansuzuki.com.tw/cars/swift)、[e VITARA](https://www.taiwansuzuki.com.tw/cars/eVITARA)及[普利司通胎壓說明](https://www.bridgestone.com.tw/zh/tyre-clinic/tyre-talk/tire-maintenance2)。監理服務網既有 PDF／法規頁直接開啟失敗，改參考官方搜尋索引及[公路局選號說明](https://www.thb.gov.tw/News_Content.aspx?n=87&s=62364&sms=13235)交叉檢查；不宣稱完成其最新全文核對，未變更既有金額或期限。

## 後續編輯原則與量測

1. 每篇解決一個買家的具體問題。開頭先答，再留下必要條件與清單；不設為 SEO 湊字的最低字數。
2. 增加原創資訊時優先做實車工作：同一嬰兒車的試放照片、後座乘坐條件、可公開的去識別報價項目。標明台灣版本、日期與測量方法；需要顧問真實資料，不用 AI 編造。
3. 車價、規格、政策回到官方來源；真實經驗與推論分開寫。發布前由負責顧問實際核對專業與服務承諾，核對過才標記審閱。
4. 只在內容有實質改變時更新日期。AI 的使用方式若讀者合理需要知道，可如實交代其協助範圍；不冒稱人工審核。
5. 發布後依 [SEO 量測作業](SEO_MEASUREMENT.md) 比較完整 28 天與前 28 天：各指南的曝光、點擊、CTR、查詢與平均排名，並看 LINE／電話意向及人工確認有效諮詢。先排除自己的測試；較短文章可能降低停留時間，不能只用停留時間判定退步。

## 驗證

- `npx tsx --test tests/content.test.ts tests/seo.test.ts`：3 項通過。
- `npm run test:browser -- guides-faq.spec.ts http.spec.ts`：5 項通過，包含正式建置、16 頁 HTTP／metadata／canonical／sitemap、桌面與手機指南／FAQ 動線。
- 6 篇指南各以 1280×900、360×780 瀏覽：單一 H1、目錄錨點存在、無水平溢出及 `pageerror`；已檢視桌面／手機版面截圖。來源與長文仍保留在伺服器輸出的 HTML。
- `git diff --check` 通過。未新增測試；一次性視覺檢查資料置於 `/tmp`，未加入 Git。
- 隔離本機服務清空收件與 GA4 設定，瀏覽器攔截 `/api/notify`，未發送真實諮詢。未知網址驗證仍有既有 Next `NoFallbackError` 日誌，404 斷言通過。

本機通過不等於已部署，也不保證流量上升或免於未來排名變動。
