import { Metadata } from "next";
import { metadata } from "../../../components/layouts/root/metadata";
import { fetcher } from "../../../contents";
import { Template } from "../../../components/templates/template";
import { Renderer } from "../../../components/docs";
import { Friends } from "../../../components/widgets/friends";
import { notFound } from "next/navigation";

export const generateMetadata = async (): Promise<Metadata> => {
  return metadata({
    title: "友邻",
    link: "/links",
  });
};

export default async function LinksPage() {
  const data = await fetcher.friends();
  if (data.display === "hidden") {
    return notFound();
  }
  return (
    <Template
      name="友邻"
      slug="/links"
      desc={`${data.links?.length ?? 0} 友邻 × ${data.lost_links?.length ?? 0} 已失联友邻`}
      artalk={true}
    >
      <Renderer document={data.content?.document} position={data.display}>
        {data.links && <Friends data={data.links} />}
      </Renderer>
    </Template>
  );
}
