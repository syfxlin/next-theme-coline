import { theme } from "../../../theme/theme.css";
import { styled } from "@syfxlin/reve";

export const section = styled.css`
  margin: ${theme.spacing.calc(4)} 0;
`;

export const avatar = styled.css`
  margin-left: 0 !important;
  margin-right: 0 !important;
  width: ${theme.size.calc(25)};
  height: ${theme.size.calc(25)};
  border-radius: ${theme.borderRadius.half};
  filter: ${theme.color.image.filter};
  transition: filter 0.3s;
`;

export const author = styled.css`
  font-family: "Comic Sans MS", "Comic Sans", cursive !important;
  font-size: ${theme.fontSize.calc(2)};
  line-height: ${theme.lineHeight.default};
  font-weight: ${theme.fontWeight.default};
  margin: ${theme.spacing.calc(2)} 0 0 0;
`;

export const description = styled.css`
  font-size: ${theme.fontSize.calc(1)};
  line-height: ${theme.lineHeight.default};
  color: ${theme.color.text.x3};
  margin: 0;
`;