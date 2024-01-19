import { styled } from "@syfxlin/reve";
import { theme } from "../../../theme/theme.css";
import { iconify } from "../../ui/iconify/query";

export const container = styled.css`
  position: fixed;
  top: 80px;
  left: ${theme.fontSize.calc(1)};
  padding: ${theme.spacing.calc(1)};
  width: ${theme.fontSize.calc(18)};
  height: calc(100vh - 160px);

  @media screen and (max-width: ${theme.fontSize.calc(36 + 45)}) {
    display: none;
  }

  > ul {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow-y: auto;
    opacity: 0;
    transition: opacity 0.6s;
  }

  > span {
    opacity: 0.5;
    transition: opacity 0.6s;
  }

  &:hover {
    > ul,
    > span {
      opacity: 1;
    }
  }
`;

export const icon = styled.css`
  ${iconify.css("ri:menu-2-fill")}

  margin: ${theme.spacing.calc(2)};
  color: ${theme.color.text.paragraph};
  height: ${theme.fontSize.calc(1.5)};
  width: ${theme.fontSize.calc(1.5)};
`;

export const list = styled.css`
  gap: ${theme.spacing.calc(1)};
  padding-left: ${theme.fontSize.calc(1)};
  display: flex;
  list-style: none;
  flex-direction: column;
`;

export const item = styled.css`
  a {
    display: inline;
    text-align: start;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow-x: hidden;
    font-size: ${theme.fontSize.calc(0.9)};
    margin: 0 ${theme.spacing.calc(2.5)};
    color: ${theme.color.text.description};
    transition:
      color 0.3s,
      border 0.3s;

    &.active,
    &:hover,
    &:focus,
    &:active {
      color: ${theme.color.text.paragraph};
      border-bottom-color: ${theme.color.text.paragraph};
    }
  }
`;
