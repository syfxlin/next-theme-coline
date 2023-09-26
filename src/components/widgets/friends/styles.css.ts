import { theme } from "../../../theme/theme.css";
import { styled } from "@syfxlin/reve";

export const link = styled.css`
  display: flex;
  text-align: left;
  gap: ${theme.spacing.calc(4)};
  padding: ${theme.spacing.calc(4)};
  border-bottom: none;
`;

export const avatar = styled.css`
  overflow: hidden;
  width: ${theme.size.calc(15)};
  height: ${theme.size.calc(15)};
  flex-basis: ${theme.size.calc(15)};
  border-radius: ${theme.borderRadius.half};
`;

export const section = styled.css`
  flex: 1;
  display: block;
  overflow: hidden;
`;

export const name = styled.css`
  display: block;
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
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  line-height: ${theme.lineHeight.default};
  font-size: ${theme.fontSize.calc(0.8)};
  color: ${theme.color.text.paragraph};
`;
