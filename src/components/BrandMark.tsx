import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <img
      src="/logo-mindorion.png"
      alt="Mindorion"
      className={cn("h-9 w-auto", className)}
      width={1584}
      height={672}
    />
  );
}
