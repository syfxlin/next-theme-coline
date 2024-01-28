import { styled } from "@syfxlin/reve";
import { theme } from "../../../theme/theme.css";
import { iconify } from "../iconify/query";

export const container = styled.css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${theme.spacing.calc(1)};
  margin: ${theme.spacing.calc(4)} 0;
`;

export const gap = styled.css`
  gap: ${theme.spacing.calc(1)} !important;
`;

export const active = styled.css`
  background-color: ${theme.color.text.primary} !important;
  color: ${theme.color.background.full} !important;
`;

export const more = styled.css`
  padding-left: ${theme.spacing.calc(1)};
  padding-right: ${theme.spacing.calc(1)};
`;

export const two_container = styled.css`
  display: flex;
  margin: ${theme.spacing.calc(4)} 0;
  padding: 0;
  gap: ${theme.spacing.calc(2)};
`;

export const two_link = styled.css`
  gap: ${theme.spacing.calc(1)} !important;
  padding: ${theme.spacing.calc(4)} !important;
  font-size: ${theme.fontSize.calc(1.2)} !important;
  flex: 1 !important;
  text-align: center !important;
  justify-content: center !important;
`;

export const icon_left = styled.css`
  ${iconify.css("ri:arrow-left-s-line")}
`;

export const icon_right = styled.css`
  ${iconify.css("ri:arrow-right-s-line")}
`;
