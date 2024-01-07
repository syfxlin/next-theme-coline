import en from "./en";
import zhHans from "./zh-hans";
import zhHant from "./zh-hant";
import { COLINE_LANGUAGE } from "../env/public";

export const t = (key: keyof typeof en, ...params: any[]) => {
  const dictionaries = { en: en, zh_Hans: zhHans, zh_Hant: zhHant }[COLINE_LANGUAGE] ?? zhHans;
  // @ts-ignore
  return (dictionaries[key] ?? key).replace(/\{(\d+)}/g, (a, i) => params[parseInt(i)] ?? a);
};
