import "./client";
import React, { ReactNode } from "react";
import { Providers } from "../../../theme/providers";
import { HelloWorldScript } from "../../scripts/hello-world-script";
import { Canvas } from "../../root/canvas";
import { Analytics } from "../../root/analytics";
import { ProgressBar } from "../../root/progress-bar";
import { fetcher } from "../../../contents";

export type RootProps = {
  children: ReactNode;
};

export const Root: React.FC<RootProps> = async (props) => {
  const seo = await fetcher.seo();
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
