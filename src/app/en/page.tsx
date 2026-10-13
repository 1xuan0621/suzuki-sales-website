import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import EnglishShell from "@/components/EnglishShell";
import EnglishCarCards from "@/components/EnglishCarCards";
import EnglishConsultation from "@/components/EnglishConsultation";
import ConsultationPrefill from "@/components/ConsultationPrefill";
import ContactLinks from "@/components/ContactLinks";
import { homeCars, dealer } from "@/data/site";
import { carVersions } from "@/data/content";
import { englishCars, englishFaqs } from "@/data/english";
import { pageMetadata, serializeJsonLd } from "@/data/seo";
import { siteUrl } from "@/data/content";
import { englishRoutes } from "@/data/locales";

export const metadata = pageMetadata("/en", englishRoutes[0].title, "Explore Suzuki models and Taiwan prices. Contact advisor 張鈺漣 for buying advice, quotes and a confirmed showroom or test-drive appointment in Beitou, Taipei.");

export default function EnglishHomePage() {
  const models = homeCars.map((car) => ({ id: car.id, name: car.name, ...englishCars[car.id], priceTwd: Math.min(...carVersions(car.id).map((version) => version.priceTwd)) }));
  return <EnglishShell>
    <Suspense fallback={null}><ConsultationPrefill /></Suspense>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd({ "@context": "https://schema.org", "@type": "ItemList", name: "Suzuki models in Taiwan", itemListElement: homeCars.map((car, index) => ({ "@type": "ListItem", position: index + 1, name: `SUZUKI ${car.name}`, url: `${siteUrl}/en/cars/${car.id}` })) }) }} />
    <section data-entry="hero" className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#e60012] via-[#bd0010] to-[#93000d] px-6 py-9 text-white sm:p-10">
      <div className="flex flex-col-reverse items-start gap-7 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-white/85">SUZUKI · TAIPEI, TAIWAN</p>
          <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight sm:text-5xl">Find your Suzuki<br className="hidden sm:block" /> in Taiwan.</h1>
          <p className="mt-5 text-base font-bold">Your car advisor, <span lang="zh-TW">{dealer.fullName}</span></p>
          <p className="mt-3 max-w-xl text-sm leading-7 text-white/95">I&apos;m <span lang="zh-TW">{dealer.name}</span>, a car sales advisor since 2018. After several years at Mazda, I joined Suzuki in 2025.</p>
          <p className="mt-3 max-w-xl text-sm leading-7 text-white/95">Based in Taipei, I help customers across Taiwan choose their Suzuki. Beitou visits and test drives are by confirmed appointment; delivery arrangements are agreed individually.</p>
          <a href="#cars" className="mt-6 inline-flex min-h-12 items-center rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#b9000e] no-underline hover:bg-red-50">Explore the models ↓</a>
        </div>
        <Image src="/images/avatar.jpg" alt={dealer.fullName} width={180} height={180} priority className="h-28 w-28 shrink-0 rounded-full border-4 border-white/70 object-cover object-top shadow-xl sm:h-40 sm:w-40" />
      </div>
    </section>
    <section data-entry="hero" aria-label="Contact and appointments" className="mt-6 flex flex-col gap-5 rounded-2xl border border-[#ddd] bg-white p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h2 className="text-lg font-bold">Start with a conversation</h2>
        <p className="mt-1 text-sm leading-7 text-[#666]">Compare options, ask for a quote or arrange a visit.</p>
        <Link href="/en/visit/beitou" className="mt-2 inline-block py-1 text-sm font-bold text-[#b9000e] underline underline-offset-4">Beitou showroom & directions →</Link>
      </div>
      <ContactLinks locale="en" entry="hero" />
    </section>
    <section id="cars" className="mt-10 scroll-mt-6" aria-labelledby="models-heading">
      <p className="text-xs font-bold uppercase tracking-widest text-[#b9000e]">THE TAIWAN LINEUP</p>
      <h2 id="models-heading" className="mt-2 text-3xl font-black">Which Suzuki fits your day?</h2>
      <p className="mb-6 mt-3 text-sm leading-7 text-[#666]">Start with your daily journeys, passengers, parking and cargo needs.</p>
      <EnglishCarCards models={models} />
    </section>
    <section className="mt-10 rounded-2xl border border-[#e6d9d5] bg-[#fff8f4] p-6 sm:p-8" aria-labelledby="visit-heading">
      <p className="text-xs font-bold uppercase tracking-widest text-[#b9000e]">FROM SHORTLIST TO SHOWROOM</p>
      <h2 id="visit-heading" className="mt-2 text-2xl font-bold">Plan your visit to Beitou</h2>
      <ol className="mt-5 grid list-inside list-decimal gap-5 text-sm leading-7 text-[#555] sm:grid-cols-3">
        <li><strong className="text-[#333]">Share your plans.</strong><p>Tell me the models you are considering, your preferred date and who will come with you.</p></li>
        <li><strong className="text-[#333]">Wait for confirmation.</strong><p>We’ll confirm the available car, appointment time and any test-drive requirements.</p></li>
        <li><strong className="text-[#333]">Try what matters.</strong><p>Check seating, luggage space and everyday use, then discuss a detailed quote.</p></li>
      </ol>
      <Link href="/en/visit/beitou" className="mt-5 inline-block py-2 text-sm font-bold text-[#b9000e] underline underline-offset-4">Address, hours & visit information →</Link>
    </section>
    <EnglishConsultation />
    <section id="faq" aria-labelledby="questions-heading" className="mt-10 scroll-mt-6">
      <h2 id="questions-heading" className="text-2xl font-bold">Before you get in touch</h2>
      <div className="mt-5 space-y-3">{englishFaqs.slice(0, 3).map((faq) => <details key={faq.id} className="rounded-xl border border-[#ddd] bg-white p-5"><summary className="cursor-pointer font-bold leading-7">{faq.question}</summary><p className="mt-3 text-sm leading-7 text-[#555]">{faq.answer}</p></details>)}</div>
      <Link href="/en/faq" className="mt-5 inline-block py-2 text-sm font-bold text-[#b9000e] underline underline-offset-4">More buying & booking questions →</Link>
    </section>
  </EnglishShell>;
}
