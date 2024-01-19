import { Metadata } from "next";
import { notFound } from "next/navigation";
import { metadata } from "../../../components/layouts/root/metadata";
import { fetcher } from "../../../contents";
import { Template } from "../../../components/templates/template";
import { Renderer } from "../../../components/docs";
import { Friends } from "../../../components/widgets/friends";
import { t } from "../../../locales";

export async function generateMetadata(): Promise<Metadata> {
  return metadata({
    title: t("links.name"),
    link: "/links",
  });
}

export default async function LinksPage() {
  const data = await fetcher.friends();
  if (data.display === "hidden") {
    return notFound();
  }
  return (
    <Template
      artalk
      link="/links"
      name={t("links.name")}
      desc={t("links.desc", data.links?.length ?? 0, data.lost_links?.length ?? 0)}
    >
      <Renderer document={data.content?.document} position={data.display}>
        {data.links && <Friends data={data.links} />}
      </Renderer>
    </Template>
  );
}
