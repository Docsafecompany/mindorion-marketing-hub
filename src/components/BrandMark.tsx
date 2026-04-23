import mindorionLogo from "@/assets/mindorion-logo.png";
import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <img
      src={mindorionLogo}
      alt="Mindorion"
      className={cn("h-12 w-auto object-contain", className)}
      width={1584}
      height={672}
    />
  );
}
