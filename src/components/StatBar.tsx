interface StatBarProps {
  label: string;
  value: number | string;
  subLabel?: string;
  percentage: number;
  color?: string;
  className?: string;
}

export function StatBar({
  label,
  value,
  subLabel,
  percentage,
  color = "var(--primary)",
  className = "",
}: StatBarProps) {
  return (
    <div className={`group ${className}`}>
      <div className="w-full flex justify-between items-baseline mb-1.5">
        <div className="flex items-center gap-2">
          <span className="font-bold transition-colors">{label}</span>
          {subLabel && (
            <span className="text-xs font-medium text-muted-foreground">
              {subLabel}
            </span>
          )}
        </div>
        <span className="font-black tabular-nums" style={{ color }}>
          {value}
        </span>
      </div>

      <div className="w-full rounded-full bg-muted h-3 relative overflow-hidden">
        <div
          className="absolute top-0 bottom-0 left-0 rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${Math.min(percentage, 100)}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
}
