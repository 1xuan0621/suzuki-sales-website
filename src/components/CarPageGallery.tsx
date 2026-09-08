"use client";

import { useState } from "react";
import type { Car } from "@/data/site";
import CarPhotoGallery from "./CarPhotoGallery";

export default function CarPageGallery({ car }: { car: Car }) {
  const [expanded, setExpanded] = useState(false);
  return <div className="overflow-hidden rounded-2xl border border-[#ddd] bg-white">
    <CarPhotoGallery car={car} expanded={expanded} onExpandedChange={setExpanded} />
    <p className="px-5 py-3 text-xs leading-6 text-[#666]">圖片來源：台灣 Suzuki 官方產品照片，非本站自行拍攝。車色及配備以實車為準。</p>
  </div>;
}
