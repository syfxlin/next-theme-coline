"use client";
import "./styles";
import React from "react";
import { RootProps } from "./index";
import { Providers } from "../../../theme/providers";
import { HelloWorld } from "../../root/hello-world";
import { Canvas } from "../../root/canvas";
import { Analytics } from "../../root/analytics";
import { ProgressBar } from "../../root/progress-bar";
import { COLINE_LANGUAGE } from "../../../env/public";

export const ClientRoot: React.FC<RootProps> = (props) => {
  return (
    <html lang={COLINE_LANGUAGE} data-theme="light" suppressHydrationWarning>
      <body>
        <Providers>
          {props.children}
          <Canvas />
          <Analytics />
          <ProgressBar />
          <HelloWorld />
        </Providers>
      </body>
    </html>
  );
};
