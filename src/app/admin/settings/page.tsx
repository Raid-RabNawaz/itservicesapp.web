"use client";
import { useState } from "react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "IT Services App",
    siteDescription: "Professional IT services at your doorstep",
    contactEmail: "admin@itservicesapp.com",
    contactPhone: "1-800-ITSERVICES",
    businessHours: "Monday - Friday: 8:00 AM - 6:00 PM",
    timezone: "UTC",
    currency: "USD",
    taxRate: 0.1,
    bookingAdvanceDays: 7,
    cancellationWindowHours: 24,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  const handleSave = async () => {
    setIsSaving(true);
    setMessage("");
    
    try {
      // TODO: Implement save settings API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setMessage("Settings saved successfully!");
    } catch {
      setMessage("Failed to save settings. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  return (
    <main className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">System Settings</h1>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save Settings"}
          </button>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.includes("success") 
              ? "bg-green-100 text-green-700 border border-green-300" 
              : "bg-red-100 text-red-700 border border-red-300"
          }`}>
            {message}
          </div>
        )}

        <div className="space-y-8">
          {/* General Settings */}
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">General Settings</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Site Name
                </label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => handleInputChange("siteName", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Email
                </label>
                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  value={settings.contactPhone}
                  onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timezone
                </label>
                <select
                  value={settings.timezone}
                  onChange={(e) => handleInputChange("timezone", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">Eastern Time</option>
                  <option value="America/Chicago">Central Time</option>
                  <option value="America/Denver">Mountain Time</option>
                  <option value="America/Los_Angeles">Pacific Time</option>
                </select>
              </div>
            </div>
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Site Description
              </label>
              <textarea
                value={settings.siteDescription}
                onChange={(e) => handleInputChange("siteDescription", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Business Settings */}
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Business Settings</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Currency
                </label>
                <select
                  value={settings.currency}
                  onChange={(e) => handleInputChange("currency", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="CAD">CAD (C$)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tax Rate (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="1"
                  value={settings.taxRate}
                  onChange={(e) => handleInputChange("taxRate", parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Booking Advance Days
                </label>
                <input
                  type="number"
                  min="1"
                  value={settings.bookingAdvanceDays}
                  onChange={(e) => handleInputChange("bookingAdvanceDays", parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cancellation Window (Hours)
                </label>
                <input
                  type="number"
                  min="1"
                  value={settings.cancellationWindowHours}
                  onChange={(e) => handleInputChange("cancellationWindowHours", parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Hours
              </label>
              <input
                type="text"
                value={settings.businessHours}
                onChange={(e) => handleInputChange("businessHours", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
