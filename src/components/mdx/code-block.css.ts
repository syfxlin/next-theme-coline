import { styled } from "@syfxlin/reve";
import { theme } from "../../theme/theme.css";

export const container = styled.css`
  position: relative;

  &:hover::before {
    opacity: 0;
    transition: opacity 0.3s;
  }

  &::before {
    position: absolute;
    content: attr(data-language);
    color: hsl(230, 1%, 62%);
    opacity: 0.3;
    font-size: ${theme.fontSize.calc(1.5)};
    font-weight: ${theme.fontWeight.bold};
    top: 0.25em;
    right: 0.5em;
  }

  pre {
    background: ${theme.color.background.x2} !important;
    border-radius: 0 !important;
    font-size: ${theme.fontSize.calc(0.9)};
    font-weight: ${theme.fontWeight.default};
    line-height: ${theme.lineHeight.none};
    letter-spacing: ${theme.letterSpacing.default};
    overflow: auto;
    max-height: 80vh;
  }

  [data-theme="light"] & {
    code[class*="language-"],
    pre[class*="language-"] {
      color: hsl(230, 8%, 24%);
      font-family: "Fira Code", "Fira Mono", Menlo, Consolas, "DejaVu Sans Mono", monospace;
      direction: ltr;
      text-align: left;
      white-space: pre;
      word-spacing: normal;
      word-break: normal;
      line-height: 1.5;
      -moz-tab-size: 2;
      -o-tab-size: 2;
      tab-size: 2;
      -webkit-hyphens: none;
      -moz-hyphens: none;
      -ms-hyphens: none;
      hyphens: none;
    }

    /* Selection */

    code[class*="language-"]::-moz-selection,
    code[class*="language-"] *::-moz-selection,
    pre[class*="language-"] *::-moz-selection {
      background: hsl(230, 1%, 90%);
      color: inherit;
    }

    code[class*="language-"]::selection,
    code[class*="language-"] *::selection,
    pre[class*="language-"] *::selection {
      background: hsl(230, 1%, 90%);
      color: inherit;
    }

    /* Code blocks */

    pre[class*="language-"] {
      padding: 1em;
      margin: 0.5em 0;
      overflow: auto;
      border-radius: 0.3em;
    }

    /* Inline code */

    :not(pre) > code[class*="language-"] {
      padding: 0.2em 0.3em;
      border-radius: 0.3em;
      white-space: normal;
    }

    .token.comment,
    .token.prolog,
    .token.cdata {
      color: hsl(230, 4%, 64%);
    }

    .token.doctype,
    .token.punctuation,
    .token.entity {
      color: hsl(230, 8%, 24%);
    }

    .token.attr-name,
    .token.class-name,
    .token.boolean,
    .token.constant,
    .token.number,
    .token.atrule {
      color: hsl(35, 99%, 36%);
    }

    .token.keyword {
      color: hsl(301, 63%, 40%);
    }

    .token.property,
    .token.tag,
    .token.symbol,
    .token.deleted,
    .token.important {
      color: hsl(5, 74%, 59%);
    }

    .token.selector,
    .token.string,
    .token.char,
    .token.builtin,
    .token.inserted,
    .token.regex,
    .token.attr-value,
    .token.attr-value > .token.punctuation {
      color: hsl(119, 34%, 47%);
    }

    .token.variable,
    .token.operator,
    .token.function {
      color: hsl(221, 87%, 60%);
    }

    .token.url {
      color: hsl(198, 99%, 37%);
    }

    /* HTML overrides */

    .token.attr-value > .token.punctuation.attr-equals,
    .token.special-attr > .token.attr-value > .token.value.css {
      color: hsl(230, 8%, 24%);
    }

    /* CSS overrides */

    .language-css .token.selector {
      color: hsl(5, 74%, 59%);
    }

    .language-css .token.property {
      color: hsl(230, 8%, 24%);
    }

    .language-css .token.function,
    .language-css .token.url > .token.function {
      color: hsl(198, 99%, 37%);
    }

    .language-css .token.url > .token.string.url {
      color: hsl(119, 34%, 47%);
    }

    .language-css .token.important,
    .language-css .token.atrule .token.rule {
      color: hsl(301, 63%, 40%);
    }

    /* JS overrides */

    .language-javascript .token.operator {
      color: hsl(301, 63%, 40%);
    }

    .language-javascript .token.template-string > .token.interpolation > .token.interpolation-punctuation.punctuation {
      color: hsl(344, 84%, 43%);
    }

    /* JSON overrides */

    .language-json .token.operator {
      color: hsl(230, 8%, 24%);
    }

    .language-json .token.null.keyword {
      color: hsl(35, 99%, 36%);
    }

    /* MD overrides */

    .language-markdown .token.url,
    .language-markdown .token.url > .token.operator,
    .language-markdown .token.url-reference.url > .token.string {
      color: hsl(230, 8%, 24%);
    }

    .language-markdown .token.url > .token.content {
      color: hsl(221, 87%, 60%);
    }

    .language-markdown .token.url > .token.url,
    .language-markdown .token.url-reference.url {
      color: hsl(198, 99%, 37%);
    }

    .language-markdown .token.blockquote.punctuation,
    .language-markdown .token.hr.punctuation {
      color: hsl(230, 4%, 64%);
      font-style: italic;
    }

    .language-markdown .token.code-snippet {
      color: hsl(119, 34%, 47%);
    }

    .language-markdown .token.bold .token.content {
      color: hsl(35, 99%, 36%);
    }

    .language-markdown .token.italic .token.content {
      color: hsl(301, 63%, 40%);
    }

    .language-markdown .token.strike .token.content,
    .language-markdown .token.strike .token.punctuation,
    .language-markdown .token.list.punctuation,
    .language-markdown .token.title.important > .token.punctuation {
      color: hsl(5, 74%, 59%);
    }

    /* General */

    .token.bold {
      font-weight: bold;
    }

    .token.comment,
    .token.italic {
      font-style: italic;
    }

    .token.entity {
      cursor: help;
    }

    .token.namespace {
      opacity: 0.8;
    }

    /* Plugin overrides */

    .code-highlight {
      float: left;
      min-width: 100%;
    }

    .code-line {
      display: block;
      padding-left: 1em;
      padding-right: 1em;
      margin-left: -1em;
      margin-right: -1em;
      border-left: 0.25em solid rgba(0, 0, 0, 0);
    }

    .code-line.inserted {
      background-color: hsla(135, 73%, 55%, 0.25);
    }

    .code-line.deleted {
      background-color: hsla(353, 95%, 66%, 0.25);
    }

    .highlight-line {
      margin-left: -1em;
      margin-right: -1em;
      background-color: hsl(230, 1%, 90%);
      border-left: 0.25em solid hsl(221, 87%, 60%);
    }

    .line-number::before {
      display: inline-block;
      width: 1.5rem;
      text-align: right;
      padding-right: 0.5em;
      margin-right: 0.5em;
      margin-left: -0.5em;
      color: hsl(230, 1%, 62%);
      border-right: 1px solid hsl(230, 1%, 62%, 0.5);
      content: attr(line);
    }
  }

  [data-theme="dark"] & {
    code[class*="language-"],
    pre[class*="language-"] {
      color: hsl(220, 14%, 71%);
      text-shadow: 0 1px rgba(0, 0, 0, 0.3);
      font-family: "Fira Code", "Fira Mono", Menlo, Consolas, "DejaVu Sans Mono", monospace;
      direction: ltr;
      text-align: left;
      white-space: pre;
      word-spacing: normal;
      word-break: normal;
      line-height: 1.5;
      -moz-tab-size: 2;
      -o-tab-size: 2;
      tab-size: 2;
      -webkit-hyphens: none;
      -moz-hyphens: none;
      -ms-hyphens: none;
      hyphens: none;
    }

    /* Selection */

    code[class*="language-"]::-moz-selection,
    code[class*="language-"] *::-moz-selection,
    pre[class*="language-"] *::-moz-selection {
      background: hsl(220, 13%, 28%);
      color: inherit;
      text-shadow: none;
    }

    code[class*="language-"]::selection,
    code[class*="language-"] *::selection,
    pre[class*="language-"] *::selection {
      background: hsl(220, 13%, 28%);
      color: inherit;
      text-shadow: none;
    }

    /* Code blocks */

    pre[class*="language-"] {
      padding: 1em;
      margin: 0.5em 0;
      overflow: auto;
      border-radius: 0.3em;
    }

    /* Inline code */

    :not(pre) > code[class*="language-"] {
      padding: 0.2em 0.3em;
      border-radius: 0.3em;
      white-space: normal;
    }

    /* Print */
    @media print {
      code[class*="language-"],
      pre[class*="language-"] {
        text-shadow: none;
      }
    }

    .token.comment,
    .token.prolog,
    .token.cdata {
      color: hsl(220, 10%, 40%);
    }

    .token.doctype,
    .token.punctuation,
    .token.entity {
      color: hsl(220, 14%, 71%);
    }

    .token.attr-name,
    .token.class-name,
    .token.boolean,
    .token.constant,
    .token.number,
    .token.atrule {
      color: hsl(29, 54%, 61%);
    }

    .token.keyword {
      color: hsl(286, 60%, 67%);
    }

    .token.property,
    .token.tag,
    .token.symbol,
    .token.deleted,
    .token.important {
      color: hsl(355, 65%, 65%);
    }

    .token.selector,
    .token.string,
    .token.char,
    .token.builtin,
    .token.inserted,
    .token.regex,
    .token.attr-value,
    .token.attr-value > .token.punctuation {
      color: hsl(95, 38%, 62%);
    }

    .token.variable,
    .token.operator,
    .token.function {
      color: hsl(207, 82%, 66%);
    }

    .token.url {
      color: hsl(187, 47%, 55%);
    }

    /* HTML overrides */

    .token.attr-value > .token.punctuation.attr-equals,
    .token.special-attr > .token.attr-value > .token.value.css {
      color: hsl(220, 14%, 71%);
    }

    /* CSS overrides */

    .language-css .token.selector {
      color: hsl(355, 65%, 65%);
    }

    .language-css .token.property {
      color: hsl(220, 14%, 71%);
    }

    .language-css .token.function,
    .language-css .token.url > .token.function {
      color: hsl(187, 47%, 55%);
    }

    .language-css .token.url > .token.string.url {
      color: hsl(95, 38%, 62%);
    }

    .language-css .token.important,
    .language-css .token.atrule .token.rule {
      color: hsl(286, 60%, 67%);
    }

    /* JS overrides */

    .language-javascript .token.operator {
      color: hsl(286, 60%, 67%);
    }

    .language-javascript .token.template-string > .token.interpolation > .token.interpolation-punctuation.punctuation {
      color: hsl(5, 48%, 51%);
    }

    /* JSON overrides */

    .language-json .token.operator {
      color: hsl(220, 14%, 71%);
    }

    .language-json .token.null.keyword {
      color: hsl(29, 54%, 61%);
    }

    /* MD overrides */

    .language-markdown .token.url,
    .language-markdown .token.url > .token.operator,
    .language-markdown .token.url-reference.url > .token.string {
      color: hsl(220, 14%, 71%);
    }

    .language-markdown .token.url > .token.content {
      color: hsl(207, 82%, 66%);
    }

    .language-markdown .token.url > .token.url,
    .language-markdown .token.url-reference.url {
      color: hsl(187, 47%, 55%);
    }

    .language-markdown .token.blockquote.punctuation,
    .language-markdown .token.hr.punctuation {
      color: hsl(220, 10%, 40%);
      font-style: italic;
    }

    .language-markdown .token.code-snippet {
      color: hsl(95, 38%, 62%);
    }

    .language-markdown .token.bold .token.content {
      color: hsl(29, 54%, 61%);
    }

    .language-markdown .token.italic .token.content {
      color: hsl(286, 60%, 67%);
    }

    .language-markdown .token.strike .token.content,
    .language-markdown .token.strike .token.punctuation,
    .language-markdown .token.list.punctuation,
    .language-markdown .token.title.important > .token.punctuation {
      color: hsl(355, 65%, 65%);
    }

    /* General */

    .token.bold {
      font-weight: bold;
    }

    .token.comment,
    .token.italic {
      font-style: italic;
    }

    .token.entity {
      cursor: help;
    }

    .token.namespace {
      opacity: 0.8;
    }

    /* Plugin overrides */

    .code-highlight {
      float: left;
      min-width: 100%;
    }

    .code-line {
      display: block;
      padding-left: 1em;
      padding-right: 1em;
      margin-left: -1em;
      margin-right: -1em;
      border-left: 0.25em solid rgba(0, 0, 0, 0);
    }

    .code-line.inserted {
      background-color: hsla(135, 73%, 55%, 0.25);
    }

    .code-line.deleted {
      background-color: hsla(353, 95%, 66%, 0.25);
    }

    .highlight-line {
      margin-left: -1em;
      margin-right: -1em;
      background-color: hsl(220, 13%, 28%);
      border-left: 0.25em solid hsl(207, 82%, 66%);
    }

    .line-number::before {
      display: inline-block;
      width: 1.5rem;
      text-align: right;
      padding-right: 0.5em;
      margin-right: 0.5em;
      margin-left: -0.5em;
      color: hsl(220, 14%, 71%);
      border-right: 1px solid hsl(220, 14%, 71%, 0.5);
      content: attr(line);
    }
  }
`;
