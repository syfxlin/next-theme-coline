import { theme } from "./theme.css";
import { styled } from "@syfxlin/reve";

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
    scroll-behavior: smooth;
    word-break: break-word;
    transition:
      color 0.3s,
      background-color 0.3s;
    -moz-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    z-index: 0;
    display: flex;
    flex-direction: column;
    min-height: ${theme.size.vh};
  }

  .i-icon {
    vertical-align: middle;
    text-align: center;
    display: inline-flex;
    justify-content: center;
    align-items: center;
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

  /* slide-enter */
  @keyframes slide-enter {
    0% {
      transform: translateY(10px);
      opacity: 0;
    }

    to {
      transform: translateY(0);
      opacity: 100;
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    .slide-enter,
    .slide-enter-content > * {
      --enter-step: 0;
      --enter-delay: 90ms;
      animation: slide-enter 1s both 1;
      animation-delay: calc(var(--enter-step) * var(--enter-delay));
    }

    .slide-enter-content > *:nth-child(1) {
      --enter-step: 1 !important;
    }

    .slide-enter-content > *:nth-child(2) {
      --enter-step: 2 !important;
    }

    .slide-enter-content > *:nth-child(3) {
      --enter-step: 3 !important;
    }

    .slide-enter-content > *:nth-child(4) {
      --enter-step: 4 !important;
    }

    .slide-enter-content > *:nth-child(5) {
      --enter-step: 5 !important;
    }

    .slide-enter-content > *:nth-child(6) {
      --enter-step: 6 !important;
    }

    .slide-enter-content > *:nth-child(7) {
      --enter-step: 7 !important;
    }

    .slide-enter-content > *:nth-child(8) {
      --enter-step: 8 !important;
    }

    .slide-enter-content > *:nth-child(9) {
      --enter-step: 9 !important;
    }

    .slide-enter-content > *:nth-child(10) {
      --enter-step: 10 !important;
    }

    .slide-enter-content > *:nth-child(11) {
      --enter-step: 11 !important;
    }

    .slide-enter-content > *:nth-child(12) {
      --enter-step: 12 !important;
    }

    .slide-enter-content > *:nth-child(13) {
      --enter-step: 13 !important;
    }

    .slide-enter-content > *:nth-child(14) {
      --enter-step: 14 !important;
    }

    .slide-enter-content > *:nth-child(15) {
      --enter-step: 15 !important;
    }

    .slide-enter-content > *:nth-child(16) {
      --enter-step: 16 !important;
    }

    .slide-enter-content > *:nth-child(17) {
      --enter-step: 17 !important;
    }

    .slide-enter-content > *:nth-child(18) {
      --enter-step: 18 !important;
    }

    .slide-enter-content > *:nth-child(19) {
      --enter-step: 19 !important;
    }

    .slide-enter-content > *:nth-child(20) {
      --enter-step: 20 !important;
    }
  }
`;
