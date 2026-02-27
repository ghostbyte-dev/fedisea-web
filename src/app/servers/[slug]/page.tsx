import InstanceClient from "@/components/instance/InstanceClient";

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function InstanceDetails(props: Params) {
  const params = await props.params;
  const slug = params.slug;

  return <InstanceClient slug={slug} />;
}
