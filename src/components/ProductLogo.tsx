import governanceiqLogo from "@/assets/governanceiq-logo.jpg";
import prospectiqLogo from "@/assets/prospectiq-logo.jpg";
import qualionLogo from "@/assets/qualion-logo.jpg";
import { cn } from "@/lib/utils";

type ProductName = "qualion" | "prospectiq" | "governanceiq";

const logoMap: Record<ProductName, { src: string; alt: string }> = {
  qualion: { src: qualionLogo, alt: "Logo Qualion" },
  prospectiq: { src: prospectiqLogo, alt: "Logo ProspectIQ" },
  governanceiq: { src: governanceiqLogo, alt: "Logo GovernanceIQ" },
};

export function ProductLogo({ product, className }: { product: ProductName; className?: string }) {
  const logo = logoMap[product];

  return <img src={logo.src} alt={logo.alt} className={cn("h-full w-full object-contain", className)} loading="lazy" />;
}