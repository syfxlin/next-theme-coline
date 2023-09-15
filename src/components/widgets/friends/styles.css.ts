import { theme } from "../../../theme/theme.css";
import { styled } from "@syfxlin/reve";

export const container = styled.css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.calc(2)};
`;

export const link = styled.css`
  display: flex;
  text-align: left;
  gap: ${theme.spacing.calc(4)};
  padding: ${theme.spacing.calc(4)};
`;

export const avatar = styled.css`
  overflow: hidden;
  width: ${theme.size.calc(20)};
  height: ${theme.size.calc(20)};
  flex-basis: ${theme.size.calc(20)};
  border-radius: ${theme.borderRadius.half};
`;

export const section = styled.css`
  flex: 1;
  overflow: hidden;
`;

export const name = styled.css`
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  line-height: ${theme.lineHeight.default};
  font-size: ${theme.fontSize.calc(1.1)};
  color: ${theme.color.primary.text};
`;

export const text = styled.css`
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  line-height: ${theme.lineHeight.default};
  font-size: ${theme.fontSize.calc(0.9)};
  color: ${theme.color.text.x2};
`;
