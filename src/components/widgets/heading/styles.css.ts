import { styled } from "@syfxlin/reve";
import { theme } from "../../../theme/theme.css";

export const container = styled.css`
  text-align: center;
  color: ${theme.color.text.paragraph};
  font-size: ${theme.fontSize.calc(1.2)};
  font-weight: ${theme.fontWeight.semibold};
  margin-top: ${theme.spacing.calc(10)};
  margin-bottom: ${theme.spacing.calc(3)};
`;
