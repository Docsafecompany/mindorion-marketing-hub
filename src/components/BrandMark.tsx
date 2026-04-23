import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl brand-gradient shadow-[0_14px_32px_-20px_color-mix(in_oklab,var(--color-primary)_75%,transparent)]">
        <div className="grid h-8 w-8 grid-cols-2 grid-rows-2 gap-1 rounded-xl bg-primary-foreground/16 p-1.5 backdrop-blur-sm">
          <span className="rounded-full bg-primary-foreground" />
          <span className="rounded-full bg-primary-foreground/80" />
          <span className="rounded-full bg-primary-foreground/70" />
          <span className="rounded-full bg-primary-foreground/95" />
        </div>
      </div>
      <div>
        <div className="text-lg font-extrabold text-foreground">Mindorion</div>
        <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">B2B Intelligence</div>
      </div>
    </div>
  );
}
