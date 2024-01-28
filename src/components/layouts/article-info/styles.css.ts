import { styled } from "@syfxlin/reve";
import { theme } from "../../../theme/theme.css";

export const article = styled.css`
  appearance: none;
  text-decoration: none;
  outline: none;
  border: none;
  background-color: unset;
  position: relative;
  display: flex;
  padding: ${theme.spacing.calc(4)} ${theme.spacing.calc(5)};
  margin: ${theme.spacing.calc(2)} ${theme.spacing.calc(-5)};
  border-radius: ${theme.borderRadius.calc(0.8)};
  color: ${theme.color.text.primary};
  transition: color 0.3s, background-color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: ${theme.color.background.hover};
  }

  &:focus,
  &:active {
    box-shadow: 0 0 0 ${theme.borderWidth.calc(2)} ${theme.color.background.focus};
  }
`;

export const section = styled.css`
  flex: 1;
`;

export const title = styled.css`
  margin: 0;
  font-weight: ${theme.fontWeight.default};
  font-size: ${theme.fontSize.calc(1.25)};
  color: ${theme.color.text.title};
  text-decoration: none;
`;

export const excerpt = styled.css`
  margin: ${theme.spacing.calc(1)} 0;
  font-weight: ${theme.fontWeight.default};
  font-size: ${theme.fontSize.calc(0.9)};
  color: ${theme.color.text.paragraph};
`;

export const thumbnail = styled.css`
  flex-basis: 30% !important;
  margin-left: ${theme.spacing.calc(4)} !important;
`;

export const link = styled.css`
  position: absolute !important;
  top: 0 !important;
  bottom: 0 !important;
  left: 0 !important;
  right: 0 !important;
  background: none !important;
`;
