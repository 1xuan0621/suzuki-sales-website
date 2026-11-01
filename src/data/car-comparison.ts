import type { SiteLocale } from "./locales";
import type { Car } from "./site";
import { carVersions } from "./content";
import { getCarSpecificationFacts } from "./specifications";

export type ComparisonRow = {
  id: string;
  label: string;
  values: string[][];
  price?: boolean;
};

type Copy = {
  labels: Record<"price" | "energy" | "drive" | "seating" | "cargo" | "dimensions" | "powertrain" | "power" | "efficiency", string>;
  electricEnergy: string;
  petrolEnergy: string;
  charging: string;
  electricFrontDrive: string;
  electricAllWheelDrive: string;
  allWheelDrive: string;
  partTimeDrive: string;
  frontWheelDrive: string;
  rearWheelDrive: string;
  electricSeats: string;
  jimnySeats: string[];
  swiftSeats: string[];
  vitaraSeats: string[];
  sCrossSeats: string[];
  jimnyCargo: string[];
  uprightBoot: string;
  adjustedBoot: string;
  slidForwardBoot: string;
  foldedBoot: string;
  maximumBoot: string;
  payload: string;
  cargoDimensions: string;
  threeSideBed: string;
  electricPowertrain: string;
  petrolPowertrain: string;
  smallHybrid: string;
  turboHybrid: string;
  fuelEconomy: string;
  frontRange: string;
  allWheelRange: string;
  testRange: string;
};

const copy: Record<SiteLocale, Copy> = {
  "zh-TW": {
    labels: { price: "建議起價", energy: "加油還是充電？", drive: "驅動方式", seating: "座位與後座進出", cargo: "行李廂／載物", dimensions: "車身尺寸（長 × 寬 × 高）", powertrain: "引擎／動力", power: "馬力", efficiency: "官方油耗／測試續航" },
    electricEnergy: "純電，需要充電",
    petrolEnergy: "加汽油，不用外接充電",
    charging: "AC {acConnector}／DC {dcConnector}",
    electricFrontDrive: "{frontDrive} 前輪驅動",
    electricAllWheelDrive: "{allWheelDrive} 四輪驅動",
    allWheelDrive: "{driveSystem} 適時四驅",
    partTimeDrive: "{driveSystem} 加力箱四驅",
    frontWheelDrive: "{driveSystem} 前輪驅動",
    rearWheelDrive: "{driveSystem} 後輪驅動",
    electricSeats: "後座可前後滑動 {rearSeatSlideMm} mm",
    jimnySeats: ["三門四人座", "後座從前門進出"],
    swiftSeats: ["{seats} 人座", "後座可 6/4 分離傾倒"],
    vitaraSeats: ["五門車型"],
    sCrossSeats: ["五門五人座", "後座可 6/4 分離傾倒"],
    jimnyCargo: ["後座可 50/50 分離傾倒", "載人時需保留後座"],
    uprightBoot: "{bootLitres} L（後座直立）",
    adjustedBoot: "{bootLitres} L（椅背調整後）",
    slidForwardBoot: "{slidForwardBootLitres} L（後座滑至最前）",
    foldedBoot: "{expandedBootLitres} L（後座傾倒）",
    maximumBoot: "最大 {expandedBootLitres} L",
    payload: "載重 {payloadKg} kg",
    cargoDimensions: "貨台 {cargoDimensionsMm} mm（長 × 寬 × 高）",
    threeSideBed: "三邊可開啟貨台",
    electricPowertrain: "純電馬達 · {batteryKwh} kWh 電池",
    petrolPowertrain: "{engineLitres}L 直列四缸汽油引擎",
    smallHybrid: "{engineLitres}L 三缸 · {hybridVolts}V 輕油電",
    turboHybrid: "{engineLitres}L 渦輪 · {hybridVolts}V 輕油電",
    fuelEconomy: "{fuelEconomyKml} km/L（官方油耗）",
    frontRange: "{frontDrive} 約 {frontRangeKm} km",
    allWheelRange: "{allWheelDrive} 約 {allWheelRangeKm} km",
    testRange: "{rangeStandard} 測試續航，非實際里程保證",
  },
  en: {
    labels: { price: "Starting price", energy: "Petrol or charging?", drive: "Drive", seating: "Seats and rear access", cargo: "Luggage and cargo", dimensions: "Dimensions (L × W × H)", powertrain: "Powertrain", power: "Power", efficiency: "Official economy / test range" },
    electricEnergy: "Electric; charging required",
    petrolEnergy: "Petrol; no plug-in charging",
    charging: "AC {acConnector} / DC {dcConnector}",
    electricFrontDrive: "{frontDrive}: front-wheel drive",
    electricAllWheelDrive: "{allWheelDrive}: all-wheel drive",
    allWheelDrive: "{driveSystem} all-wheel drive",
    partTimeDrive: "Part-time {driveSystem} with transfer case",
    frontWheelDrive: "{driveSystem}: front-wheel drive",
    rearWheelDrive: "{driveSystem}: rear-wheel drive",
    electricSeats: "Rear seats slide {rearSeatSlideMm} mm",
    jimnySeats: ["3 doors, 4 seats", "Rear access through the front doors"],
    swiftSeats: ["{seats} seats", "60/40 split-folding rear seats"],
    vitaraSeats: ["5-door body"],
    sCrossSeats: ["5 doors, 5 seats", "60/40 split-folding rear seats"],
    jimnyCargo: ["50/50 split-folding rear seats", "Keep rear seats upright for passengers"],
    uprightBoot: "{bootLitres} L with rear seats upright",
    adjustedBoot: "{bootLitres} L after adjusting rear seatbacks",
    slidForwardBoot: "{slidForwardBootLitres} L with rear seats slid fully forward",
    foldedBoot: "{expandedBootLitres} L with rear seats folded",
    maximumBoot: "Up to {expandedBootLitres} L",
    payload: "Payload: {payloadKg} kg",
    cargoDimensions: "Bed: {cargoDimensionsMm} mm (L × W × H)",
    threeSideBed: "Cargo bed opens on three sides",
    electricPowertrain: "Electric motors · {batteryKwh} kWh battery",
    petrolPowertrain: "{engineLitres}L four-cylinder petrol",
    smallHybrid: "{engineLitres}L three-cylinder · {hybridVolts}V mild hybrid",
    turboHybrid: "{engineLitres}L turbo · {hybridVolts}V mild hybrid",
    fuelEconomy: "{fuelEconomyKml} km/L (official figure)",
    frontRange: "{frontDrive}: approx. {frontRangeKm} km",
    allWheelRange: "{allWheelDrive}: approx. {allWheelRangeKm} km",
    testRange: "{rangeStandard} test range; actual range varies",
  },
  ja: {
    labels: { price: "価格（〜）", energy: "給油・充電", drive: "駆動方式", seating: "座席・後席への乗降", cargo: "荷室・積載", dimensions: "車体寸法（全長 × 全幅 × 全高）", powertrain: "エンジン・動力", power: "最高出力", efficiency: "公式燃費・試験航続距離" },
    electricEnergy: "電気自動車・充電が必要",
    petrolEnergy: "ガソリン給油・外部充電不要",
    charging: "AC {acConnector}／DC {dcConnector}",
    electricFrontDrive: "{frontDrive}：前輪駆動",
    electricAllWheelDrive: "{allWheelDrive}：四輪駆動",
    allWheelDrive: "{driveSystem} 四輪駆動",
    partTimeDrive: "トランスファー付きパートタイム {driveSystem}",
    frontWheelDrive: "{driveSystem}：前輪駆動",
    rearWheelDrive: "{driveSystem}：後輪駆動",
    electricSeats: "後席は前後に {rearSeatSlideMm} mm スライド可能",
    jimnySeats: ["3ドア・4人乗り", "後席は前席側のドアから乗降"],
    swiftSeats: ["{seats}人乗り", "後席は6:4分割可倒式"],
    vitaraSeats: ["5ドア車"],
    sCrossSeats: ["5ドア・5人乗り", "後席は6:4分割可倒式"],
    jimnyCargo: ["後席は5:5分割可倒式", "乗車人数に合わせて後席を確保"],
    uprightBoot: "{bootLitres} L（後席使用時）",
    adjustedBoot: "{bootLitres} L（後席背もたれ調整後）",
    slidForwardBoot: "{slidForwardBootLitres} L（後席を最前方へスライド）",
    foldedBoot: "{expandedBootLitres} L（後席格納時）",
    maximumBoot: "最大 {expandedBootLitres} L",
    payload: "積載量 {payloadKg} kg",
    cargoDimensions: "荷台 {cargoDimensionsMm} mm（長さ × 幅 × 高さ）",
    threeSideBed: "三方開き荷台",
    electricPowertrain: "電動モーター・{batteryKwh} kWh バッテリー",
    petrolPowertrain: "{engineLitres}L 直列4気筒ガソリン",
    smallHybrid: "{engineLitres}L 3気筒・{hybridVolts}V マイルドハイブリッド",
    turboHybrid: "{engineLitres}L ターボ・{hybridVolts}V マイルドハイブリッド",
    fuelEconomy: "{fuelEconomyKml} km/L（公式値）",
    frontRange: "{frontDrive}：約 {frontRangeKm} km",
    allWheelRange: "{allWheelDrive}：約 {allWheelRangeKm} km",
    testRange: "{rangeStandard} 試験値。実際の航続距離とは異なります",
  },
  ko: {
    labels: { price: "시작 가격", energy: "주유·충전", drive: "구동 방식", seating: "좌석·뒷좌석 승하차", cargo: "트렁크·적재", dimensions: "차체 크기 (길이 × 너비 × 높이)", powertrain: "엔진·동력", power: "최고 출력", efficiency: "공식 연비·시험 주행거리" },
    electricEnergy: "전기차·충전 필요",
    petrolEnergy: "휘발유 주유·외부 충전 불필요",
    charging: "AC {acConnector} / DC {dcConnector}",
    electricFrontDrive: "{frontDrive}: 전륜구동",
    electricAllWheelDrive: "{allWheelDrive}: 사륜구동",
    allWheelDrive: "{driveSystem} 사륜구동",
    partTimeDrive: "트랜스퍼 케이스가 있는 파트타임 {driveSystem}",
    frontWheelDrive: "{driveSystem}: 전륜구동",
    rearWheelDrive: "{driveSystem}: 후륜구동",
    electricSeats: "뒷좌석 앞뒤 {rearSeatSlideMm} mm 슬라이딩",
    jimnySeats: ["3도어·4인승", "앞문을 통해 뒷좌석 승하차"],
    swiftSeats: ["{seats}인승", "6:4 분할 접이식 뒷좌석"],
    vitaraSeats: ["5도어 차체"],
    sCrossSeats: ["5도어·5인승", "6:4 분할 접이식 뒷좌석"],
    jimnyCargo: ["5:5 분할 접이식 뒷좌석", "승객이 타는 뒷좌석은 세워 두세요"],
    uprightBoot: "{bootLitres} L (뒷좌석을 세운 상태)",
    adjustedBoot: "{bootLitres} L (뒷좌석 등받이 조절 후)",
    slidForwardBoot: "{slidForwardBootLitres} L (뒷좌석을 맨 앞으로 이동)",
    foldedBoot: "{expandedBootLitres} L (뒷좌석을 접은 상태)",
    maximumBoot: "최대 {expandedBootLitres} L",
    payload: "적재량 {payloadKg} kg",
    cargoDimensions: "적재함 {cargoDimensionsMm} mm (길이 × 너비 × 높이)",
    threeSideBed: "세 방향으로 열리는 적재함",
    electricPowertrain: "전기 모터·{batteryKwh} kWh 배터리",
    petrolPowertrain: "{engineLitres}L 직렬 4기통 휘발유",
    smallHybrid: "{engineLitres}L 3기통·{hybridVolts}V 마일드 하이브리드",
    turboHybrid: "{engineLitres}L 터보·{hybridVolts}V 마일드 하이브리드",
    fuelEconomy: "{fuelEconomyKml} km/L (공식 수치)",
    frontRange: "{frontDrive}: 약 {frontRangeKm} km",
    allWheelRange: "{allWheelDrive}: 약 {allWheelRangeKm} km",
    testRange: "{rangeStandard} 시험 수치이며 실제 주행거리는 달라집니다",
  },
};

const missing = ["—"];
const numberFormat = new Intl.NumberFormat("en-US", { maximumFractionDigits: 10 });

function interpolate(template: string, car: Car) {
  const facts = getCarSpecificationFacts(car.id);
  return template.replace(/\{(\w+)\}/g, (_, key: string) => {
    const value = facts[key];
    if (typeof value === "number") return numberFormat.format(value);
    if (Array.isArray(value)) return value.map((part) => typeof part === "number" ? numberFormat.format(part) : part).join(key === "driveModes" ? " / " : " × ");
    return typeof value === "string" ? value : "—";
  });
}

// Editorial facts below are short projections of already-published answers:
// content.ts carPages.swift/jimny; faq.ts jimny-daily-use, vitara-hybrid,
// vitara-vs-s-cross, s-cross-hybrid; car-usage.ts jimny and s-cross.
// Reuse the shared price/specification helpers without importing long-form answers.
// In particular, unknown seating/drive values remain missing instead of being inferred.
export function getCarComparisonRows(cars: Car[], locale: SiteLocale): { summary: ComparisonRow[]; details: ComparisonRow[] } {
  const text = copy[locale];
  const row = (id: keyof Copy["labels"], values: (car: Car) => string[], price = false): ComparisonRow => ({
    id,
    label: text.labels[id],
    values: cars.map((car) => [...values(car)]),
    ...(price ? { price: true } : {}),
  });
  const present = (item: ComparisonRow) => item.values.some((lines) => lines.some((line) => line !== "—"));

  const summary = [
    row("price", (car) => locale === "zh-TW" ? [car.price] : [`NT$ ${numberFormat.format(carVersions(car.id)[0].priceTwd)}`], true),
    row("energy", (car) => car.id === "e-vitara" ? [text.electricEnergy, interpolate(text.charging, car)] : [text.petrolEnergy]),
    row("drive", (car) => {
      if (car.id === "e-vitara") return [interpolate(text.electricFrontDrive, car), interpolate(text.electricAllWheelDrive, car)];
      if (car.id === "vitara") return [interpolate(text.allWheelDrive, car)];
      if (car.id === "jimny") return [interpolate(text.partTimeDrive, car), interpolate("{driveModes}", car)];
      if (car.id === "s-cross") return [interpolate(text.frontWheelDrive, car)];
      if (car.id === "carry") return [interpolate(text.rearWheelDrive, car)];
      return missing;
    }),
    row("seating", (car) => {
      if (car.id === "e-vitara") return [interpolate(text.electricSeats, car)];
      if (car.id === "jimny") return text.jimnySeats;
      if (car.id === "swift") return text.swiftSeats.map((line) => interpolate(line, car));
      if (car.id === "vitara") return text.vitaraSeats;
      if (car.id === "s-cross") return text.sCrossSeats;
      return missing;
    }),
    row("cargo", (car) => {
      if (car.id === "e-vitara") return [interpolate("{bootLitres} L", car), interpolate(text.slidForwardBoot, car)];
      if (car.id === "jimny") return text.jimnyCargo;
      if (car.id === "swift") return [interpolate(text.uprightBoot, car), interpolate(text.foldedBoot, car)];
      if (car.id === "vitara") return [interpolate(text.uprightBoot, car), interpolate(text.maximumBoot, car)];
      if (car.id === "s-cross") return [interpolate(text.adjustedBoot, car), interpolate(text.foldedBoot, car)];
      if (car.id === "carry") return [interpolate(text.payload, car), interpolate(text.cargoDimensions, car), text.threeSideBed];
      return missing;
    }),
  ].filter(present);

  const details = [
    row("dimensions", (car) => getCarSpecificationFacts(car.id).dimensionsMm ? [interpolate("{dimensionsMm} mm", car)] : missing),
    row("powertrain", (car) => [interpolate(car.id === "e-vitara" ? text.electricPowertrain : car.id === "swift" ? text.smallHybrid : car.id === "vitara" || car.id === "s-cross" ? text.turboHybrid : text.petrolPowertrain, car)]),
    row("power", (car) => getCarSpecificationFacts(car.id).powerPs ? [interpolate("{powerPs} PS / {powerRpm} rpm", car)] : missing),
    row("efficiency", (car) => car.id === "e-vitara" ? [interpolate(text.frontRange, car), interpolate(text.allWheelRange, car), interpolate(text.testRange, car)] : [interpolate(text.fuelEconomy, car)]),
  ].filter(present);

  return { summary, details };
}
