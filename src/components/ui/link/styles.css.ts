import { styled } from "@syfxlin/reve";
import { theme } from "../../../theme/theme.css";

export const link = styled.css`
  text-decoration: none;
  color: ${theme.color.text.primary};
  transition: background-size 0.3s, color 0.3s, background-color 0.3s;
  background: linear-gradient(to right, transparent, transparent), linear-gradient(to right, ${theme.color.background.focus}, ${theme.color.background.focus});
  background-size: 100% 40%, 0 40%;
  background-repeat: no-repeat;
  background-position: 100% 100%, 0 100%;

  &.active,
  &:hover,
  &:focus,
  &:active {
    background-size: 0 40%, 100% 40%;
  }
`;
