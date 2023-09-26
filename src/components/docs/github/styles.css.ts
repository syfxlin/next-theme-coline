import { cx, styled } from "@syfxlin/reve";
import { theme } from "../../../theme/theme.css";

export const container = styled.css`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  padding: ${theme.spacing.calc(5)} ${theme.spacing.calc(6)};
  background: ${theme.color.background.card};
  margin-top: ${theme.spacing.calc(4)};
  margin-bottom: ${theme.spacing.calc(4)};
  font-size: ${theme.fontSize.calc(1)};
  gap: ${theme.spacing.calc(2)};

  &:after {
    position: absolute;
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 fill%3D%22hsl(230%2C%201%25%2C%2062%25)%22 viewBox%3D%220 0 24 24%22%3E%3Cpath d%3D%22M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z%22%2F%3E%3C%2Fsvg%3E");
    background-position: center;
    background-repeat: no-repeat;
    content: "";
    height: 150px;
    width: 150px;
    right: -30px;
    top: -35px;
    opacity: 0.1;
  }

  a {
    border-bottom: none !important;
  }
`;

export const section = styled.css`
  display: flex;
  align-items: center;
  color: ${theme.color.text.description};
  fill: ${theme.color.text.description};
  font-size: ${theme.fontSize.calc(0.9)};
`;

export const top = cx(
  section,
  styled.css`
    gap: ${theme.spacing.calc(2)};
    font-size: ${theme.fontSize.calc(1)};

    svg {
      width: ${theme.fontSize.calc(1)};
      height: ${theme.fontSize.calc(1)};
      margin-top: ${theme.fontSize.calc(0.3)};
    }
  `,
);

export const bottom = cx(
  section,
  styled.css`
    gap: ${theme.spacing.calc(6)};
    font-size: ${theme.fontSize.calc(0.8)};

    div {
      display: flex;
      align-items: center;
      gap: ${theme.spacing.calc(2)};
    }

    svg {
      width: ${theme.fontSize.calc(0.9)};
      height: ${theme.fontSize.calc(0.9)};
    }

    div > span:nth-child(1),
    div > svg:nth-child(1) {
      margin-top: ${theme.spacing.calc(0.3)};
    }

    div:nth-child(1) > span:nth-child(1) {
      width: ${theme.fontSize.calc(0.8)};
      height: ${theme.fontSize.calc(0.8)};
      display: inline-block;
      border-radius: 50%;
    }
  `,
);
