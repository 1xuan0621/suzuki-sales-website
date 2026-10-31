import { contentSources, type ContentSourceId } from "@/data/content-sources";

export default function SourceLinks({ ids }: { ids: ContentSourceId[] }) {
  if (!ids.length) return null;
  return <ul aria-label="參考資料" className="space-y-2 text-sm leading-7 text-[#666]">
    {ids.map((id) => <li key={id}><a href={contentSources[id].url} target="_blank" rel="noopener noreferrer" className="break-words underline underline-offset-4 hover:text-[#b9000e]">{contentSources[id].title}</a></li>)}
  </ul>;
}
