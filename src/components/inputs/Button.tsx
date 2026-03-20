"use client";

import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import type { ComponentProps } from "react";
import { getColor } from "@/lib/colors";
import { Spinner } from "../Spinner";

export type ButtonVariant = "dark" | "light";
type ButtonSize = "sm" | "md";

interface ButtonProps extends ComponentProps<"button"> {
  label: string;
  isLoading?: boolean;
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: LucideIcon;
  iconRight?: LucideIcon;
  colorIndex?: number;
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs rounded-md",
  md: "px-4 py-2 text-sm rounded-xl",
};

export function Button({
  label,
  disabled = false,
  isLoading = false,
  onClick,
  className = "",
  href,
  variant = "dark",
  size = "md",
  iconLeft: IconLeft,
  iconRight: IconRight,
  colorIndex = 0,
  ...props
}: ButtonProps) {
  const color = getColor(colorIndex);

  const isDisabled = isLoading || disabled;

  const sharedClasses = `
    relative inline-flex items-center justify-center 
    font-medium transition-all
    ${sizeStyles[size]}
    ${
      isDisabled
        ? "opacity-70 pointer-events-none cursor-not-allowed"
        : "active:scale-95"
    }
    ${className}
  `.trim();

  const style =
    variant === "dark"
      ? {
          backgroundColor: color,
          color: "white",
        }
      : {
          color: color,
          border: `1px solid ${color}`,
          backgroundColor: `${color}1A`,
        };

  const content = (
    <>
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity ${
          isLoading ? "opacity-100" : "opacity-0"
        }`}
      >
        <Spinner color="text-white" size={size === "sm" ? 14 : 18} />
      </div>

      <div
        className={`flex items-center gap-2 transition-opacity ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        {IconLeft && <IconLeft size={size === "sm" ? 14 : 18} />}
        <span className="font-bold">{label}</span>
        {IconRight && <IconRight size={size === "sm" ? 14 : 18} />}
      </div>
    </>
  );

  if (href && !isDisabled) {
    return (
      <Link href={href} className={sharedClasses} style={style}>
        {content}
      </Link>
    );
  }

  return (
    <button
      {...props}
      type={props.type || "button"}
      className={sharedClasses}
      style={style}
      disabled={isDisabled}
      onClick={onClick}
    >
      {content}
    </button>
  );
}
