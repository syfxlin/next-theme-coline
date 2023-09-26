import { styled } from "@syfxlin/reve";
import { theme } from "../../../theme/theme.css";

export const container = styled.css`
  margin: ${theme.spacing.calc(4)} 0;

  &.artalk {
    --at-color-main: ${theme.color.text.primary};
    --at-color-bg: ${theme.color.background.full};
    --at-color-font: ${theme.color.text.paragraph};
    --at-color-deep: ${theme.color.text.paragraph};
    --at-color-sub: ${theme.color.text.description};
    --at-color-grey: ${theme.color.text.description};
    --at-color-meta: ${theme.color.text.description};
  }
`;
