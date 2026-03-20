import { CircleCheckIcon, CircleXIcon } from "lucide-react";
import Link from "next/link";
import SoftwareLogo from "@/components/SoftwareLogo";
import type { Instance } from "@/lib/types";
import { formatCompactNumber } from "@/lib/utils";

interface ServerCardProps {
  instance: Instance;
}

const ServerCard = ({ instance }: ServerCardProps) => {
  return (
    <Link
      href={`/servers/${instance.domain}`}
      className="group bg-white rounded-xl shadow-sm border border-cyan-100 flex flex-col transition-all hover:shadow-md hover:-translate-y-1"
    >
      <div className="w-full h-48 overflow-hidden rounded-t-xl bg-gray-100 flex-shrink-0">
        {/** biome-ignore lint/performance/noImgElement: <explanation> */}
        <img
          src={instance.thumbnail || "/serverfallback.svg"}
          alt={`${instance.domain} thumbnail`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-6 flex flex-col flex-1 justify-between">
        <div className="flex space-x-2">
          <div className="mt-1.5">
            <SoftwareLogo
              url={instance.softwareLogoUrl}
              name={instance.software}
              size={18}
            />
          </div>

          <div>
            <span className="font-bold text-cyan-900 wrap-anywhere">
              {instance.domain}
            </span>

            {instance.description && (
              <p className="text-xs line-clamp-3 wrap-anywhere">
                {instance.description}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-between pt-4 pb-3">
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-tight">
              Total Users
            </span>
            <span className="text-xs font-mono text-cyan-700">
              {formatCompactNumber(instance.totalUsers)}
            </span>
          </div>

          <div className="flex flex-col items-center px-2">
            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-tight">
              Active (Mo)
            </span>
            <span className="text-xs font-mono text-cyan-700">
              {formatCompactNumber(instance.activeUsersMonth)}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-tight">
              Posts
            </span>
            <span className="text-xs font-mono text-cyan-700">
              {formatCompactNumber(instance.localPosts)}
            </span>
          </div>
        </div>

        <div className="pt-4 flex items-center justify-between">
          {instance.openRegistration && (
            <div className="text-primary font-bold text-sm flex space-x-1.5 items-center">
              <CircleCheckIcon size={18} />
              <span>Registration open</span>
            </div>
          )}

          {!instance.openRegistration && (
            <div className="text-secondary font-bold text-sm flex space-x-1.5 items-center">
              <CircleXIcon size={18} />
              <span>Registration closed</span>
            </div>
          )}

          <span className="text-[10px] text-gray-400 uppercase tracking-widest">
            {instance.software}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ServerCard;
