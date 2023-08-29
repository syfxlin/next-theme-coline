// From: https://github.com/image-size/image-size/blob/main/lib/types/gif.ts
import type { IImage } from "./types";
import { readUInt16LE, toUTF8String } from "./utils";

const gifRegexp = /^GIF8[79]a/;

export const GIF: IImage = {
  validate(input) {
    return gifRegexp.test(toUTF8String(input, 0, 6));
  },
  calculate(input) {
    return {
      height: readUInt16LE(input, 8),
      width: readUInt16LE(input, 6),
    };
  },
};
