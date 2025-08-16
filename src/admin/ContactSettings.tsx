import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import api from "../utils/api";

interface ContactSettings {
  id: number;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  map_embed: string;
  office_hours: string;
  created_at: string;
  updated_at: string;
}

export default function ContactSettings() {
  const [contact, setContact] = useState<ContactSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    whatsapp: "",
    address: "",
    map_embed: "",
    office_hours: ""
  });

  useEffect(() => {
    fetchContactSettings();
  }, []);

  const fetchContactSettings = async () => {
    try {
      setLoading(true);
      const response = await api.getContactSettings() as { success: boolean; data?: ContactSettings; error?: string };
      if (response.success && response.data) {
        const settings = response.data as ContactSettings;
        setContact(settings);
        setFormData({
          email: settings.email || "",
          phone: settings.phone || "",
          whatsapp: settings.whatsapp || "",
          address: settings.address || "",
          map_embed: settings.map_embed || "",
          office_hours: settings.office_hours || ""
        });
      } else {
        setError(response.error || 'Failed to fetch contact settings');
      }
    } catch (err) {
      console.error('Error fetching contact settings:', err);
      setError('Failed to fetch contact settings');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const response = await api.updateContactSettings(formData) as { success: boolean; error?: string };
      if (response.success) {
        alert("✅ Contact settings updated successfully!");
        fetchContactSettings(); // Refresh data
      } else {
        setError(response.error || 'Failed to update contact settings');
      }
    } catch (err) {
      console.error('Error updating contact settings:', err);
      setError('Failed to update contact settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Loading Contact Settings</h2>
          <p className="text-gray-500 dark:text-gray-400">Please wait while we fetch your contact information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-20">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Contact Settings</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your company's contact information and office details</p>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Last updated: {contact?.updated_at ? new Date(contact.updated_at).toLocaleDateString() : 'Never'}
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
              <p className="text-sm">{error}</p>
            </div>
          )}

          <div className="grid gap-6">
            <div>
              <label className="block mb-2 font-semibold text-gray-900 dark:text-white">📧 Email Address</label>
              <input
                className="w-full border border-gray-300 px-4 py-3 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="info@company.com"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-900 dark:text-white">📞 Phone Number</label>
              <input
                className="w-full border border-gray-300 px-4 py-3 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="+255 22 123 4567"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-900 dark:text-white">📲 WhatsApp Number</label>
              <input
                className="w-full border border-gray-300 px-4 py-3 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                type="text"
                value={formData.whatsapp}
                onChange={(e) => handleChange("whatsapp", e.target.value)}
                placeholder="+255 755 123 456"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-900 dark:text-white">🏢 Office Address</label>
              <textarea
                className="w-full border border-gray-300 px-4 py-3 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
                placeholder="Enter your office address..."
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-900 dark:text-white">🗺 Google Map Embed Code</label>
              <textarea
                className="w-full border border-gray-300 px-4 py-3 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={5}
                value={formData.map_embed}
                onChange={(e) => handleChange("map_embed", e.target.value)}
                placeholder="Paste your Google Maps embed code here..."
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Get this from Google Maps by clicking "Share" → "Embed a map"
              </p>
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-900 dark:text-white">🕒 Office Hours</label>
              <textarea
                className="w-full border border-gray-300 px-4 py-3 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
                value={formData.office_hours}
                onChange={(e) => handleChange("office_hours", e.target.value)}
                placeholder="Enter office hours in JSON format or plain text..."
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                You can enter as plain text or JSON format for structured display
              </p>
            </div>

            <div className="flex justify-end pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold flex items-center space-x-2"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <span>💾</span>
                    <span>Save Contact Settings</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}