import { theme } from "../../../theme/theme.css";
import { styled } from "@syfxlin/reve";

export const link = styled.css`
  text-decoration: none;
  position: relative;
  color: ${theme.color.primary.text};
  border-bottom: ${theme.borderWidth.calc(1)} ${theme.borderStyle.default} ${theme.color.primary.focus};
  transition: border 0.3s;

  &.active,
  &:hover,
  &:focus,
  &:active {
    border-bottom-color: ${theme.color.primary.text};
  }
`;
