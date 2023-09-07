import { styled } from "@syfxlin/reve";
import { theme } from "../../theme/theme.css";

export const container = styled.css`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    position: relative;
    font-weight: ${theme.fontWeight.default};
    border-bottom: ${theme.borderWidth.default} ${theme.borderStyle.dashed} ${theme.color.border.underline};
    margin-top: ${theme.spacing.calc(5)};
    margin-bottom: ${theme.spacing.calc(3)};
    padding-bottom: ${theme.spacing.calc(1)};

    &::before {
      content: "";
      position: absolute;
      left: 0;
      bottom: ${theme.borderWidth.calc(-1)};
      display: block;
      height: ${theme.borderWidth.calc(2.5)};
      width: ${theme.fontSize.calc(2)};
      background: linear-gradient(${theme.color.border.background} 30%, ${theme.color.border.background} 70%);
      box-shadow: ${theme.color.border.shadow} 0 ${theme.borderWidth.calc(3)} ${theme.borderWidth.calc(3)};
      border-radius: ${theme.borderWidth.calc(4)};
      transition: all 0.25s ease 0s;
      z-index: 1;
    }

    > a {
      opacity: 0;
      transition: opacity 0.3s !important;
      text-decoration: none !important;
      border: none !important;
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      transform: translateX(-100%) !important;
      padding-right: ${theme.borderWidth.calc(4)} !important;

      &::before {
        color: ${theme.color.text.x3};
        font-size: ${theme.fontSize.calc(0.5)};
        padding-left: ${theme.spacing.calc(1)};
        transition: opacity 0.3s;
      }
    }

    &:hover > a {
      opacity: 1;
    }
  }

  h1 {
    font-size: ${theme.fontSize.calc(1.8)};

    > a::before {
      content: "H1";
    }
  }

  h2 {
    font-size: ${theme.fontSize.calc(1.5)};

    > a::before {
      content: "H2";
    }
  }

  h3 {
    font-size: ${theme.fontSize.calc(1.3)};

    > a::before {
      content: "H3";
    }
  }

  h4 {
    font-size: ${theme.fontSize.calc(1.1)};

    > a::before {
      content: "H4";
    }
  }

  h5 {
    font-size: ${theme.fontSize.calc(0.9)};

    > a::before {
      content: "H5";
    }
  }

  h6 {
    font-size: ${theme.fontSize.calc(0.7)};

    > a::before {
      content: "H6";
    }
  }

  p {
    margin-top: ${theme.spacing.calc(4)};
    margin-bottom: ${theme.spacing.calc(4)};
  }

  figure,
  blockquote {
    border-left: ${theme.borderWidth.calc(3)} ${theme.borderStyle.default} ${theme.color.primary.text};
    margin-left: ${theme.fontSize.unit};
    padding-left: ${theme.fontSize.unit};
    padding-top: ${theme.spacing.calc(2)};
    padding-bottom: ${theme.spacing.calc(2)};
    box-sizing: border-box;

    > *:first-child,
    > *:last-child {
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  ul,
  ol {
    padding-inline-start: ${theme.fontSize.calc(2)};

    li {
      margin: ${theme.spacing.calc(2)} 0;
    }

    p:last-of-type {
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;
    caption-side: top;

    th,
    td {
      padding: ${theme.spacing.calc(2)} ${theme.spacing.calc(3)};
    }

    tr {
      border-top: ${theme.borderWidth.default} ${theme.borderStyle.default} ${theme.color.text.x3};
      border-bottom: ${theme.borderWidth.default} ${theme.borderStyle.default} ${theme.color.text.x3};
    }

    thead {
      background-color: ${theme.color.primary.hover};
    }
  }

  pre {
    border-radius: 0;
    background-color: ${theme.color.background.x2};
    font-size: ${theme.fontSize.calc(0.9)};
    font-weight: ${theme.fontWeight.default};
    line-height: ${theme.lineHeight.none};
    letter-spacing: ${theme.letterSpacing.default};
    overflow: auto;
    max-height: 80vh;
  }

  code {
    color: ${theme.color.code.text};
    background-color: ${theme.color.code.background};
    font-size: ${theme.fontSize.calc(0.86)};
    padding: ${theme.fontSize.calc(0.12)} ${theme.fontSize.calc(0.24)};
    border-radius: ${theme.borderRadius.calc(0.8)};
    word-break: break-all;
  }

  em {
    font-style: italic;
  }

  hr {
    width: 80%;
    border: 0;
    height: ${theme.borderWidth.calc(2)};
    background-image: linear-gradient(
      to right,
      ${theme.color.primary.hover},
      ${theme.color.primary.focus},
      ${theme.color.primary.hover}
    );
  }

  a {
    text-decoration: none;
    position: relative;
    color: ${theme.color.primary.text};
    border-bottom: ${theme.borderWidth.default} ${theme.borderStyle.default} ${theme.color.primary.focus};
    transition: border 0.3s;

    &:hover,
    &:focus,
    &:active {
      border-bottom-color: ${theme.color.primary.text};
    }
  }

  img {
    max-width: 100%;
  }
`;
