import { styled } from "@syfxlin/reve";
import { theme } from "../../../theme/theme.css";

export const container = styled.css`
  flex: 1;
  position: relative;
  margin: 100px auto 0;
  width: 100%;
  padding: 0 ${theme.spacing.calc(8)};
  animation: fade-in 0.5s ease;
`;

export const sm = styled.css`
  max-width: ${theme.breakpoint.sm};

  ${theme.media.xl} {
    max-width: ${theme.breakpoint.sm};
  }

  ${theme.media.lg} {
    max-width: ${theme.breakpoint.sm};
  }

  ${theme.media.md} {
    max-width: ${theme.breakpoint.sm};
  }
`;

export const md = styled.css`
  max-width: ${theme.breakpoint.md};

  ${theme.media.xl} {
    max-width: ${theme.breakpoint.md};
  }

  ${theme.media.lg} {
    max-width: ${theme.breakpoint.sm};
  }

  ${theme.media.md} {
    max-width: ${theme.breakpoint.sm};
  }
`;

export const lg = styled.css`
  max-width: ${theme.breakpoint.lg};

  ${theme.media.xl} {
    max-width: ${theme.breakpoint.md};
  }

  ${theme.media.lg} {
    max-width: ${theme.breakpoint.sm};
  }

  ${theme.media.md} {
    max-width: ${theme.breakpoint.sm};
  }
`;
