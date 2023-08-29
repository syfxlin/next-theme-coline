import { styled } from "@syfxlin/reve";
import { theme } from "../../theme/theme.css";

export const pre = styled.css`
  position: relative;
  font-size: ${theme.fontSize.calc(0.9)} !important;
  padding: 0 !important;
  background: ${theme.color.background.x2} !important;
  margin-top: ${theme.spacing.calc(4)};
  margin-bottom: ${theme.spacing.calc(4)};

  &::before {
    color: ${theme.color.primary.text};
    opacity: 1;
    content: attr(data-language);
    font-size: ${theme.fontSize.calc(1)};
    padding: ${theme.fontSize.calc(0.3)} ${theme.fontSize.calc(0.9)};
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
    transition: opacity 0.3s;
  }

  &:hover::before {
    opacity: 0;
  }
`;

export const code = styled.css`
  max-height: 50em;
  overflow: auto;
  padding: ${theme.fontSize.calc(0.9)} 0 !important;
  margin: 0 !important;

  .linenumber {
    border-right: 1px solid ${theme.color.border.underline};
    padding-right: ${theme.spacing.calc(2)} !important;
    margin-right: ${theme.spacing.calc(2)};
    min-width: ${theme.fontSize.calc(2.7)} !important;
  }
`;
