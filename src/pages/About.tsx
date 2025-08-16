import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Target, Rocket, Award, Users, Globe, Zap } from "lucide-react";
import api from "../utils/api";

interface AboutContent {
  id: number;
  intro: string;
  who_we_are: string;
  vision: string;
  mission: string;
  company_values: Record<string, string>;
  impact_stats: Array<{
    number: string;
    label: string;
    icon: string;
  }>;
  updated_at: string;
}

interface RawAboutContent {
  id: number;
  intro: string;
  who_we_are: string;
  vision: string;
  mission: string;
  company_values: string;
  impact_stats: string;
  updated_at: string;
}

export default function About() {
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAboutContent();
  }, []);

  const fetchAboutContent = async () => {
    try {
      setLoading(true);
      const data = await api.getPublicAbout() as RawAboutContent;
      
      // Parse JSON strings from the backend
      const parsedData: AboutContent = {
        ...data,
        company_values: JSON.parse(data.company_values),
        impact_stats: JSON.parse(data.impact_stats)
      };
      
      setAboutContent(parsedData);
    } catch (err) {
      console.error('Error fetching about content:', err);
      setError('Failed to load about content');
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
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Loading About Page</h2>
            <p className="text-gray-500 dark:text-gray-400">Please wait while we fetch the content...</p>
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
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Error Loading Content</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-4">{error}</p>
            <button
              onClick={fetchAboutContent}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>About Us - Republica Attorneys & Consultants</title>
        <meta name="description" content="Learn about Republica Attorneys & Consultants, a leading law firm in Dar es Salaam, Tanzania. Our vision, mission, and commitment to legal excellence." />
        <meta name="keywords" content="about Republica Attorneys, Tanzania law firm, legal team, vision mission, Dar es Salaam lawyers" />
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
                <span className="text-white font-medium">About Our Firm</span>
              </motion.div>
              
              <h1 className="text-6xl lg:text-8xl font-bold mb-8 text-white leading-tight">
                About
                <br />
                <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                  Republica Attorneys
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
                {aboutContent?.intro || "Republica Attorneys & Consultants is a full-service law firm based in Dar es Salaam, Tanzania, delivering expert legal solutions across corporate, commercial, civil, and international domains."}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20"></div>
          
          <div className="relative max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <h2 className="text-5xl font-bold">
                  <span className="text-gray-900 dark:text-white">Who</span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                    We Are
                  </span>
                </h2>
                
                <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {aboutContent?.who_we_are ? (
                    <p>{aboutContent.who_we_are}</p>
                  ) : (
                    <>
                      <p>
                        With a seasoned team of legal professionals, we provide advisory and litigation services 
                        tailored to clients ranging from startups to multinational corporations, investors, and individuals.
                      </p>
                      <p>
                        Our commitment is to deliver practical, timely, and cost-effective legal services that align 
                        with Tanzania's regulatory environment while meeting global standards.
                      </p>
                      <p>
                        We leverage cutting-edge technology and innovative approaches to provide our clients with 
                        the most efficient and effective legal solutions in the market.
                      </p>
                    </>
                  )}
                </div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-orange-500 text-white px-8 py-4 rounded-2xl font-semibold shadow-xl"
                >
                  <Users size={20} />
                  <span>Meet Our Team</span>
                </motion.div>
              </motion.div>

              {/* Visual Element */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="flex justify-center"
              >
                <div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-orange-500/20 rounded-full blur-3xl"
                  ></motion.div>
                  
                  <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-12 border border-white/20 shadow-2xl">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <Award size={200} className="text-blue-600 dark:text-blue-400" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Vision, Mission, Values */}
        <section className="py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-orange-600">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.1),transparent)]"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl lg:text-7xl font-bold mb-6 text-white">
                Our Foundation
              </h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Built on strong principles and driven by excellence
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-12">
              {[
                {
                  icon: Target,
                  title: "Vision",
                  description: aboutContent?.vision || "To be the most trusted legal partner in East Africa, empowering clients with clarity, protection, and legal confidence.",
                  gradient: "from-blue-400 to-blue-600",
                  delay: 0
                },
                {
                  icon: Rocket,
                  title: "Mission", 
                  description: aboutContent?.mission || "To offer strategic, ethical, and accessible legal services across diverse sectors and jurisdictions.",
                  gradient: "from-orange-400 to-orange-600",
                  delay: 0.2
                },
                {
                  icon: Award,
                  title: "Core Values",
                  description: aboutContent?.company_values ? 
                    Object.values(aboutContent.company_values).join(' • ') : 
                    "Integrity • Professionalism • Confidentiality • Results-driven Approach • Innovation • Client-Centricity",
                  gradient: "from-blue-400 to-orange-500",
                  delay: 0.4
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: item.delay }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group text-center"
                >
                  <div className="relative mb-8">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`bg-gradient-to-br ${item.gradient} rounded-3xl p-8 mx-auto w-fit shadow-2xl group-hover:shadow-3xl transition-all duration-500`}
                    >
                      <item.icon size={64} className="text-white" />
                    </motion.div>
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500`}></div>
                  </div>
                  
                  <h3 className="text-3xl font-bold mb-6 text-white">{item.title}</h3>
                  <p className="text-blue-100 leading-relaxed text-lg">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-orange-50 dark:from-gray-900 dark:to-orange-900/20"></div>
          
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
                  Impact
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {aboutContent?.impact_stats?.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center group"
                >
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20">
                    <div className="text-4xl mb-4">{stat.icon}</div>
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
      </div>
    </>
  );
}