import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, Globe, TrendingUp, Users, Award } from "lucide-react";

export default function TICRegistration() {
  const benefits = [
    "Access to investment incentives and tax benefits",
    "Streamlined business registration process",
    "Land acquisition rights for investors",
    "Work permit facilitation for foreign investors",
    "Export promotion support",
    "Access to industrial plots and infrastructure"
  ];

  const sectors = [
    { name: "Manufacturing", icon: "🏭", description: "Industrial production and processing" },
    { name: "Agriculture", icon: "🌾", description: "Farming, livestock, and agribusiness" },
    { name: "Tourism", icon: "🏖️", description: "Hotels, lodges, and tourism services" },
    { name: "Mining", icon: "⛏️", description: "Mineral extraction and processing" },
    { name: "ICT", icon: "💻", description: "Technology and telecommunications" },
    { name: "Infrastructure", icon: "🏗️", description: "Construction and development projects" }
  ];

  return (
    <>
      <Helmet>
        <title>TIC Registration Services - Republica Attorneys</title>
        <meta name="description" content="Expert TIC registration services in Tanzania. Investment facilitation, incentives, and compliance support for local and foreign investors." />
        <meta name="keywords" content="TIC registration Tanzania, investment incentives, foreign investment, business registration Tanzania" />
      </Helmet>

      <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-green-900 via-teal-800 to-blue-900 text-white py-24">
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
                  <span className="text-4xl">📋</span>
                </div>
                <div>
                  <h1 className="text-5xl lg:text-6xl font-bold mb-4">
                    TIC Registration
                  </h1>
                  <p className="text-xl lg:text-2xl text-white/90">
                    Investment facilitation and incentive optimization
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
                  Unlock Tanzania's Investment Opportunities
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  The Tanzania Investment Centre (TIC) is your gateway to investment opportunities 
                  in Tanzania. Our expert team guides you through the TIC registration process, 
                  ensuring you maximize available incentives and benefits while maintaining full compliance.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Whether you're a local entrepreneur or foreign investor, TIC registration opens doors 
                  to significant tax benefits, streamlined processes, and exclusive investment opportunities 
                  across various sectors.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-xl"
              >
                <h3 className="text-2xl font-bold mb-6">Investment Thresholds</h3>
                <div className="space-y-6">
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-bold text-lg">Local Investors</h4>
                    <p className="text-gray-600 dark:text-gray-300">Minimum USD 100,000</p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-bold text-lg">Foreign Investors</h4>
                    <p className="text-gray-600 dark:text-gray-300">Minimum USD 300,000</p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-bold text-lg">Joint Ventures</h4>
                    <p className="text-gray-600 dark:text-gray-300">Minimum USD 500,000</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6">TIC Registration Benefits</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Comprehensive incentives and support for registered investors
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <CheckCircle className="text-green-600 mb-4" size={24} />
                  <p className="font-medium">{benefit}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Sectors Section */}
        <section className="py-20 bg-gradient-to-br from-green-50 to-teal-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6">Priority Investment Sectors</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Key sectors eligible for enhanced incentives and support
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sectors.map((sector, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-700 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="text-4xl mb-4">{sector.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{sector.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{sector.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6">Registration Process</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Streamlined process for TIC registration and compliance
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: "1", title: "Project Assessment", desc: "Evaluate investment eligibility and sector classification" },
                { step: "2", title: "Documentation", desc: "Prepare comprehensive application and supporting documents" },
                { step: "3", title: "Submission & Review", desc: "Submit application and coordinate with TIC officials" },
                { step: "4", title: "Certificate Issuance", desc: "Receive TIC certificate and begin enjoying benefits" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="text-center"
                >
                  <div className="bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-green-600 to-teal-600 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold mb-6">
                Start Your Investment Journey
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Unlock Tanzania's investment potential with expert TIC registration support
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center bg-white text-green-600 font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors duration-300"
              >
                <TrendingUp className="mr-2" size={20} />
                Begin TIC Registration
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}