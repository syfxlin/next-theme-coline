import { styled } from "@syfxlin/reve";
import { theme } from "../../../theme/theme.css";

export const container = styled.css`
  margin: ${theme.spacing.calc(4)} 0;

  &.artalk {
    --at-color-main: ${theme.color.primary.text};
    --at-color-bg: ${theme.color.background.x1};
    --at-color-font: ${theme.color.text.x2};
    --at-color-deep: ${theme.color.text.x2};
    --at-color-sub: ${theme.color.text.x3};
    --at-color-grey: ${theme.color.text.x3};
    --at-color-meta: ${theme.color.text.x3};
  }
`;
