import Image from "next/image";
import Link from "next/link";
import ContactLinks from "@/components/ContactLinks";
import EnglishShell from "@/components/EnglishShell";
import { ArticleSection } from "@/components/ContentShell";
import { showroom } from "@/data/content";
import { englishRoutes } from "@/data/locales";
import { cars, dealer } from "@/data/site";
import { breadcrumbSchema, pageMetadata, serializeJsonLd } from "@/data/seo";

export const metadata = pageMetadata("/en/visit/beitou", englishRoutes.find((route) => route.path === "/en/visit/beitou")!.title, "Plan a SUZUKI showroom visit or test drive in Beitou, Taipei. Find the address, opening hours, parking information and how to confirm your appointment.");

export default function EnglishVisitPage() {
  return <EnglishShell label="Visit Beitou">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd({ "@context": "https://schema.org", ...breadcrumbSchema("/en/visit/beitou", "Visit Beitou") }) }} />
    <p className="mb-3 text-sm font-bold tracking-wide text-[#b9000e]">Visit Taipei · Confirm your appointment first</p>
    <h1 className="max-w-4xl text-4xl font-black leading-tight sm:text-5xl">See your next SUZUKI in Beitou</h1>
    <p className="mt-5 max-w-3xl text-[15px] leading-8 text-[#555]">The advisor is based at the Beitou showroom in Taipei. Customers across Taiwan can discuss their purchase remotely. Before travelling, confirm the model, display or test vehicle and appointment time with the advisor.</p>
    <div className="mt-6"><ContactLinks entry="visit" locale="en" /></div>
    <div className="grid gap-x-6 lg:grid-cols-2">
      <ArticleSection title="SUZUKI Beitou showroom">
        <p lang="zh-Hant" className="font-bold">{showroom.name}</p>
        <address className="not-italic">No. 337, Section 6, Chengde Road, Beitou District, Taipei City, Taiwan<span lang="zh-Hant" className="mt-1 block text-sm">{showroom.address}</span></address>
        <p><strong>Showroom phone:</strong> <a data-entry="visit" href={showroom.phoneHref} className="underline underline-offset-4">{showroom.phone}</a></p>
        <div><p className="font-bold">Published opening hours (Taiwan time)</p><p>Monday–Friday: 08:30–21:00</p><p>Saturday–Sunday: 09:00–21:00</p></div>
        <p>Opening hours do not mean the advisor is always on site. Confirm public holidays, temporary changes and your appointment time separately.</p>
        <a data-entry="visit" href={showroom.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-block rounded-xl bg-[#e60012] px-5 py-2 font-bold text-white no-underline">Open directions</a>
      </ArticleSection>
      <ArticleSection title="Contact your sales advisor">
        <p><strong>Advisor:</strong> <span lang="zh-Hant">{dealer.fullName}</span></p>
        <p><strong>Mobile:</strong> <a data-entry="visit" href={`tel:${dealer.phone.replace(/\D/g, "")}`} className="underline underline-offset-4">{dealer.phone}</a></p>
        <p><strong>LINE ID:</strong> {dealer.line}</p>
        <p>Share the model and your intended use so the advisor can help plan the visit. The showroom phone reaches the location; the mobile number reaches the advisor.</p>
        <p>Purchasing and delivery outside Taipei can be discussed individually. Confirm the delivery location, cost, schedule and available service area in advance.</p>
        <Link href="/en#contact" className="font-bold text-[#b9000e] underline underline-offset-4">Send a visit enquiry →</Link>
      </ArticleSection>
    </div>
    <ArticleSection title="Getting here and parking">
      <div className="grid items-start gap-6 lg:grid-cols-2">
        <figure className="overflow-hidden rounded-xl border border-[#e5e5e5] bg-[#f5f5f5]">
          <Image src="/images/beitou-exterior-entrance.jpg" alt="Front entrance of the SUZUKI Beitou showroom, with the street number 337 beside the entrance" width={1200} height={675} sizes="(min-width: 1180px) 500px, (min-width: 1024px) 45vw, 90vw" className="h-auto w-full" />
          <figcaption className="px-4 py-3 text-xs leading-6 text-[#666]">Look for the <span lang="zh-Hant">凱騰鈴木北投</span> sign on arrival.</figcaption>
        </figure>
        <div className="space-y-4">
          <p>Use the map for driving, public transport or walking directions from your starting point. Check traffic and the final walking route before setting off.</p>
          <p>The showroom provides free parking. Ask the staff where to park on arrival. If you need assistance getting in or out of the car, or other mobility support, tell the advisor when booking.</p>
          <p>If you are unfamiliar with the area, contact the advisor before travelling to confirm the approach to the showroom.</p>
        </div>
      </div>
    </ArticleSection>
    <ArticleSection title="How to arrange your visit">
      <ol className="list-decimal space-y-3 pl-5">
        <li>Share your preferred model, date and number of visitors. If you have not chosen a model, start with your driving needs.</li>
        <li>The advisor checks the display or test vehicle, time slot, route, test-drive eligibility and documents to bring.</li>
        <li>Wait for the advisor to confirm before travelling. A successful website form submission confirms receipt of your enquiry, not a booked test drive.</li>
        <li>At the showroom, try the seats and check luggage and parking requirements. Discuss versions and an itemised quotation after your visit or test drive.</li>
      </ol>
    </ArticleSection>
    <ArticleSection title="Explore the models before visiting">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{cars.map((car) => <Link key={car.id} href={`/en/cars/${car.id}`} className="rounded-xl border border-[#ddd] px-4 py-3 font-bold text-[#b9000e] no-underline hover:bg-red-50">SUZUKI {car.name} →</Link>)}</div>
      <Link href="/en/faq" className="inline-block text-[#b9000e] underline underline-offset-4">Questions about purchasing and delivery →</Link>
    </ArticleSection>
    <p className="mt-6 text-xs leading-7 text-[#666]">Location details last checked: <time dateTime={showroom.reviewedAt}>{showroom.reviewedAt}</time>. Source content updated: <time dateTime={showroom.updatedAt}>{showroom.updatedAt}</time>. <a href={showroom.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Official Taiwan Suzuki showroom information (Chinese)</a></p>
  </EnglishShell>;
}
