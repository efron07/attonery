import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Admin Dashboard</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            to="/admin/services"
            className="p-6 bg-white dark:bg-gray-800 shadow hover:shadow-lg rounded-xl border-l-4 border-blue-600 hover:scale-[1.02] transition-all duration-300"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Manage Services</h2>
            <p className="text-gray-600 dark:text-gray-300">Add, edit, or remove legal services.</p>
          </Link>

          <Link
            to="/admin/about"
            className="p-6 bg-white dark:bg-gray-800 shadow hover:shadow-lg rounded-xl border-l-4 border-green-600 hover:scale-[1.02] transition-all duration-300"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Edit About Page</h2>
            <p className="text-gray-600 dark:text-gray-300">Update vision, mission, and company info.</p>
          </Link>

          <Link
            to="/admin/blog"
            className="p-6 bg-white dark:bg-gray-800 shadow hover:shadow-lg rounded-xl border-l-4 border-yellow-500 hover:scale-[1.02] transition-all duration-300"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Blog Manager</h2>
            <p className="text-gray-600 dark:text-gray-300">Write and publish legal articles.</p>
          </Link>

          <Link
            to="/admin/team"
            className="p-6 bg-white dark:bg-gray-800 shadow hover:shadow-lg rounded-xl border-l-4 border-purple-600 hover:scale-[1.02] transition-all duration-300"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Team Manager</h2>
            <p className="text-gray-600 dark:text-gray-300">Manage team members and profiles.</p>
          </Link>

          <Link
            to="/admin/contact"
            className="p-6 bg-white dark:bg-gray-800 shadow hover:shadow-lg rounded-xl border-l-4 border-red-600 hover:scale-[1.02] transition-all duration-300"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Contact Settings</h2>
            <p className="text-gray-600 dark:text-gray-300">Edit email, WhatsApp number, and map info.</p>
          </Link>

          <div className="p-6 bg-white dark:bg-gray-800 shadow rounded-xl border-l-4 border-gray-400">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Analytics</h2>
            <p className="text-gray-600 dark:text-gray-300">View website statistics and inquiries.</p>
            <p className="text-sm text-gray-500 mt-2">Coming Soon</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}