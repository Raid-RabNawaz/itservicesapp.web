"use client";
import { useState } from "react";
import { useServiceCategories, useServiceIssues } from "@/app/hooks/useServices";
import { CreateServiceCategoryDto, CreateServiceIssueDto } from "@/types";

export default function AdminServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showIssueForm, setShowIssueForm] = useState(false);
  
  const { data: categories, isLoading: categoriesLoading } = useServiceCategories();
  const { data: issues, isLoading: issuesLoading } = useServiceIssues(selectedCategory || 0);

  const handleCreateCategory = async (data: CreateServiceCategoryDto) => {
    // TODO: Implement create category
    console.log("Create category:", data);
    setShowCategoryForm(false);
  };

  const handleCreateIssue = async (data: CreateServiceIssueDto) => {
    // TODO: Implement create issue
    console.log("Create issue:", data);
    setShowIssueForm(false);
  };

  if (categoriesLoading) return <div className="p-6">Loading services...</div>;

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Service Management</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setShowCategoryForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add Category
          </button>
          <button
            onClick={() => setShowIssueForm(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Add Issue
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Categories */}
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">Service Categories</h2>
          <div className="space-y-2">
            {categories?.map((category) => (
              <div
                key={category.id}
                className={`p-3 border rounded-lg cursor-pointer ${
                  selectedCategory === category.id ? "bg-blue-50 border-blue-300" : "hover:bg-gray-50"
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className="font-medium">{category.name}</div>
                {category.description && (
                  <div className="text-sm text-gray-600">{category.description}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Issues */}
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">
            Service Issues {selectedCategory && `for Selected Category`}
          </h2>
          {selectedCategory ? (
            <div className="space-y-2">
              {issuesLoading ? (
                <div>Loading issues...</div>
              ) : (
                issues?.map((issue) => (
                  <div key={issue.id} className="p-3 border rounded-lg">
                    <div className="font-medium">{issue.name}</div>
                    {issue.description && (
                      <div className="text-sm text-gray-600">{issue.description}</div>
                    )}
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="text-gray-500">Select a category to view issues</div>
          )}
        </div>
      </div>

      {/* Category Form Modal */}
      {showCategoryForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Create Service Category</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleCreateCategory({
                name: formData.get("name") as string,
                description: formData.get("description") as string,
              });
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    name="name"
                    required
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    name="description"
                    className="w-full px-3 py-2 border rounded-lg"
                    rows={3}
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => setShowCategoryForm(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Issue Form Modal */}
      {showIssueForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Create Service Issue</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleCreateIssue({
                serviceCategoryId: selectedCategory || 0,
                name: formData.get("name") as string,
                description: formData.get("description") as string,
              });
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select
                    name="categoryId"
                    value={selectedCategory || ""}
                    onChange={(e) => setSelectedCategory(Number(e.target.value))}
                    required
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="">Select a category</option>
                    {categories?.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    name="name"
                    required
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    name="description"
                    className="w-full px-3 py-2 border rounded-lg"
                    rows={3}
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => setShowIssueForm(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
