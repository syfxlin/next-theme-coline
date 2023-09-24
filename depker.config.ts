import { depker, docker, nextjs, proxy, service } from "https://raw.githubusercontent.com/syfxlin/depker/master/mod.ts";

const app = depker();

app.use(proxy());
app.use(service());
app.master(docker());

app.service(
  nextjs({
    name: "blog",
    domain: "nextjs.test",
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
