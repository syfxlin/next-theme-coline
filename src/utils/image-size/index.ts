import { JPG } from "./jpg";
import { PNG } from "./png";
import { WEBP } from "./webp";
import { GIF } from "./gif";

export const imageSize = (input: Uint8Array) => {
  for (const type of [JPG, PNG, WEBP, GIF]) {
    if (type.validate(input)) {
      return type.calculate(input);
    }
  }
  throw new TypeError("Invalid Image, unsupported format");
};
