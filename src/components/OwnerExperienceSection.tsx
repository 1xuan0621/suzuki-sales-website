import type { OwnerExperience } from "@/data/owner-experiences";
import ReferenceDetails from "./ReferenceDetails";

export default function OwnerExperienceSection({ content }: { content: OwnerExperience }) {
  return <section id="owner-experience" aria-labelledby="owner-experience-heading" className="mt-8 scroll-mt-6 rounded-2xl border border-[#a9b79b] border-l-4 border-l-[#586d46] bg-[#e3eadb] p-6 sm:p-8">
    <p className="text-sm font-bold tracking-widest text-[#59644c]">公開車主心得摘要</p>
    <h2 id="owner-experience-heading" className="mt-2 text-xl font-bold leading-8 sm:text-2xl">{content.title}</h2>
    <p className="mt-2 text-xs leading-6 text-[#666]">{content.context}</p>
    <p className="mt-4 text-[15px] leading-8 text-[#4b4b4b]">{content.summary}</p>
    <ReferenceDetails label="車主原文" className="mt-5">
      <p>{content.source.author} · {content.source.name} · <time dateTime={content.source.publishedAt}>{content.source.publishedAt}</time></p>
      <a href={content.source.href} target="_blank" rel="noopener noreferrer" className="font-bold text-[#9b000b] underline underline-offset-4">閱讀車主原文 ↗</a>
    </ReferenceDetails>
  </section>;
}
