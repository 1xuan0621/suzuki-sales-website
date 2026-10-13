import Image from "next/image";
import { dealer } from "@/data/site";
import { serviceReviews } from "@/data/service-reviews";

export default function ServiceReviews() {
  return (
    <section
      id="service-reviews"
      aria-labelledby="service-reviews-heading"
      className="mx-auto mt-[34px] w-[calc(100%-88px)] border-t border-[#ddd] pt-[34px] max-sm:mt-5 max-sm:w-[calc(100%-28px)]"
    >
      <div className="mb-5">
        <p className="m-0 text-[15px] font-bold text-[#666]">購車服務回饋</p>
        <h2 id="service-reviews-heading" className="mb-0 mt-0.5 text-[28px] font-bold leading-tight max-sm:text-[23px]">
          找{dealer.name}購車，客人怎麼說
        </h2>
      </div>

      <div className="grid items-start gap-4 md:grid-cols-3">
        {serviceReviews.map((review) => (
          <article key={review.id} className="min-w-0 rounded-2xl border border-[#e7e7e7] bg-white p-5 shadow-[0_4px_14px_rgba(20,20,20,0.04)]">
            <blockquote className="m-0 line-clamp-2 min-h-14 text-[15px] leading-7 text-[#333]">
              <p>「{review.excerpt}」</p>
            </blockquote>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
              <p className="m-0 text-sm font-bold text-[#333]">{review.author}</p>
              <a
                href={review.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`查看 ${review.author} 的 Google 原評價（另開分頁）`}
                className="inline-flex min-h-10 items-center text-sm font-bold text-[#b9000e] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b9000e]"
              >
                Google 原評價 <span aria-hidden="true" className="ml-1">↗</span>
              </a>
            </div>

            <details className="mt-2 border-t border-[#eee] pt-1">
              <summary className="cursor-pointer py-2 text-sm text-[#666] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b9000e]">
                查看評論截圖
              </summary>
              <figure className="m-0 pb-1">
                <a
                  href={review.screenshot.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`放大 ${review.author} 的評論截圖（另開分頁）`}
                  className="relative mx-auto block aspect-[371/135] w-full max-w-[371px] overflow-hidden rounded-lg bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b9000e]"
                >
                  {/* Hide the 28px rating/time row inside a shared 135px frame: 28 / 135 = 20.740741%. */}
                  <Image
                    src={review.screenshot.src}
                    alt={`${review.author} 在 Google 留下的購車服務評論`}
                    width={review.screenshot.width}
                    height={review.screenshot.height}
                    unoptimized
                    className="absolute left-0 top-[-20.740741%] h-auto w-full"
                  />
                </a>
              </figure>
            </details>
          </article>
        ))}
      </div>
    </section>
  );
}
