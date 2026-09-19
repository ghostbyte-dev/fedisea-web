"use client";

import { useEffect, useState } from "react";
import { useStats } from "@/hooks/stats/useStats";
import { formatCompactNumber } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value?: number;
  suffix?: string;
  emoji: string;
  delay?: number;
  bgColor?: string;
  rotateClass?: string;
}

const StatCard = ({
  label,
  value,
  suffix = "",
  emoji,
  delay = 0,
  bgColor = "bg-card",
  rotateClass = "hover:rotate-1",
}: StatCardProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`relative p-6 border-2 rounded-2xl ${bgColor}  ${rotateClass} ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {emoji && <span className="text-2xl mb-3 block">{emoji}</span>}
      <p className="text-md font-bol text-muted-foreground mb-2">{label}</p>
      <p className="text-3xl sm:text-4xl font-black text-foreground font-mono">
        {formatCompactNumber(value)}
        {suffix && (
          <span className="text-primary text-lg ml-1 font-bold">{suffix}</span>
        )}
      </p>
    </div>
  );
};

const StatsSection = () => {
  const { data, error, isLoading } = useStats();

  return (
    <section className="bg-[#e9f7f9] py-20 flex flex-col justify-center">
      <div className="my-container flex flex-col items-cente">
        <h2 className="mb-5">The fediverse in numbers</h2>
        {error && <p className="text-red-500">{error.message}</p>}

        <div className="w-full gap-6 grid grid-cols-1 md:grid-cols-3">
          <StatCard
            label="Known Instances"
            value={data?.totalInstances}
            emoji=""
            bgColor="bg-blue-500/10 border-blue-500/20 hover:border-blue-500/40 hover:shadow-blue-500/10"
            rotateClass="card-hover-left"
          />

          <StatCard
            label="Total Accounts"
            value={data?.totalUsers}
            emoji=""
            bgColor="bg-purple-500/10 border-purple-500/20 hover:border-purple-500/40 hover:shadow-purple-500/10"
            rotateClass="card-hover-right"
          />

          <StatCard
            label="Total active accounts (30 days)"
            value={data?.totalActiveUsersMonth}
            emoji=""
            bgColor="bg-emerald-500/10 border-emerald-500/20 hover:border-emerald-500/40 hover:shadow-emerald-500/10"
            rotateClass="card-hover-left"
          />

          <StatCard
            label="Total active accounts (6 months)"
            value={data?.totalActiveUsersHalfYear}
            emoji=""
            bgColor="bg-amber-500/10 border-amber-500/20 hover:border-amber-500/40 hover:shadow-amber-500/10"
            rotateClass="card-hover-right"
          />

          <StatCard
            label="Total Posts"
            value={data?.totalPosts}
            emoji=""
            bgColor="bg-rose-500/10 border-rose-500/20 hover:border-rose-500/40 hover:shadow-rose-500/10"
            rotateClass="card-hover-left"
          />

          <StatCard
            label="Total Comments"
            value={data?.totalComments}
            emoji=""
            bgColor="bg-indigo-500/10 border-indigo-500/20 hover:border-indigo-500/40 hover:shadow-indigo-500/10"
            rotateClass="card-hover-right"
          />
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
