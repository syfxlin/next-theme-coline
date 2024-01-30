import { styled } from "@syfxlin/reve";
import { theme } from "./theme.css";

styled.global`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    font-family: ${theme.fontFamily.sans};
    color: ${theme.color.text.paragraph};
    background-color: ${theme.color.background.full};
    font-size: ${theme.fontSize.default};
    font-weight: ${theme.fontWeight.default};
    line-height: ${theme.lineHeight.default};
    letter-spacing: ${theme.letterSpacing.wide};
    scroll-behavior: smooth !important;
    word-break: break-word;
    transition: color 0.3s, background-color 0.3s, transform 0.3s;
    -moz-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    z-index: 0;
    display: flex;
    flex-direction: column;
    min-height: ${theme.size.vh};
  }

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    border-radius: 3px;
    background: ${theme.color.scrollbar.track};
    box-shadow: inset 0 0 5px ${theme.color.scrollbar.track};
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: ${theme.color.scrollbar.thumb};
    box-shadow: inset 0 0 10px ${theme.color.scrollbar.thumb};
  }

  * {
    scrollbar-width: thin;
  }

  article,
  aside,
  footer,
  header,
  nav,
  section,
  figcaption,
  figure,
  main {
    display: block;
  }

  hr {
    box-sizing: content-box;
    height: 0;
    overflow: visible;
  }

  pre {
    font-family: monospace, monospace;
    font-size: 1em;
  }

  abbr[title] {
    border-bottom: none;
    text-decoration: underline;
  }

  b,
  strong {
    font-weight: bolder;
  }

  code,
  kbd,
  samp {
    font-family: monospace, monospace;
    font-size: 1em;
  }

  dfn {
    font-style: italic;
  }

  mark {
    background-color: #ff0;
    color: #000;
  }

  small {
    font-size: 80%;
  }

  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  sup {
    top: -0.5em;
  }

  sub {
    bottom: -0.25em;
  }

  audio,
  video {
    display: inline-block;

    &:not([controls]) {
      display: none;
      height: 0;
    }
  }

  img {
    border-style: none;
    vertical-align: middle;
  }

  svg:not(:root) {
    overflow: hidden;
  }

  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: sans-serif;
    font-size: 100%;
    line-height: 1.15;
    margin: 0;
  }

  button,
  input {
    overflow: visible;
  }

  button,
  select {
    text-transform: none;
  }

  button,
  [type="reset"],
  [type="submit"] {
    -webkit-appearance: button;
  }

  button::-moz-focus-inner,
  [type="button"]::-moz-focus-inner,
  [type="reset"]::-moz-focus-inner,
  [type="submit"]::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }

  button:-moz-focusring,
  [type="button"]:-moz-focusring,
  [type="reset"]:-moz-focusring,
  [type="submit"]:-moz-focusring {
    outline: 1px dotted ButtonText;
  }

  legend {
    box-sizing: border-box;
    color: inherit;
    display: table;
    max-width: 100%;
    padding: 0;
    white-space: normal;
  }

  progress {
    display: inline-block;
    vertical-align: baseline;
  }

  textarea {
    overflow: auto;
  }

  [type="checkbox"],
  [type="radio"] {
    box-sizing: border-box;
    padding: 0;
  }

  [type="number"]::-webkit-inner-spin-button,
  [type="number"]::-webkit-outer-spin-button {
    height: auto;
  }

  [type="search"] {
    appearance: textfield;
    outline-offset: -2px;
  }

  [type="search"]::-webkit-search-cancel-button,
  [type="search"]::-webkit-search-decoration {
    appearance: none;
  }

  details,
  menu {
    display: block;
  }

  summary {
    display: list-item;
  }

  canvas {
    display: inline-block;
  }

  template {
    display: none;
  }

  [hidden] {
    display: none;
  }

  // medium-zoom
  .medium-zoom-overlay,
  .medium-zoom-image--opened {
    z-index: 999;
    background: ${theme.color.background.full} !important;
  }

  // fade-in
  @keyframes fade-in {
    from {
      opacity: 0;
    }

    to {
      opacity: 100;
    }
  }
`;
