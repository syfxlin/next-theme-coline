import { breakpoints } from "../theme/tokens";
import { useMedia } from "react-use";

export const useResponsive = (size: keyof typeof breakpoints) => {
  return useMedia(`screen and (max-width: ${breakpoints[size]})`, false);
};
