import { styled } from "@syfxlin/reve";
import { theme } from "../../../theme/theme.css";

export const link = styled.css`
  text-decoration: none;
  position: relative;
  color: ${theme.color.text.primary};
  border-bottom: ${theme.borderWidth.calc(1)} ${theme.borderStyle.default} ${theme.color.background.focus};
  transition: border 0.3s;

  &.active,
  &:hover,
  &:focus,
  &:active {
    border-bottom-color: ${theme.color.text.primary};
  }
`;
