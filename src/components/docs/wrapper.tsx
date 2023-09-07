import React from "react";
import * as styles from "./wrapper.css";
import { cx } from "@syfxlin/reve";

export const Wrapper: React.FC<any> = React.memo((props) => {
  return (
    <section className={cx("han-init-context", "slide-enter-content-animate", styles.container, props.className)}>
      {props.children}
    </section>
  );
});
