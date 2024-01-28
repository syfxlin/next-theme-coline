import { styled } from "@syfxlin/reve";
import { theme } from "../../../theme/theme.css";

export const heading = styled.css`
  position: relative;
  color: ${theme.color.text.title};
  font-size: ${theme.fontSize.calc(1.3)};
  font-weight: ${theme.fontWeight.default};
  border-bottom: ${theme.borderWidth.default} ${theme.borderStyle.dashed} ${theme.color.background.focus};
  margin-top: ${theme.spacing.calc(5)};
  margin-bottom: ${theme.spacing.calc(3)};
  padding-bottom: ${theme.spacing.calc(1)};

  &::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: ${theme.borderWidth.calc(-1)};
    display: block;
    height: ${theme.borderWidth.calc(2.5)};
    width: ${theme.fontSize.calc(2)};
    background: linear-gradient(${theme.color.text.primary} 30%, ${theme.color.text.primary} 70%);
    box-shadow: ${theme.color.text.primary} 0 ${theme.borderWidth.calc(1)} ${theme.borderWidth.calc(3)};
    border-radius: ${theme.borderWidth.calc(4)};
    transition: all 0.25s ease 0s;
    z-index: 1;
  }
`;
