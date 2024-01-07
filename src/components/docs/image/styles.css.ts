import { styled } from "@syfxlin/reve";
import { theme } from "../../../theme/theme.css";

export const container = styled.css`
  margin: ${theme.spacing.calc(4)} 0;
`;

export const image = styled.css`
  border-radius: ${theme.borderRadius.calc(1)};
`;

export const caption = styled.css`
  text-align: center;
  font-size: ${theme.fontSize.calc(0.8)};
  margin-top: ${theme.spacing.calc(1)};
`;
