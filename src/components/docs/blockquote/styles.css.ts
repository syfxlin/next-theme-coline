import { styled } from "@syfxlin/reve";
import { theme } from "../../../theme/theme.css";

export const container = styled.css`
  border-left: ${theme.borderWidth.calc(3)} ${theme.borderStyle.default} ${theme.color.text.primary};
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
`;
