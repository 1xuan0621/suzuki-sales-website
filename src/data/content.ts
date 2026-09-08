import { cars, contentReviewedAt, eVitaraVersions, type CarId } from "./site";
import { guides, guideIndex } from "./guides";
import { faqPage } from "./faq";
export { guides, getGuide } from "./guides";
export type { Guide, ContentSection } from "./guides";

export const siteUrl = "https://suzuki-taipei.com";
export const homeContent = {
  updatedAt: "2026-09-08",
  title: "SUZUKI 台北購車與試乘諮詢｜汽車顧問張鈺漣",
  description: "SUZUKI 汽車顧問張鈺漣以台北為主要服務地區，提供全台選車、購車諮詢與跨縣市交車協助。了解六款車的價格、規格與購車流程，預約凱騰鈴木北投所賞車及試乘；交車安排依個案確認。",
  introduction: "以台北為主要服務地區，提供全台購車諮詢，並協助跨縣市購車與交車。實際服務據點位於凱騰鈴木北投所，到店賞車與試乘請先預約；交車地點、費用與時程依個案確認。",
};

export const showroom = {
  name: "凱騰鈴木北投所",
  address: "台北市北投區承德路六段337號",
  phone: "(02) 2821-1128",
  phoneHref: "tel:0228211128",
  hours: ["週一至週五 08:30–21:00", "週六、週日 09:00–21:00"],
  sourceUrl: "https://www.taiwansuzuki.com.tw/jt/locator?type=1",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("凱騰鈴木北投所 台北市北投區承德路六段337號"),
  reviewedAt: "2026-09-08",
  updatedAt: "2026-09-08",
  title: "SUZUKI 台北到店賞車與試乘｜北投所交通及預約｜張鈺漣",
  description: "預約 SUZUKI 台北北投所賞車與試乘，查看承德路六段據點地址、營業時間、交通及停車確認事項。由張鈺漣先確認車款與時段，外縣市客戶也可先遠端諮詢。",
};

export interface CarPageContent {
  updatedAt: string;
  specsReviewedAt: string;
  pricesReviewedAt: string;
  description: string;
  introduction: string;
  considerations: string[];
  testDrive: string[];
  guideSlugs: string[];
  relatedCars: CarId[];
}

const carDates = { updatedAt: "2026-09-08", specsReviewedAt: contentReviewedAt, pricesReviewedAt: "2026-09-08" };
export const carPages: Record<CarId, CarPageContent> = {
  swift: {
    ...carDates,
    description: "了解 SUZUKI SWIFT 台灣售價、輕油電規格、停車尺寸與後座空間取捨。張鈺漣提供全台購車諮詢與跨縣市交車協助，台北北投到店賞車及試乘請先預約。",
    introduction: "選通勤小車，除了看車價，也要把每天停車、常坐幾人與週末載物一起考慮。SWIFT 可從車身尺寸、座椅調整與行李空間三個面向實際確認，讓選車回到自己的生活需求。",
    considerations: ["經常同時載滿乘客與大型行李，請把實際行李帶到現場確認，不能只看後座傾倒後的容積。", "機械車位需逐項核對限高、限寬、限長及載重；車身高度符合並不代表所有車位都能使用。", "官方油耗是測試值，塞車、短程與空調使用都會影響實際表現，不以測試值承諾每月油錢。"],
    testDrive: ["調整成平常開車的坐姿，查看前方、轉彎及倒車時的視野。", "讓常同行的家人試坐後座，確認上下車與腿部空間。", "詢問可安排的路段，觀察起步、低速跟車與停車操作感受。"],
    guideSlugs: ["buying-cost", "delivery-process"], relatedCars: ["s-cross"],
  },
  jimny: {
    ...carDates,
    description: "認識 SUZUKI Jimny 2026 台灣售價、四驅規格與日常乘坐、載物取捨。張鈺漣提供全台購車諮詢，跨縣市交車依個案確認；台北北投賞車及試乘請先預約。",
    introduction: "Jimny 的選車重點在於是否需要它的四驅與車身配置，以及是否接受日常乘坐與載物的取捨。先把通勤、同行人數與戶外行程列出來，再透過實車確認，會比只看外型更容易判斷。",
    considerations: ["後座乘坐與行李需求會互相影響，請用平常同行人數安排試坐，並確認上下車方式。", "四驅功能不等於任何路況都能安全通過；模式使用、輪胎及駕駛方式須遵守車主手冊。", "若主要需求是長途多人乘坐，建議同時試坐休旅車，比較座艙及乘坐感受。"],
    testDrive: ["在允許的試乘路線感受一般道路的轉向、煞車與乘坐。", "確認前後座進出、行李擺放與日常停車視野。", "由顧問說明四驅模式使用條件；一般到店試乘不代表能安排越野體驗。"],
    guideSlugs: ["buying-process"], relatedCars: ["vitara"],
  },
  "e-vitara": {
    ...carDates,
    description: "了解 SUZUKI e VITARA 台灣版本、售價、充電介面及續航測試條件，評估居家與外出充電。張鈺漣提供全台購車諮詢及跨縣市交車協助，台北北投試乘請先預約。",
    introduction: "選純電車先從充電安排開始：平常停在哪裡、能否安裝設備、長途會在哪裡補電。e VITARA 的版本選擇也要一起考慮驅動需求與測試續航，避免只用單一里程數決定。",
    considerations: ["沒有固定充電位置時，先確認常用公共站點的相容接頭、營業條件及替代站點。", "NEDC 續航是指定測試條件下的結果，不能直接當成高速、滿載或開空調時的保證行駛里程。", "居家充電是否能裝、要花多少費用，需由合格專業人員勘查供電、配線與停車位條件。"],
    testDrive: ["體驗起步與減速感受，確認駕駛姿勢及中控操作。", "請顧問示範充電口、充電資訊與日常操作方式。", "帶著通勤里程和充電安排討論版本，不只比較最高續航。"],
    guideSlugs: ["buying-cost", "buying-process"], relatedCars: ["vitara"],
  },
  vitara: {
    ...carDates,
    description: "比較 SUZUKI VITARA 台灣售價、輕油電與 ALLGRIP 四驅規格，了解與 S-CROSS 的空間及用途差異。張鈺漣提供全台購車諮詢，台北北投賞車及試乘請先預約。",
    introduction: "VITARA 可從四驅需求、車身與空間配置來評估。若平日通勤、週末戶外出遊，請把常走道路、乘坐人數及裝備一起列入選車條件，再與 S-CROSS 比較。",
    considerations: ["先確認四驅是否符合自己的使用情境，再比較價格與日常支出。", "四驅仍受輪胎、路況與駕駛操作限制，不能視為任何路面的通行保證。", "露營裝備或嬰兒車是否好放，應以實際尺寸及後座使用情況確認。"],
    testDrive: ["感受通勤路段的起步、轉向及停車視野。", "請同行家人試坐，並核對行李箱開口與常用物品尺寸。", "詢問 ALLGRIP 模式與使用限制，並與 S-CROSS 比較乘坐感受。"],
    guideSlugs: ["quote-contract", "buying-process"], relatedCars: ["s-cross", "e-vitara"],
  },
  "s-cross": {
    ...carDates,
    description: "了解 SUZUKI S-CROSS 台灣售價、前驅輕油電規格及家庭載物需求，與 VITARA 比較選車取捨。張鈺漣提供全台購車諮詢與跨縣市交車協助，台北北投試乘請先預約。",
    introduction: "家庭選車可以先從每天怎麼用開始：誰常坐後座、行李是否要和乘客同時上車、停車場是否好進出。S-CROSS 的空間配置值得實車確認，再依自己的驅動需求與 VITARA 比較。",
    considerations: ["行李箱公升數不能直接代表所有物品都放得下，開口形狀、物品長寬高與後座是否有人同樣重要。", "若需要四驅，請比較 VITARA 的台灣版本；不要把不同市場的 S-CROSS 配備混在一起。", "駕駛輔助功能有作動條件，仍需要駕駛持續注意路況與操作。"],
    testDrive: ["家人一起試坐前後座，查看空調、置物與上下車便利性。", "確認停車時的車身感受與視野，請顧問示範相關輔助功能。", "依實際行李尺寸核對行李箱，並比較後座直立及傾倒兩種狀態。"],
    guideSlugs: ["quote-contract", "buying-process"], relatedCars: ["vitara", "swift"],
  },
  carry: {
    ...carDates,
    description: "查看 SUZUKI CARRY 台灣售價、貨台尺寸與載重規格，整理商用購車及交車前確認事項。張鈺漣提供全台購車諮詢，跨縣市交車地點、費用及時程依個案確認。",
    introduction: "工作車先看工作內容：貨物尺寸、重量、裝卸方式與每天的路線，再看購車及使用成本。CARRY 的貨台與載重資料可作為初步篩選，實際用途仍需對照車輛核定資料。",
    considerations: ["重量估算須包含實際裝載與加裝設備的影響，不能只看貨台放不放得下。", "特殊貨物、設備或車體改裝需求，請在下訂前確認適用性及相關要求。", "商用貸款與活動資格需個別審核，不能將一般購車優惠直接套用到所有用途。"],
    testDrive: ["先提供平常貨物尺寸、重量及裝卸情境，確認貨台使用方式。", "實際坐入駕駛座，確認上下車與日常操作位置。", "賞車或試乘車輛是否可安排，請先向顧問確認，不預設現場有展示或試乘車。"],
    guideSlugs: ["buying-process"], relatedCars: [],
  },
};

export function carTitle(id: CarId) {
  const car = cars.find((item) => item.id === id)!;
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
  { path: "/faq", updatedAt: faqPage.updatedAt, title: faqPage.title },
  ...guides.map((guide) => ({ path: `/guides/${guide.slug}`, updatedAt: guide.updatedAt, title: `${guide.title}｜張鈺漣` })),
];
