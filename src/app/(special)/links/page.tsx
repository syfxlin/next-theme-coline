import { Metadata } from "next";
import { metadata } from "../../../components/layouts/root/metadata";
import { fetcher } from "../../../contents";
import { Template } from "../../../components/templates/template";
import { Renderer } from "../../../components/docs";
import { Friends } from "../../../components/widgets/friends";

export const generateMetadata = async (): Promise<Metadata> => {
  return metadata({
    title: "友邻",
    link: "/links",
  });
};

export default async function LinksPage() {
  const data = await fetcher.friends();
  return (
    <Template
      name="友邻"
      slug="/links"
      desc={`${data.links.length} 位友邻 × ${data.lost_links.length} 位已失联友邻`}
      artalk={true}
    >
      <Renderer document={data.body.value?.document} position={data.body.discriminant}>
        <Friends />
      </Renderer>
    </Template>
  );
}
