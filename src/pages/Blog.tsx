import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Calendar, User, ArrowRight, Zap, Clock, Eye } from "lucide-react";
import api from "../utils/api";
import LoadingSpinner from "../components/LoadingSpinner";

interface BlogPost {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  author: string;
  read_time: string;
  views: number;
  category: string;
}

export default function Blog() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Corporate Law", "Property Law", "Mining Law", "Family Law", "Litigation"];

  useEffect(() => {
    fetchBlogs();
  }, [selectedCategory]);

  const fetchBlogs = async () => {
    try {
      let data;
      if (selectedCategory === "All") {
        data = await api.getPublicBlogs();
      } else {
        data = await api.getPublicBlogsByCategory(selectedCategory);
      }
      setBlogs(data as BlogPost[]);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading articles..." />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Legal Insights & Blog - Republica Attorneys & Consultants</title>
        <meta name="description" content="Read the latest legal insights, updates, and articles from Republica Attorneys. Stay informed about Tanzania's legal landscape and regulations." />
        <meta name="keywords" content="legal blog Tanzania, law articles, legal insights, Tanzania legal updates, legal advice blog" />
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
                <span className="text-white font-medium">Legal Insights</span>
              </motion.div>
              
              <h1 className="text-6xl lg:text-8xl font-bold mb-8 text-white leading-tight">
                Legal Insights
                <br />
                <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                  & Updates
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
                Stay informed with the latest legal developments, insights, and practical guidance 
                from our expert team of legal professionals.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Categories Filter */}
        <section className="py-16 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20"></div>
          
          <div className="relative max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-wrap justify-center gap-4"
            >
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-blue-600 to-orange-500 text-white shadow-lg'
                      : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Blog Posts */}
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
                <span className="text-gray-900 dark:text-white">Latest</span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                  Articles
                </span>
              </h2>
            </motion.div>

            {blogs.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog, index) => (
                  <motion.article
                    key={blog.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="group"
                  >
                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 overflow-hidden h-full">
                      {/* Category Badge */}
                      <div className="p-6 pb-0">
                        <span className="inline-block bg-gradient-to-r from-blue-500/10 to-orange-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                          {blog.category}
                        </span>
                      </div>
                      
                      {/* Content */}
                      <div className="p-6">
                        {/* Meta Info */}
                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                          <div className="flex items-center">
                            <Calendar size={16} className="mr-1" />
                            {new Date(blog.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <Clock size={16} className="mr-1" />
                            {blog.read_time}
                          </div>
                          <div className="flex items-center">
                            <Eye size={16} className="mr-1" />
                            {blog.views}
                          </div>
                        </div>
                        
                        {/* Title */}
                        <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                          {blog.title}
                        </h3>
                        
                        {/* Excerpt */}
                        <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3 leading-relaxed">
                          {blog.excerpt || blog.content.substring(0, 150) + '...'}
                        </p>
                        
                        {/* Author */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <User size={16} className="mr-2 text-gray-400" />
                            <span className="text-sm text-gray-600 dark:text-gray-300">{blog.author}</span>
                          </div>
                          
                          {/* Read More */}
                          <Link
                            to={`/blog/${blog.id}`}
                            className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:text-orange-500 transition-colors duration-300"
                          >
                            <span>Read More</span>
                            <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" size={16} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  No articles found for the selected category.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter CTA */}
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
                Stay Updated
              </h2>
              <p className="text-xl mb-12 text-blue-100 leading-relaxed">
                Subscribe to our newsletter for the latest legal insights, updates, and expert analysis 
                delivered directly to your inbox.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-xl border-0 bg-white/10 backdrop-blur-sm text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300"
                >
                  Subscribe
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}