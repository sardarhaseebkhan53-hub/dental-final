import Link from "next/link";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  href?: string;
  subtitle?: string;
  inverse?: boolean;
  compact?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeConfig = {
  sm: {
    icon: "h-8 w-8 rounded-xl",
    mark: "h-5 w-5",
    text: "text-lg",
    subtitle: "text-[9px]",
  },
  md: {
    icon: "h-10 w-10 rounded-2xl",
    mark: "h-6 w-6",
    text: "text-xl lg:text-2xl",
    subtitle: "text-[10px] lg:text-xs",
  },
  lg: {
    icon: "h-12 w-12 rounded-2xl",
    mark: "h-7 w-7",
    text: "text-2xl lg:text-3xl",
    subtitle: "text-xs",
  },
} as const;

export function ToothMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M16 3.25c-4.84 0-8.75 3.72-8.75 8.32 0 2.52.85 4.43 1.92 6.13.63 1 1.03 2.12 1.2 3.3l.37 2.65c.38 2.74 2.61 5.1 5.26 5.1 1.15 0 1.77-.63 2.26-1.62l1.17-2.38c.23-.47.9-.47 1.13 0l1.17 2.38c.49.99 1.11 1.62 2.26 1.62 2.65 0 4.88-2.36 5.26-5.1l.37-2.65c.17-1.18.57-2.3 1.2-3.3 1.07-1.7 1.92-3.61 1.92-6.13 0-4.6-3.91-8.32-8.75-8.32-1.64 0-3.15.44-4.44 1.22A8.55 8.55 0 0 0 16 3.25Z"
        className="fill-current"
      />
      <path
        d="M12.3 10.35c1.23-1.13 2.75-1.7 4.56-1.7M21.25 13.4c.77.55 1.67.82 2.7.82"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        className="text-white/70"
      />
    </svg>
  );
}

export function BrandLogo({
  href = "/",
  subtitle = "Premium Dental Care",
  inverse = false,
  compact = false,
  size = "md",
  className,
}: BrandLogoProps) {
  const sizes = sizeConfig[size];

  const content = (
    <>
      <span
        className={cn(
          "relative flex shrink-0 items-center justify-center shadow-lg shadow-primary/20 ring-1 ring-white/30",
          inverse
            ? "bg-white/15 text-white backdrop-blur"
            : "bg-gradient-to-br from-primary via-primary-light to-primary-700 text-white",
          sizes.icon,
        )}
      >
        <span className="absolute inset-0 rounded-[inherit] bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <ToothMark className={cn("relative", sizes.mark)} />
      </span>
      {!compact && (
        <span className="leading-none">
          <span
            className={cn(
              "font-display font-extrabold tracking-tight",
              inverse ? "text-white" : "text-neutral-dark",
              sizes.text,
            )}
          >
            Serene
          </span>
          <span
            className={cn(
              "ml-1 font-display font-extrabold tracking-tight",
              inverse ? "text-accent-light" : "text-primary",
              sizes.text,
            )}
          >
            Dental
          </span>
          {subtitle && (
            <span
              className={cn(
                "mt-1 block font-semibold uppercase tracking-[0.22em]",
                inverse ? "text-white/70" : "text-neutral-light",
                sizes.subtitle,
              )}
            >
              {subtitle}
            </span>
          )}
        </span>
      )}
    </>
  );

  return (
    <Link
      href={href}
      className={cn("group flex shrink-0 items-center gap-3", className)}
    >
      {content}
    </Link>
  );
}
