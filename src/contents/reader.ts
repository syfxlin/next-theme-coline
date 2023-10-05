import config from "../keystatic.config";
import { makeReader as makePro } from "./make-reader.pro";
import { makeReader as makeDev } from "./make-reader.dev";

export const reader = process.env.NODE_ENV === "production" ? makePro(config) : makeDev(config);
