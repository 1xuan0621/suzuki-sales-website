import { contentSources, type ContentSourceId } from "@/data/content-sources";

export default function SourceLinks({ ids }: { ids: ContentSourceId[] }) {
  if (!ids.length) return null;
  return <ul aria-label="參考資料" className="flex flex-wrap gap-x-5 gap-y-2 text-xs leading-6 text-[#666]">
    {ids.map((id) => <li key={id}><a href={contentSources[id].url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-[#b9000e]">{contentSources[id].title}</a></li>)}
  </ul>;
}
