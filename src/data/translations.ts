import english from "./messages/en.json";
import japanese from "./messages/ja.json";
import korean from "./messages/ko.json";
import type { SiteLocale } from "./locales";

type Messages = Record<keyof typeof english, string>;
const messages: Record<"en" | "ja" | "ko", Messages> = { en: english, ja: japanese, ko: korean };

// Brand names, model names and Taiwan-market values are shared. Only display
// copy changes; placeholders keep variable data out of the translations.
export function translator(locale: SiteLocale) {
  const dictionary: Record<string, string> = messages[locale === "zh-TW" ? "en" : locale];
  return (text: string, values: Record<string, string | number> = {}) =>
    (dictionary[text] ?? text).replace(/\{(\w+)\}/g, (placeholder, key: string) => String(values[key] ?? placeholder));
}
