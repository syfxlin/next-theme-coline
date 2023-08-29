"use client";
import React, { JSX, useMemo } from "react";
import reactNodeToString from "react-node-to-string";

export type HeadingProps = {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: string;
};

export const Heading: React.FC<HeadingProps> = (props) => {
  const id = useMemo(() => reactNodeToString(props.children), [props.children]);
  const Component: keyof JSX.IntrinsicElements = `h${props.level}`;
  return (
    <Component id={id}>
      <a href={`#${encodeURIComponent(id)}`} aria-label={`${id} permalink`} />
      {props.children}
    </Component>
  );
};
