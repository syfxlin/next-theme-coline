import { styled } from "@syfxlin/reve";
import { theme } from "../../../theme/theme.css";

export const link = styled.css`
  display: flex !important;
  text-align: start !important;
  gap: ${theme.spacing.calc(4)} !important;
  padding: ${theme.spacing.calc(4)} !important;
  border-bottom: none !important;
`;

export const avatar = styled.css`
  overflow: hidden !important;
  width: ${theme.size.calc(15)} !important;
  height: ${theme.size.calc(15)} !important;
  flex-basis: ${theme.size.calc(15)} !important;
  border-radius: ${theme.borderRadius.half} !important;
`;

export const section = styled.css`
  flex: 1;
  display: block;
  overflow: hidden;
`;

export const name = styled.css`
  display: block;
  text-align: start;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  line-height: ${theme.lineHeight.default};
  font-size: ${theme.fontSize.calc(1)};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.color.text.paragraph};
`;

export const text = styled.css`
  display: block;
  text-align: start;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  line-height: ${theme.lineHeight.default};
  font-size: ${theme.fontSize.calc(0.8)};
  color: ${theme.color.text.paragraph};
`;
