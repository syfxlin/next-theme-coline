import { styled } from "@syfxlin/reve";
import { theme } from "../../../theme/theme.css";

export const container = styled.css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${theme.spacing.calc(2)};

  ${theme.media.lg} {
    margin: 0;
  }

  > * {
    width: calc((100% - ${theme.spacing.calc(4)}) / 3);

    ${theme.media.lg} {
      width: calc((100% - ${theme.spacing.calc(2)}) / 2);
    }

    ${theme.media.sm} {
      width: 100%;
    }
  }
`;
