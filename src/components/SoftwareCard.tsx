import Link from "next/link";
import SoftwareLogo from "@/components/SoftwareLogo";
import type { Software } from "@/lib/types";
import { formatCompactNumber } from "@/lib/utils";

interface SoftwareCardProps {
  software: Software;
}

const SoftwareCard = ({ software }: SoftwareCardProps) => {
  return (
    <Link
      href={`/software/${software.identifier}`}
      className="group bg-white rounded-xl shadow-sm border border-cyan-100 flex flex-col transition-all hover:shadow-md hover:-translate-y-1"
    >
      <div className="p-6">
        <div className="flex space-x-2">
          <SoftwareLogo
            url={software.iconUrl}
            name={software.identifier}
            size={24}
          />
          <div>
            <span className="font-black text-xl">
              {software.name ?? software.identifier}
            </span>
            <p>{software.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 border-t border-cyan-50 pt-4">
          <div className="flex flex-col items-center">
            <span className="text-xl font-black">
              {formatCompactNumber(software.instances)}
            </span>
            <span className="text-xs text-gray-400 uppercase font-bold">
              Servers
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-xl font-black">
              {formatCompactNumber(software.totalUsers)}
            </span>
            <span className="text-xs text-gray-400 uppercase font-bold">
              Users
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-xl font-black">
              {formatCompactNumber(software.activeUsersMonth)}
            </span>
            <span className="text-xs text-gray-400 uppercase font-bold">
              Active users
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-xl font-black">
              {formatCompactNumber(software.localPosts)}
            </span>
            <span className="text-xs text-gray-400 uppercase font-bold">
              Posts
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SoftwareCard;
