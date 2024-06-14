import { COLINE_LANGUAGE } from "../env/public";
import en from "./en";
import zhHans from "./zh-hans";
import zhHant from "./zh-hant";

export function t(key: keyof typeof en, ...params: any[]) {
  const dictionaries = { "en": en, "zh-Hans": zhHans, "zh-Hant": zhHant }[COLINE_LANGUAGE] ?? zhHans;
  return (dictionaries[key] ?? key).replace(/\{(\d+)\}/g, (a, i) => params[Number.parseInt(i)] ?? a);
}
