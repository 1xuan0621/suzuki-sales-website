import type { CarId } from "./site";

type SpecificationLocale = "zh-TW" | "en";
type SpecificationValue = string | number | readonly (string | number)[];
type SpecificationFacts = Record<string, SpecificationValue>;

// Templates describe equipment variants; Taiwan-market measurements and model
// identifiers are kept once in the facts below, shared by every language.
const templates = {
  electricPowertrain: {
    "zh-TW": "動力系統：純電馬達 ({batteryKwh}kWh 電池)",
    en: "Powertrain: electric motors with a {batteryKwh} kWh battery",
  },
  electricDrive: {
    "zh-TW": "驅動方式：{frontDrive} 前驅 / {allWheelDrive} 四驅",
    en: "Drive: {frontDrive} front-wheel drive or {allWheelDrive} all-wheel drive",
  },
  electricRange: {
    "zh-TW": "續航里程：{frontDrive} 約 {frontRangeKm}km / {allWheelDrive} 約 {allWheelRangeKm}km ({rangeStandard})",
    en: "{rangeStandard} range: approximately {frontRangeKm} km ({frontDrive}) or {allWheelRangeKm} km ({allWheelDrive})",
  },
  chargingConnections: {
    "zh-TW": "充電介面：AC {acConnector} ({acStandard}) / DC {dcConnector}",
    en: "Charging: AC {acConnector} ({acStandard}) and DC {dcConnector}",
  },
  fastCharging: {
    "zh-TW": "DC 快充：約 {chargeMinutes} 分鐘 ({chargeStartPercent}%→{chargeEndPercent}%，實際依溫度與電池狀態而異)",
    en: "DC fast charging: approximately {chargeMinutes} minutes from {chargeStartPercent}% to {chargeEndPercent}%; time varies with temperature and battery condition",
  },
  threeCylinderHybrid: {
    "zh-TW": "引擎：{engineLitres}L 直列三缸 + {hybridVolts}V HYBRID輕油電",
    en: "Engine: {engineLitres}L three-cylinder petrol with {hybridVolts}V mild hybrid",
  },
  fourCylinderPetrol: {
    "zh-TW": "引擎：{engineLitres}L 直列四缸",
    en: "Engine: {engineLitres}L four-cylinder petrol",
  },
  directInjectionHybrid: {
    "zh-TW": "引擎：{engineLitres}L {engineName} 缸內直噴渦輪 + {hybridVolts}V輕油電",
    en: "Engine: {engineLitres}L {engineName} direct-injection turbo with {hybridVolts}V mild hybrid",
  },
  turboHybrid: {
    "zh-TW": "引擎：{engineLitres}L {engineName} + {hybridVolts}V 輕油電",
    en: "Engine: {engineLitres}L {engineName} turbo with {hybridVolts}V mild hybrid",
  },
  power: {
    "zh-TW": "馬力：{powerPs} PS / {powerRpm} rpm",
    en: "Power: {powerPs} PS at {powerRpm} rpm",
  },
  torque: {
    "zh-TW": "扭力：{torqueKgm} kgm / {torqueRpm} rpm",
    en: "Torque: {torqueKgm} kgm at {torqueRpm} rpm",
  },
  torqueRange: {
    "zh-TW": "扭力：{torqueKgm} kgm / {torqueRpmStart}–{torqueRpmEnd} rpm",
    en: "Torque: {torqueKgm} kgm at {torqueRpmStart}–{torqueRpmEnd} rpm",
  },
  officialFuelEconomy: {
    "zh-TW": "油耗：{fuelEconomyKml} km/L (官方能源效率標示)",
    en: "Official fuel economy: {fuelEconomyKml} km/L",
  },
  fuelEconomy: {
    "zh-TW": "油耗：{fuelEconomyKml} km/L",
    en: "Official fuel economy: {fuelEconomyKml} km/L",
  },
  dimensions: {
    "zh-TW": "尺寸：{dimensionsMm} mm",
    en: "Dimensions (L × W × H): {dimensionsMm} mm",
  },
  foldingBoot: {
    "zh-TW": "行李箱：{bootLitres}L (後座傾倒 {expandedBootLitres}L)",
    en: "Boot: {bootLitres} L; {expandedBootLitres} L with the rear seats folded",
  },
  maximumBoot: {
    "zh-TW": "行李箱：{bootLitres}L (最大 {expandedBootLitres}L)",
    en: "Boot: {bootLitres} L; maximum {expandedBootLitres} L",
  },
  fullSpeedSafety: {
    "zh-TW": "安全：全速域 {assistance} + {airbags} SRS 氣囊",
    en: "Driver assistance and safety: full-speed {assistance} and {airbags} SRS airbags",
  },
  safety: {
    "zh-TW": "安全：{assistance} + {airbags} SRS 氣囊",
    en: "Driver assistance and safety: {assistance} and {airbags} SRS airbags",
  },
  surroundCameraSafety: {
    "zh-TW": "安全：{assistance} + {cameraDegrees}°環景 + {airbags} SRS 氣囊",
    en: "Driver assistance and safety: {assistance}, {cameraDegrees}° camera and {airbags} SRS airbags",
  },
  partTimeDrive: {
    "zh-TW": "驅動：Part-time {driveSystem} 加力箱 ({driveModes})",
    en: "Drive: part-time {driveSystem} with a transfer case ({driveModes})",
  },
  allWheelDrive: {
    "zh-TW": "驅動：{driveSystem} 適時四輪傳動 ({driveModes})",
    en: "Drive: {driveSystem} four-wheel drive ({driveModes})",
  },
  frontWheelDrive: {
    "zh-TW": "驅動：{driveSystem} 前驅",
    en: "Drive: {driveSystem} front-wheel drive",
  },
  ladderFrame: {
    "zh-TW": "底盤：階梯式大樑 (Ladder Frame)",
    en: "Chassis: ladder frame",
  },
  wirelessTouchscreen: {
    "zh-TW": "座艙：{screenInches} 吋觸控螢幕，支援無線 {phonePlatformA} / {phonePlatformB}",
    en: "Cabin: {screenInches}-inch touchscreen with wireless {phonePlatformA} and {phonePlatformB}",
  },
  payload: {
    "zh-TW": "載重：{payloadKg} kg (同級最強)",
    en: "Payload: {payloadKg} kg",
  },
  threeSideCargoBed: {
    "zh-TW": "貨台：{cargoDimensionsMm} mm (三邊可開)",
    en: "Cargo bed (L × W × H): {cargoDimensionsMm} mm, with three opening sides",
  },
  warranty: {
    "zh-TW": "保固：{warrantyYears}年或{warrantyKm}公里原廠保固",
    en: "Manufacturer warranty: {warrantyYears} years or {warrantyKm} km; confirm the applicable terms",
  },
} as const;

const boosterjetHybridFacts = {
  engineLitres: 1.4,
  engineName: "BOOSTERJET",
  hybridVolts: 48,
  powerPs: 110.02,
  powerRpm: 4400,
  torqueKgm: 23.97,
  torqueRpmStart: 2000,
  torqueRpmEnd: 2500,
  assistance: ["ACC", "LKA", "DSBS II"],
  airbags: 6,
} as const;

const specifications: Record<CarId, {
  facts: SpecificationFacts;
  rows: (keyof typeof templates)[];
}> = {
  "e-vitara": {
    facts: {
      batteryKwh: 61,
      frontDrive: "2WD",
      allWheelDrive: "ALLGRIP-e",
      frontRangeKm: 516,
      allWheelRangeKm: 444,
      rangeStandard: "NEDC",
      acConnector: "Type 1",
      acStandard: "J1772",
      dcConnector: "CCS1",
      chargeMinutes: 45,
      chargeStartPercent: 10,
      chargeEndPercent: 80,
    },
    rows: ["electricPowertrain", "electricDrive", "electricRange", "chargingConnections", "fastCharging"],
  },
  swift: {
    facts: {
      engineLitres: 1.2,
      hybridVolts: 12,
      powerPs: 81,
      powerRpm: 5700,
      fuelEconomyKml: 24.5,
      dimensionsMm: [3860, 1735, 1480],
      bootLitres: 265,
      expandedBootLitres: 579,
      assistance: ["ACC", "LKA", "DSBS II"],
      airbags: 6,
    },
    rows: ["threeCylinderHybrid", "power", "officialFuelEconomy", "dimensions", "foldingBoot", "fullSpeedSafety"],
  },
  jimny: {
    facts: {
      engineLitres: 1.5,
      powerPs: 102,
      powerRpm: 6000,
      driveSystem: "4WD",
      driveModes: ["2H", "4H", "4L"],
      dimensionsMm: [3650, 1645, 1705],
      fuelEconomyKml: 14.5,
      assistance: ["ACC", "DSBS II", "LDP"],
      airbags: 6,
      screenInches: 9,
      phonePlatformA: "Apple CarPlay",
      phonePlatformB: "Android Auto",
    },
    rows: ["fourCylinderPetrol", "power", "partTimeDrive", "dimensions", "officialFuelEconomy", "ladderFrame", "safety", "wirelessTouchscreen"],
  },
  vitara: {
    facts: {
      ...boosterjetHybridFacts,
      driveSystem: "ALLGRIP",
      driveModes: ["Auto", "Sport", "Snow", "Lock"],
      fuelEconomyKml: 17.4,
      bootLitres: 375,
      expandedBootLitres: 710,
    },
    rows: ["directInjectionHybrid", "power", "torqueRange", "allWheelDrive", "officialFuelEconomy", "maximumBoot", "safety"],
  },
  "s-cross": {
    facts: {
      ...boosterjetHybridFacts,
      fuelEconomyKml: 19.1,
      bootLitres: 440,
      expandedBootLitres: 1230,
      driveSystem: "2WD",
      cameraDegrees: 360,
    },
    rows: ["turboHybrid", "power", "torqueRange", "officialFuelEconomy", "foldingBoot", "frontWheelDrive", "surroundCameraSafety"],
  },
  carry: {
    facts: {
      engineLitres: 1.5,
      powerPs: 96.6,
      powerRpm: 5600,
      torqueKgm: 13.8,
      torqueRpm: 4400,
      payloadKg: 915,
      cargoDimensionsMm: [2565, 1660, 290],
      fuelEconomyKml: 14.7,
      warrantyYears: 3,
      warrantyKm: 100000,
    },
    rows: ["fourCylinderPetrol", "power", "torque", "payload", "threeSideCargoBed", "fuelEconomy", "warranty"],
  },
};

const numberFormat = new Intl.NumberFormat("en-US", { maximumFractionDigits: 10 });
const chineseDigits = "零一二三四五六七八九";

function chineseWarrantyNumber(value: number): string {
  if (Number.isInteger(value) && value >= 0 && value < 10) return chineseDigits[value];
  if (value >= 10 && value < 100 && Number.isInteger(value)) {
    return `${value < 20 ? "" : chineseDigits[Math.floor(value / 10)]}十${value % 10 ? chineseDigits[value % 10] : ""}`;
  }
  if (value >= 10000 && value % 10000 === 0) return `${chineseWarrantyNumber(value / 10000)}萬`;
  return numberFormat.format(value);
}

function formatFact(key: string, value: SpecificationValue, locale: SpecificationLocale): string {
  if (typeof value === "number") {
    return locale === "zh-TW" && (key === "warrantyYears" || key === "warrantyKm")
      ? chineseWarrantyNumber(value)
      : numberFormat.format(value);
  }
  if (typeof value === "string") return value;
  const separator = key === "dimensionsMm" || key === "cargoDimensionsMm"
    ? locale === "zh-TW" ? " x " : " × "
    : key === "driveModes"
      ? locale === "zh-TW" ? "/" : " / "
      : locale === "zh-TW" ? " + " : ", ";
  return value.map((part) => typeof part === "number" ? numberFormat.format(part) : part).join(separator);
}

export type CarSpecificationMessage = {
  template: string;
  values: Record<string, string | number>;
};

// Other languages translate these stable English templates and interpolate the
// same values; a specification update does not invalidate their message keys.
export function getCarSpecificationMessages(id: CarId, locale: SpecificationLocale = "en"): CarSpecificationMessage[] {
  const { facts, rows } = specifications[id];
  return rows.map((row) => {
    const template = templates[row][locale];
    const values = Object.fromEntries([...template.matchAll(/\{(\w+)\}/g)].map(([, key]) => {
      if (!(key in facts)) throw new Error(`Missing specification fact: ${id}.${key}`);
      return [key, formatFact(key, facts[key], locale)];
    }));
    return { template, values };
  });
}

export function getCarSpecifications(id: CarId, locale: SpecificationLocale = "zh-TW"): string[] {
  return getCarSpecificationMessages(id, locale).map(({ template, values }) =>
    template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key])),
  );
}
