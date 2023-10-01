import { styled } from "@syfxlin/reve";
import { theme } from "../../../theme/theme.css";

export const link = styled.css`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.calc(1)};

  & + & {
    margin-left: ${theme.spacing.calc(1)};
  }

  .iconify {
    width: 1em;
    height: 1em;
  }
`;
