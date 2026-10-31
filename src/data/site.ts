import { getCarSpecifications } from "./specifications";
import { novemberCampaign, swiftNovemberCampaign, type Promotion } from "./promotions";

export const contentReviewedAt = "2026-09-07";

export const eVitaraVersions = [
  { name: "2WD", priceTwd: 1150000 },
  { name: "ALLGRIP-e", priceTwd: 1230000 },
];
export const eVitaraPriceSource = "https://www.taiwansuzuki.com.tw/slt/news/439";

// 業務基本資料
export const dealer = {
  name: "鈺漣",
  fullName: "張鈺漣",
  // Experience and Suzuki start year supplied by the owner on 2026-09-09.
  biography: "我是鈺漣，從 2018 年開始做汽車業務，曾在 Mazda 馬自達服務多年，2025 年起在 Suzuki 服務。",
  phone: "0987-629-773",
  line: "ke030",
  email: "",
  location: "凱騰鈴木 Suzuki 北投所｜台北市北投區承德路六段337號",
  brandColor: "#e60012",
} as const;

export interface ColorOption {
  name: string;
  hex: string;
  secondaryHex?: string;
}

export interface CarDetail {
  specs: string[];
  whoFor: string;
  promotion?: Promotion;
  sourceUrl: string;
  specUrl: string;
  tagline: string;
  images?: string[];
  imageLabels?: string[];
  galleryPhotos?: { src: string; label: string }[];
  colors?: ColorOption[];
}

export interface Car {
  id: CarId;
  name: string;
  subtitle: string;
  description: string;
  price: string;
  highlights: string[];
  detail: CarDetail;
}

export type CarId = "swift" | "jimny" | "e-vitara" | "vitara" | "s-cross" | "carry";

export function getCar(id: string | null | undefined) {
  return cars.find((car) => car.id === id);
}

export const cars: Car[] = [
  {
    id: "e-vitara",
    name: "e VITARA",
    subtitle: "純電休旅",
    description: "純電休旅，前驅／四驅雙版本",
    price: `${eVitaraVersions[0].priceTwd / 10000} 萬起`,
    highlights: ["純電行駛", "2WD 續航 516km (NEDC)", "ALLGRIP-e 四驅"],
    detail: {
      tagline: "Type 1 慢充、CCS1 快充",
      specs: [
        ...getCarSpecifications("e-vitara"),
        `售價：${eVitaraVersions.map((version) => `${version.name} ${version.priceTwd / 10000} 萬`).join(" / ")}`,
      ],
      whoFor: "有固定充電地點，想改開純電車的通勤族",
      sourceUrl: "https://www.taiwansuzuki.com.tw/cars/eVITARA",
      specUrl: "https://www.taiwansuzuki.com.tw/uploads/car_list/178453449654.pdf",
      promotion: {
        ...novemberCampaign,
        sourceUrl: "https://www.taiwansuzuki.com.tw/news/669",
        // Shoe redemption starts conflict between news/669 and news/671; omit until confirmed.
        summary: "100 萬 84 期・年利率 3.50%（須審核）。",
        terms: "須於活動期間內完成領牌，貸款須經經銷商及和潤企業審核，不得與其他優惠專案併用；詳細適用條件依官方活動辦法。",
      },
      images: ["e-vitara", "e-vitara-side", "e-vitara-int"],
      imageLabels: ["戶外行駛外觀", "車側與車尾外觀", "駕駛座與中控台"],
      colors: [
        { name: "2WD 白", hex: "#f0f0f0" },
        { name: "2WD 藍", hex: "#003fa7" },
        { name: "2WD 銀", hex: "#b0b0b0" },
        { name: "2WD 灰", hex: "#7a7a7a" },
        { name: "ALLGRIP-e 綠（單色）", hex: "#556b2f" },
        { name: "ALLGRIP-e 白黑（雙色）", hex: "#f0f0f0", secondaryHex: "#171717" },
        { name: "ALLGRIP-e 灰黑（雙色）", hex: "#7a7a7a", secondaryHex: "#171717" },
      ],
    },
  },
  {
    id: "swift",
    name: "SWIFT",
    subtitle: "靈活小車",
    description: "日本進口，輕油電小車",
    price: "73 萬起",
    highlights: ["24.5km/L 油耗", "日本進口", "車高 1,480mm"],
    detail: {
      tagline: "都會精靈，靈巧省油",
      specs: getCarSpecifications("swift"),
      whoFor: "一至兩人通勤、重視小車尺寸與停車便利的買家",
      sourceUrl: "https://www.taiwansuzuki.com.tw/cars/swift",
      specUrl: "https://www.taiwansuzuki.com.tw/uploads/car_list/178781313014.pdf",
      promotion: {
        ...swiftNovemberCampaign,
        summary: "完成 SWIFT 試乘贈「TAIWAN SUZUKI 胖才可愛兜風趣」LINE 貼圖；活動期間完成領牌另贈丙式車體險（須審核）。",
        terms: "試乘贈貼圖須於活動期間內至展間完成 SWIFT 試乘並填寫完整客戶資料，贈品數量有限，送完為止。領牌贈丙式車體險須於 2026/11/30 前完成領牌，經銷商及配合保險公司保有審核權利；不適用租賃、營業、政府機關及專案批／標購車輛。詳細資格依官方活動辦法。",
      },
      images: ["swift", "swift-rear", "swift-int"],
      imageLabels: ["城市行駛外觀", "後側行駛外觀", "駕駛座與中控台"],
      colors: [
        { name: "白", hex: "#f7f7f7" },
        { name: "橘", hex: "#f75000" },
        { name: "藍", hex: "#003fa7" },
        { name: "銀", hex: "#b0b0b0" },
        { name: "黃灰（雙色）", hex: "#f2ff99", secondaryHex: "#555555" },
        { name: "紅黑（雙色）", hex: "#ce1223", secondaryHex: "#171717" },
      ],
    },
  },
  {
    id: "jimny",
    name: "Jimny 2026",
    subtitle: "硬派越野",
    description: "經典越野，升級主動安全",
    price: "84.9 萬起",
    highlights: ["ALLGRIP PRO", "ACC 主動巡航", "DSBS II"],
    detail: {
      tagline: "為征服荒野而生",
      specs: getCarSpecifications("jimny"),
      whoFor: "一至兩人出遊、喜歡方正外型與四驅機能的買家",
      sourceUrl: "https://www.taiwansuzuki.com.tw/cars/jimny",
      specUrl: "https://www.taiwansuzuki.com.tw/uploads/car_list/178382615010.pdf",
      images: ["jimny", "jimny-side", "jimny-int"],
      imageLabels: ["城市行駛外觀", "車側外觀細節", "駕駛座與中控台"],
      galleryPhotos: [
        { src: "/personal/dealer-jimny-motor-show.jpg", label: "鈺漣與 Jimny 的車展合照" },
        { src: "/personal/dealer-jimny-outdoor-front.jpg", label: "鈺漣與 Jimny 的戶外車頭合照" },
        { src: "/images/jimny.jpg", label: "城市行駛外觀（官方照片）" },
      ],
      colors: [
        { name: "白", hex: "#f0f0f0" },
        { name: "軍綠", hex: "#48533a" },
        { name: "灰", hex: "#555555" },
        { name: "黑", hex: "#171717" },
        { name: "米", hex: "#c7bba2" },
        { name: "黃黑（雙色）", hex: "#c4d413", secondaryHex: "#171717" },
        { name: "米黑（雙色）", hex: "#c7bba2", secondaryHex: "#171717" },
        { name: "藍黑（雙色）", hex: "#076b91", secondaryHex: "#171717" },
      ],
    },
  },
  {
    id: "vitara",
    name: "VITARA",
    subtitle: "都會休旅",
    description: "ALLGRIP 四驅，渦輪動力",
    price: "104 萬起",
    highlights: ["ALLGRIP 四輪傳動", "1.4L BOOSTERJET", "48V 輕油電"],
    detail: {
      tagline: "型動新生，智慧升級",
      specs: getCarSpecifications("vitara"),
      whoFor: "通勤之外也有戶外行程、需要四驅的小家庭",
      sourceUrl: "https://www.taiwansuzuki.com.tw/cars/vitara",
      specUrl: "https://www.taiwansuzuki.com.tw/uploads/car_list/178418897488.pdf",
      promotion: {
        ...novemberCampaign,
        sourceUrl: "https://www.taiwansuzuki.com.tw/news/668",
        summary: "90 萬 84 期・年利率 3.50%（須審核）。",
        terms: "須於活動期間內完成領牌，貸款須經經銷商及和潤企業審核，不得與其他優惠專案併用；詳細適用條件依官方活動辦法。",
      },
      images: ["vitara", "vitara-side", "vitara-int"],
      imageLabels: ["山路行駛外觀", "車側外觀", "駕駛座與中控台"],
      colors: [
        { name: "白", hex: "#f0f0f0" },
        { name: "銀", hex: "#b0b0b0" },
        { name: "灰", hex: "#7a7a7a" },
        { name: "藍黑（雙色）", hex: "#1a3a5c", secondaryHex: "#171717" },
        { name: "紅黑（雙色）", hex: "#c1121f", secondaryHex: "#171717" },
        { name: "米黑（雙色）", hex: "#c7bba2", secondaryHex: "#171717" },
        { name: "灰藍黑（雙色）", hex: "#8fa7ac", secondaryHex: "#171717" },
      ],
    },
  },
  {
    id: "s-cross",
    name: "S-CROSS",
    subtitle: "跨界休旅",
    description: "48V 輕油電，寬敞行李廂",
    price: "98 萬起",
    highlights: ["440L 行李廂", "48V 輕油電", "6 SRS 氣囊"],
    detail: {
      tagline: "跨界全能，唯我電能",
      specs: getCarSpecifications("s-cross"),
      whoFor: "常載家人、嬰兒車與旅行行李的家庭",
      sourceUrl: "https://www.taiwansuzuki.com.tw/cars/s-cross",
      specUrl: "https://www.taiwansuzuki.com.tw/uploads/car_list/178453550663.pdf",
      promotion: {
        ...novemberCampaign,
        sourceUrl: "https://www.taiwansuzuki.com.tw/news/667",
        summary: "90 萬 84 期・年利率 3.50%（須審核）。",
        terms: "須於活動期間內完成領牌，貸款須經經銷商及和潤企業審核，不得與其他優惠專案併用；詳細適用條件依官方活動辦法。",
      },
      images: ["s-cross", "s-cross-side", "s-cross-int"],
      imageLabels: ["城市行駛外觀", "水箱護罩細節", "駕駛座與中控台"],
      colors: [
        { name: "白", hex: "#f0f0f0" },
        { name: "藍", hex: "#204567" },
        { name: "灰", hex: "#7a7a7a" },
        { name: "銀", hex: "#b0b0b0" },
      ],
    },
  },
  {
    id: "carry",
    name: "CARRY",
    subtitle: "商用貨車",
    description: "頭家首選，載重 915kg",
    price: "49.9 萬起",
    highlights: ["載重 915kg", "1.5L 引擎", "三邊開啟貨台"],
    detail: {
      tagline: "拼大生意，就選 CARRY",
      specs: getCarSpecifications("carry"),
      whoFor: "創業頭家、自營商、物流運輸業者",
      sourceUrl: "https://www.taiwansuzuki.com.tw/cars/carry",
      specUrl: "https://www.taiwansuzuki.com.tw/uploads/car_list/169336257999.pdf",
      promotion: {
        ...novemberCampaign,
        sourceUrl: "https://www.taiwansuzuki.com.tw/news/670",
        periodLabel: "貸款期間：2026/10/31–2026/11/30",
        summary: "40 萬 48 期・年利率 3.19%（須審核），月付 8,888 元；另有指定車款最高 10,000 元購車金。",
        terms: "貸款須於貸款活動期間內完成領牌，並經經銷商及和潤企業審核，不得與其他優惠專案併用。購車金自 2026/10/30 公告日起至 2026/11/30，限指定車款於期間內完成領牌並當車當次購買抵用，上限 10,000 元，實際交易價格依買賣雙方議定；購車金不適用租賃、營業、政府機關及專案批／標購車輛。詳細適用條件依官方活動辦法。",
      },
      images: ["carry", "carry-side", "carry-int"],
      imageLabels: ["載貨情境外觀", "三邊開啟貨台", "可滑動駕駛座椅"],
      colors: [
        { name: "白", hex: "#f0f0f0" },
        { name: "銀", hex: "#b0b0b0" },
        { name: "黑", hex: "#1a1a1a" },
      ],
    },
  },
];

// First three requested by the owner; remaining order uses public discussion signals.
// Evidence and limitations: docs/JIMNY_CONTENT_RESEARCH_2026-10-07.md.
export const homeCarOrder: CarId[] = ["jimny", "swift", "carry", "e-vitara", "vitara", "s-cross"];
export const homeCars = homeCarOrder.map((id) => cars.find((car) => car.id === id)!);

export const services = [
  { title: "新車介紹", desc: "掌握 Suzuki 全車系最新資訊與價格", icon: "📖" },
  { title: "車款比較", desc: "比較車身尺寸、載物空間與動力", icon: "⚖️" },
  { title: "預約試乘", desc: "預約台北北投所賞車與試乘", icon: "🚗", href: "/visit/beitou" },
  { title: "購車諮詢", desc: "車色、報價、付款與交車安排", icon: "💬" },
  { title: "貸款試算", desc: "計算頭期款、每月付款與總支出", icon: "💰", href: "#loan-calculator" },
  { title: "交車服務", desc: "跨縣市交車可洽詢，地點與費用另約", icon: "🔑", href: "/guides/first-car#paperwork" },
] as const;

export const usageOptions = [
  "市區通勤代步",
  "家庭出遊",
  "戶外露營／越野",
  "商用載貨",
  "第一台車",
  "換車升級",
  "其他",
] as const;

export const budgetRanges = [
  "50 萬以下",
  "50-70 萬",
  "70-90 萬",
  "90-120 萬",
  "120 萬以上",
  "還不確定",
] as const;
