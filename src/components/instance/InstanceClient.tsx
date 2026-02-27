"use client";

import { useInstance } from "@/hooks/instance/useInstance";

export default function InstanceClient({ slug }: { slug: string }) {
  const { data: instance } = useInstance("pixelix.social");

  return (
    <main>
      <div className="my-container pt-32 md:pt-48">
        {instance && (
          <div>
            {instance.software} (Slug: {slug})
          </div>
        )}
      </div>
    </main>
  );
}
