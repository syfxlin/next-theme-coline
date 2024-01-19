import "./styles";
import React, { ReactNode } from "react";
import { Canvas } from "../../root/canvas";
import { Analytics } from "../../root/analytics";
import { Providers } from "../../../theme/providers";
import { ProgressBar } from "../../root/progress-bar";
import { HelloWorld } from "../../root/hello-world";
import { COLINE_LANGUAGE } from "../../../env/public";

export interface RootProps {
  children: ReactNode;
}

export const Root: React.FC<RootProps> = async (props) => {
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
