"use client";

import {
  ActivityIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  Code2Icon,
  CodeIcon,
  ExternalLinkIcon,
} from "lucide-react";
import Link from "next/link";
import { useInstance } from "@/hooks/instance/useInstance";
import { useSoftware } from "@/hooks/software/useSoftware";
import { getColor } from "@/lib/colors";
import SoftwareLogo from "../SoftwareLogo";
import { StatBar } from "../StatBar";

export default function InstanceClient({ slug }: { slug: string }) {
  const { data: instance } = useInstance(slug);
  const { data: software, isLoading: softwareLoading } = useSoftware(
    instance?.software,
  );

  const activeUsersPercent = software?.activeUsersHalfyear
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

            <Link
              href={`https://${instance.domain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-white flex items-center space-x-2 px-3 py-2 rounded-xl font-bold w-fit"
            >
              <ExternalLinkIcon size={18} />
              <span>Visit</span>
            </Link>

            <section className="pb-20 mt-20">
              <div className="flex space-x-2 items-center mb-5">
                <ActivityIcon className="text-secondary" size={32} />
                <h2>Activity Breakdown</h2>
              </div>

              <div className="bg-card border-2 border-border rounded-2xl p-6 md:p-8">
                <div className="space-y-5">
                  {/* Monthly active bar */}
                  <div>
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="text-sm font-bold text-foreground">
                        Monthly Active Users
                      </span>
                      <span className="text-sm font-black text-primary">
                        {instance.activeUsersMonth}
                      </span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{
                          width: `${Math.min((instance.activeUsersMonth / instance.totalUsers) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Half-year active bar */}
                  <div>
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="text-sm font-bold text-foreground">
                        Half-Year Active Users
                      </span>
                      <span className="text-sm font-black text-secondary">
                        {instance.activeUsersHalfyear}
                      </span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-secondary rounded-full transition-all"
                        style={{
                          width: `${Math.min((instance.activeUsersHalfyear / instance.totalUsers) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Total users bar */}
                  <div>
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="text-sm font-bold text-foreground">
                        Total Users
                      </span>
                      <span className="text-sm font-black text-tertiary">
                        {instance.totalUsers}
                      </span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-full bg-tertiary rounded-full transition-all" />
                    </div>
                  </div>

                  {/* Posts vs comments */}
                  <div className="pt-4 border-t border-border">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
                      Content Breakdown
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-muted/50 rounded-xl p-4 text-center">
                        <p className="text-2xl font-black text-foreground">
                          {instance.localPosts ?? "/"}
                        </p>
                        <p className="text-sm text-muted-foreground font-bold mt-1">
                          Local Posts
                        </p>
                      </div>
                      <div className="bg-muted/50 rounded-xl p-4 text-center">
                        <p className="text-2xl font-black text-foreground">
                          {instance.localComments ?? "/"}
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
                    <div className="flex space-x-3">
                      <SoftwareLogo url={software.iconUrl} size={42} />
                      <div>
                        <h3>{software.name}</h3>
                        <p>{software.description}</p>
                      </div>
                    </div>

                    <StatBar
                      label={`Active users on ${instance.domain}`}
                      value={`${instance.activeUsersHalfyear} (${activeUsersPercent.toFixed(2)}%)`}
                      percentage={activeUsersPercent}
                      color={getColor(0)}
                      className="mt-5"
                    />

                    <StatBar
                      label={`Active users on ${software.name} in general`}
                      value={`${software.activeUsersHalfyear}`}
                      percentage={100}
                      color={getColor(1)}
                      className="mt-3"
                    />

                    <StatBar
                      label={`Total users on ${instance.domain}`}
                      value={`${instance.totalUsers} (${totalUsersPercent.toFixed(2)}%)`}
                      percentage={totalUsersPercent}
                      color={getColor(2)}
                      className="mt-10"
                    />

                    <StatBar
                      label={`Total users on ${software.name} in general`}
                      value={`${software.totalUsers}`}
                      percentage={100}
                      color={getColor(4)}
                      className="mt-3"
                    />

                    <Link
                      href={`/software/${software.identifier}`}
                      className="bg-primary text-white flex items-center space-x-2 px-3 py-2 w-fit rounded-xl font-bold mt-8"
                    >
                      <span>More about {software.name}</span>
                      <ArrowRightIcon size={18} />
                    </Link>
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
