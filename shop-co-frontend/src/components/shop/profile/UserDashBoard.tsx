"use client";
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { expediationsService } from "@/services/expediations.service";
import { reviewsService } from "@/services/reviews.service";
import ProfileInfo from "./ProfileInfo";
import MyExpediations from "./MyEpediations";
import MyReviews from "./MyReviews";

type Tab = "profile" | "expediations" | "reviews";

const tabs: { id: Tab; label: string }[] = [
  { id: "profile", label: "Profile Info" },
  { id: "expediations", label: "My Expeditions" },
  { id: "reviews", label: "My Reviews" },
];

export default function UserDashboard(): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const queryClient = useQueryClient();

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["whoami"],
    queryFn: () => authService.whoamI(),
  });



  const { data: reviews = [], isLoading: revLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: () => reviewsService.getAll(),
    enabled: activeTab === "reviews",
  });

  const deleteReviewMutation = useMutation({
    mutationFn: (id: number) => reviewsService.deleteReview(id),
    onSuccess: (_, id) => {
      queryClient.setQueryData<typeof reviews>(["reviews"], (prev = []) =>
        prev.filter((r) => r.id !== id),
      );
    },
  });

  return (
    <div className="min-h-screen bg-white ">
      <div className="bg-[#1a1a1a] text-[#f5f0e8] px-8 py-4 flex items-center gap-3">
        <span className="text-2xl tracking-[0.3em] uppercase font-light">
          Dashboard
        </span>
      </div>

      <div className="flex gap-0 flex-1 h-full max-w-6xl mx-auto mt-10 px-4 pb-16">
        <aside className="w-56 shrink-0">
          <nav className="border border-[#1a1a1a]">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  w-full text-left px-5 py-4 flex items-center gap-3 text-sm tracking-wider uppercase
                  transition-all duration-200 border-b border-[#1a1a1a] last:border-b-0 cursor-pointer
                  ${
                    activeTab === tab.id
                      ? "bg-[#1a1a1a] text-[#f5f0e8]"
                      : "bg-transparent text-[#1a1a1a] hover:bg-[#1a1a1a]/8"
                  }
                `}
              >
                <span className="leading-tight">{tab.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 border border-[#1a1a1a] bg-white min-h-125">
          {activeTab === "profile" && <ProfileInfo user={user ?? null} />}
          {activeTab === "expediations" && (
            <MyExpediations />
          )}
          {activeTab === "reviews" && (
            <MyReviews
              reviews={reviews}
              onDelete={(id) => deleteReviewMutation.mutateAsync(id)}
              deletingId={
                deleteReviewMutation.isPending
                  ? (deleteReviewMutation.variables ?? null)
                  : null
              }
            />
          )}
        </main>
      </div>
    </div>
  );
}
