import { styled } from "@syfxlin/reve";
import { theme } from "../../../theme/theme.css";

export const container = styled.css`
  text-align: center;
  padding: ${theme.spacing.calc(6)} 0 0;
  margin-bottom: ${theme.spacing.calc(8)};
`;

export const title = styled.css`
  color: ${theme.color.text.title};
  font-size: ${theme.fontSize.calc(1.8)};
  font-weight: ${theme.fontWeight.default};
  line-height: ${theme.lineHeight.default};
  margin: 0;
`;

export const description = styled.css`
  color: ${theme.color.text.description};
  font-size: ${theme.fontSize.calc(0.8)};
  font-weight: ${theme.fontWeight.default};
  line-height: ${theme.lineHeight.default};
  margin: 0;
`;
