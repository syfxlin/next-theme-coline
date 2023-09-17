import { Metadata } from "next";
import { metadata } from "../../../components/layouts/root/metadata";
import { fetcher } from "../../../contents";
import { Template } from "../../../components/templates/template";
import { Renderer } from "../../../components/docs";
import { Projects } from "../../../components/widgets/projects";

export const generateMetadata = async (): Promise<Metadata> => {
  return metadata({
    title: "项目",
    link: "/projects",
  });
};

export default async function LinksPage() {
  const data = await fetcher.projects();
  return (
    <Template
      name="项目"
      slug="/projects"
      desc={`${data.categories.length} 分类 × ${data.categories.reduce((a, i) => a + i.projects.length, 0)} 项目`}
      artalk={true}
    >
      <Renderer document={data.body.value?.document} position={data.body.discriminant}>
        <Projects data={data} />
      </Renderer>
    </Template>
  );
}
