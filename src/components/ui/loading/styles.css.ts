import { theme } from "../../../theme/theme.css";
import { styled } from "@syfxlin/reve";

export const container = styled.css`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.calc(2)};
`;

export const svg = styled.css`
  color: ${theme.color.primary.text};
  fill: ${theme.color.primary.text};
  width: ${theme.size.calc(8)};
  height: ${theme.size.calc(8)};
`;
