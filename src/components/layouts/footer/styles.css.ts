import { theme } from "../../../theme/theme.css";
import { styled } from "@syfxlin/reve";

export const container = styled.css`
  position: relative;
  max-width: ${theme.fontSize.calc(45)};
  margin: 0 auto;
  padding: ${theme.spacing.calc(5)} ${theme.spacing.calc(8)};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  a {
    text-decoration: underline;
  }

  p {
    margin: ${theme.spacing.calc(0.25)};
  }

  p,
  a,
  span {
    color: ${theme.color.text.x3};
    font-size: ${theme.fontSize.calc(0.875)};
  }
`;
