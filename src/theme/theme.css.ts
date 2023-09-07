import { createReveTheme } from "@syfxlin/reve";
import { breakpoints, colors } from "./tokens";
import { rgba } from "polished";

const values = <V extends Record<string, string> = Record<string, string>>(def: string | number, values: V) => {
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
      const s = typeof val === "number" ? val : parseFloat(val);
      const v = parseFloat(values.unit.substring(0, idx));
      const u = values.unit.substring(idx);
      return s * v + u;
    }
    throw new Error(`Unknown computed value: ${value}, allow values: ${values}`);
  };
  return Object.assign(values, { calc });
};

export const theme = createReveTheme({
  static: {
    // breakpoint
    breakpoint: {
      xs: `${breakpoints.xs}px`,
      sm: `${breakpoints.sm}px`,
      md: `${breakpoints.md}px`,
      lg: `${breakpoints.lg}px`,
      xl: `${breakpoints.xl}px`,
    },
    // media query
    media: {
      xs: `screen and (max-width: ${breakpoints.xs}px)`,
      sm: `screen and (max-width: ${breakpoints.sm}px)`,
      md: `screen and (max-width: ${breakpoints.md}px)`,
      lg: `screen and (max-width: ${breakpoints.lg}px)`,
      xl: `screen and (max-width: ${breakpoints.xl}px)`,
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
        primary: {
          text: colors.violet7,
          hover: rgba(colors.violet1, 0.3),
          focus: colors.violet1,
        },
        text: {
          x1: colors.gray9,
          x2: colors.gray7,
          x3: colors.gray6,
        },
        background: {
          x1: colors.white,
          x2: rgba(colors.gray3, 0.3),
        },
        code: {
          text: colors.red7,
          background: rgba(colors.red1, 0.3),
        },
        image: {
          filter: "none",
        },
        border: {
          underline: rgba(colors.black, 0.1),
          background: colors.violet7,
          shadow: rgba(colors.violet7, 0.4),
        },
        scrollbar: {
          track: rgba(colors.black, 0.1),
          thumb: rgba(colors.black, 0.2),
        },
        info: {
          text: colors.blue6,
          background: rgba(colors.blue2, 0.3),
        },
        warn: {
          text: colors.yellow6,
          background: rgba(colors.yellow2, 0.3),
        },
        success: {
          text: colors.green6,
          background: rgba(colors.green2, 0.3),
        },
        error: {
          text: colors.red6,
          background: rgba(colors.red2, 0.3),
        },
      },
    },
    [`[data-theme="dark"]`]: {
      color: {
        primary: {
          text: colors.violet3,
          hover: rgba(colors.violet9, 0.3),
          focus: colors.violet9,
        },
        text: {
          x1: colors.dark0,
          x2: colors.dark2,
          x3: colors.gray6,
        },
        background: {
          x1: colors.dark7,
          x2: rgba(colors.dark4, 0.3),
        },
        code: {
          text: colors.red3,
          background: rgba(colors.red5, 0.3),
        },
        image: {
          filter: "brightness(0.7)",
        },
        border: {
          underline: rgba(colors.black, 0.1),
          background: colors.violet3,
          shadow: rgba(colors.violet3, 0.4),
        },
        scrollbar: {
          track: rgba(colors.white, 0.1),
          thumb: rgba(colors.white, 0.2),
        },
        info: {
          text: colors.blue6,
          background: rgba(colors.blue4, 0.3),
        },
        warn: {
          text: colors.yellow6,
          background: rgba(colors.yellow4, 0.3),
        },
        success: {
          text: colors.green6,
          background: rgba(colors.green4, 0.3),
        },
        error: {
          text: colors.red6,
          background: rgba(colors.red4, 0.3),
        },
      },
    },
  },
});
