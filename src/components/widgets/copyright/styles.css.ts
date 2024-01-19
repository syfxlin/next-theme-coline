import { styled } from "@syfxlin/reve";
import { theme } from "../../../theme/theme.css";

export const section = styled.css`
  position: relative;
  display: block;
  overflow: hidden;
  font-size: ${theme.fontSize.calc(0.6)};
  background: ${theme.color.info.background};
  color: ${theme.color.text.paragraph};
  margin: ${theme.spacing.calc(4)} 0;
  padding: ${theme.spacing.calc(5)} ${theme.spacing.calc(6)};

  &::after {
    position: absolute;
    background: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill%3D%22hsl(230%2C%201%25%2C%2062%25)%22 viewBox='0 0 496 512'%3E%3Cpath d='M245.8 214.9l-33.2 17.3c-9.4-19.6-25.2-20-27.4-20-22.2 0-33.3 14.6-33.3 43.9 0 23.5 9.2 43.8 33.3 43.8 14.4 0 24.6-7 30.5-21.3l30.6 15.5a73.2 73.2 0 01-65.1 39c-22.6 0-74-10.3-74-77 0-58.7 43-77 72.6-77 30.8-.1 52.7 11.9 66 35.8zm143 0l-32.7 17.3c-9.5-19.8-25.7-20-27.9-20-22.1 0-33.2 14.6-33.2 43.9 0 23.5 9.2 43.8 33.2 43.8 14.5 0 24.7-7 30.5-21.3l31 15.5c-2 3.8-21.3 39-65 39-22.7 0-74-9.9-74-77 0-58.7 43-77 72.6-77C354 179 376 191 389 214.8zM247.7 8C104.7 8 0 123 0 256c0 138.4 113.6 248 247.6 248C377.5 504 496 403 496 256 496 118 389.4 8 247.6 8zm.8 450.8c-112.5 0-203.7-93-203.7-202.8 0-105.5 85.5-203.3 203.8-203.3A201.7 201.7 0 01451.3 256c0 121.7-99.7 202.9-202.9 202.9z'/%3E%3C/svg%3E");
    content: "";
    height: 200px;
    width: 200px;
    right: -40px;
    top: -45px;
    opacity: 0.1;
  }
`;

export const title = styled.css`
  margin: 0;
  font-size: ${theme.fontSize.calc(0.9)};
`;

export const list = styled.css`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  gap: ${theme.spacing.calc(6)};
  margin: ${theme.spacing.calc(3)} 0;
`;

export const item = styled.css`
  margin: 0;
`;

export const content = styled.css`
  margin: 0;
  font-size: ${theme.fontSize.calc(0.9)};
`;
