import governanceiqLogo from "@/assets/governanceiq-logo.png";
import growthiqLogo from "@/assets/growthiq-logo.png.asset.json";
import proposaliqLogo from "@/assets/proposaliq-logo.png";
import { cn } from "@/lib/utils";

type ProductName = "proposaliq" | "growthiq" | "governanceiq";

const logoMap: Record<ProductName, { src: string; alt: string }> = {
  proposaliq: { src: proposaliqLogo, alt: "ProposalIQ logo" },
  growthiq: { src: growthiqLogo.url, alt: "GrowthIQ logo" },
  governanceiq: { src: governanceiqLogo, alt: "Governance Layer logo" },
};

export function ProductLogo({ product, className }: { product: ProductName; className?: string }) {
  const logo = logoMap[product];

  return <img src={logo.src} alt={logo.alt} className={cn("h-full w-full object-contain", className)} loading="lazy" />;
}