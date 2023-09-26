import { styled } from "@syfxlin/reve";
import { theme } from "../../../theme/theme.css";

export const container = styled.css`
  position: relative;
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

  > a {
    opacity: 0;
    transition: opacity 0.3s !important;
    text-decoration: none !important;
    border: none !important;
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    transform: translateX(-100%) !important;
    padding-right: ${theme.borderWidth.calc(4)} !important;

    &::before {
      color: ${theme.color.text.description};
      font-size: ${theme.fontSize.calc(0.5)};
      padding-left: ${theme.spacing.calc(1)};
      transition: opacity 0.3s;
    }
  }

  &:hover > a {
    opacity: 1;
  }

  h1& {
    font-size: ${theme.fontSize.calc(1.8)};

    > a::before {
      content: "H1";
    }
  }

  h2& {
    font-size: ${theme.fontSize.calc(1.5)};

    > a::before {
      content: "H2";
    }
  }

  h3& {
    font-size: ${theme.fontSize.calc(1.3)};

    > a::before {
      content: "H3";
    }
  }

  h4& {
    font-size: ${theme.fontSize.calc(1.1)};

    > a::before {
      content: "H4";
    }
  }

  h5& {
    font-size: ${theme.fontSize.calc(0.9)};

    > a::before {
      content: "H5";
    }
  }

  h6& {
    font-size: ${theme.fontSize.calc(0.7)};

    > a::before {
      content: "H6";
    }
  }
`;
