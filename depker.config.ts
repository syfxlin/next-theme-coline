import { depker, docker, nextjs } from "https://raw.githubusercontent.com/syfxlin/depker/master/mod.ts";

const app = depker();

app.master(
  docker({
    type: "https",
    host: app.env("REMOTE_HOST"),
    ca: app.env("REMOTE_CA"),
    cert: app.env("REMOTE_CERT"),
    key: app.env("REMOTE_KEY"),
  }),
);
app.runner(
  docker({
    type: "local",
  }),
);

app.service(
  nextjs({
    name: "blog",
    domain: "blog.ixk.me",
    tls: true,
    nextjs: {
      inject: {
        dockerfile: `
          COPY --from=builder /app/content /app/content
        `,
      },
    },
  }),
);

export default app;
