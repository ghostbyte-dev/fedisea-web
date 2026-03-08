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
      case "friendica":
        return "/software-logos/friendica.svg";
      case "bookwyrm":
        return "/software-logos/bookwyrm.svg";
      case "loops":
        return "/software-logos/loops.svg";
      case "vernissage":
        return "/software-logos/vernissage.svg";
      case "gotosocial":
        return "/software-logos/gotosocial.svg";
      case "akkoma":
        return "/software-logos/akkoma.svg";
      case "sharkey":
        return "/software-logos/sharkey.png";
      case "bonfire":
        return "/software-logos/bonfire.png";
      default:
        return "/software-logos/fediverse.svg";
    }
  };

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
        priority={size > 40}
      />
    </div>
  );
};

export default SoftwareLogo;
