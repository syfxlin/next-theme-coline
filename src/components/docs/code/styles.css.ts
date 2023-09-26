import { styled } from "@syfxlin/reve";
import { theme } from "../../../theme/theme.css";

export const container = styled.css`
  position: relative;
  font-size: ${theme.fontSize.calc(0.9)} !important;
  font-weight: ${theme.fontWeight.default};
  line-height: ${theme.lineHeight.none};
  letter-spacing: ${theme.letterSpacing.default};
  padding: 0 !important;
  background: ${theme.color.background.card} !important;
  margin-top: ${theme.spacing.calc(4)};
  margin-bottom: ${theme.spacing.calc(4)};

  &::before {
    color: ${theme.color.text.primary};
    opacity: 1;
    content: attr(data-language);
    font-size: ${theme.fontSize.calc(1)};
    padding: ${theme.fontSize.calc(0.9)} ${theme.fontSize.calc(0.9)};
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
    transition: opacity 0.3s;
  }

  &:hover::before {
    opacity: 0;
  }

  .shiki {
    background: unset !important;
    max-height: 50em;
    overflow: auto;
    margin: 0;
    padding: ${theme.fontSize.calc(1)} ${theme.fontSize.calc(1.2)};
    font-family: ${theme.fontFamily.mono};
    line-height: ${theme.lineHeight.default};

    code {
      color: unset;
      background-color: unset;
      font-size: unset;
      padding: unset;
      border-radius: unset;
      word-break: unset;
      font-family: inherit;
    }
  }

  [data-theme="light"] & {
    .shiki.vitesse-dark {
      display: none;
    }
  }

  [data-theme="dark"] & {
    .shiki.vitesse-light {
      display: none;
    }
  }
`;
