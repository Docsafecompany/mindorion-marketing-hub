import { useState } from "react";

import { GovernanceIQModal, type GovernancePlan } from "./GovernanceIQModal";

interface GovernanceIQChipProps {
  plan: GovernancePlan;
}

export function GovernanceIQChip({ plan }: GovernanceIQChipProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-violet-200 bg-violet-50 px-2.5 py-1.5 text-xs font-medium text-violet-700 transition-colors hover:bg-violet-100"
      >
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-violet-600" />
        GovernanceIQ
        <span className="text-[10px] text-violet-400">★ voir le détail</span>
      </button>

      <GovernanceIQModal plan={plan} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
