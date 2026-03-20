"use client";

import { ArrowLeftIcon, Code2Icon, GlobeIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import { useInstances } from "@/hooks/instance/useInstances";
import { useSoftware } from "@/hooks/software/useSoftware";
import { useStats } from "@/hooks/stats/useStats";
import { getColor } from "@/lib/colors";
import { formatCompactNumber, formatPercentNumber } from "@/lib/utils";
import { Button } from "../inputs/Button";
import ServerCard from "../ServerCard";
import SoftwareLogo from "../SoftwareLogo";
import { StatBar } from "../StatBar";
import SoftwareVersionSection from "./SoftwareVersionsSection";

export default function SoftwareClient({ slug }: { slug: string }) {
  const { data: software } = useSoftware(slug);
  const { data: stats } = useStats();
  const { data, error, isLoading } = useInstances({
    size: 30,
    software: slug,
    sortBy: "users",
  });

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

  const totalInstancesPercent = stats?.totalInstances
    ? Math.min(((software?.instances ?? 0) / stats.totalInstances) * 100, 100)
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
                    <Button
                      href={software.website}
                      label="Website"
                      iconLeft={GlobeIcon}
                      variant="light"
                      colorIndex={0}
                    />
                  )}

                  {software.sourceCode && (
                    <Button
                      href={software.sourceCode}
                      label="Source Code"
                      iconLeft={Code2Icon}
                      variant="light"
                      colorIndex={1}
                    />
                  )}

                  {software.joinUrl && (
                    <Button
                      href={software.joinUrl}
                      label="Join"
                      iconLeft={UsersIcon}
                      variant="light"
                      colorIndex={2}
                    />
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
              <h3>Total servers</h3>
              <StatBar
                label={`${software.name ?? software.identifier} servers`}
                value={`${formatCompactNumber(software.instances)} (${formatPercentNumber(totalInstancesPercent)})`}
                percentage={totalInstancesPercent}
                color={getColor(0)}
                className="mt-2"
              />

              <StatBar
                label={`Fediverse servers`}
                value={formatCompactNumber(stats.totalInstances)}
                percentage={100}
                color={getColor(1)}
                className="mt-3 mb-12"
              />

              <h3>Total users</h3>

              <StatBar
                label={`On ${software.name ?? software.identifier}`}
                value={`${formatCompactNumber(software.totalUsers)} (${formatPercentNumber(totalUsersPercent)})`}
                percentage={totalUsersPercent}
                color={getColor(2)}
                className="mt-2"
              />

              <StatBar
                label={`Across the Fediverse`}
                value={formatCompactNumber(stats.totalUsers)}
                percentage={100}
                color={getColor(3)}
                className="mt-3 mb-12"
              />

              <h3>Active users last 30 days</h3>
              <StatBar
                label={`On ${software.name ?? software.identifier}`}
                value={`${formatCompactNumber(software.activeUsersMonth)} (${formatPercentNumber(activeUsersPercentMonth)})`}
                percentage={activeUsersPercentMonth}
                color={getColor(4)}
                className="mt-2"
              />

              <StatBar
                label={`Across the Fediverse`}
                value={`${formatCompactNumber(stats.totalActiveUsersMonth)}`}
                percentage={100}
                color={getColor(5)}
                className="mt-3 mb-12"
              />

              <h3>Active users last 180 days</h3>
              <StatBar
                label={`On ${software.name ?? software.identifier}`}
                value={`${formatCompactNumber(software.activeUsersHalfyear)} (${formatPercentNumber(activeUsersPercentHalfyear)})`}
                percentage={activeUsersPercentHalfyear}
                color={getColor(6)}
                className="mt-2"
              />

              <StatBar
                label={`Across the Fediverse`}
                value={formatCompactNumber(stats.totalActiveUsersHalfYear)}
                percentage={100}
                color={getColor(7)}
                className="mt-3 mb-12"
              />

              <h3>Total posts</h3>

              <StatBar
                label={`On ${software.name ?? software.identifier}`}
                value={`${formatCompactNumber(software.localPosts)} (${formatPercentNumber(totalPostsPercent)})`}
                percentage={totalPostsPercent}
                color={getColor(8)}
                className="mt-2"
              />

              <StatBar
                label={`Across the Fediverse`}
                value={formatCompactNumber(stats.totalPosts)}
                percentage={100}
                color={getColor(9)}
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
