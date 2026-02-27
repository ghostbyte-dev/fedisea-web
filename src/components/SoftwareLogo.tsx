import Image from "next/image";

interface SoftwareLogoProps {
  name: string | null | undefined;
  size?: number;
  className?: string;
}

const SoftwareLogo = ({
  name,
  size = 32,
  className = "",
}: SoftwareLogoProps) => {
  const software = name?.toLowerCase().trim() || "unknown";

  const getLogoPath = (name: string): string => {
    switch (name) {
      case "mastodon":
        return "/software-logos/mastodon.svg";
      case "pixelfed":
        return "/software-logos/pixelfed.svg";
      case "lemmy":
        return "/software-logos/lemmy.svg";
      case "ghost":
        return "/software-logos/ghost.png";
      case "wordpress":
        return "/software-logos/wordpress.svg";
      case "peertube":
        return "/software-logos/peertube.svg";
      case "writefreely":
        return "/software-logos/writefreely.svg";
      case "misskey":
        return "/software-logos/misskey.svg";
      case "nodebb":
        return "/software-logos/nodebb.svg";
      case "owncast":
        return "/software-logos/owncast.svg";
      case "pleroma":
        return "/software-logos/pleroma.svg";
      default:
        return "/software-logos/fediverse.svg";
    }
  };

  const logoSrc = getLogoPath(software);

  return (
    <div
      className={`relative flex-shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={logoSrc}
        alt={`${name || "Unknown"} software logo`}
        fill // Use fill for better scaling in a defined div
        className="object-contain"
        priority={size > 40} // Prioritize loading if it's a large logo
      />
    </div>
  );
};

export default SoftwareLogo;
