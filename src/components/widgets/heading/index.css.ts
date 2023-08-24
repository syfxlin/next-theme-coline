import { styled } from "@syfxlin/reve";
import { theme } from "../../../theme/theme.css";

export const container = styled.css`
  font-size: ${theme.fontSize.calc(1.5)};
  font-weight: ${theme.fontWeight.default};
  border-bottom: ${theme.borderWidth.default} ${theme.borderStyle.dashed} ${theme.color.border.underline};
  margin-top: ${theme.spacing.calc(5)};
  margin-bottom: ${theme.spacing.calc(3)};
  padding-bottom: ${theme.spacing.calc(1)};
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: -1px;
    display: block;
    width: ${theme.fontSize.calc(2)};
    height: ${theme.borderWidth.calc(2.5)};
    background: linear-gradient(${theme.color.border.background} 30%, ${theme.color.border.background} 70%);
    box-shadow: ${theme.color.border.shadow} 0 ${theme.borderWidth.calc(3)} ${theme.borderWidth.calc(3)};
    border-radius: ${theme.borderWidth.calc(4)};
    transition: all 0.25s ease 0s;
    z-index: 1;
  }
`;
