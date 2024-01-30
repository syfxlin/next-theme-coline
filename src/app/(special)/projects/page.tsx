import { Metadata } from "next";
import { notFound } from "next/navigation";
import { metadata } from "../../../components/layouts/root/metadata";
import { fetcher } from "../../../contents";
import { Template } from "../../../components/templates/template";
import { Renderer } from "../../../components/docs";
import { Projects } from "../../../components/widgets/projects";
import { t } from "../../../locales";

export async function generateMetadata(): Promise<Metadata> {
  return metadata({
    title: t("projects.name"),
    link: "/projects",
  });
}

export default async function ProjectsPage() {
  const data = await fetcher.projects();
  if (data.display === "hidden") {
    return notFound();
  }
  return (
    <Template
      artalk
      size="lg"
      link="/projects"
      name={t("projects.name")}
      desc={t("projects.desc", data.categories?.length ?? 0, data.categories?.reduce((a, i) => a + i.projects.length, 0) ?? 0)}
    >
      <Renderer document={data.content?.document} position={data.display}>
        {data.categories && <Projects data={data.categories} />}
      </Renderer>
    </Template>
  );
}
