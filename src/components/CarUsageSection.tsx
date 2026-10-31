import Image from "next/image";
import type { CarUsageContent, UsageTopic } from "@/data/car-usage";
import ReferenceDetails from "./ReferenceDetails";

function Topic({ topic }: { topic: UsageTopic }) {
  return <article>
    <h3 className="text-lg font-bold leading-8 text-[#252525]">{topic.title}</h3>
    <p className="mt-3 text-[15px] leading-8 text-[#4b4b4b]">{topic.answer}</p>
    <ul className="mt-4 space-y-4 text-[15px] leading-7 text-[#555]">
      {topic.checks.map((check) => <li key={check.label} className="border-l-2 border-[#d7ddd1] pl-4">
        <strong className="mb-1 block font-bold text-[#333]">{check.label}</strong>
        {check.text}
      </li>)}
    </ul>
  </article>;
}

export default function CarUsageSection({ content }: { content: CarUsageContent }) {
  const [firstTopic, ...otherTopics] = content.topics;
  return <section id="daily-use" aria-labelledby="daily-use-heading" className="mt-8 scroll-mt-6 rounded-2xl border border-[#e5e1dd] bg-white p-6 sm:p-8">
    <p className="text-sm font-bold tracking-widest text-[#b9000e]">{content.label}</p>
    <h2 id="daily-use-heading" className="mt-2 text-2xl font-bold leading-snug sm:text-3xl">{content.title}</h2>
    <p className="mt-4 max-w-3xl text-[15px] leading-8 text-[#555]">{content.introduction}</p>
    <div className="mt-7 grid items-start gap-7 lg:grid-cols-2 lg:gap-9">
      <div className="min-w-0 lg:col-start-2 lg:row-start-1"><Topic topic={firstTopic} /></div>
      <figure className="overflow-hidden rounded-xl border border-[#e6e8e1] bg-[#f5f6f2] lg:col-start-1 lg:row-start-1">
        <Image src={content.image.src} alt={content.image.alt} width={content.image.width} height={content.image.height} sizes="(min-width: 1024px) 470px, (min-width: 640px) 80vw, 85vw" className="h-auto w-full" />
        <figcaption className="border-t border-[#e0e3d9] px-4 py-3 text-xs leading-6 text-[#5c6456]">
          <span className="font-bold text-[#3d4935]">示意圖｜</span>{content.image.caption}
        </figcaption>
      </figure>
    </div>
    {otherTopics.length > 0 && <div className="mt-8 grid gap-8 border-t border-[#e9e6e0] pt-7 lg:grid-cols-2 lg:gap-9">
      {otherTopics.map((topic) => <Topic key={topic.title} topic={topic} />)}
    </div>}
    <ReferenceDetails className="mt-5">
      <ul className="flex flex-wrap gap-x-5 gap-y-1">
        {content.sources.map((source) => <li key={source.href}><a href={source.href} target="_blank" rel="noopener noreferrer" className="text-[#9b000b] underline underline-offset-4">{source.label}</a></li>)}
      </ul>
    </ReferenceDetails>
  </section>;
}
