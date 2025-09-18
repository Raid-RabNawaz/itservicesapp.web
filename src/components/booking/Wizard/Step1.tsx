"use client";
import { useMemo, useState } from "react";
import { useServiceCategories, useServiceIssues } from "@/app/hooks/useServices";
import { useBookingWizard } from "./useBookingWizard";
import type { ServiceCategoryDto, ServiceIssueDto } from "@/types";

type Props = {
  onNext(): void;
};

export default function Step1({ onNext }: Props) {
  const [search, setSearch] = useState("");
  const { data: categories, isLoading: categoriesLoading, isError: categoriesError } = useServiceCategories();
  const { serviceCategory, serviceIssue, setServiceCategory, setServiceIssue } = useBookingWizard();

  const { data: issues, isLoading: issuesLoading } = useServiceIssues(serviceCategory?.id ?? 0);

  const filteredCategories = useMemo(() => 
    (categories ?? []).filter(s => s.name?.toLowerCase().includes(search.toLowerCase())), 
    [categories, search]
  );

  if (categoriesLoading) return <div className="p-4">Loading services…</div>;
  if (categoriesError) return <div className="p-4 text-destructive">Failed to load services.</div>;

  function chooseCategory(category: ServiceCategoryDto) {
    console.log("Choosing category:", category);
    setServiceCategory(category);
    setServiceIssue(undefined); // Reset issue when category changes
  }

  function chooseIssue(issue: ServiceIssueDto) {
    console.log("Choosing issue:", issue);
    setServiceIssue(issue);
  }

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Choose a service</h2>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search services…"
          aria-label="Search services"
          className="h-10 px-3 rounded-xl border w-64"
        />
      </div>

      {/* Service Categories */}
      <div>
        <h3 className="text-lg font-medium mb-3">Service Category</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredCategories.map((category) => {
            const selected = serviceCategory?.id === category.id;
            return (
              <button
                key={category.id}
                onClick={() => chooseCategory(category)}
                className={`text-left rounded-2xl border p-4 hover:bg-accent focus:outline-none focus:ring-2 ${selected ? "ring-2 ring-primary" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <div className="font-medium">{category.name}</div>
                </div>
                <div className="text-sm text-muted-foreground line-clamp-2 mt-1">{category.description ?? "—"}</div>
              </button>
            );
          })}
          {filteredCategories.length === 0 && <div className="text-muted-foreground">No categories found.</div>}
        </div>
      </div>

      {/* Service Issues */}
      {serviceCategory && (
        <div>
          <h3 className="text-lg font-medium mb-3">Specific Issue</h3>
          {issuesLoading ? (
            <div className="text-muted-foreground">Loading issues...</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {issues?.map((issue) => {
                const selected = serviceIssue?.id === issue.id;
                return (
                  <button
                    key={issue.id}
                    onClick={() => chooseIssue(issue)}
                    className={`text-left rounded-2xl border p-4 hover:bg-accent focus:outline-none focus:ring-2 ${selected ? "ring-2 ring-primary" : ""}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{issue.name}</div>
                    </div>
                    <div className="text-sm text-muted-foreground line-clamp-2 mt-1">{issue.description ?? "—"}</div>
                  </button>
                );
              })}
              {(!issues || issues.length === 0) && <div className="text-muted-foreground">No issues found for this category.</div>}
            </div>
          )}
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={onNext}
          disabled={!serviceCategory || !serviceIssue}
          className="px-4 py-2 rounded-xl bg-primary text-primary-foreground disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
