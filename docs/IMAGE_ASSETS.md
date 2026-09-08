# 圖片素材紀錄

更新日期：2026-09-08。彈窗圖片取自各車款的台灣 Suzuki 官方介紹頁。官方產品照片不代表本站自行拍攝；各圖版權歸原權利人所有。

原有手繪車款圖、SVG 與 CSS shape 保持原樣。保留既有 JPG 與 OG 圖路徑；每張照片維持其來源長寬比例，OG 圖維持原尺寸，維持 JSON-LD、交車照片 API 和分享圖片相容。

| 本機圖片 | 官方原始圖片 |
| --- | --- |
| `public/images/e-vitara.jpg` | [原始圖片](https://www.taiwansuzuki.com.tw/uploads/car_list/image-176708767160.jpg) |
| `public/images/e-vitara-side.jpg` | [原始圖片](https://www.taiwansuzuki.com.tw/uploads/car_list/image-176708861746.png) |
| `public/images/e-vitara-int.jpg` | [原始圖片](https://www.taiwansuzuki.com.tw/uploads/car_list/image-176674256024.jpg) |
| `public/images/swift.jpg` | [原始圖片](https://www.taiwansuzuki.com.tw/uploads/car_list/image-172049669030.jpg) |
| `public/images/swift-side.jpg` | [原始圖片](https://www.taiwansuzuki.com.tw/uploads/car_list/image-171981429667.jpg) |
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
