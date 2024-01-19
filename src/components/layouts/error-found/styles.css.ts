import { styled } from "@syfxlin/reve";
import { theme } from "../../../theme/theme.css";

export const main = styled.css`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${theme.spacing.calc(4)};
`;

export const container = styled.css`
  font-size: ${theme.fontSize.calc(1.2)};
  display: flex;
`;

export const title = styled.css`
  padding: 0 ${theme.spacing.calc(4)};

  &:first-of-type {
    border-right: ${theme.borderWidth.calc(1)} ${theme.borderStyle.default} ${theme.color.text.description};
  }
`;

export const content = styled.css`
  font-size: ${theme.fontSize.calc(0.9)};
`;
