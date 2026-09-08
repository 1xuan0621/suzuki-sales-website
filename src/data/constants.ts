/**
 * 常數定義 — Suzuki 銷售網站共用值
 */

/** 品牌主色（鈴木紅） */
export const R = "#e60012";

/** Calculator input range; these bounds are not a financing offer. */
export const LOAN_RATE_MIN = 3;
export const LOAN_RATE_MAX = 8;

/**
 * 車款 CSS shape class 對照表
 * car.id → CSS class name (用於 car-shape 修飾)
 */
export const CAR_SHAPE_CLASS: Record<string, string> = {
  "swift": "swift",
  "vitara": "vitara",
  "jimny": "jimny",
  "e-vitara": "e-vitara",
  "s-cross": "s-cross",
  "carry": "carry",
};
