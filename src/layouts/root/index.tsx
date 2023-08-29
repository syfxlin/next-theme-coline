import "./client";
import React, { ReactNode } from "react";
import { Providers } from "../../theme/providers";
import { HelloWorldScript } from "../../components/scripts/hello-world-script";
import { Canvas } from "../../components/root/canvas";
import { Analytics } from "../../components/root/analytics";
import { ProgressBar } from "../../components/root/progress-bar";
import { fetcher } from "../../contents";

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
