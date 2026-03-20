"use client";

import {
  ActivityIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  Code2Icon,
  CodeIcon,
  ExternalLinkIcon,
} from "lucide-react";
import Link from "next/link";
import { useInstance } from "@/hooks/instance/useInstance";
import { useSoftware } from "@/hooks/software/useSoftware";
import { getColor } from "@/lib/colors";
import { formatCompactNumber, formatPercentNumber } from "@/lib/utils";
import { Button } from "../inputs/Button";
import SoftwareLogo from "../SoftwareLogo";
import { StatBar } from "../StatBar";

export default function InstanceClient({ slug }: { slug: string }) {
  const { data: instance } = useInstance(slug);
  const { data: software, isLoading: softwareLoading } = useSoftware(
    instance?.software,
  );

  const activeUsersPercentMonthRelativeToTotal = instance?.totalUsers
    ? Math.min(
        ((instance?.activeUsersMonth ?? 0) / instance?.totalUsers) * 100,
        100,
      )
    : 0;

  const activeUsersPercentHalfyearRelativeToTotal = instance?.totalUsers
    ? Math.min(
        ((instance?.activeUsersHalfyear ?? 0) / instance.totalUsers) * 100,
        100,
      )
    : 0;

  const activeUsersPercentMonth = software?.activeUsersMonth
    ? Math.min(
        ((instance?.activeUsersMonth ?? 0) / software.activeUsersMonth) * 100,
        100,
      )
    : 0;

  const activeUsersPercentHalfyear = software?.activeUsersHalfyear
    ? Math.min(
        ((instance?.activeUsersHalfyear ?? 0) / software.activeUsersHalfyear) *
          100,
        100,
      )
    : 0;

  const totalUsersPercent = software?.totalUsers
    ? Math.min(((instance?.totalUsers ?? 0) / software.totalUsers) * 100, 100)
    : 0;

  return (
    <main>
      <div className="my-container pt-10 md:pt-20">
        {instance && (
          <div>
            <Link
              href="/servers"
              className="flex items-center space-x-2 font-bold hover:text-primary transition mb-5"
            >
              <ArrowLeftIcon size={18} />
              <span>All Servers</span>
            </Link>
            <h1 className="mb-3">{instance.domain}</h1>
            <p className="font-bold mb-5">{instance.description}</p>
            <div className="w-full mb-4 overflow-hidden rounded-lg bg-gray-100 shrink-0">
              {instance.thumbnail && (
                // biome-ignore lint/performance/noImgElement: <explanation>
                <img
                  src={instance.thumbnail}
                  alt={`${instance.domain} icon`}
                  className="w-full object-"
                />
              )}
            </div>

            <Button
              href={`https://${instance.domain}`}
              label="Visit"
              iconRight={ArrowUpRightIcon}
              variant="light"
            />

            <section className="pb-20 mt-20">
              <div className="flex space-x-2 items-center mb-5">
                <ActivityIcon className="text-secondary" size={32} />
                <h2>Activity Breakdown</h2>
              </div>

              <div className="bg-card border-2 border-border rounded-2xl p-6 md:p-8">
                <div className="space-y-5">
                  <StatBar
                    label="Monthly active users"
                    value={formatCompactNumber(instance.activeUsersMonth)}
                    percentage={activeUsersPercentMonthRelativeToTotal}
                    color={getColor(0)}
                    className="mb-5"
                  />

                  <StatBar
                    label="Half-Year Active Users"
                    value={formatCompactNumber(instance.activeUsersHalfyear)}
                    percentage={activeUsersPercentHalfyearRelativeToTotal}
                    color={getColor(1)}
                    className="mb-5"
                  />

                  <StatBar
                    label="Total Users"
                    value={formatCompactNumber(instance.totalUsers)}
                    percentage={100}
                    color={getColor(2)}
                    className="mb-5"
                  />

                  <div className="pt-4 border-t border-border">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
                      Content Breakdown
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-muted/50 rounded-xl p-4 text-center">
                        <p className="text-2xl font-black text-foreground">
                          {instance.localPosts
                            ? formatCompactNumber(instance.localPosts)
                            : "/"}
                        </p>
                        <p className="text-sm text-muted-foreground font-bold mt-1">
                          Local Posts
                        </p>
                      </div>
                      <div className="bg-muted/50 rounded-xl p-4 text-center">
                        <p className="text-2xl font-black text-foreground">
                          {instance.localComments
                            ? formatCompactNumber(instance.localComments)
                            : "/"}
                        </p>
                        <p className="text-sm text-muted-foreground font-bold mt-1">
                          Local Comments
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-20">
              <div className="flex space-x-2 items-center mb-5">
                <Code2Icon className="text-secondary" size={32} />
                <h2>Software</h2>
              </div>

              <div className="bg-card border-2 border-border rounded-2xl p-6 md:p-8">
                {software && (
                  <div>
                    <div className="flex space-x-3 mb-12">
                      <SoftwareLogo url={software.iconUrl} size={42} />
                      <div>
                        <h3>{software.name ?? software.identifier}</h3>
                        <p>{software.description}</p>
                      </div>
                    </div>

                    <h3>Active users last 30 days</h3>

                    <StatBar
                      label={`On ${instance.domain}`}
                      value={`${formatCompactNumber(instance.activeUsersMonth)} (${formatPercentNumber(activeUsersPercentMonth)})`}
                      percentage={activeUsersPercentMonth}
                      color={getColor(0)}
                      className="mt-2"
                    />

                    <StatBar
                      label={`On ${software.name ?? software.identifier} in general`}
                      value={formatCompactNumber(software.activeUsersMonth)}
                      percentage={100}
                      color={getColor(1)}
                      className="mt-3 mb-12"
                    />

                    <h3>Active users last 180 days</h3>

                    <StatBar
                      label={`On ${instance.domain}`}
                      value={`${formatCompactNumber(instance.activeUsersHalfyear)} (${formatPercentNumber(activeUsersPercentHalfyear)})`}
                      percentage={activeUsersPercentHalfyear}
                      color={getColor(2)}
                      className="mt-2"
                    />

                    <StatBar
                      label={`On ${software.name ?? software.identifier} in general`}
                      value={formatCompactNumber(software.activeUsersHalfyear)}
                      percentage={100}
                      color={getColor(3)}
                      className="mt-3 mb-12"
                    />

                    <h3>Total users</h3>

                    <StatBar
                      label={`On ${instance.domain}`}
                      value={`${formatCompactNumber(instance.totalUsers)} (${formatPercentNumber(totalUsersPercent)})`}
                      percentage={totalUsersPercent}
                      color={getColor(4)}
                      className="mt-2"
                    />

                    <StatBar
                      label={`On ${software.name ?? software.identifier} in general`}
                      value={formatCompactNumber(software.totalUsers)}
                      percentage={100}
                      color={getColor(5)}
                      className="mt-3"
                    />

                    <Button
                      label={`More about ${software.name ?? software.identifier}`}
                      href={`/software/${software.identifier}`}
                      variant="light"
                      iconRight={ArrowRightIcon}
                      className="mt-8"
                    />
                  </div>
                )}
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
