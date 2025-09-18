"use client";
import { useQuery } from "@tanstack/react-query";
import { servicesClient } from "@/lib/clients/services";
import type { ServiceCategoryDto, ServiceIssueDto } from "@/types";

export const useServiceCategories = () =>
  useQuery<ServiceCategoryDto[]>({
    queryKey: ["service-categories"],
    queryFn: () => servicesClient.categories(),
  });

export const useServiceIssues = (categoryId: number) =>
  useQuery<ServiceIssueDto[]>({
    queryKey: ["service-issues", categoryId],
    queryFn: () => servicesClient.issuesByCategory(categoryId),
    enabled: !!categoryId,
  });
