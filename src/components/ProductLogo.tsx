import governanceiqLogo from "@/assets/governanceiq-logo.jpg";
import growthiqLogo from "@/assets/growthiq-logo.jpg";
import proposaliqLogo from "@/assets/proposaliq-logo.jpg";
import { cn } from "@/lib/utils";

type ProductName = "proposaliq" | "growthiq" | "governanceiq";

const logoMap: Record<ProductName, { src: string; alt: string }> = {
  proposaliq: { src: proposaliqLogo, alt: "Logo Proposal IQ" },
  growthiq: { src: growthiqLogo, alt: "Logo Growth IQ" },
  governanceiq: { src: governanceiqLogo, alt: "Logo GovernanceIQ" },
};

export function ProductLogo({ product, className }: { product: ProductName; className?: string }) {
  const logo = logoMap[product];

  return <img src={logo.src} alt={logo.alt} className={cn("h-full w-full object-contain", className)} loading="lazy" />;
}