import clsx from "clsx";

interface StatBarProps {
  label: string;
  value: number | string;
  subLabel?: string;
  percentage: number;
  color?: string;
  icon?: React.ReactNode;
  href?: string;
  isLoading?: boolean;
  className?: string;
}

export function StatBar({
  label,
  value,
  subLabel,
  percentage,
  color = "var(--primary)",
  icon,
  href,
  isLoading = false,
  className = "",
}: StatBarProps) {
  const LabelComponent = href ? "a" : "span";

  const realPercentage = isLoading ? 0 : percentage;

  return (
    <div className={`group ${className}`}>
      <div className="w-full flex justify-between items-baseline mb-1.5">
        <div className="flex items-center gap-2">
          {icon && <span className="flex items-center">{icon}</span>}
          <LabelComponent
            {...(href
              ? {
                  href,
                }
              : {})}
            className={`font-bold transition-colors ${
              href ? "hover:underline cursor-pointer" : ""
            }`}
          >
            {label}
          </LabelComponent>
          {subLabel && (
            <span className="text-xs font-medium text-muted-foreground">
              {subLabel}
            </span>
          )}
        </div>
        <span
          className={clsx("font-black transition-opacity duration-300", {
            "opacity-0": isLoading,
            "opacity-100": !isLoading,
          })}
          style={{ color }}
        >
          {value}
        </span>
      </div>

      <div className="w-full rounded-full bg-muted h-3 relative overflow-hidden">
        <div
          className="absolute top-0 bottom-0 left-0 rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${Math.min(realPercentage, 100)}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
}
