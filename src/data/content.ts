import { cars, contentReviewedAt, eVitaraVersions, type CarId } from "./site";
import { guideIndex, guides, guideTitle } from "./guides";
import { faqPage } from "./faq";

export type { Guide } from "./guides";

export const siteUrl = "https://suzuki-taipei.com";
const startingPrice = (id: CarId) => cars.find((car) => car.id === id)!.price;
export const homeContent = {
  updatedAt: "2026-11-01",
  title: "SUZUKI 台北購車與試乘諮詢｜汽車顧問張鈺漣",
  description: "SUZUKI 汽車顧問張鈺漣以台北為主要服務地區，提供全台選車、購車諮詢與跨縣市交車協助。了解六款車的價格、規格與購車流程，預約凱騰鈴木北投所賞車及試乘；交車安排依個案確認。",
  introduction: "提供全台購車諮詢與跨縣市交車協助。想看車、試乘，歡迎預約凱騰鈴木北投所；也可以先用 LINE 聊聊車款、預算與交車安排。",
  mobileIntroduction: "我是鈺漣，2018 年起從事汽車銷售，2025 年加入 Suzuki。提供全台購車諮詢，北投賞車與試乘請先預約。",
  buyingTopics: [
    { href: "/cars/jimny", title: "Jimny 2026 改款、價格與試乘", description: `建議售價 ${startingPrice("jimny")}。ACC、DSBS II 與 9 吋車機升級，三門四座的日常空間怎麼安排？` },
    { href: "/cars/swift", title: "SWIFT 選購：輕油電、空間與價格", description: `建議售價 ${startingPrice("swift")}。輕油電不用插電，附平面與機械車位尺寸比較。` },
  ],
  jimnyTopics: [
    { href: "/guides/jimny-history", title: "Jimny 發展史：從 1970 到第四代", description: "四代演進、JB64／JB74、三門與五門，一次看懂車迷常說的名字。" },
    { href: "/guides/jimny-modifications", title: "Jimny 改裝：輪胎、升高與車頂架", description: "AT 胎適不適合通勤？升高與車頂架有哪些驗車限制？" },
  ],
  jimnyPhoto: {
    src: "/personal/dealer-jimny-outdoor-door.jpg",
    alt: "鈺漣倚在綠色 Jimny 車門旁，身後是戶外樹蔭",
    width: 1000,
    height: 1419,
  },
};

export const showroom = {
  name: "凱騰鈴木北投所",
  address: "台北市北投區承德路六段337號",
  phone: "(02) 2821-1128",
  phoneHref: "tel:0228211128",
  hours: ["週一至週五 08:30–21:00", "週六、週日 09:00–21:00"],
  sourceUrl: "https://www.taiwansuzuki.com.tw/jt/locator?type=1",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("凱騰鈴木北投所 台北市北投區承德路六段337號"),
  transit: {
    reviewedAt: "2026-10-18",
    bus: "搭乘 756 或 757，在「建民里」站下車，再步行前往承德路六段337號。南北向站牌位置不同，請依下車位置開啟步行導航。",
    connections: [
      { title: "從臺北車站出發", description: "在「臺北車站（承德）」站搭 756 往淡江大學，於「建民里」下車。", href: "https://pda5284.gov.taipei/MQS/route.jsp?rid=16504", linkLabel: "756 路線與到站資訊" },
      { title: "從捷運大橋頭站轉乘", description: "在「捷運大橋頭站」公車站搭 757 往淡海，於「建民里」下車。", href: "https://pda5284.gov.taipei/MQS/route.jsp?rid=16707", linkLabel: "757 路線與到站資訊" },
    ],
    walkingUrl: "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent("凱騰鈴木北投所 台北市北投區承德路六段337號") + "&travelmode=walking",
    note: "下車後沿行人穿越道過街，認明「凱騰鈴木北投」招牌與337號門牌。",
  },
  reviewedAt: "2026-09-08",
  updatedAt: "2026-11-01",
  title: "SUZUKI 台北到店賞車與試乘｜北投所交通及預約｜張鈺漣",
  description: "預約 SUZUKI 台北北投所賞車與試乘，查看承德路六段據點地址、營業時間、交通及停車確認事項。由鈺漣先確認車款與時段，外縣市客戶也可先遠端諮詢。",
};

export interface CarPageContent {
  updatedAt: string;
  specsReviewedAt: string;
  pricesReviewedAt: string;
  description: string;
  introduction: string;
  considerations: string[];
  testDrive: string[];
  relatedCars: CarId[];
  relatedGuides: string[];
  buyingFocus?: {
    heading: string;
    faqHeading: string;
    faqIds: string[];
    priceNote: string;
  };
}

const carDates = { updatedAt: "2026-11-01", specsReviewedAt: contentReviewedAt, pricesReviewedAt: "2026-09-08" };
export const carPages: Record<CarId, CarPageContent> = {
  swift: {
    ...carDates,
    updatedAt: "2026-11-01",
    specsReviewedAt: "2026-09-20",
    pricesReviewedAt: "2026-09-20",
    description: `SUZUKI SWIFT 台灣建議售價 ${startingPrice("swift")}，1.2L 輕油電不用外接充電。比較停車尺寸、後座與行李箱需求，向鈺漣確認完整報價、車色交期及台北北投試乘時段。`,
    introduction: "1.2L 輕油電搭配 CVT，不用外接充電。SWIFT 車身小巧，適合市區通勤與雙人出遊；後座可 6／4 分離傾倒，採買、旅行都能彈性安排。",
    considerations: ["經常全家出遊又帶嬰兒車，可一起比較行李箱更大的 S-CROSS。", "每月油錢可用每月里程 ÷ 平均油耗（km/L）× 每公升油價估算。"],
    testDrive: ["停等時感受怠速與重新啟動的振動，低速轉彎時看看 A 柱與後視鏡視野。", "前座調好後，讓家人坐後座；有嬰兒車就帶來試放，保留安全座椅要用的位置。"],
    relatedCars: ["s-cross"],
    relatedGuides: ["first-car", "powertrain-choice"],
    buyingFocus: {
      heading: "價格、輕油電選購與台北試乘",
      faqHeading: "SWIFT 輕油電、停車與後座空間",
      faqIds: ["swift-hybrid", "swift-parking", "swift-rear-seat"],
      priceNote: "想拿完整報價，可告訴鈺漣車色、預計購車月份，以及現金或貸款需求。報價分列車價、配件、保險與領牌費用，方便比較。",
    },
  },
  jimny: {
    ...carDates,
    updatedAt: "2026-11-01",
    specsReviewedAt: "2026-09-20",
    pricesReviewedAt: "2026-09-20",
    description: `Jimny 2026 改款台灣建議售價 ${startingPrice("jimny")}。對照 2024 型錄，了解 ACC、DSBS II 與 9 吋車機升級，確認三門四人座是否適合日常需求，向鈺漣詢問報價、交期與台北北投試乘。`,
    introduction: "三門四人座、大樑底盤與加力箱四驅，是 Jimny 的招牌。2026 改款加入 ACC、DSBS II 與 9 吋車機；想知道日常好不好開，就從後座進出、行李空間與試乘感受看起。",
    considerations: ["常載三、四人跑長途，可一起試坐五門的 VITARA 或 S-CROSS，比較後座進出與乘坐感受。"],
    testDrive: ["帶手機試連 9 吋車機，看看導航、接聽電話與實體按鍵是否順手。", "前座調好後，讓家人從前門進入後座，再放上平常會帶的行李。", "在一般道路感受轉向、起伏與噪音；四驅模式的切換方式可在賞車時請鈺漣示範。"],
    relatedCars: ["vitara"],
    relatedGuides: ["jimny-history", "jimny-modifications", "first-car", "suv-selection"],
    buyingFocus: {
      heading: "改款重點、價格與台北試乘",
      faqHeading: "Jimny 2026 改款差異",
      faqIds: ["jimny-model-update"],
      priceNote: "完整報價分列車價、配件、保險與領牌稅費。想詢問車色與交期，告訴鈺漣希望哪個月用車，也可一併比較現金與貸款方案。",
    },
  },
  "e-vitara": {
    ...carDates,
    updatedAt: "2026-11-01",
    description: "了解 SUZUKI e VITARA 台灣版本、售價、充電介面及續航測試條件，評估居家與外出充電。鈺漣提供全台購車諮詢及跨縣市交車協助，台北北投試乘請先預約。",
    introduction: "e VITARA 是純電休旅，提供 2WD 前驅與 ALLGRIP-e 四驅。家裡或公司能充電，日常使用更方便；以公共充電為主，則可從通勤沿途的快充站開始安排。",
    considerations: ["高速、冷氣與載重都會增加耗電；長途途中以車上剩餘電量與預估抵達電量安排補電。"],
    testDrive: ["感受起步加速與鬆開踏板後的減速，試試低速停車是否好掌握。", "請鈺漣示範充電槍插拔、充電狀態與中控上的電量資訊。", "說明每天通勤里程，以及在家或公司停車的時間，討論適合的補電方式。"],
    relatedCars: ["vitara"],
    relatedGuides: ["powertrain-choice", "car-maintenance"],
  },
  vitara: {
    ...carDates,
    updatedAt: "2026-11-01",
    description: "比較 SUZUKI VITARA 台灣售價、輕油電與 ALLGRIP 四驅規格，了解與 S-CROSS 的空間及用途差異。鈺漣提供全台購車諮詢，台北北投賞車及試乘請先預約。",
    introduction: "1.4L 渦輪搭配 48V 輕油電，不用外接充電。VITARA 的 ALLGRIP 四驅提供四種行車模式，適合想兼顧日常通勤與戶外出遊的買家。",
    considerations: ["想要四驅可優先看 VITARA；以家庭載物為主，可一起比較 S-CROSS。"],
    testDrive: ["試試市區起步、轉向與倒車，留意前方視野與後視鏡範圍。", "家人一起試坐，帶最大件行李或嬰兒車看看尾門開口是否順手。", "看看 ALLGRIP 模式選鈕的位置與儀表顯示，再與 S-CROSS 比較乘坐感受。"],
    relatedCars: ["s-cross", "e-vitara"],
    relatedGuides: ["suv-selection", "powertrain-choice"],
  },
  "s-cross": {
    ...carDates,
    updatedAt: "2026-11-01",
    description: "了解 SUZUKI S-CROSS 台灣售價、前驅輕油電規格及家庭載物需求，與 VITARA 比較選車取捨。鈺漣提供全台購車諮詢與跨縣市交車協助，台北北投試乘請先預約。",
    introduction: "S-CROSS 搭載 1.4L 渦輪與 48V 輕油電，採前輪驅動。430–440 L 行李箱與 6／4 分離後座適合家庭採買、接送與旅行，停車時也有 360° 環景輔助。",
    considerations: ["以通勤和家庭載物為主可先看 S-CROSS；需要 ALLGRIP 四驅則看 VITARA。"],
    testDrive: ["家人坐好後，試試後座椅背角度、冷氣與中央扶手的位置。", "倒車時看看 360° 環景的畫面與後視鏡，感受車身寬度。", "將嬰兒車或最大件行李先放進去，再放平常會帶的其他物品。"],
    relatedCars: ["vitara", "swift"],
    relatedGuides: ["suv-selection", "powertrain-choice"],
  },
  carry: {
    ...carDates,
    updatedAt: "2026-11-01",
    description: "查看 SUZUKI CARRY 台灣售價、貨台尺寸與載重規格，整理商用購車及交車前確認事項。鈺漣提供全台購車諮詢，跨縣市交車地點、費用及時程依個案確認。",
    introduction: "CARRY 的貨台可從左、右與後方開啟，搬長料、箱貨或園藝工具更方便。選工作車，除了貨台，也別漏了每天坐的駕駛室與上下貨動線。",
    considerations: ["一趟貨物連同工具與設備若超過核定載重，就分趟運送或比較載重更大的車型。"],
    testDrive: ["預約時提供貨物照片、長寬高與重量，告訴鈺漣想試放哪一件。", "坐進駕駛座，將手機、水壺與工作單據放到平常會用的位置。", "說明配送巷道、坡道與停車方式，預約合適的賞車或試乘時段。"],
    relatedCars: [],
    relatedGuides: ["trade-in", "car-maintenance"],
  },
};

export function carTitle(id: CarId) {
  const car = cars.find((item) => item.id === id)!;
  if (id === "jimny") return `SUZUKI ${car.name} 改款、價格與台北試乘｜張鈺漣`;
  if (id === "swift") return "SUZUKI SWIFT 價格與選購｜輕油電、台北試乘｜張鈺漣";
  return `SUZUKI ${car.name} 價格、${id === "e-vitara" ? "充電" : "規格"}與台北試乘｜張鈺漣`;
}

// Single-version starting prices continue to come from the existing shared car data.
// e VITARA's two prices also feed its visible specification line and schema.
export function carVersions(id: CarId) {
  if (id === "e-vitara") return eVitaraVersions;
  const car = cars.find((item) => item.id === id)!;
  return [{ name: `${car.name} 台灣販售版本`, priceTwd: Math.round(Number(car.price.replace(/[^0-9.]/g, "")) * 10000) }];
}

export const contentRoutes = [
  { path: "/", updatedAt: homeContent.updatedAt, title: homeContent.title },
  ...cars.map((car) => ({ path: `/cars/${car.id}`, updatedAt: carPages[car.id].updatedAt, title: carTitle(car.id) })),
  { path: "/visit/beitou", updatedAt: showroom.updatedAt, title: showroom.title },
  { path: "/guides", updatedAt: guideIndex.updatedAt, title: guideIndex.title },
  ...guides.map((guide) => ({ path: `/guides/${guide.slug}`, updatedAt: guide.updatedAt, title: guideTitle(guide) })),
  { path: "/faq", updatedAt: faqPage.updatedAt, title: faqPage.title },
];
