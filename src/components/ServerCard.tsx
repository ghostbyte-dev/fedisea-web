import Link from "next/link";
import SoftwareLogo from "@/components/SoftwareLogo";

// Define the interface based on your instance structure
interface Instance {
  domain: string;
  software?: string;
  thumbnail?: string;
  totalUsers?: number;
}

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
          src={instance.thumbnail || "https://placehold.co/600x400"}
          alt={`${instance.domain} thumbnail`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-6">
        <div className="flex items-center space-x-2">
          <SoftwareLogo name={instance.software} size={18} />
          <span className="font-bold text-cyan-900 truncate">
            {instance.domain}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-xs font-mono bg-cyan-50 text-cyan-700 px-2 py-1 rounded">
            {instance.totalUsers?.toLocaleString() ?? 0} users
          </div>
          {/* Optional: Add a small badge for software name */}
          <span className="text-[10px] text-gray-400 uppercase tracking-widest">
            {instance.software}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ServerCard;
