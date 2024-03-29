import React from "react";
import { Image as UImage } from "../../ui/image";
import * as styles from "./styles.css";

export interface ImageProps {
  src: string;
  alt: string;
  title?: string;
}

export const Image: React.FC<ImageProps> = (props) => {
  return (
    <figure className={styles.container}>
      <UImage zoom src={props.src} alt={props.alt} title={props.title} className={styles.image} />
      {(props.title || props.alt) && <figcaption className={styles.caption}>{props.title || props.alt}</figcaption>}
    </figure>
  );
};
