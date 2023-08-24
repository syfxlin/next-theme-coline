import { theme } from "../../../theme/theme.css";
import { styled } from "@syfxlin/reve";

export const container = styled.css`
  color: ${theme.color.primary.text};
  fill: ${theme.color.primary.text};
  width: ${theme.size.calc(8)};
  height: ${theme.size.calc(8)};
`;
