import { styled } from "@syfxlin/reve";
import { theme } from "../../../theme/theme.css";

export const section = styled.css`
  margin: ${theme.spacing.calc(4)} 0;
`;

export const avatar = styled.css`
  margin-left: 0 !important;
  margin-right: 0 !important;
  width: ${theme.size.calc(25)} !important;
  height: ${theme.size.calc(25)} !important;
  border-radius: ${theme.borderRadius.half} !important;
  filter: ${theme.color.image.filter} !important;
  transition: filter 0.3s !important;
`;

export const author = styled.css`
  font-size: ${theme.fontSize.calc(2.2)};
  line-height: ${theme.lineHeight.tight};
  letter-spacing: ${theme.letterSpacing.wider};
  font-weight: ${theme.fontWeight.bold};
  margin: ${theme.spacing.calc(2)} 0 0 0;
  color: ${theme.color.text.title};
`;

export const description = styled.css`
  font-size: ${theme.fontSize.calc(1)};
  line-height: ${theme.lineHeight.default};
  color: ${theme.color.text.description};
  margin: 0;
`;
