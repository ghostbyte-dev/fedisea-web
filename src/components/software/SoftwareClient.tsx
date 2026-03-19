"use client";

import { ArrowLeftIcon, Code2Icon, GlobeIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import { useInstances } from "@/hooks/instance/useInstances";
import { useSoftware } from "@/hooks/software/useSoftware";
import { useStats } from "@/hooks/stats/useStats";
import { getColor } from "@/lib/colors";
import { formatCompactNumber, formatPercentNumber } from "@/lib/utils";
import ServerCard from "../ServerCard";
import SoftwareLogo from "../SoftwareLogo";
import { StatBar } from "../StatBar";
import SoftwareVersionSection from "./SoftwareVersionsSection";

export default function SoftwareClient({ slug }: { slug: string }) {
  const { data: software } = useSoftware(slug);
  const { data: stats } = useStats();
  const { data, error, isLoading } = useInstances({ size: 30, software: slug });

  const activeUsersPercentMonth = stats?.totalActiveUsersMonth
    ? Math.min(
        ((software?.activeUsersMonth ?? 0) / stats?.totalActiveUsersMonth) *
          100,
        100,
      )
    : 0;

  const activeUsersPercentHalfyear = stats?.totalActiveUsersHalfYear
    ? Math.min(
        ((software?.activeUsersHalfyear ?? 0) /
          stats?.totalActiveUsersHalfYear) *
          100,
        100,
      )
    : 0;

  const totalUsersPercent = stats?.totalUsers
    ? Math.min(((software?.totalUsers ?? 0) / stats.totalUsers) * 100, 100)
    : 0;

  const totalPostsPercent = stats?.totalPosts
    ? Math.min(((software?.localPosts ?? 0) / stats.totalPosts) * 100, 100)
    : 0;

  return (
    <main className="bg-[#e9f7f9]">
      <div className=" my-container py-20 flex flex-col justify-center">
        <section>
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
                <h1>{software.name ?? software.identifier}</h1>
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

        <section className="my-20">
          <SoftwareVersionSection software={slug} />
        </section>

        <section className="mt-10 mb-20">
          <div className="flex space-x-2 items-center mb-5">
            <Code2Icon className="text-secondary" size={32} />
            <h2>Stats</h2>
          </div>
          {stats && software && (
            <div className="bg-card border-2 border-border rounded-2xl p-6 md:p-8">
              <h3>Active users last 30 days</h3>
              <StatBar
                label={`On ${software.name ?? software.identifier}`}
                value={`${formatCompactNumber(software.activeUsersMonth)} (${formatPercentNumber(activeUsersPercentMonth)})`}
                percentage={activeUsersPercentMonth}
                color={getColor(0)}
                className="mt-2"
              />

              <StatBar
                label={`Across the Fediverse`}
                value={`${formatCompactNumber(stats.totalActiveUsersMonth)}`}
                percentage={100}
                color={getColor(1)}
                className="mt-3 mb-12"
              />

              <h3>Active users last 180 days</h3>
              <StatBar
                label={`On ${software.name ?? software.identifier}`}
                value={`${formatCompactNumber(software.activeUsersHalfyear)} (${formatPercentNumber(activeUsersPercentHalfyear)})`}
                percentage={activeUsersPercentHalfyear}
                color={getColor(2)}
                className="mt-2"
              />

              <StatBar
                label={`Across the Fediverse`}
                value={formatCompactNumber(stats.totalActiveUsersHalfYear)}
                percentage={100}
                color={getColor(3)}
                className="mt-3 mb-12"
              />

              <h3>Total users</h3>

              <StatBar
                label={`On ${software.name ?? software.identifier}`}
                value={`${formatCompactNumber(software.totalUsers)} (${formatPercentNumber(totalUsersPercent)})`}
                percentage={totalUsersPercent}
                color={getColor(4)}
                className="mt-2"
              />

              <StatBar
                label={`Across the Fediverse`}
                value={formatCompactNumber(stats.totalUsers)}
                percentage={100}
                color={getColor(5)}
                className="mt-3 mb-12"
              />

              <h3>Total posts</h3>

              <StatBar
                label={`On ${software.name ?? software.identifier}`}
                value={`${formatCompactNumber(software.localPosts)} (${formatPercentNumber(totalPostsPercent)})`}
                percentage={totalPostsPercent}
                color={getColor(6)}
                className="mt-2"
              />

              <StatBar
                label={`Across the Fediverse`}
                value={formatCompactNumber(stats.totalPosts)}
                percentage={100}
                color={getColor(7)}
                className="mt-3"
              />
            </div>
          )}
        </section>

        <section className="flex flex-col items-center">
          <h2 className="mb-3">
            Top {software?.name ?? software?.identifier} Servers
          </h2>
          <p>Servers with the most users across the Fediverse</p>

          {isLoading && <p>Searching the stars...</p>}
          {error && <p className="text-red-500">{error.message}</p>}

          <div className="mt-10 w-full gap-6 grid grid-cols-1 md:grid-cols-3">
            {data?.data.map((instance) => (
              <ServerCard key={instance.domain} instance={instance} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
