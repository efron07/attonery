import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, Globe, TrendingUp, Shield, Briefcase } from "lucide-react";

export default function TradeLaw() {
  const services = [
    "International Trade Agreements",
    "Cross-Border Transaction Structuring",
    "Letters of Credit & Trade Finance",
    "Import/Export Compliance",
    "Foreign Exchange Regulations",
    "Trade Dispute Resolution",
    "Customs & Tariff Advisory",
    "International Arbitration"
  ];

  const tradeAreas = [
    {
      area: "Import/Export Operations",
      description: "Comprehensive support for international trade operations",
      features: ["Customs clearance", "Documentation", "Compliance", "Risk management"]
    },
    {
      area: "Trade Finance",
      description: "Legal support for trade financing instruments",
      features: ["Letters of credit", "Bank guarantees", "Trade loans", "Risk mitigation"]
    },
    {
      area: "Cross-Border Investments",
      description: "Legal framework for international investments",
      features: ["Joint ventures", "Foreign direct investment", "Regulatory compliance", "Tax optimization"]
    }
  ];

  return (
    <>
      <Helmet>
        <title>International Trade & Finance Law - Republica Attorneys</title>
        <meta name="description" content="Expert international trade and finance law services. Cross-border transactions, trade compliance, and international business law in Tanzania." />
        <meta name="keywords" content="international trade law, finance law, cross-border transactions, trade compliance, Tanzania" />
      </Helmet>

      <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-cyan-900 via-blue-800 to-indigo-900 text-white py-24">
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
                  <Globe size={48} className="text-white" />
                </div>
                <div>
                  <h1 className="text-5xl lg:text-6xl font-bold mb-4">
                    International Trade Law
                  </h1>
                  <p className="text-xl lg:text-2xl text-white/90">
                    Global commerce and cross-border transaction expertise
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
                  Navigate Global Markets with Confidence
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  In today's interconnected global economy, international trade and finance law 
                  expertise is essential for businesses looking to expand beyond borders. Our 
                  specialized team provides comprehensive legal support for cross-border transactions, 
                  trade compliance, and international business operations.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  We help businesses navigate complex international regulations, structure 
                  cross-border deals, and ensure compliance with both Tanzanian and international 
                  trade laws, enabling successful global expansion and operations.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-xl"
              >
                <h3 className="text-2xl font-bold mb-6">Global Trade Statistics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">International Deals</span>
                    <span className="text-2xl font-bold text-cyan-600">200+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Countries Covered</span>
                    <span className="text-2xl font-bold text-cyan-600">25+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Trade Value (USD)</span>
                    <span className="text-2xl font-bold text-cyan-600">$500M+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Success Rate</span>
                    <span className="text-2xl font-bold text-cyan-600">98%</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Trade Areas Section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6">Key Practice Areas</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Comprehensive legal support across all aspects of international trade
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {tradeAreas.map((area, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300"
                >
                  <h3 className="text-2xl font-bold mb-3 text-cyan-600 dark:text-cyan-400">
                    {area.area}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {area.description}
                  </p>
                  <ul className="space-y-2">
                    {area.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <CheckCircle className="text-green-600 mr-2" size={16} />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6">Our Trade Law Services</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                End-to-end legal support for international business operations
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
                  <CheckCircle className="text-cyan-600 mb-4" size={24} />
                  <h3 className="font-semibold text-lg">{service}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6">Why Choose Our Trade Law Team?</h2>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <div className="bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-900 dark:to-blue-900 rounded-2xl p-8 mb-6">
                  <Globe size={64} className="mx-auto text-cyan-600 dark:text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Global Network</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Extensive network of international legal partners and deep understanding 
                  of global trade regulations and practices.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center"
              >
                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 rounded-2xl p-8 mb-6">
                  <TrendingUp size={64} className="mx-auto text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Market Intelligence</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Up-to-date knowledge of market trends, regulatory changes, and 
                  emerging opportunities in international trade.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center"
              >
                <div className="bg-gradient-to-br from-indigo-100 to-cyan-100 dark:from-indigo-900 dark:to-cyan-900 rounded-2xl p-8 mb-6">
                  <Shield size={64} className="mx-auto text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Risk Management</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Comprehensive risk assessment and mitigation strategies to protect 
                  your international business interests and investments.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold mb-6">
                Ready to Expand Globally?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Get expert legal guidance for your international trade and finance needs
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center bg-white text-cyan-600 font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors duration-300"
              >
                <Globe className="mr-2" size={20} />
                Schedule Trade Law Consultation
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}