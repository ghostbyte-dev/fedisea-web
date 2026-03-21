import Image from "next/image";

interface SoftwareLogoProps {
  url: string | null | undefined;
  name?: string | undefined;
  size?: number;
  className?: string;
}

const SoftwareLogo = ({
  url,
  name,
  size = 32,
  className = "",
}: SoftwareLogoProps) => {
  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={url ?? "/software-logos/fediverse.svg"}
        alt={`${name || "Unknown"} software logo`}
        fill
        className="object-contain"
        priority={size > 60}
      />
    </div>
  );
};

export default SoftwareLogo;
