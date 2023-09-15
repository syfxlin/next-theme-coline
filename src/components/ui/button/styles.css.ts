import { theme } from "../../../theme/theme.css";
import { styled } from "@syfxlin/reve";

export const button = styled.css`
  appearance: none;
  text-decoration: none;
  outline: none;
  border: none;
  background-color: unset;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  vertical-align: middle;
  font: inherit;
  line-height: 1;
  font-size: ${theme.fontSize.default};
  padding: ${theme.spacing.calc(2)} ${theme.spacing.calc(2.5)};
  border-radius: ${theme.borderRadius.default};
  color: ${theme.color.primary.text};
  cursor: pointer;
  transition:
    color 0.3s,
    background-color 0.3s,
    box-shadow 0.3s;

  &:hover,
  &.active {
    background-color: ${theme.color.primary.hover};
  }

  &:focus,
  &:active {
    box-shadow: 0 0 0 ${theme.borderWidth.calc(2)} ${theme.color.primary.focus};
  }

  .i-icon {
    margin: 0 ${theme.spacing.calc(-0.5)};
    transform: scale(1.1);
  }
`;