import { styled } from "@syfxlin/reve";
import { theme } from "../../../theme/theme.css";

export const container = styled.css`
  color: ${theme.color.error.text};
  background-color: ${theme.color.error.background};
  font-family: ${theme.fontFamily.mono};
  font-size: ${theme.fontSize.calc(0.86)};
  padding: ${theme.fontSize.calc(0.12)} ${theme.fontSize.calc(0.24)};
  border-radius: ${theme.borderRadius.calc(0.8)};
  word-break: break-all;
`;
