import { septemberCampaign, type Promotion } from "./promotions";

export const contentReviewedAt = "2026-09-07";

// 業務基本資料
export const dealer = {
  name: "張鈺漣",
  phone: "0987-629-773",
  line: "ke030",
  email: "",
  location: "凱騰鈴木 Suzuki 北投所｜台北市北投區承德路六段337號",
  brandColor: "#e60012",
} as const;

export interface ColorOption {
  name: string;
  hex: string;
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
  colors?: ColorOption[];
}

export interface Car {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  price: string;
  highlights: string[];
  detail: CarDetail;
}

export const cars: Car[] = [
  {
    id: "e-vitara",
    name: "e VITARA",
    subtitle: "純電休旅",
    description: "純電世代，純電驅動的智慧移動",
    price: "115 萬起",
    highlights: ["純電行駛", "2WD 續航 516km (NEDC)", "ALLGRIP-e 四驅"],
    detail: {
      tagline: "純電新生活，即刻展開",
      specs: [
        "動力系統：純電馬達 (61kWh 電池)",
        "驅動方式：2WD 前驅 / ALLGRIP-e 四驅",
        "續航里程：2WD 約 516km / ALLGRIP-e 約 444km (NEDC)",
        "充電介面：AC Type 1 (J1772) / DC CCS1",
        "DC 快充：約 45 分鐘 (10%→80%，實際依溫度與電池狀態而異)",
        "售價：2WD 115 萬 / ALLGRIP-e 123 萬",
      ],
      whoFor: "重視環保、想降低日常通勤成本的科技先驅",
      sourceUrl: "https://www.taiwansuzuki.com.tw/cars/eVITARA",
      specUrl: "https://www.taiwansuzuki.com.tw/uploads/car_list/178453449654.pdf",
      promotion: {
        ...septemberCampaign,
        summary: "100 萬 84 期・年利率 3.50%（須審核）；領牌贈 ALLGRIP × MIZUNO 聯名鞋款。",
        terms: "貸款利率 3.50%，須經審核，不得與其他優惠專案併用。贈品數量與尺寸有限，送完為止；限符合官方購車及領牌資格者，排除租賃、營業車等，兌換期限至 2026/10/31。",
      },
      images: ["e-vitara", "e-vitara-side", "e-vitara-int"],
      imageLabels: ["戶外行駛外觀", "車側與車尾外觀", "駕駛座與中控台"],
      colors: [
        { name: "2WD 白", hex: "#f0f0f0" },
        { name: "2WD 藍", hex: "#003fa7" },
        { name: "2WD 銀", hex: "#b0b0b0" },
        { name: "2WD 灰", hex: "#7a7a7a" },
        { name: "ALLGRIP-e 綠（單色）", hex: "#556b2f" },
        { name: "ALLGRIP-e 白黑（雙色）", hex: "#f0f0f0" },
        { name: "ALLGRIP-e 灰黑（雙色）", hex: "#7a7a7a" },
      ],
    },
  },
  {
    id: "swift",
    name: "SWIFT",
    subtitle: "靈活小車",
    description: "城市經典新風範，日本進口輕油電",
    price: "73 萬起",
    highlights: ["24.5km/L 油耗", "日本進口", "車高 1,480mm"],
    detail: {
      tagline: "都會精靈，靈巧省油",
      specs: [
        "引擎：1.2L 直列三缸 + 12V HYBRID輕油電",
        "馬力：81 PS / 5,700 rpm",
        "油耗：24.5 km/L (官方能源效率標示)",
        "尺寸：3,860 x 1,735 x 1,480 mm",
        "行李箱：265L (後座傾倒 579L)",
        "安全：全速域 ACC + LKA + DSBS II + 6 SRS 氣囊",
      ],
      whoFor: "首購族、市區通勤族；機械車位需核對限高、限寬與載重",
      sourceUrl: "https://www.taiwansuzuki.com.tw/cars/swift",
      specUrl: "https://www.taiwansuzuki.com.tw/uploads/car_list/178781313014.pdf",
      promotion: {
        ...septemberCampaign,
        summary: "完成試乘贈哈根達斯 100ml 冰淇淋乙份。",
        terms: "需填寫完整客戶資料，贈品數量有限，送完為止；詳細資格依官方活動辦法。",
      },
      images: ["swift", "swift-rear", "swift-int"],
      imageLabels: ["城市行駛外觀", "後側行駛外觀", "駕駛座與中控台"],
      colors: [
        { name: "白", hex: "#f7f7f7" },
        { name: "橘", hex: "#f75000" },
        { name: "藍", hex: "#003fa7" },
        { name: "銀", hex: "#b0b0b0" },
        { name: "黃灰（雙色）", hex: "#f2ff99" },
        { name: "紅黑（雙色）", hex: "#ce1223" },
      ],
    },
  },
  {
    id: "jimny",
    name: "Jimny 2026",
    subtitle: "硬派越野",
    description: "經典越野本格，升級 ACC 與 DSBS II",
    price: "84.9 萬起",
    highlights: ["ALLGRIP PRO", "ACC 主動巡航", "DSBS II"],
    detail: {
      tagline: "為征服荒野而生",
      specs: [
        "引擎：1.5L 直列四缸",
        "馬力：102 PS / 6,000 rpm",
        "驅動：Part-time 4WD 加力箱 (2H/4H/4L)",
        "尺寸：3,650 x 1,645 x 1,705 mm",
        "油耗：14.5 km/L (官方能源效率標示)",
        "底盤：階梯式大樑 (Ladder Frame)",
        "安全：ACC + DSBS II + LDP + 6 SRS 氣囊",
        "座艙：9 吋觸控螢幕，支援無線 Apple CarPlay / Android Auto",
      ],
      whoFor: "戶外玩家、露營愛好者、想要個性化車款的你",
      sourceUrl: "https://www.taiwansuzuki.com.tw/cars/jimny",
      specUrl: "https://www.taiwansuzuki.com.tw/uploads/car_list/178382615010.pdf",
      promotion: {
        ...septemberCampaign,
        summary: "完成試乘贈 Jimny 限量帆布袋乙個。",
        terms: "需填寫完整客戶資料，贈品數量有限，送完為止；詳細資格依官方活動辦法。",
      },
      images: ["jimny", "jimny-side", "jimny-int"],
      imageLabels: ["城市行駛外觀", "車側外觀細節", "駕駛座與中控台"],
      colors: [
        { name: "白", hex: "#f0f0f0" },
        { name: "軍綠", hex: "#48533a" },
        { name: "灰", hex: "#555555" },
        { name: "黑", hex: "#171717" },
        { name: "米", hex: "#c7bba2" },
        { name: "黃黑（雙色）", hex: "#c4d413" },
        { name: "米黑（雙色）", hex: "#c7bba2" },
        { name: "藍黑（雙色）", hex: "#076b91" },
      ],
    },
  },
  {
    id: "vitara",
    name: "VITARA",
    subtitle: "都會休旅",
    description: "ALLGRIP 四驅加持，1.4L BOOSTERJET 渦輪",
    price: "104 萬起",
    highlights: ["ALLGRIP 四輪傳動", "1.4L BOOSTERJET", "48V 輕油電"],
    detail: {
      tagline: "型動新生，智慧升級",
      specs: [
        "引擎：1.4L BOOSTERJET 缸內直噴渦輪 + 48V輕油電",
        "馬力：110.02 PS / 4,400 rpm",
        "扭力：23.97 kgm / 2,000–2,500 rpm",
        "驅動：ALLGRIP 適時四輪傳動 (Auto/Sport/Snow/Lock)",
        "油耗：17.4 km/L (官方能源效率標示)",
        "行李箱：375L (最大 710L)",
        "安全：ACC + LKA + DSBS II + 6 SRS 氣囊",
      ],
      whoFor: "熱愛戶外活動的小家庭，想要 SUV 機能與駕駛樂趣",
      sourceUrl: "https://www.taiwansuzuki.com.tw/cars/vitara",
      specUrl: "https://www.taiwansuzuki.com.tw/uploads/car_list/178418897488.pdf",
      promotion: {
        ...septemberCampaign,
        summary: "90 萬 84 期・年利率 3.50%（須審核）。",
        terms: "貸款利率 3.50%，須經經銷商及金融機構審核，不得與其他優惠專案併用。領牌及適用條件依官方活動辦法。",
      },
      images: ["vitara", "vitara-side", "vitara-int"],
      imageLabels: ["山路行駛外觀", "車側外觀", "駕駛座與中控台"],
      colors: [
        { name: "白", hex: "#f0f0f0" },
        { name: "銀", hex: "#b0b0b0" },
        { name: "灰", hex: "#7a7a7a" },
        { name: "藍黑（雙色）", hex: "#1a3a5c" },
        { name: "紅黑（雙色）", hex: "#c1121f" },
        { name: "米黑（雙色）", hex: "#c7bba2" },
        { name: "灰藍黑（雙色）", hex: "#8fa7ac" },
      ],
    },
  },
  {
    id: "s-cross",
    name: "S-CROSS",
    subtitle: "跨界休旅",
    description: "寬敞行李廂，48V 輕油電，Level 2 安全",
    price: "98 萬起",
    highlights: ["440L 行李廂", "48V 輕油電", "6 SRS 氣囊"],
    detail: {
      tagline: "跨界全能，唯我電能",
      specs: [
        "引擎：1.4L BOOSTERJET + 48V 輕油電",
        "馬力：110.02 PS / 4,400 rpm",
        "扭力：23.97 kgm / 2,000–2,500 rpm",
        "油耗：19.1 km/L (官方能源效率標示)",
        "行李箱：440L (後座傾倒 1,230L)",
        "驅動：2WD 前驅",
        "安全：ACC + LKA + DSBS II + 360°環景 + 6 SRS 氣囊",
      ],
      whoFor: "經常長途出遊、需要大空間的大家庭或露營愛好者",
      sourceUrl: "https://www.taiwansuzuki.com.tw/cars/s-cross",
      specUrl: "https://www.taiwansuzuki.com.tw/uploads/car_list/178453550663.pdf",
      promotion: {
        ...septemberCampaign,
        summary: "90 萬 84 期・年利率 3.50%（須審核）。",
        terms: "貸款利率 3.50%，須經經銷商及金融機構審核，不得與其他優惠專案併用。領牌及適用條件依官方活動辦法。",
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
    description: "頭家首選，同級最強載重 915kg",
    price: "49.9 萬起",
    highlights: ["載重 915kg", "同級最強", "低月付方案"],
    detail: {
      tagline: "拼大生意，就選 CARRY",
      specs: [
        "引擎：1.5L 直列四缸",
        "馬力：96.6 PS / 5,600 rpm",
        "扭力：13.8 kgm / 4,400 rpm",
        "載重：915 kg (同級最強)",
        "貨台：2,565 x 1,660 x 290 mm (三邊可開)",
        "油耗：14.7 km/L",
        "保固：三年或十萬公里原廠保固",
      ],
      whoFor: "創業頭家、自營商、物流運輸業者",
      sourceUrl: "https://www.taiwansuzuki.com.tw/cars/carry",
      specUrl: "https://www.taiwansuzuki.com.tw/uploads/car_list/169336257999.pdf",
      promotion: {
        ...septemberCampaign,
        summary: "40 萬 48 期・年利率 3.19%（須審核），月付 8,888 元；另有指定車款購車金。",
        terms: "貸款利率 3.19%，須經審核且不得與其他優惠專案併用。購車金限指定車款當次抵用，排除租賃、營業、政府機關及專案批／標購車輛；兩方案能否併用請洽詢。",
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

export const services = [
  { title: "新車介紹", desc: "掌握 Suzuki 全車系最新資訊與價格", icon: "📖" },
  { title: "車款比較", desc: "依你的需求幫你分析最適合的車款", icon: "⚖️" },
  { title: "預約試乘", desc: "安排你想試的車款，到店直接上路", icon: "🚗" },
  { title: "購車諮詢", desc: "從選車到成交，陪你走完整個流程", icon: "💬" },
  { title: "貸款試算", desc: "試算月付金額，保險需求另行諮詢", icon: "💰", href: "#loan-calculator" },
  { title: "交車服務", desc: "完整交車說明，讓你安心上路", icon: "🔑" },
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
