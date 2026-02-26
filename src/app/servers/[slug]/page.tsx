"use client";

import { use } from "react";
import InstanceClient from "@/components/instance/InstanceClient";
import { useInstance } from "@/hooks/instance/useInstance";

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
