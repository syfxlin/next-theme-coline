import { createReveTheme } from "@syfxlin/reve";
import {
  blueA,
  blueDarkA,
  grayA,
  grayDarkA,
  greenA,
  greenDarkA,
  redA,
  redDarkA,
  slate,
  slateA,
  slateDark,
  slateDarkA,
  violetA,
  violetDarkA,
  yellowA,
  yellowDarkA,
} from "@radix-ui/colors";
import { breakpoints } from "./tokens";

function values<V extends Record<string, string> = Record<string, string>>(def: string | number, values: V) {
  const calc = (value?: string | number | undefined | null) => {
    const val = value ?? def;
    if (values[val] !== undefined && values[val] !== null) {
      return values[val];
    }
    if (values.unit !== undefined && values.unit !== null) {
      let idx = 0;
      while (
        values.unit.charCodeAt(idx) >= 46 &&
        values.unit.charCodeAt(idx) <= 57 &&
        values.unit.charCodeAt(idx) !== 47
      ) {
        idx++;
      }
      const s = typeof val === "number" ? val : Number.parseFloat(val);
      const v = Number.parseFloat(values.unit.substring(0, idx));
      const u = values.unit.substring(idx);
      return s * v + u;
    }
    throw new Error(`Unknown computed value: ${value}, allow values: ${values}`);
  };
  return Object.assign(values, { calc });
}

export const theme = createReveTheme({
  static: {
    // breakpoint
    breakpoint: {
      xs: `${breakpoints.xs}`,
      sm: `${breakpoints.sm}`,
      md: `${breakpoints.md}`,
      lg: `${breakpoints.lg}`,
      xl: `${breakpoints.xl}`,
    },
    // media query
    media: {
      xs: `@media screen and (max-width: ${breakpoints.xs})`,
      sm: `@media screen and (max-width: ${breakpoints.sm})`,
      md: `@media screen and (max-width: ${breakpoints.md})`,
      lg: `@media screen and (max-width: ${breakpoints.lg})`,
      xl: `@media screen and (max-width: ${breakpoints.xl})`,
    },
    // font family
    fontFamily: {
      sans: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
      mono: `"Fira Code", "Fira Mono", Menlo, Consolas, "DejaVu Sans Mono", monospace`,
      serif: `Georgia, Cambria, "Times New Roman", Times, serif`,
    },
    // font size
    fontSize: values("default", {
      unit: "1rem",
      default: "1rem",
    }),
    // font weight
    fontWeight: values("default", {
      unit: "100",
      hairline: "100",
      thin: "200",
      light: "300",
      default: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800",
      black: "900",
    }),
    // letter spacing
    letterSpacing: values("default", {
      unit: "0.025rem",
      tighter: "-0.05em",
      tight: "-0.025em",
      default: "0em",
      wide: "0.025em",
      wider: "0.05em",
      widest: "0.1em",
    }),
    // line height
    lineHeight: values("default", {
      unit: "1.5",
      none: "1",
      tight: "1.25",
      snug: "1.375",
      default: "1.5",
      relaxed: "1.625",
      loose: "2",
    }),
    // shadow
    shadow: values("default", {
      default: "0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)",
      x1: "0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)",
      x2: "0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 10px 15px -5px, rgba(0, 0, 0, 0.04) 0px 7px 7px -5px",
      x3: "0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px",
      x4: "0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 28px 23px -7px, rgba(0, 0, 0, 0.04) 0px 12px 12px -7px",
      x5: "0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 36px 28px -7px, rgba(0, 0, 0, 0.04) 0px 17px 17px -7px",
    }),
    // size
    size: values("default", {
      unit: "0.25rem",
      default: "0.25rem",
      full: "100%",
      min: "min-content",
      max: "max-content",
      vw: "100vw",
      vh: "100vh",
    }),
    // spacing
    spacing: values("default", {
      unit: "0.25rem",
      default: "0.25rem",
    }),
    // border style
    borderStyle: values("solid", {
      default: "solid",
      none: "none",
      hidden: "hidden",
      dotted: "dotted",
      dashed: "dashed",
      solid: "solid",
      double: "double",
      groove: "groove",
      ridge: "ridge",
      inset: "inset",
      outset: "outset",
    }),
    // border width
    borderWidth: values("default", {
      unit: "1px",
      default: "1px",
    }),
    // border radius
    borderRadius: values("default", {
      unit: "0.25rem",
      default: "0.25rem",
      none: "0px",
      half: "50%",
      full: "9999px",
    }),
  },
  dynamic: {
    [`:root, [data-theme="light"]`]: {
      color: {
        text: {
          primary: violetA.violetA9,
          title: slateA.slateA12,
          paragraph: slateA.slateA11,
          description: slateA.slateA10,
        },
        background: {
          full: slate.slate1,
          card: slateA.slateA2,
          hover: violetA.violetA2,
          focus: violetA.violetA5,
        },
        image: {
          filter: "none",
        },
        scrollbar: {
          track: grayA.grayA3,
          thumb: grayA.grayA6,
        },
        info: {
          text: blueA.blueA9,
          background: blueA.blueA3,
        },
        warn: {
          text: yellowA.yellowA11,
          background: yellowA.yellowA3,
        },
        success: {
          text: greenA.greenA9,
          background: greenA.greenA3,
        },
        error: {
          text: redA.redA9,
          background: redA.redA3,
        },
      },
    },
    [`[data-theme="dark"]`]: {
      color: {
        text: {
          primary: violetDarkA.violetA9,
          title: slateDarkA.slateA12,
          paragraph: slateDarkA.slateA11,
          description: slateDarkA.slateA10,
        },
        background: {
          full: slateDark.slate1,
          card: slateDarkA.slateA3,
          hover: violetDarkA.violetA2,
          focus: violetDarkA.violetA5,
        },
        image: {
          filter: "brightness(0.7)",
        },
        scrollbar: {
          track: grayDarkA.grayA3,
          thumb: grayDarkA.grayA6,
        },
        info: {
          text: blueDarkA.blueA9,
          background: blueDarkA.blueA3,
        },
        warn: {
          text: yellowDarkA.yellowA11,
          background: yellowDarkA.yellowA3,
        },
        success: {
          text: greenDarkA.greenA9,
          background: greenDarkA.greenA3,
        },
        error: {
          text: redDarkA.redA9,
          background: redDarkA.redA3,
        },
      },
    },
  },
});
