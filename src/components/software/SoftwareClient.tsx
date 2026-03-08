"use client";

import { useInstance } from "@/hooks/instance/useInstance";

export default function SoftwareClient({ slug }: { slug: string }) {
  //const { data: instance } = useInstance(slug);

  return (
    <main>
      <div className="my-container pt-10 md:pt-20">{slug}</div>
    </main>
  );
}
