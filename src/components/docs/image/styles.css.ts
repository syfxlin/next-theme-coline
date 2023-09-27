import { styled } from "@syfxlin/reve";
import { theme } from "../../../theme/theme.css";

export const container = styled.css`
  margin: ${theme.spacing.calc(4)} 0;
`;

export const caption = styled.css`
  text-align: center;
  font-size: ${theme.fontSize.calc(0.9)};
  margin-top: ${theme.spacing.calc(2)};
`;
