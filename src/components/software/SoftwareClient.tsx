"use client";

import { useInstances } from "@/hooks/instance/useInstances";
import { useSoftware } from "@/hooks/software/useSoftware";
import ServerCard from "../ServerCard";
import SoftwareVersionSection from "./SoftwareVersionsSection";

export default function SoftwareClient({ slug }: { slug: string }) {
  const { data: software } = useSoftware(slug);
  const { data, error, isLoading } = useInstances(30, undefined, slug);

  return (
    <main>
      <section className="bg-[#e9f7f9] py-20 flex flex-col justify-center">
        <SoftwareVersionSection software={slug} />
        <div className="my-container flex flex-col items-center">
          <h2 className="mb-3">Top {software?.name} Servers</h2>
          <p>Servers with the most users across the Fediverse</p>

          {isLoading && <p>Searching the stars...</p>}
          {error && <p className="text-red-500">{error.message}</p>}

          <div className="mt-10 w-full gap-6 grid grid-cols-1 md:grid-cols-3">
            {data?.pages
              .flatMap((page) => page.data)
              .map((instance) => (
                <ServerCard key={instance.domain} instance={instance} />
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}
