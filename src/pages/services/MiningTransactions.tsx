import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, FileText, Users, Shield, Clock } from "lucide-react";

export default function MiningTransactions() {
  const services = [
    "Mining License Applications & Renewals",
    "Joint Venture Agreements",
    "Due Diligence for Mining Investments",
    "Environmental Compliance & Permits",
    "Mining Contract Negotiations",
    "Regulatory Compliance Advisory",
    "Dispute Resolution & Arbitration",
    "Tax Optimization for Mining Operations"
  ];

  const process = [
    {
      step: "1",
      title: "Initial Consultation",
      description: "We assess your mining project requirements and regulatory landscape"
    },
    {
      step: "2",
      title: "Legal Framework Analysis",
      description: "Comprehensive review of applicable mining laws and regulations"
    },
    {
      step: "3",
      title: "Documentation & Applications",
      description: "Preparation and submission of all required legal documents"
    },
    {
      step: "4",
      title: "Ongoing Compliance",
      description: "Continuous legal support to ensure regulatory compliance"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Mining Transactions Legal Services - Republica Attorneys</title>
        <meta name="description" content="Expert mining law services in Tanzania. Mining licenses, joint ventures, compliance, and regulatory advisory from experienced mining attorneys." />
        <meta name="keywords" content="mining law Tanzania, mining licenses, mining compliance, mining attorneys, mineral rights" />
      </Helmet>

      <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-amber-900 via-yellow-800 to-orange-900 text-white py-24">
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
                  <span className="text-4xl">⛏️</span>
                </div>
                <div>
                  <h1 className="text-5xl lg:text-6xl font-bold mb-4">
                    Mining Transactions
                  </h1>
                  <p className="text-xl lg:text-2xl text-white/90">
                    Expert legal guidance for Tanzania's mining sector
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
                  Navigate Tanzania's Mining Landscape with Confidence
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  Tanzania's mining sector offers tremendous opportunities, but navigating the complex 
                  regulatory environment requires expert legal guidance. Our specialized mining law team 
                  has extensive experience in all aspects of mining transactions, from exploration permits 
                  to large-scale mining operations.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  We work with international mining companies, local investors, and government entities 
                  to ensure compliance with Tanzania's mining laws while maximizing business opportunities.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-xl"
              >
                <h3 className="text-2xl font-bold mb-6">Key Statistics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Mining Licenses Processed</span>
                    <span className="text-2xl font-bold text-amber-600">150+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Years of Experience</span>
                    <span className="text-2xl font-bold text-amber-600">15+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Success Rate</span>
                    <span className="text-2xl font-bold text-amber-600">98%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">International Clients</span>
                    <span className="text-2xl font-bold text-amber-600">50+</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6">Our Mining Law Services</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Comprehensive legal support for all aspects of mining operations in Tanzania
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <CheckCircle className="text-amber-600 mb-4" size={24} />
                  <h3 className="font-semibold text-lg mb-2">{service}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6">Our Process</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                A systematic approach to mining law compliance
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="text-center"
                >
                  <div className="bg-amber-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-amber-600 to-orange-600 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold mb-6">
                Ready to Start Your Mining Project?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Get expert legal guidance for your mining venture in Tanzania
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center bg-white text-amber-600 font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors duration-300"
              >
                <FileText className="mr-2" size={20} />
                Schedule Consultation
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}