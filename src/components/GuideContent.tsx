import type { Guide, GuideCalculation, GuidePoint } from "@/data/guides";

export function GuideChecklist({ points }: { points: GuidePoint[] }) {
  return <ul className="divide-y divide-[#e8e2dd] rounded-xl border border-[#e8e2dd] bg-white px-4 sm:px-5">
    {points.map((point) => <li key={point.label} className="flex gap-3 py-4">
      <span aria-hidden="true" className="mt-2 size-2 shrink-0 rounded-full bg-[#b9000e]" />
      <div className="min-w-0"><h3 className="text-base font-bold leading-7 text-[#252525]">{point.label}</h3><p className="mt-1 text-[15px] leading-7 text-[#555]">{point.text}</p></div>
    </li>)}
  </ul>;
}

export function GuideOptions({ options }: { options: NonNullable<Guide["sections"][number]["options"]> }) {
  return <div className={`grid gap-4 ${options.length === 3 ? "md:grid-cols-3" : "sm:grid-cols-2"}`}>
    {options.map((option) => <section key={option.title} className="min-w-0 rounded-xl border border-[#ded6d0] bg-white p-5">
      <h3 className="text-base font-bold text-[#333]">{option.title}</h3>
      <p className="mb-4 mt-2 text-xl font-bold leading-8 text-[#b9000e]">{option.answer}</p>
      <dl className="space-y-4 border-t border-[#eee7e2] pt-4 text-sm leading-7">
        {option.facts.map((fact) => <div key={fact.label}><dt className="font-bold text-[#333]">{fact.label}</dt><dd className="mt-1 text-[#555]">{fact.text}</dd></div>)}
      </dl>
    </section>)}
  </div>;
}

const operations = {
  add: { symbol: "+", label: "加上" },
  subtract: { symbol: "−", label: "減去" },
  divide: { symbol: "÷", label: "除以" },
};

export function GuideWorkedExample({ example }: { example: GuideCalculation }) {
  return <figure className="rounded-2xl border border-[#d4ddd7] bg-[#f0f5f1] p-4 sm:p-6">
    <figcaption>
      <span className="text-xs font-bold tracking-wider text-[#536759]">假設範例 · 非實際報價</span>
      <h3 className="mt-2 text-lg font-bold leading-7 text-[#253c2e]">{example.title}</h3>
      <p className="mt-2 text-sm leading-7 text-[#4e5e53]">{example.context}</p>
    </figcaption>
    {example.assumptions && <dl className="mt-4 grid grid-cols-2 gap-3 text-sm leading-6">
      {example.assumptions.map((item) => <div key={item.label} className="rounded-lg bg-white/70 px-3 py-2"><dt className="text-[#536759]">{item.label}</dt><dd className="mt-1 font-bold text-[#253c2e]">{item.text}</dd></div>)}
    </dl>}
    <ol className="mt-5 space-y-5">
      {example.steps.map((step, index) => <li key={step.title} className="rounded-xl border border-[#d4ddd7] bg-white p-4 sm:p-5">
        <h4 className="mb-4 flex items-start gap-2 text-base font-bold leading-7 text-[#253c2e]"><span className="shrink-0">{index + 1}.</span>{step.title}</h4>
        {step.description && <p className="mb-4 text-sm leading-7 text-[#536759]">{step.description}</p>}
        <dl className="space-y-3">
          {step.rows.map((row) => <div key={row.label} className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-3 text-sm leading-6 sm:text-base">
            <dt className="flex gap-2 text-[#555]"><span aria-hidden="true" className="w-4 shrink-0 text-base text-[#65766a]">{row.operation && operations[row.operation].symbol}</span><span>{row.operation && <span className="sr-only">{operations[row.operation].label}</span>}{row.label}</span></dt>
            <dd className="whitespace-nowrap font-bold tabular-nums text-[#333]">{row.value}</dd>
          </div>)}
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-3 border-t-2 border-[#aebfb3] pt-3">
            <dt className="flex gap-2 text-sm font-bold leading-6 text-[#345a42]"><span aria-hidden="true" className="w-4 shrink-0">=</span><span><span className="sr-only">等於</span>{step.result.label}</span></dt>
            <dd className="whitespace-nowrap text-xl font-black tabular-nums text-[#345a42] sm:text-2xl">{step.result.value}</dd>
          </div>
        </dl>
        {step.explanation && <p className="mt-3 text-sm leading-7 text-[#536759]">{step.explanation}</p>}
      </li>)}
    </ol>
    {example.notice && <div className="mt-5 border-l-4 border-[#94754b] pl-4">
      <p className="text-sm font-bold leading-7 text-[#55442e]">{example.notice.title}</p>
      <p className="mt-1 text-sm leading-7 text-[#554b3e]">{example.notice.text}</p>
    </div>}
  </figure>;
}
