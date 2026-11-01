"use client";

import { useState, useMemo } from "react";
import { cars } from "@/data/site";
import { LOAN_RATE_MIN, LOAN_RATE_MAX } from "@/data/constants";

const rangeClassName = `block h-11 w-full cursor-pointer appearance-none rounded-full
  [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:border-0 [&::-webkit-slider-runnable-track]:bg-transparent
  [&::-webkit-slider-thumb]:-mt-2 [&::-webkit-slider-thumb]:box-border [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-[#e60012] [&::-webkit-slider-thumb]:shadow-sm
  [&::-moz-range-track]:h-2 [&::-moz-range-track]:border-0 [&::-moz-range-track]:bg-transparent [&::-moz-range-progress]:bg-transparent
  [&::-moz-range-thumb]:box-border [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-[#e60012] [&::-moz-range-thumb]:shadow-sm`;

function parsePrice(priceStr: string): number {
  const cleaned = priceStr.replace(/[^0-9.]/g, "");
  const n = parseFloat(cleaned);
  if (priceStr.includes("萬")) return n * 10000;
  return n;
}

export default function LoanCalculator() {
  const [selectedCarId, setSelectedCarId] = useState("");
  const [price, setPrice] = useState("800000");
  const [downPayment, setDownPayment] = useState(160000);
  const [months, setMonths] = useState(60);
  const [rateInput, setRateInput] = useState(String(LOAN_RATE_MIN));
  const rate = Math.min(LOAN_RATE_MAX, Math.max(LOAN_RATE_MIN, Number(rateInput) || LOAN_RATE_MIN));
  const [loanRatio, setLoanRatio] = useState(80); // 貸款成數 %

  const numericPrice = Number(price);
  const principal = Number.isFinite(numericPrice) ? Math.max(0, Math.floor(numericPrice)) : 0;
  // 兩種計算模式：有設定成數時優先，否則用頭期款
  const effectiveLoanAmount = loanRatio > 0
    ? Math.round(principal * loanRatio / 100)
    : Math.max(0, principal - downPayment);
  const loanAmount = effectiveLoanAmount;
  const effectiveDownPayment = loanRatio > 0 ? principal - effectiveLoanAmount : downPayment;

  const monthlyPayment = useMemo(() => {
    if (loanAmount <= 0 || months <= 0) return 0;
    const r = rate / 100 / 12;
    if (r === 0) return loanAmount / months;
    return loanAmount * (r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
  }, [loanAmount, months, rate]);

  const doCarSelect = (carId: string) => {
    setSelectedCarId(carId);
    if (!carId) return;
    const car = cars.find((c) => c.id === carId);
    if (car) {
      const p = parsePrice(car.price);
      setPrice(String(p));
      setDownPayment(Math.round(p * (100 - loanRatio) / 100));
    }
  };

  const handleCarSelect = (carId: string) => doCarSelect(carId);

  return (
    <section className="w-[calc(100%-88px)] mx-auto mt-[34px] pt-[34px] border-t border-[#ddd] max-sm:w-[calc(100%-28px)] max-sm:mt-5">
      <div className="flex items-end justify-between gap-5 mb-5 max-sm:flex-col max-sm:items-start">
        <div>
          <p className="m-0 text-[#666] text-[15px] font-bold">貸款試算</p>
          <h2 className="mt-0.5 mb-0 text-[28px] leading-tight max-sm:text-[23px]">每月繳多少？頭期款與總支出一起算</h2>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_300px] gap-6 max-lg:grid-cols-1">
        {/* Calculator Form */}
        <div className="p-6 bg-white border border-[#e7e7e7] rounded-[18px] shadow-[0_12px_30px_rgba(20,20,20,0.08)]">
          <div className="grid gap-5">
            {/* Select Car */}
            <div>
              <label htmlFor="loan-car" className="block text-[14px] font-extrabold text-[#555] mb-1.5">
                選擇車款（自動帶入價格）
              </label>
              <select
                id="loan-car"
                value={selectedCarId}
                onChange={(e) => handleCarSelect(e.target.value)}
                className="w-full h-11 px-4 border border-[#d9d9d9] rounded-lg bg-white text-[#555] font-inherit outline-none focus:border-[#e60012] focus:ring-2 focus:ring-[rgba(230,0,18,0.18)] transition-all text-[14px]"
              >
                <option value="">手動輸入車價</option>
                {cars.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} — {c.price}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Input */}
            <div>
              <label htmlFor="loan-price" className="block text-[14px] font-extrabold text-[#555] mb-1.5">
                車價（元）
              </label>
              <input
                id="loan-price"
                type="number"
                min={0}
                value={price}
                onKeyDown={(e) => { if (e.key === "-") e.preventDefault(); }}
                onChange={(e) => {
                  const value = e.target.value;
                  const amount = Number(value);
                  setPrice(Number.isFinite(amount) && amount >= 0 ? value : "0");
                }}
                className="w-full h-11 px-4 border border-[#d9d9d9] rounded-lg bg-white text-[#555] font-inherit outline-none focus:border-[#e60012] focus:ring-2 focus:ring-[rgba(230,0,18,0.18)] transition-all text-[14px]"
                placeholder="例如 800000"
              />
            </div>

            {/* 貸款成數 Slider */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="loan-ratio" className="text-[14px] font-extrabold text-[#555]">貸款成數</label>
                <span className="text-[14px] font-extrabold text-[#e60012]">
                  {loanRatio}%（頭期 {100 - loanRatio}%）
                </span>
              </div>
              <input
                id="loan-ratio"
                type="range"
                min={50}
                max={90}
                step={5}
                value={loanRatio}
                onChange={(e) => {
                  setLoanRatio(Number(e.target.value));
                  setDownPayment(Math.round(principal * (100 - Number(e.target.value)) / 100));
                }}
                className={rangeClassName}
                style={{
                  backgroundImage: `linear-gradient(to right, #e60012 ${((loanRatio - 50) / 40) * 100}%, #e0e0e0 ${((loanRatio - 50) / 40) * 100}%)`,
                  backgroundSize: "100% 8px",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              />
              <div className="flex justify-between text-[12px] text-[#666] mt-1">
                <span>50%</span>
                <span>90%</span>
              </div>
            </div>

            {/* Payment Period */}
            <div>
              <p id="loan-months-label" className="block text-[14px] font-extrabold text-[#555] mb-1.5">
                期數
              </p>
              <div role="group" aria-labelledby="loan-months-label" className="flex flex-wrap gap-2">
                {[12, 24, 36, 48, 60, 72, 84].map((n) => (
                  <button
                    key={n}
                    type="button"
                    aria-pressed={months === n}
                    onClick={() => setMonths(n)}
                    className={`px-4 min-h-11 rounded-lg font-extrabold text-[14px] cursor-pointer border-2 transition-all ${
                      months === n
                        ? "bg-[#e60012] text-white border-[#e60012]"
                        : "bg-white text-[#555] border-[#d9d9d9] hover:border-[#e60012] hover:text-[#e60012]"
                    }`}
                  >
                    {n} 期
                  </button>
                ))}
              </div>
            </div>

            {/* Interest Rate Slider */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="loan-rate" className="text-[14px] font-extrabold text-[#555]">年利率</label>
                <div className="flex items-center gap-1 text-[14px] font-extrabold text-[#e60012]">
                  <input
                    id="loan-rate"
                    aria-label="年利率（百分比）"
                    type="number"
                    min={LOAN_RATE_MIN}
                    max={LOAN_RATE_MAX}
                    step={0.01}
                    value={rateInput}
                    onChange={(e) => setRateInput(e.target.value)}
                    onBlur={() => setRateInput(String(rate))}
                    aria-describedby="loan-rate-hint"
                    className="w-20 h-11 px-2 border border-[#d9d9d9] rounded-lg text-right"
                  />
                  <span>%</span>
                </div>
              </div>
              <input
                aria-label="調整年利率"
                aria-describedby="loan-rate-hint"
                type="range"
                min={LOAN_RATE_MIN}
                max={LOAN_RATE_MAX}
                step={0.01}
                value={rate}
                onChange={(e) => setRateInput(e.target.value)}
                className={rangeClassName}
                style={{
                  backgroundImage: `linear-gradient(to right, #e60012 ${((rate - LOAN_RATE_MIN) / (LOAN_RATE_MAX - LOAN_RATE_MIN)) * 100}%, #e0e0e0 ${((rate - LOAN_RATE_MIN) / (LOAN_RATE_MAX - LOAN_RATE_MIN)) * 100}%)`,
                  backgroundSize: "100% 8px",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              />
              <div className="flex justify-between text-[12px] text-[#666] mt-1">
                <span>{LOAN_RATE_MIN}%</span>
                <span>{LOAN_RATE_MAX}%</span>
              </div>
              <p id="loan-rate-hint" className="mt-2 text-xs leading-relaxed text-[#666]">可試算年利率 {LOAN_RATE_MIN}%–{LOAN_RATE_MAX}%。</p>
            </div>
          </div>
        </div>

        {/* Result Card */}
        <div className="p-6 bg-white border border-[#e7e7e7] rounded-[18px] shadow-[0_12px_30px_rgba(20,20,20,0.08)] flex flex-col justify-center items-center text-center">
          <p className="m-0 text-[14px] font-extrabold text-[#555] mb-2">每月應付金額</p>
          <p className="m-0 text-[42px] font-extrabold text-[#e60012] leading-none">
            {monthlyPayment > 0 ? Math.round(monthlyPayment).toLocaleString() : "—"}
          </p>
          <p className="m-0 text-[14px] text-[#666] mt-1">元 / 月</p>

          <div className="w-full mt-5 pt-4 border-t border-[#eee] space-y-2 text-left">
            <div className="flex justify-between text-[14px]">
              <span className="text-[#666]">貸款成數</span>
              <span className="font-extrabold text-[#555]">{loanRatio}%</span>
            </div>
            <div className="flex justify-between text-[14px]">
              <span className="text-[#666]">頭期款</span>
              <span className="font-extrabold text-[#555]">{effectiveDownPayment.toLocaleString()} 元</span>
            </div>
            <div className="flex justify-between text-[14px]">
              <span className="text-[#666]">貸款總額</span>
              <span className="font-extrabold text-[#555]">{loanAmount.toLocaleString()} 元</span>
            </div>
            <div className="flex justify-between text-[14px]">
              <span className="text-[#666]">期數</span>
              <span className="font-extrabold text-[#555]">{months} 期（{Math.round(months / 12 * 10) / 10} 年）</span>
            </div>
            <div className="flex justify-between text-[14px]">
              <span className="text-[#666]">年利率</span>
              <span className="font-extrabold text-[#555]">{rate}%</span>
            </div>

            <div className="flex justify-between text-[14px]">
              <span className="text-[#666]">總繳金額</span>
              <span className="font-extrabold text-[#555]">
                {monthlyPayment > 0 ? Math.round(monthlyPayment * months + effectiveDownPayment).toLocaleString() : "—"} 元
              </span>
            </div>
          </div>

          <p className="mt-5 text-left text-xs leading-6 text-[#666]">本息平均攤還，未含手續費；實際利率與條件依核貸結果。</p>
        </div>
      </div>
    </section>
  );
}
