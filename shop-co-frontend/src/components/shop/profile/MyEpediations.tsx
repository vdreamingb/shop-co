import { useQuery } from "@tanstack/react-query";
import React from "react";
import { expediationsService } from "@/services/expediations.service";
import Loading from "./Loading";
import parseDate from "@/shared/utils/ParseDate";

function StatusBadge({ active }: { active: boolean }) {
  return (
    <span
      className={`text-[10px] tracking-widest uppercase px-2 py-0.5 border ${
        active
          ? "border-[#2d6a2d] text-[#2d6a2d] bg-[#f0faf0]"
          : "border-[#888] text-[#888] bg-[#f5f5f5]"
      }`}
    >
      {active ? "Active" : "Closed"}
    </span>
  );
}

export default function MyExpediations(): React.JSX.Element {
  const { data: expediations = [], isLoading: isLoading } = useQuery({
    queryKey: ["expediations"],
    queryFn: () => expediationsService.getAll(),
  });

  if (isLoading) {
    return (
      <Loading />
    );
  }

  return (
    <div className="p-8 md:p-10">
      <div className="border-b-2 border-[#1a1a1a] pb-4 mb-8">
        <p className="text-xs tracking-[0.3em] uppercase text-[#888] mb-1">
          History
        </p>
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-light text-[#1a1a1a] tracking-wide">
            My Expeditions
          </h2>
          <span className="text-xs text-[#888] tracking-widest uppercase">
            {expediations.length} total
          </span>
        </div>
      </div>

      {expediations.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <p className="text-[#888] text-sm tracking-widest uppercase">
            No expeditions yet
          </p>
          <p className="text-[#aaa] text-xs max-w-xs text-center">
            Your expedition history will appear here once you place your first
            order.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {expediations.map((exp) => (
            <div
              key={exp.id}
              className="border border-[#e0dbd0] hover:border-[#1a1a1a] transition-colors duration-200 p-5 bg-[#fdfcfa]"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <p className="text-xs text-[#888] tracking-widest uppercase mb-1">
                    Expedition #{exp.id}
                  </p>
                  <p className="text-[#1a1a1a] text-sm font-medium">
                    {exp.address}
                  </p>
                </div>
                <StatusBadge active={exp.status} />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2 mt-3 pt-3 border-t border-[#e8e4dc]">
                <div>
                  <p className="text-[10px] tracking-widest uppercase text-[#aaa]">
                    Phone
                  </p>
                  <p className="text-xs text-[#1a1a1a] mt-0.5">
                    {exp.phoneNumber}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] tracking-widest uppercase text-[#aaa]">
                    Cost
                  </p>
                  <p className="text-xs text-[#1a1a1a] mt-0.5">
                    ${exp.cost.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] tracking-widest uppercase text-[#aaa]">
                    Date
                  </p>
                  <p className="text-xs text-[#1a1a1a] mt-0.5">
                    {parseDate(exp.createdAt)
                    }
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
