import { depker, docker, nextjs } from "https://raw.githubusercontent.com/syfxlin/depker/master/mod.ts";

const app = depker();

app.master(docker({ type: "https" }));
app.runner(docker({ type: "local" }));

app.service(
  nextjs({
    name: "blog",
    domain: "blog.ixk.me",
    tls: true,
  }),
);

export default app;
