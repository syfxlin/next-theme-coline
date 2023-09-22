import { Metadata } from "next";
import { metadata } from "../../../components/layouts/root/metadata";
import { fetcher } from "../../../contents";
import { Template } from "../../../components/templates/template";
import { Renderer } from "../../../components/docs";
import { Projects } from "../../../components/widgets/projects";
import { notFound } from "next/navigation";

export const generateMetadata = async (): Promise<Metadata> => {
  return metadata({
    title: "项目",
    link: "/projects",
  });
};

export default async function LinksPage() {
  const data = await fetcher.projects();
  if (data.display === "hidden") {
    return notFound();
  }
  // prettier-ignore
  return (
    <Template
      name="项目"
      slug="/projects"
      desc={`${data.categories?.length ?? 0} 分类 × ${data.categories?.reduce((a, i) => a + i.projects.length, 0) ?? 0} 项目`}
      artalk={true}
    >
      <Renderer document={data.content?.document} position={data.display}>
        {data.categories && <Projects data={data.categories} />}
      </Renderer>
    </Template>
  );
}
