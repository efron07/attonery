import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Zap, Award, Users, Globe } from "lucide-react";
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

export default function Team() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      const data = await api.getPublicTeam();
      setTeam(data as TeamMember[]);
    } catch (err) {
      console.error('Error fetching team members:', err);
      setError('Failed to load team members');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Loading Team Page</h2>
            <p className="text-gray-500 dark:text-gray-400">Please wait while we fetch the team data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Error Loading Team</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-4">{error}</p>
            <button
              onClick={fetchTeamMembers}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const stats = [
    { number: "50+", label: "Legal Experts", icon: Users },
    { number: "15+", label: "Years Experience", icon: Award },
    { number: "25+", label: "Countries Served", icon: Globe },
    { number: "500+", label: "Cases Won", icon: Award }
  ];

  return (
    <>
      <Helmet>
        <title>Our Legal Team - Republica Attorneys & Consultants</title>
        <meta name="description" content="Meet the experienced legal team at Republica Attorneys. Expert lawyers specializing in various areas of law in Tanzania." />
        <meta name="keywords" content="legal team Tanzania, experienced lawyers, Republica Attorneys team, law firm partners, legal experts Dar es Salaam" />
      </Helmet>

      <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-orange-600">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,255,255,0.1),transparent)]"></div>
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,rgba(255,255,255,0.05)_180deg,transparent_360deg)]"
            ></motion.div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-6 py-32 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-8"
              >
                <Zap className="text-orange-400" size={20} />
                <span className="text-white font-medium">Our Legal Team</span>
              </motion.div>
              
              <h1 className="text-6xl lg:text-8xl font-bold mb-8 text-white leading-tight">
                Meet Our
                <br />
                <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                  Expert Team
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
                Our experienced team of legal professionals brings decades of combined expertise 
                across all areas of law, delivering exceptional results for our clients.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20"></div>
          
          <div className="relative max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center group"
                >
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20">
                    <div className="bg-gradient-to-br from-blue-500 to-orange-500 rounded-2xl p-4 w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <stat.icon className="text-white" size={32} />
                    </div>
                    <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Members */}
        <section className="py-32 relative">
          <div className="absolute inset-0 bg-white dark:bg-gray-900"></div>
          
          <div className="relative max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl lg:text-7xl font-bold mb-6">
                <span className="text-gray-900 dark:text-white">Our</span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                  Legal Experts
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Meet the professionals who make our legal excellence possible
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              {team.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group"
                >
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 overflow-hidden">
                    {/* Image */}
                    <div className="relative overflow-hidden">
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        src={member.image || 'https://via.placeholder.com/400x320?text=No+Image'}
                        alt={member.name}
                        className="w-full h-80 object-cover"
                        onLoad={() => console.log('Image loaded:', member.image)}
                        onError={(e) => {
                          console.error('Image failed to load:', member.image);
                          e.currentTarget.src = 'https://via.placeholder.com/400x320?text=Image+Not+Available';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl px-3 py-1 text-white text-sm font-medium w-fit">
                          {member.experience || 'Experience not specified'}
                        </div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-8">
                      <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {member.name}
                      </h3>
                      <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">
                        {member.title}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                        {member.bio}
                      </p>
                      
                      {/* Specialties */}
                      <div className="space-y-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white">Specialties:</h4>
                        <div className="flex flex-wrap gap-2">
                          {member.specialties ? (() => {
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
                                  className="bg-gradient-to-r from-blue-500/10 to-orange-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-medium"
                                >
                                  {specialty}
                                </span>
                              ))
                            ) : (
                              <span className="text-gray-500 dark:text-gray-400 text-sm italic">
                                No specialties listed
                              </span>
                            );
                          })() : (
                            <span className="text-gray-500 dark:text-gray-400 text-sm italic">
                              No specialties listed
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-700 to-orange-600"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]"></div>
          
          <div className="relative max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl lg:text-7xl font-bold mb-8 text-white">
                Work With Our Team
              </h2>
              <p className="text-xl mb-12 text-blue-100 leading-relaxed">
                Ready to work with Tanzania's most experienced legal professionals? 
                Contact us today to discuss your legal needs.
              </p>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center bg-white text-blue-600 font-semibold px-10 py-5 rounded-2xl hover:bg-gray-100 transition-all duration-300 shadow-2xl"
                >
                  <Users className="mr-3" size={24} />
                  Contact Our Team
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}