"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getCar } from "@/data/site";
import { useConsultation } from "./ConsultationProvider";

export default function ConsultationPrefill() {
  const params = useSearchParams();
  const carId = params.get("car");
  const { beginConsultation } = useConsultation();
  useEffect(() => {
    const car = getCar(carId);
    if (car) beginConsultation(car.name);
    if (car || window.location.hash === "#contact") {
      const frame = requestAnimationFrame(() => {
        document.getElementById("contact-heading")?.focus({ preventScroll: true });
        document.getElementById("contact")?.scrollIntoView({ behavior: "instant", block: "start" });
      });
      return () => cancelAnimationFrame(frame);
    }
  }, [carId, beginConsultation]);
  return null;
}
