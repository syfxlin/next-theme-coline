import { styled } from "@syfxlin/reve";
import { theme } from "../../../theme/theme.css";
import { iconify } from "../../ui/iconify/query";

export const root = styled.css`
  transition: visibility 0.3s ease, color 0.3s, background-color 0.3s;
`;

export const background = styled.css`
  width: 100%;
  height: 100%;
  backdrop-filter: blur(3px);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9;
  transition: opacity 0.3s ease, color 0.3s, background-color 0.3s;

  &::after {
    content: "";
    background-color: rgb(0, 0, 0);
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0.25;
  }
`;

export const container = styled.css`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: ${theme.spacing.calc(20)};
  padding-bottom: ${theme.spacing.calc(10)};
  padding-left: ${theme.spacing.calc(4)};
  padding-right: ${theme.spacing.calc(4)};
  pointer-events: none;
  writing-mode: horizontal-tb;

  transition: opacity 0.3s ease, color 0.3s, background-color 0.3s;
  transform-origin: center center;
`;

export const header = styled.css`
  max-width: ${theme.breakpoint.xs};
  border-top-left-radius: ${theme.borderRadius.calc(1)};
  border-top-right-radius: ${theme.borderRadius.calc(1)};
  background-color: ${theme.color.background.full};
  border-bottom: ${theme.borderWidth.default} ${theme.borderStyle.default} ${theme.color.text.description};
  padding: ${theme.spacing.calc(4)};
  gap: ${theme.spacing.calc(2)};
  width: 100%;
  display: flex;
  pointer-events: auto;
`;

export const icon = styled.css`
  color: ${theme.color.text.primary};
  margin-right: ${theme.spacing.calc(0.5)};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const input = styled.css`
  outline: none;
  border: none;
  font-size: ${theme.fontSize.calc(1.1)};
  line-height: ${theme.lineHeight.default};
  width: 100%;
  background: transparent;
  color: ${theme.color.text.paragraph};

  &::placeholder {
    color: ${theme.color.text.description};
  }
`;

export const section = styled.css`
  border-bottom-left-radius: ${theme.borderRadius.calc(0.8)};
  border-bottom-right-radius: ${theme.borderRadius.calc(0.8)};
  background-color: ${theme.color.background.full};
  padding: ${theme.spacing.calc(1)} ${theme.spacing.calc(7)};
  max-width: ${theme.breakpoint.xs};
  width: 100%;
  overflow-y: auto;
  pointer-events: auto;
`;

export const icon_search = styled.css`
  ${iconify.css("ri:search-line")}
`;

export const icon_close = styled.css`
  ${iconify.css("ri:close-line")}
`;
