"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useStats } from "@/hooks/stats/useStats";

interface StatCardProps {
  label: string;
  value: number;
  suffix?: string;
  emoji: string;
  delay?: number;
}

const StatCard = ({
  label,
  value,
  suffix = "",
  emoji,
  delay = 0,
}: StatCardProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`relative p-6 border-2 border-border rounded-2xl bg-card transition-all duration-700 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
    >
      <span className="text-2xl mb-3 block">{emoji}</span>
      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
        {label}
      </p>
      <p className="text-3xl sm:text-4xl font-black text-foreground font-mono">
        {new Intl.NumberFormat(undefined, { notation: "compact", maximumSignificantDigits: 3 }).format(value)}
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
    <section className="bg-light py-20 flex flex-col justify-center">
      <div className="my-container flex flex-col items-center">
        <h2 className="mb-3">Fediverse Stats 🐙</h2>
        <p>Lorem ipsum</p>

        {isLoading && <p>Loading</p>}
        {error && <p className="text-red-500">{error.message}</p>}

        {data && (
          <div className="mt-10 w-full gap-6 grid grid-cols-1 md:grid-cols-3">
            <StatCard
              label="Known Instances"
              value={data.totalInstances}
              emoji="🏝️"
            />

            <StatCard
              label="Total Accounts"
              value={data.totalUsers}
              emoji="🧑‍🤝‍🧑"
            />
            <StatCard
              label="Total active accounts month"
              value={data.totalActiveUsersMonth}
              emoji="🧑‍🤝‍🧑"
            />
            <StatCard
              label="Total active accounts half year"
              value={data.totalActiveUsersHalfYear}
              emoji="🧑‍🤝‍🧑"
            /><StatCard
              label="Total Posts"
              value={data.totalPosts}
              emoji="🧑‍🤝‍🧑"
            /><StatCard
              label="Total Comments"
              value={data.totalComments}
              emoji="🧑‍🤝‍🧑"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default StatsSection;
