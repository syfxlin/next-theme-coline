import { styled } from "@syfxlin/reve";
import { theme } from "../../../theme/theme.css";

export const container = styled.css`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.calc(6)};
`;

export const svg = styled.css`
  color: ${theme.color.text.primary};
  fill: ${theme.color.text.primary};
  width: ${theme.size.calc(8)};
  height: ${theme.size.calc(8)};
`;
