import type { OwnerExperience } from "@/data/owner-experiences";

export default function OwnerExperienceSection({ content }: { content: OwnerExperience }) {
  return <section id="owner-experience" aria-labelledby="owner-experience-heading" className="mt-8 scroll-mt-6 rounded-2xl border border-[#a9b79b] border-l-4 border-l-[#586d46] bg-[#e3eadb] p-6 sm:p-8">
    <p className="text-sm font-bold tracking-widest text-[#59644c]">公開車主心得摘要</p>
    <h2 id="owner-experience-heading" className="mt-2 text-xl font-bold leading-8 sm:text-2xl">{content.title}</h2>
    <p className="mt-2 text-xs leading-6 text-[#666]">{content.context}</p>
    <p className="mt-4 text-[15px] leading-8 text-[#4b4b4b]">{content.summary}</p>
    <p className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-xs leading-6 text-[#666]">
      <span>{content.source.author} · {content.source.name} · <time dateTime={content.source.publishedAt}>{content.source.publishedAt}</time></span>
      <a href={content.source.href} target="_blank" rel="noopener noreferrer" className="font-bold text-[#9b000b] underline underline-offset-4">閱讀車主原文 ↗</a>
    </p>
    <p className="mt-3 text-xs leading-6 text-[#666]">依公開購車自述整理，非本站客戶評分；未獨立查驗作者車籍。個人感受與維修個案不代表所有車輛，年式、配備與現行台灣販售版本可能不同。來源核對：<time dateTime={content.source.reviewedAt}>{content.source.reviewedAt}</time>。</p>
  </section>;
}
