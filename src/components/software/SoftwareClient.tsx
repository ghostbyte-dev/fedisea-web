"use client";

import { ArrowLeftIcon, Code2Icon, GlobeIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import { useInstances } from "@/hooks/instance/useInstances";
import { useSoftware } from "@/hooks/software/useSoftware";
import ServerCard from "../ServerCard";
import SoftwareLogo from "../SoftwareLogo";
import SoftwareVersionSection from "./SoftwareVersionsSection";

export default function SoftwareClient({ slug }: { slug: string }) {
  const { data: software } = useSoftware(slug);
  const { data, error, isLoading } = useInstances({ size: 30, software: slug });

  return (
    <main>
      <section className="bg-[#e9f7f9] py-20 flex flex-col justify-center">
        <section className="my-container">
          <Link
            href="/software"
            className="flex items-center space-x-2 font-bold hover:text-primary transition mb-5"
          >
            <ArrowLeftIcon size={18} />
            <span>All Software</span>
          </Link>
          {software && (
            <div className="flex space-x-3">
              <SoftwareLogo url={software.iconUrl} size={64} />
              <div>
                <h1>{software.name}</h1>
                <p>{software.description}</p>
                <div className="flex space-x-3 mt-3">
                  {software.website && (
                    <Link
                      href={software.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary text-white flex items-center space-x-2 px-3 py-2 rounded-xl font-bold"
                    >
                      <GlobeIcon size={18} />
                      <span>Website</span>
                    </Link>
                  )}

                  {software.sourceCode && (
                    <Link
                      href={software.sourceCode}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-muted flex items-center space-x-2 px-3 py-2 rounded-xl font-bold"
                    >
                      <Code2Icon size={18} />
                      <span>Source Code</span>
                    </Link>
                  )}

                  {software.joinUrl && (
                    <Link
                      href={software.joinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#db5783] text-white flex items-center space-x-2 px-3 py-2 rounded-xl font-bold"
                    >
                      <UsersIcon size={18} />
                      <span>Join</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}
        </section>

        <section className="my-container grid grid-cols-2 gap-10 my-20">
          <div>
            <h2 className="mb-6">Stats</h2>
            <div className="grid grid-cols-2 gap-3 h-fit">
              <div className="flex flex-col h-fit items-center gap-3 card">
                <div className="p-2 bg-muted rounded-lg">
                  <UsersIcon className={`w-4 h-4 `} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground">
                    Total users
                  </p>
                  <p className="text-sm font-bold text-foreground">
                    {software?.totalUsers}
                  </p>
                </div>
              </div>

              <div className="flex flex-col h-fit items-center gap-3 card">
                <div className="p-2 bg-muted rounded-lg">
                  <UsersIcon className={`w-4 h-4 `} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground">
                    Total users
                  </p>
                  <p className="text-sm font-bold text-foreground">
                    {software?.totalUsers}
                  </p>
                </div>
              </div>

              <div className="flex flex-col h-fit items-center gap-3 card">
                <div className="p-2 bg-muted rounded-lg">
                  <UsersIcon className={`w-4 h-4 `} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground">
                    Total users
                  </p>
                  <p className="text-sm font-bold text-foreground">
                    {software?.totalUsers}
                  </p>
                </div>
              </div>

              <div className="flex flex-col h-fit items-center gap-3 card">
                <div className="p-2 bg-muted rounded-lg">
                  <UsersIcon className={`w-4 h-4 `} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground">
                    Total users
                  </p>
                  <p className="text-sm font-bold text-foreground">
                    {software?.totalUsers}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <SoftwareVersionSection software={slug} />
        </section>

        <div className="my-container flex flex-col items-center">
          <h2 className="mb-3">Top {software?.name} Servers</h2>
          <p>Servers with the most users across the Fediverse</p>

          {isLoading && <p>Searching the stars...</p>}
          {error && <p className="text-red-500">{error.message}</p>}

          <div className="mt-10 w-full gap-6 grid grid-cols-1 md:grid-cols-3">
            {data?.data.map((instance) => (
              <ServerCard key={instance.domain} instance={instance} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
