import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter, 
  Users, 
  Award, 
  Clock, 
  CheckCircle, 
  X, 
  Save, 
  Eye, 
  EyeOff,
  AlertCircle,
  UserPlus,
  Star,
  Briefcase,
  Image as ImageIcon
} from "lucide-react";
import api from "../utils/api";

interface TeamMember {
  id: number;
  name: string;
  title: string;
  bio: string;
  image: string;
  specialties: string;
  experience: string;
  order_index: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

interface TeamForm {
  name: string;
  title: string;
  bio: string;
  image: string;
  specialties: string;
  experience: string;
  order_index: number;
  active: boolean;
}

const defaultMember: TeamForm = {
  name: "",
  title: "",
  bio: "",
  image: "",
  specialties: "",
  experience: "",
  order_index: 0,
  active: true
};

export default function TeamManager() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState<TeamForm>(defaultMember);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterActive, setFilterActive] = useState<boolean | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const handleImageUpload = async (file: File) => {
    try {
      setSaving(true);
      setError(null); // Clear any previous errors
      
      console.log('Starting image upload:', {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type
      });
      
      // Check authentication first
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setError('You must be logged in to upload images. Please log in again.');
        return;
      }
      
      const uploadResponse = await api.uploadImage(file);
      console.log('Upload response:', uploadResponse);
      
      if (uploadResponse && uploadResponse.data && uploadResponse.data.url) {
        setFormData({ ...formData, image: uploadResponse.data.url });
        console.log('Image uploaded successfully:', uploadResponse.data.url);
      } else {
        throw new Error('Invalid upload response - no URL received');
      }
    } catch (err: any) {
      console.error('Error uploading image:', err);
      console.error('Error details:', {
        message: err.message,
        status: err.status,
        response: err.response
      });
      
      let errorMessage = 'Failed to upload image';
      
      if (err.message) {
        errorMessage = err.message;
      } else if (err.status === 413) {
        errorMessage = 'File too large. Please use an image smaller than 10MB.';
      } else if (err.status === 415) {
        errorMessage = 'Invalid file type. Please use JPG, PNG, GIF, or WebP.';
      } else if (err.status === 401) {
        errorMessage = 'Authentication error. Please log in again.';
      } else if (err.status === 422) {
        errorMessage = 'Invalid file format. Please check your image file.';
      }
      
      setError(`Upload failed: ${errorMessage}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(file);
    } else {
      setError('Please upload an image file');
    }
  };

  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      const response = await api.getTeamMembers();
      if (response.success && response.data) {
        setTeamMembers(response.data as TeamMember[]);
      } else {
        setError(response.error || 'Failed to fetch team members');
      }
    } catch (err) {
      console.error('Error fetching team members:', err);
      setError('Failed to fetch team members');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      let response;
      
      if (editingMember) {
        response = await api.updateTeamMember(editingMember.id.toString(), formData);
      } else {
        response = await api.createTeamMember(formData);
      }

      if (response.success) {
        setShowForm(false);
        setEditingMember(null);
        setFormData(defaultMember);
        fetchTeamMembers();
      } else {
        setError(response.error || 'Failed to save team member');
      }
    } catch (err) {
      console.error('Error saving team member:', err);
      setError('Failed to save team member');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      try {
        const response = await api.deleteTeamMember(id.toString());
        if (response.success) {
          fetchTeamMembers();
        } else {
          setError(response.error || 'Failed to delete team member');
        }
      } catch (err) {
        console.error('Error deleting team member:', err);
        setError('Failed to delete team member');
      }
    }
  };

  const startEdit = (member: TeamMember) => {
    setEditingMember(member);
    const newFormData = {
      name: member.name,
      title: member.title,
      bio: member.bio,
      image: member.image,
      specialties: member.specialties,
      experience: member.experience,
      order_index: member.order_index,
      active: member.active
    };
    setFormData(newFormData);
    setShowForm(true);
  };

  const startAdd = () => {
    setEditingMember(null);
    setFormData(defaultMember);
    setShowForm(true);
  };

  const cancelEdit = () => {
    setShowForm(false);
    setEditingMember(null);
    setFormData(defaultMember);
  };

  // Filter and search
  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (member.specialties ? (() => {
        let specialtiesText = '';
        try {
          const parsed = JSON.parse(member.specialties);
          if (Array.isArray(parsed)) {
            specialtiesText = parsed.join(' ').toLowerCase();
          } else {
            specialtiesText = member.specialties.toLowerCase();
          }
        } catch (e) {
          specialtiesText = member.specialties.toLowerCase();
        }
        return specialtiesText.includes(searchTerm.toLowerCase());
      })() : false);

    const matchesFilter = filterActive === null || member.active === filterActive;
    
    return matchesSearch && matchesFilter;
  });

  // Calculate statistics
  const stats = {
    total: teamMembers.length,
    active: teamMembers.filter(m => m.active).length,
    inactive: teamMembers.filter(m => !m.active).length,
    averageExperience: teamMembers.length > 0 
      ? Math.round(teamMembers.reduce((acc, m) => {
          const years = m.experience ? parseInt(m.experience.match(/\d+/)?.[0] || '0') : 0;
          return acc + years;
        }, 0) / teamMembers.length)
      : 0
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Loading Team Members</h2>
          <p className="text-gray-500 dark:text-gray-400">Please wait while we fetch your team data...</p>
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
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Team Management</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your legal team members and their profiles</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="inline-flex items-center px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-all duration-200"
              >
                {viewMode === 'grid' ? <EyeOff size={20} className="mr-2" /> : <Eye size={20} className="mr-2" />}
                {viewMode === 'grid' ? 'List View' : 'Grid View'}
              </button>
              <button
                onClick={startAdd}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200"
              >
                <UserPlus size={20} className="mr-2" />
                Add Team Member
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
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Members</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Members</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.active}</p>
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
              <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <Award className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Experience</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.averageExperience}+ Years</p>
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
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Clock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Inactive</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.inactive}</p>
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

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search team members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <select
                value={filterActive === null ? 'all' : filterActive.toString()}
                onChange={(e) => setFilterActive(e.target.value === 'all' ? null : e.target.value === 'true')}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Members</option>
                <option value="true">Active Only</option>
                <option value="false">Inactive Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* Team Members Grid/List */}
        {filteredMembers.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              {searchTerm || filterActive !== null ? 'No matching team members' : 'No team members yet'}
            </h3>
            <p className="text-gray-500 dark:text-gray-500 mb-6">
              {searchTerm || filterActive !== null 
                ? 'Try adjusting your search or filters' 
                : 'Get started by adding your first team member'
              }
            </p>
            {!searchTerm && filterActive === null && (
              <button
                onClick={startAdd}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
              >
                <UserPlus size={20} className="mr-2" />
                Add First Member
              </button>
            )}
          </motion.div>
        ) : (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "space-y-4"
          }>
            {filteredMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
              >
                {/* Image */}
                <div className={`${viewMode === 'list' ? 'w-32 flex-shrink-0' : 'w-full h-48'}`}>
                  <img
                    src={member.image || 'https://via.placeholder.com/300x400?text=No+Image'}
                    alt={member.name}
                    className={`w-full h-full object-cover ${viewMode === 'list' ? 'h-32' : ''}`}
                    onError={(e) => {
                      console.error('Team member image failed to load:', member.image);
                      e.currentTarget.src = 'https://via.placeholder.com/300x400?text=No+Image';
                    }}
                    onLoad={() => {
                      console.log('Team member image loaded successfully:', member.image);
                    }}
                  />
                </div>

                {/* Content */}
                <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                        {member.name}
                      </h3>
                      <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">
                        {member.title}
                      </p>
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          member.active 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {member.active ? 'Active' : 'Inactive'}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {member.experience}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                    {member.bio}
                  </p>

                  {member.specialties && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Specialties:</h4>
                      <div className="flex flex-wrap gap-1">
                        {(() => {
                          let specialtiesArray: string[] = [];
                          
                          try {
                            // Try to parse as JSON first
                            const parsed = JSON.parse(member.specialties);
                            if (Array.isArray(parsed)) {
                              specialtiesArray = parsed;
                            } else {
                              // If not an array, treat as comma-separated string
                              specialtiesArray = member.specialties.split(',').map(s => s.trim());
                            }
                          } catch (e) {
                            // If JSON parsing fails, treat as comma-separated string
                            specialtiesArray = member.specialties.split(',').map(s => s.trim());
                          }
                          
                          return specialtiesArray.length > 0 ? (
                            specialtiesArray.map((specialty, idx) => (
                              <span
                                key={idx}
                                className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full text-xs font-medium"
                              >
                                {specialty}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-500 dark:text-gray-400 text-sm italic">
                              No specialties listed
                            </span>
                          );
                        })()}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(member)}
                      className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Edit size={16} className="mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="inline-flex items-center justify-center px-3 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Team Member Form Modal */}
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
              className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {editingMember ? 'Edit Team Member' : 'Add Team Member'}
                </h2>
                <button
                  onClick={cancelEdit}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter full name..."
                  />
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter job title..."
                  />
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Biography *
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter biography..."
                  />
                </div>

                {/* Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Profile Image
                  </label>
                  
                  {/* File Upload */}
                  <div 
                    className={`border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-blue-500 dark:hover:border-blue-400 transition-colors ${dragOver ? 'border-blue-500 dark:border-blue-400' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      id="image-upload"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleImageUpload(file);
                        }
                      }}
                      className="hidden"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      {saving ? (
                        <div className="flex flex-col items-center">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Uploading image...</p>
                        </div>
                      ) : (
                        <>
                          <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            <span className="font-medium text-blue-600 dark:text-blue-400">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </>
                      )}
                    </label>
                  </div>

                  {/* URL Input */}
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Or enter image URL..."
                    />
                    <ImageIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  </div>

                  {/* Image Preview */}
                  {formData.image && (
                    <div className="relative">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-lg border"
                        onError={(e) => {
                          console.error('Image failed to load:', formData.image);
                          e.currentTarget.src = 'https://via.placeholder.com/128x128?text=Invalid+Image';
                        }}
                        onLoad={() => {
                          console.log('Image loaded successfully:', formData.image);
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, image: "" })}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                </div>
                
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Upload an image from your computer or provide an image URL
                </p>

                {/* Specialties */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Specialties
                  </label>
                  <input
                    type="text"
                    value={formData.specialties}
                    onChange={(e) => setFormData({ ...formData, specialties: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter specialties (comma-separated)..."
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Separate multiple specialties with commas
                  </p>
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Experience
                  </label>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 15+ Years"
                  />
                </div>

                {/* Order Index */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.order_index}
                    onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) || 0 })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Lower numbers appear first
                  </p>
                </div>

                {/* Active Status */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="active"
                    checked={formData.active}
                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="active" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Active member (visible on website)
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={cancelEdit}
                  className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving || !formData.name || !formData.title || !formData.bio}
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
                      <span>{editingMember ? 'Update Member' : 'Add Member'}</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 