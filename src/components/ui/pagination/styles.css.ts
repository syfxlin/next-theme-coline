import { theme } from "../../../theme/theme.css";
import { styled } from "@syfxlin/reve";

export const container = styled.css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${theme.spacing.calc(1)};
  margin: ${theme.spacing.calc(4)} 0;
`;

export const gap = styled.css`
  gap: ${theme.spacing.calc(1)};
`;

export const active = styled.css`
  background-color: ${theme.color.primary.text} !important;
  color: ${theme.color.background.x1} !important;
`;

export const more = styled.css`
  padding-left: ${theme.spacing.calc(1)};
  padding-right: ${theme.spacing.calc(1)};
`;

export const cursor_container = styled.css`
  display: flex;
  padding: ${theme.spacing.calc(4)} 0;
  gap: ${theme.spacing.calc(2)};
`;

export const cursor_link = styled.css`
  gap: ${theme.spacing.calc(1)};
  padding: ${theme.spacing.calc(4)};
  font-size: ${theme.fontSize.calc(1.2)};
  flex: 1;
  text-align: center;
  justify-content: center;
`;