"use client";

import { useInstance } from "@/hooks/instance/useInstance";

export default function InstanceClient({ slug }: { slug: string }) {
  const { data: instance } = useInstance(slug);

  return (
    <main>
      <div className="my-container pt-10 md:pt-20">
        {instance && (
          <div>
            <h1 className="mb-5">{instance.domain}</h1>
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
            <p>{instance.description}</p>

            <section className="pb-10 mt-20">
              <h2 className="mb-5">🏄 Activity Breakdown</h2>
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
                          {instance.localPosts}
                        </p>
                        <p className="text-sm text-muted-foreground font-bold mt-1">
                          Local Posts
                        </p>
                      </div>
                      <div className="bg-muted/50 rounded-xl p-4 text-center">
                        <p className="text-2xl font-black text-foreground">
                          {instance.localComments}
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
          </div>
        )}
      </div>
    </main>
  );
}
