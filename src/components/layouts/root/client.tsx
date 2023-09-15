"use client";
import React from "react";
import { RootProps } from "./index";
import { Providers } from "../../../theme/providers";
import { HelloWorldScript } from "../../scripts/hello-world-script";
import { Canvas } from "../../root/canvas";
import { Analytics } from "../../root/analytics";
import { ProgressBar } from "../../root/progress-bar";

// styles
import "../../../theme/global.css";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/shift-away.css";
import "katex/dist/katex.css";

export const ClientRoot: React.FC<RootProps> = (props) => {
  return (
    <html lang="zh" data-theme="light" suppressHydrationWarning>
      <body>
        <Providers>
          <HelloWorldScript />
          {props.children}
          <Canvas />
          <Analytics />
          <ProgressBar />
        </Providers>
      </body>
    </html>
  );
};
