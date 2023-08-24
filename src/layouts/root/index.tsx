import "./client";
import React, { ReactNode } from "react";
import { seo } from "../../contents";
import { Providers } from "../../theme/providers";
import { HelloWorldScript } from "../../components/scripts/hello-world-script";
import { Canvas } from "../../components/root/canvas";
import { Analytics } from "../../components/root/analytics";
import { ProgressBar } from "../../components/root/progress-bar";

export type RootProps = {
  children: ReactNode;
};

export const Root: React.FC<RootProps> = (props) => {
  return (
    <html lang={seo.language} data-theme="light" suppressHydrationWarning>
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
