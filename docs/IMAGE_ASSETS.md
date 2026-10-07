# 圖片素材紀錄

## 2026-10-07：顧問與 Jimny 真實合照

業主於本輪提供三張真實照片，授權用於網站與備用素材庫。未使用 AI 生成、修飾人物或改動車輛；僅依既有規則按原比例縮至寬 1000px、MozJPEG quality 82 壓縮並移除 EXIF 等中繼資料，不放大、不裁切。日期為提供日期，非拍攝日期。

| 素材 | 尺寸／檔案大小 | 使用狀態 |
| --- | --- | --- |
| `public/personal/dealer-jimny-outdoor-door.jpg` | 1000 × 1419／355,150 bytes | 第 3 張車門合照；首頁「喜歡 Jimny，從認識它開始」專題圖。完整比例顯示，桌面左圖右文、手機直向排列，使用 Next Image 響應式尺寸及延遲載入。 |
| `public/personal/dealer-jimny-motor-show.jpg` | 1000 × 1333／202,570 bytes | 第 1 張車展合照；首頁 Jimny 小卡彈窗及完整介紹頁第一張。未確認拍攝場館，不作為北投展示間照片。 |
| `public/personal/dealer-jimny-outdoor-front.jpg` | 1000 × 1333／372,340 bytes | 第 2 張車頭合照；首頁 Jimny 小卡彈窗及完整介紹頁第二張，保留原有車牌遮蔽。 |

依業主後續指示，首頁 Jimny 小卡彈窗改為車展合照、戶外車頭合照、原第一張官方外觀照；Jimny 完整介紹頁也依業主指示同步使用這個順序，共用同一份圖片清單與來源說明。原第二、三張官方照片從這兩處圖庫移出，原始素材繼續保留。

上述皆為顧問個人合照，不併入交車輪播，也不作為現行年式規配、座椅空間或可安排試乘路線的證據。素材放在既有公開 `public/personal/` 目錄，屬可透過網址取得的網站素材；既有 `dealer-portrait.jpg` 繼續保留。

發布前驗證：`npm run build` 與 `git diff --check` 通過；本機以 1280／1024／360／320px 檢查照片載入、完整比例與無水平溢出，檢視桌面／手機截圖，並確認原有兩篇專題及 Jimny QA 連結正常。未新增回歸測試；檢查環境停用外部收件及 GA4，未提交諮詢。

## 2026-09-27：六款車用車示意圖

新增六張本站原創 SVG，沒有描摹、重製或截取媒體照片；皆於頁面標示「用車情境示意圖」，按主題說明比例、試放或操作條件。統一 640 × 480、米白底 `#f5f6f2`、灰綠描邊 `#56614b`、淺綠功能區及紅色提醒，主標 32 px、說明 28 px 起；保留相同圖說元件與手機縮放方式。

| 圖片 | 用途與依據 |
| --- | --- |
| `public/images/usage/jimny-seating.svg` | 兩人／四人用車的座椅與載物取捨。僅表達後座直立／傾倒概念，不提供容積、實測尺寸或行李件數。 |
| `public/images/usage/carry-loading.svg` | 貨台俯視、三邊裝卸空間。2,565 × 1,660 mm 依 [台灣官方介紹](https://www.taiwansuzuki.com.tw/cars/carry) 於 9/27 核對；虛線不表示實際開啟距離。 |
| `public/images/usage/swift-parking.svg` | 車位與開門、尾門取物空間。通用俯視圖，不標示最小車位尺寸或保證適用的機械車位。 |
| `public/images/usage/e-vitara-charging.svg` | AC Type 1／DC CCS1 與備用站點。介面依 [台灣官方介紹](https://www.taiwansuzuki.com.tw/cars/eVITARA) 9/27 核對，不提供接線、設備施工或保證充電時間。 |
| `public/images/usage/s-cross-luggage.svg` | 依開口、底面、尾門順序試放行李。通用後廂輪廓，不代表實車精確比例、容量或可裝件數。 |
| `public/images/usage/vitara-modes.svg` | AUTO／SPORT／SNOW／LOCK 的用途。依 [台灣官方模式說明](https://www.taiwansuzuki.com.tw/cars/vitara) 9/27 核對，不描繪扭力分配比例或保證路況通行能力。 |

已搜尋免費素材：[Vauxford 的 2019 Jimny 內裝](https://commons.wikimedia.org/wiki/File:2019_Suzuki_Jimny_AllGrip_Interior.jpg) 為 CC BY-SA 4.0；[RichardSummersault 的印尼 CARRY 後方照片](https://commons.wikimedia.org/wiki/File:Suzuki_Carry_(Rear),_Jakarta,_Indonesia.jpg) 為 CC0。前者為海外舊年式內裝，後者為海外車輛且不是尺寸示範，未採用、未下載。媒體試駕照片無已確認的免費商用授權，未引用圖片。

六張 SVG 由 Next Image 按比例顯示。日後有授權實拍照時，修改 `src/data/car-usage.ts` 中對應的 `image.src/alt/caption/width/height` 即可替換；按下方既有壓縮原則處理照片，不把示意圖說明沿用為實拍說明。

更新日期：2026-09-08。彈窗圖片取自各車款的台灣 Suzuki 官方介紹頁。官方產品照片不代表本站自行拍攝；各圖版權歸原權利人所有。

原有手繪車款圖、SVG 與 CSS shape 保持原樣。保留既有 JPG 與 OG 圖路徑；每張照片維持其來源長寬比例，OG 圖維持原尺寸，維持 JSON-LD、交車照片 API 和分享圖片相容。

| 本機圖片 | 官方原始圖片 |
| --- | --- |
| `public/images/e-vitara.jpg` | [原始圖片](https://www.taiwansuzuki.com.tw/uploads/car_list/image-176708767160.jpg) |
| `public/images/e-vitara-side.jpg` | [原始圖片](https://www.taiwansuzuki.com.tw/uploads/car_list/image-176708861746.png) |
| `public/images/e-vitara-int.jpg` | [原始圖片](https://www.taiwansuzuki.com.tw/uploads/car_list/image-176674256024.jpg) |
| `public/images/swift.jpg` | [原始圖片](https://www.taiwansuzuki.com.tw/uploads/car_list/image-172049669030.jpg) |
| `public/images/swift-rear.jpg` | [原始圖片](https://www.taiwansuzuki.com.tw/uploads/car_list/image-171999074921.jpg) |
| `public/images/swift-int.jpg` | [原始圖片](https://www.taiwansuzuki.com.tw/uploads/car_list/image-171982021621.jpg) |
| `public/images/jimny.jpg` | [原始圖片](https://www.taiwansuzuki.com.tw/uploads/car_list/image-178287852222.png) |
| `public/images/jimny-side.jpg` | [原始圖片](https://www.taiwansuzuki.com.tw/uploads/car_list/image-178287859211.jpg) |
| `public/images/jimny-int.jpg` | [原始圖片](https://www.taiwansuzuki.com.tw/uploads/car_list/image-178287921259.jpg) |
| `public/images/vitara.jpg` | [原始圖片](https://www.taiwansuzuki.com.tw/uploads/car_list/image-175756900977.jpg) |
| `public/images/vitara-side.jpg` | [原始圖片](https://www.taiwansuzuki.com.tw/uploads/car_list/image-175756905945.jpg) |
| `public/images/vitara-int.jpg` | [原始圖片](https://www.taiwansuzuki.com.tw/uploads/car_list/image-175756960986.jpg) |
| `public/images/s-cross.jpg` | [原始圖片](https://www.taiwansuzuki.com.tw/uploads/car_list/image-174711722797.jpg) |
| `public/images/s-cross-side.jpg` | [原始圖片](https://www.taiwansuzuki.com.tw/uploads/car_list/167982808383.jpg) |
| `public/images/s-cross-int.jpg` | [原始圖片](https://www.taiwansuzuki.com.tw/uploads/car_list/image-174711738211.jpg) |
| `public/images/carry.jpg` | [原始圖片](https://www.taiwansuzuki.com.tw/uploads/news_dealer_list/168136771459.jpg) |
| `public/images/carry-side.jpg` | [原始圖片](https://www.taiwansuzuki.com.tw/uploads/news_dealer_list/168136778240.jpg) |
| `public/images/carry-int.jpg` | [原始圖片](https://www.taiwansuzuki.com.tw/uploads/news_dealer_list/168136844580.jpg) |

## 壓縮方式

後續依使用者要求，SWIFT 第二張已由尾燈特寫替換為完整後側行駛外觀；採新檔名 `swift-rear.jpg` 避免沿用舊圖片快取，移除不再使用的 `swift-side.jpg`。來源是官方 SWIFT 頁面，保留原圖油耗標示與長寬比例。下方大小統計為第一階段壓縮紀錄，不包含這次換圖差異。

- 車款圖片：依原比例縮至最大寬 1200px，JPEG quality 82 / MozJPEG。
- 交車照片與備用顧問照片：依原比例縮至最大寬 1000px，不放大、不裁切；JPEG quality 82 / MozJPEG。
- 分享圖片：維持 PNG 與原尺寸，調色盤 quality 95。LINE QR code、favicon、SVG 不變。
- 壓縮會移除照片 EXIF 等非必要中繼資料；只在輸出更小時替換既有非車款照片。
- 彈窗與交車輪播使用 Next.js Image 的響應式尺寸與格式最佳化。彈窗只載入當前照片，交車照片採延遲載入。
- 日後新增交車照仍可使用原本的 `delivery-N.jpg` 命名；上傳前先壓縮，勿在公開目錄放未授權的客戶照片。

## 本次檔案大小

| 範圍 | 更新前 | 更新後 |
| --- | ---: | ---: |
| 車款 18 張 | 4.61 MB | 1.46 MB |
| 交車 10 張 | 2.53 MB | 1.36 MB |
| 全部處理圖片 | 8.21 MB | 3.21 MB |

上表為來源檔案大小，含車款換圖造成的差異，並非實測載入速度；實際傳輸大小依螢幕、瀏覽器與 Next.js 圖片最佳化而異。


## 2026-09-09 稱呼確認

依業主最新指示，分享預覽圖維持原圖 `public/og-image.png` 與完整姓名「張鈺漣」。先前生成的簡稱版本未部署，已移除，所有 metadata 與 Article 圖片仍引用原圖。
