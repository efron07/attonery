import React, { useState } from "react";
import { motion } from "framer-motion";

export default function AboutEditor() {
  const [about, setAbout] = useState({
    intro: "Republica Attorneys & Consultants is a full-service law firm based in Dar es Salaam...",
    vision: "To be the most trusted legal partner in East Africa...",
    mission: "To offer strategic, ethical, and accessible legal services...",
    values: "Integrity, Professionalism, Confidentiality, Results-driven"
  });

  const handleChange = (field: keyof typeof about, value: string) => {
    setAbout(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Save to backend or local DB here
    alert("✅ About content saved!");
  };

  return (
    <div className="p-8 bg-white dark:bg-gray-900 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Edit About Page</h1>

        <div className="grid gap-6 max-w-4xl">
          <div>
            <label className="block mb-1 font-semibold text-gray-900 dark:text-white">Who We Are</label>
            <textarea
              className="w-full border px-4 py-3 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              rows={5}
              value={about.intro}
              onChange={(e) => handleChange("intro", e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-900 dark:text-white">🎯 Vision</label>
            <textarea
              className="w-full border px-4 py-3 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              rows={3}
              value={about.vision}
              onChange={(e) => handleChange("vision", e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-900 dark:text-white">🚀 Mission</label>
            <textarea
              className="w-full border px-4 py-3 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              rows={3}
              value={about.mission}
              onChange={(e) => handleChange("mission", e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-900 dark:text-white">💼 Core Values</label>
            <input
              className="w-full border px-4 py-3 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              type="text"
              value={about.values}
              onChange={(e) => handleChange("values", e.target.value)}
            />
          </div>

          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
          >
            💾 Save Changes
          </button>
        </div>
      </motion.div>
    </div>
  );
}