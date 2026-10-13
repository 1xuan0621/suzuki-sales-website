import { notFound } from "next/navigation";
import { foreignLocales, type ForeignLocale } from "@/data/locales";

export function requireForeignLocale(value: string): ForeignLocale {
  if (!foreignLocales.some((locale) => locale === value)) notFound();
  return value as ForeignLocale;
}
