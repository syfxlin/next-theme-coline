import { styled } from "@syfxlin/reve";
import { theme } from "../../../theme/theme.css";

export const container = styled.css`
  font-size: ${theme.fontSize.calc(0.8)};
  font-weight: ${theme.fontWeight.default};
  line-height: ${theme.lineHeight.default};
  color: ${theme.color.text.description};
  margin: 0;
  position: relative;
`;

export const link = styled.css`
  position: relative !important;
  z-index: 1 !important;
`;
