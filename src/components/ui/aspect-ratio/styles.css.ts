import { createVar } from "@vanilla-extract/css";
import { styled } from "@syfxlin/reve";

export const ratio = createVar();

export const container = styled.css`
  position: relative;
  max-width: 100%;
  overflow: hidden;

  &::before {
    content: "";
    height: 0;
    display: block;
    padding-bottom: ${ratio};
  }

  &::after {
    content: "";
    display: table;
    clear: both;
  }

  & > *:not(style) {
    overflow: hidden;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  & > img,
  & > video {
    object-fit: cover;
  }
`;
