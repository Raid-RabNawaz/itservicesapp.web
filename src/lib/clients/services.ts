import { api } from "../api";
import { 
  ServiceCategoryDto, 
  ServiceIssueDto, 
  CreateServiceCategoryDto, 
  UpdateServiceCategoryDto,
  CreateServiceIssueDto
} from "@/types";

export const servicesClient = {
  // Service Categories
  categories: () => api.get<ServiceCategoryDto[]>("/Service/categories"),
  
  createCategory: (category: CreateServiceCategoryDto) => 
    api.post<ServiceCategoryDto>("/Service/categories", category),
  
  updateCategory: (id: number, category: UpdateServiceCategoryDto) =>
    api.put<void>(`/Service/categories/${id}`, category),
  
  deleteCategory: (id: number) => api.del<void>(`/Service/categories/${id}`),
  
  // Service Issues
  issuesByCategory: (categoryId: number) =>
    api.get<ServiceIssueDto[]>(`/Service/categories/${categoryId}/issues`),
  
  createIssue: (issue: CreateServiceIssueDto) =>
    api.post<ServiceIssueDto>("/Service/issues", issue),
  
  deleteIssue: (id: number) => api.del<void>(`/Service/issues/${id}`),
};
