import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, Briefcase, TrendingUp, Shield, Users } from "lucide-react";

export default function CommercialLitigation() {
  const services = [
    "Contract Breach Claims",
    "Partnership & Shareholder Disputes",
    "Banking & Finance Litigation",
    "Insurance Claims",
    "Intellectual Property Disputes",
    "Employment & Labor Disputes",
    "Regulatory Compliance Issues",
    "International Commercial Arbitration"
  ];

  const industries = [
    { name: "Banking & Finance", icon: "🏦", cases: "50+" },
    { name: "Manufacturing", icon: "🏭", cases: "75+" },
    { name: "Technology", icon: "💻", cases: "30+" },
    { name: "Real Estate", icon: "🏢", cases: "100+" },
    { name: "Mining & Energy", icon: "⚡", cases: "40+" },
    { name: "Healthcare", icon: "🏥", cases: "25+" }
  ];

  return (
    <>
      <Helmet>
        <title>Commercial Litigation Services - Republica Attorneys</title>
        <meta name="description" content="Expert commercial litigation services in Tanzania. Business disputes, contract claims, arbitration, and corporate legal representation." />
        <meta name="keywords" content="commercial litigation Tanzania, business disputes, contract law, arbitration, corporate litigation" />
      </Helmet>

      <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-slate-900 via-blue-800 to-indigo-900 text-white py-24">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-6">
            <Link
              to="/services"
              className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Services
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl"
            >
              <div className="flex items-center mb-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 mr-6">
                  <Briefcase size={48} className="text-white" />
                </div>
                <div>
                  <h1 className="text-5xl lg:text-6xl font-bold mb-4">
                    Commercial Litigation
                  </h1>
                  <p className="text-xl lg:text-2xl text-white/90">
                    Strategic business dispute resolution and corporate advocacy
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl font-bold mb-6">
                  Protecting Your Business Interests
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  Commercial disputes can threaten your business operations and bottom line. 
                  Our experienced commercial litigation team understands the complexities of 
                  business law and works strategically to resolve disputes efficiently while 
                  protecting your commercial interests.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  We represent businesses of all sizes across various industries, from startups 
                  to multinational corporations, providing practical solutions that minimize 
                  disruption to your business operations.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-xl"
              >
                <h3 className="text-2xl font-bold mb-6">Resolution Methods</h3>
                <div className="space-y-6">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-bold text-lg">Negotiation</h4>
                    <p className="text-gray-600 dark:text-gray-300">Cost-effective early resolution</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-bold text-lg">Mediation</h4>
                    <p className="text-gray-600 dark:text-gray-300">Facilitated dispute resolution</p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-bold text-lg">Arbitration</h4>
                    <p className="text-gray-600 dark:text-gray-300">Private binding resolution</p>
                  </div>
                  <div className="border-l-4 border-red-500 pl-4">
                    <h4 className="font-bold text-lg">Litigation</h4>
                    <p className="text-gray-600 dark:text-gray-300">Court-based resolution</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Industries Section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6">Industry Experience</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Proven track record across diverse business sectors
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {industries.map((industry, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="text-4xl mb-4">{industry.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{industry.name}</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold">{industry.cases} Cases</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6">Our Commercial Litigation Services</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Comprehensive business dispute resolution across all commercial areas
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-700 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <CheckCircle className="text-blue-600 mb-4" size={24} />
                  <h3 className="font-semibold text-lg">{service}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Advantages Section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6">Our Competitive Advantages</h2>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 rounded-2xl p-8 mb-6">
                  <TrendingUp size={64} className="mx-auto text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Business-Focused Solutions</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  We understand business operations and provide solutions that minimize 
                  disruption while achieving favorable outcomes for your company.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center"
              >
                <div className="bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-2xl p-8 mb-6">
                  <Shield size={64} className="mx-auto text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Risk Management</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Proactive risk assessment and strategic planning to prevent disputes 
                  and protect your business from potential legal challenges.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center"
              >
                <div className="bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 rounded-2xl p-8 mb-6">
                  <Users size={64} className="mx-auto text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Collaborative Approach</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  We work closely with your management team to understand your business 
                  objectives and align our legal strategy with your commercial goals.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold mb-6">
                Facing a Business Dispute?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Get strategic legal counsel to protect your business interests
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors duration-300"
              >
                <Briefcase className="mr-2" size={20} />
                Schedule Business Consultation
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}