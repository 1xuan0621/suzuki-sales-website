import CarCatalog from "@/components/CarCatalog";
import { carCatalogContent } from "@/data/car-catalog";
import { dealer } from "@/data/site";
import { pageMetadata } from "@/data/seo";

export const metadata = pageMetadata("/cars", `SUZUKI 全車款總覽與比較｜${dealer.fullName}`, carCatalogContent["zh-TW"].description);

export default function CarsPage() {
  return <CarCatalog />;
}
