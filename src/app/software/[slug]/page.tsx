import SoftwareClient from "@/components/software/SoftwareClient";

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function SoftwareDetails(props: Params) {
  const params = await props.params;
  const slug = params.slug;

  return <SoftwareClient slug={slug} />;
}
