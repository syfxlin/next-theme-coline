import { styled } from "@syfxlin/reve";
import { theme } from "../../../theme/theme.css";
import { iconify } from "../../ui/iconify/query";

export const container = styled.css`
  position: absolute;
  top: 0;
  right: ${theme.fontSize.calc(-1)};
  padding: ${theme.spacing.calc(1)};
  width: ${theme.fontSize.calc(18)};
  height: 100%;
  transform: translateX(100%);

  @media screen and (max-width: ${theme.fontSize.calc(36 + 45)}) {
    display: none;
  }

  > ul {
    position: sticky;
    top: 40px;
    margin: 0;
    padding: 0;
    opacity: 0.5;
    overflow-y: auto;
    overflow-x: hidden;
    transition: opacity 0.6s, color 0.3s, background-color 0.3s;
  }

  &:hover {
    > ul {
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
    border: none;
    transition: color 0.3s, color 0.3s, background-color 0.3s;

    &.active,
    &:hover,
    &:focus,
    &:active {
      color: ${theme.color.text.primary};
    }
  }
`;
