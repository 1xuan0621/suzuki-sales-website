"use client";

import { useState } from "react";
import type { Car } from "@/data/site";
import CarPhotoGallery from "./CarPhotoGallery";

export default function CarPageGallery({ car }: { car: Car }) {
  const [expanded, setExpanded] = useState(false);
  return <div className="overflow-hidden rounded-2xl border border-[#ddd] bg-white">
    <CarPhotoGallery car={car} photos={car.detail.galleryPhotos} expanded={expanded} onExpandedChange={setExpanded} />
  </div>;
}
