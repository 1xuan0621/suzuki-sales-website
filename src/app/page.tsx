import HomePageClient from "@/components/HomePageClient";
import ServiceReviews from "@/components/ServiceReviews";
import { homeContent } from "@/data/content";
import { pageMetadata, homeSchema, serializeJsonLd } from "@/data/seo";

export const metadata = pageMetadata("/", homeContent.title, homeContent.description);
export default function HomePage() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(homeSchema) }} />
    <HomePageClient introduction={homeContent.introduction} buyingTopics={homeContent.buyingTopics} jimnyTopics={homeContent.jimnyTopics} jimnyPhoto={homeContent.jimnyPhoto} serviceReviews={<ServiceReviews />} />
  </>;
}
