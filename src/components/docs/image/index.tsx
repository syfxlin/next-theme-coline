import * as styles from "./styles.css";
import React from "react";
import { Image as UImage } from "../../ui/image";

export type ImageProps = {
  src: string;
  alt: string;
  title?: string;
};

export const Image: React.FC<ImageProps> = (props) => {
  return (
    <figure className={styles.container}>
      <UImage src={props.src} alt={props.alt} title={props.title} />
      {(props.title || props.alt) && <figcaption className={styles.caption}>{props.title || props.alt}</figcaption>}
    </figure>
  );
};
