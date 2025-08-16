import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, X, Edit, Eye, EyeOff, TrendingUp, Users, Clock, CheckCircle, AlertCircle, Search, FileText, Target, Rocket, Award, Globe } from "lucide-react";
import api from "../utils/api";

interface AboutContent {
  id: number;
  intro: string;
  who_we_are: string;
  vision: string;
  mission: string;
  company_values: string;
  impact_stats: Array<{
    number: string;
    label: string;
    icon: string;
  }>;
  updated_at: string;
}

interface AboutForm {
  intro: string;
  who_we_are: string;
  vision: string;
  mission: string;
  company_values: string;
  impact_stats: Array<{
    number: string;
    label: string;
    icon: string;
  }>;
}

const defaultAbout: AboutForm = {
  intro: "",
  who_we_are: "",
  vision: "",
  mission: "",
  company_values: "",
  impact_stats: [
    { number: "15+", label: "Years of Excellence", icon: "🏆" },
    { number: "500+", label: "Successful Cases", icon: "⚖️" },
    { number: "100+", label: "Corporate Clients", icon: "🏢" },
    { number: "95%", label: "Client Satisfaction", icon: "⭐" }
  ]
};

export default function AboutManager() {
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<AboutForm>(defaultAbout);
  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    fetchAboutContent();
  }, []);

  useEffect(() => {
    console.log('About content state updated:', aboutContent);
    console.log('Loading state:', loading);
    console.log('Error state:', error);
  }, [aboutContent, loading, error]);

  useEffect(() => {
    console.log('Form data updated:', formData);
  }, [formData]);

  const fetchAboutContent = async () => {
    try {
      setLoading(true);
      console.log('Fetching about content...');
      const response = await api.getAboutContent();
      console.log('About content response:', response);
      if (response.success && response.data) {
        console.log('Setting about content:', response.data);
        const content = response.data as AboutContent;
        setAboutContent(content);
        setFormData({
          intro: content.intro || "",
          who_we_are: content.who_we_are || "",
          vision: content.vision || "",
          mission: content.mission || "",
          company_values: content.company_values || "",
          impact_stats: content.impact_stats || defaultAbout.impact_stats
        });
      } else {
        console.error('Failed to fetch about content:', response.error);
        setError(response.error || 'Failed to fetch about content');
      }
    } catch (err) {
      console.error('Error fetching about content:', err);
      setError('Failed to fetch about content');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      console.log('Saving about content with data:', formData);
      const response = await api.updateAboutContent(formData);
      console.log('Save about content response:', response);
      if (response.success) {
        setShowForm(false);
        fetchAboutContent();
      } else {
        console.error('Failed to save about content:', response.error);
        setError(response.error || 'Failed to save about content');
      }
    } catch (err) {
      console.error('Error saving about content:', err);
      setError('Failed to save about content');
    } finally {
      setSaving(false);
    }
  };

  const startEdit = () => {
    setFormData({
      intro: aboutContent?.intro || "",
      who_we_are: aboutContent?.who_we_are || "",
      vision: aboutContent?.vision || "",
      mission: aboutContent?.mission || "",
      company_values: aboutContent?.company_values || "",
      impact_stats: aboutContent?.impact_stats || defaultAbout.impact_stats
    });
    setShowForm(true);
  };

  const cancelEdit = () => {
    setShowForm(false);
    setFormData({
      intro: aboutContent?.intro || "",
      who_we_are: aboutContent?.who_we_are || "",
      vision: aboutContent?.vision || "",
      mission: aboutContent?.mission || "",
      company_values: aboutContent?.company_values || "",
      impact_stats: aboutContent?.impact_stats || defaultAbout.impact_stats
    });
  };

  // Calculate statistics
  const stats = {
    hasIntro: aboutContent?.intro ? 1 : 0,
    hasWhoWeAre: aboutContent?.who_we_are ? 1 : 0,
    hasVision: aboutContent?.vision ? 1 : 0,
    hasMission: aboutContent?.mission ? 1 : 0,
    hasValues: aboutContent?.company_values ? 1 : 0,
    totalSections: (aboutContent?.intro ? 1 : 0) + (aboutContent?.who_we_are ? 1 : 0) + (aboutContent?.vision ? 1 : 0) + (aboutContent?.mission ? 1 : 0) + (aboutContent?.company_values ? 1 : 0),
    lastUpdated: aboutContent?.updated_at ? new Date(aboutContent.updated_at).toLocaleDateString() : 'Never'
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Loading About Content</h2>
          <p className="text-gray-500 dark:text-gray-400">Please wait while we fetch your content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-20">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-[60]">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">About Us Management</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your company's about page content and messaging</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setPreviewMode(!previewMode)}
                className="inline-flex items-center px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-all duration-200"
              >
                {previewMode ? <EyeOff size={20} className="mr-2" /> : <Eye size={20} className="mr-2" />}
                {previewMode ? 'Hide Preview' : 'Preview'}
              </button>
              <button
                onClick={startEdit}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200"
              >
                <Edit size={20} className="mr-2" />
                Edit Content
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Sections</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalSections}/5</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-center">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Intro Section</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.hasIntro ? '✓' : '✗'}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Target className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Vision & Mission</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.hasVision && stats.hasMission ? '✓' : '✗'}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <Clock className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Last Updated</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{stats.lastUpdated}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center justify-between"
          >
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              {error}
            </div>
            <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700">
              <X size={20} />
            </button>
          </motion.div>
        )}

        {/* Content Display */}
        {!showForm && (
          <div className="grid gap-6">
            {/* Intro Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Introduction</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Company overview and description</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  aboutContent?.intro 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                  {aboutContent?.intro ? 'Complete' : 'Missing'}
                </span>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                {aboutContent?.intro ? (
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{aboutContent.intro}</p>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 italic">No introduction content added yet.</p>
                )}
              </div>
            </motion.div>

            {/* Who We Are Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
                    <Users className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Who We Are</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Company identity and purpose</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  aboutContent?.who_we_are 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                  {aboutContent?.who_we_are ? 'Complete' : 'Missing'}
                </span>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                {aboutContent?.who_we_are ? (
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{aboutContent.who_we_are}</p>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 italic">No "Who We Are" content added yet.</p>
                )}
              </div>
            </motion.div>

            {/* Vision Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <Target className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Vision</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Company vision statement</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  aboutContent?.vision 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                  {aboutContent?.vision ? 'Complete' : 'Missing'}
                </span>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                {aboutContent?.vision ? (
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{aboutContent.vision}</p>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 italic">No vision statement added yet.</p>
                )}
              </div>
            </motion.div>

            {/* Mission Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
                    <Rocket className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Mission</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Company mission statement</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  aboutContent?.mission 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                  {aboutContent?.mission ? 'Complete' : 'Missing'}
                </span>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                {aboutContent?.mission ? (
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{aboutContent.mission}</p>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 italic">No mission statement added yet.</p>
                )}
              </div>
            </motion.div>

            {/* Company Values Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                    <Award className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Company Values</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Core values and principles</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  aboutContent?.company_values 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                  {aboutContent?.company_values ? 'Complete' : 'Missing'}
                </span>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                {aboutContent?.company_values ? (
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{aboutContent.company_values}</p>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 italic">No company values added yet.</p>
                )}
              </div>
            </motion.div>
          </div>
        )}

        {/* About Form Modal */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[100]"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Edit About Content
                  </h2>
                  <button
                    onClick={cancelEdit}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Introduction */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Introduction *
                    </label>
                    <textarea
                      value={formData.intro}
                      onChange={(e) => setFormData({ ...formData, intro: e.target.value })}
                      rows={4}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your company introduction and overview..."
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      This will appear as the main description of your company.
                    </p>
                  </div>

                  {/* Who We Are */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Who We Are *
                    </label>
                    <textarea
                      value={formData.who_we_are}
                      onChange={(e) => setFormData({ ...formData, who_we_are: e.target.value })}
                      rows={3}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter a brief description of your company's identity and purpose..."
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      What makes your company unique and what it stands for?
                    </p>
                  </div>

                  {/* Vision */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Vision Statement *
                    </label>
                    <textarea
                      value={formData.vision}
                      onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                      rows={3}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your company vision statement..."
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      What is your company's long-term vision and goals?
                    </p>
                  </div>

                  {/* Mission */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Mission Statement *
                    </label>
                    <textarea
                      value={formData.mission}
                      onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
                      rows={3}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your company mission statement..."
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      What is your company's purpose and how do you serve your clients?
                    </p>
                  </div>

                  {/* Company Values */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Company Values *
                    </label>
                    <textarea
                      value={formData.company_values}
                      onChange={(e) => setFormData({ ...formData, company_values: e.target.value })}
                      rows={4}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your company values and principles..."
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      List your core values, principles, and what makes your company unique.
                    </p>
                  </div>

                  {/* Impact Stats */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Impact Statistics *
                    </label>
                    <div className="space-y-4">
                      {formData.impact_stats.map((stat, index) => (
                        <div key={index} className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                                Number
                              </label>
                              <input
                                type="text"
                                value={stat.number}
                                onChange={(e) => {
                                  const newStats = [...formData.impact_stats];
                                  newStats[index].number = e.target.value;
                                  setFormData({ ...formData, impact_stats: newStats });
                                }}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 dark:bg-gray-600 dark:border-gray-500 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="e.g., 15+"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                                Label
                              </label>
                              <input
                                type="text"
                                value={stat.label}
                                onChange={(e) => {
                                  const newStats = [...formData.impact_stats];
                                  newStats[index].label = e.target.value;
                                  setFormData({ ...formData, impact_stats: newStats });
                                }}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 dark:bg-gray-600 dark:border-gray-500 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="e.g., Years of Excellence"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                                Icon
                              </label>
                              <input
                                type="text"
                                value={stat.icon}
                                onChange={(e) => {
                                  const newStats = [...formData.impact_stats];
                                  newStats[index].icon = e.target.value;
                                  setFormData({ ...formData, impact_stats: newStats });
                                }}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 dark:bg-gray-600 dark:border-gray-500 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="e.g., 🏆"
                              />
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const newStats = formData.impact_stats.filter((_, i) => i !== index);
                              setFormData({ ...formData, impact_stats: newStats });
                            }}
                            className="mt-2 text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            Remove Statistic
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => {
                          const newStats = [...formData.impact_stats, { number: "", label: "", icon: "" }];
                          setFormData({ ...formData, impact_stats: newStats });
                        }}
                        className="w-full py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                      >
                        + Add New Statistic
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Highlight your company's achievements and key metrics. You can add, edit, or remove statistics.
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  {/* Validation indicator */}
                  <div className="flex-1 text-sm text-gray-600 dark:text-gray-400">
                    {!formData.intro && <div>• Introduction is required</div>}
                    {!formData.who_we_are && <div>• Who We Are is required</div>}
                    {!formData.vision && <div>• Vision statement is required</div>}
                    {!formData.mission && <div>• Mission statement is required</div>}
                    {!formData.company_values && <div>• Company values are required</div>}
                    {formData.impact_stats.some(stat => !stat.number || !stat.label) && <div>• Impact statistics are required</div>}
                  </div>
                  <button
                    onClick={cancelEdit}
                    className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving || !formData.intro || !formData.who_we_are || !formData.vision || !formData.mission || !formData.company_values || formData.impact_stats.some(stat => !stat.number || !stat.label)}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 font-semibold"
                  >
                    {saving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save size={16} />
                        <span>Save Changes</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Preview Mode */}
        {previewMode && !showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Live Preview</h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">How your content will appear on the about page</span>
            </div>
            
            <div className="space-y-6">
              {aboutContent?.intro && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Introduction</h4>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{aboutContent.intro}</p>
                </div>
              )}
              
              {aboutContent?.who_we_are && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Who We Are</h4>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{aboutContent.who_we_are}</p>
                </div>
              )}
              
              {aboutContent?.vision && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Vision</h4>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{aboutContent.vision}</p>
                </div>
              )}
              
              {aboutContent?.mission && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Mission</h4>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{aboutContent.mission}</p>
                </div>
              )}
              
              {aboutContent?.company_values && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Company Values</h4>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{aboutContent.company_values}</p>
                </div>
              )}
              
              {aboutContent?.impact_stats && aboutContent.impact_stats.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Impact Statistics</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {aboutContent.impact_stats.map((stat, index) => (
                      <div key={index} className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 flex items-center justify-between">
                        <div>
                          <p className="text-lg font-bold text-gray-900 dark:text-white">{stat.number}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                        </div>
                        <div className="p-2 bg-white dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400">
                          {stat.icon}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {!aboutContent?.intro && !aboutContent?.who_we_are && !aboutContent?.vision && !aboutContent?.mission && !aboutContent?.company_values && (!aboutContent?.impact_stats || aboutContent.impact_stats.length === 0) && (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400">No content available for preview. Add content to see how it will appear.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
} 