import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, TrendingUp, DollarSign, Shield, BarChart } from "lucide-react";

export default function CapitalMarkets() {
  const services = [
    "IPO & Public Offerings",
    "Securities Compliance & Regulation",
    "Corporate Bond Issuances",
    "Private Placements",
    "Mergers & Acquisitions",
    "Investment Fund Formation",
    "CMSA Regulatory Compliance",
    "Capital Markets Transactions"
  ];

  const marketServices = [
    {
      service: "Public Offerings",
      description: "Complete IPO and public offering legal support",
      features: ["Prospectus preparation", "Regulatory filings", "Due diligence", "Listing compliance"]
    },
    {
      service: "Securities Regulation",
      description: "Comprehensive securities law compliance",
      features: ["CMSA compliance", "Disclosure requirements", "Ongoing obligations", "Regulatory reporting"]
    },
    {
      service: "Corporate Finance",
      description: "Strategic corporate financing solutions",
      features: ["Debt financing", "Equity financing", "Hybrid instruments", "Restructuring"]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Capital Markets & Securities Law - Republica Attorneys</title>
        <meta name="description" content="Expert capital markets and securities law services in Tanzania. IPOs, compliance, corporate finance, and CMSA regulatory support." />
        <meta name="keywords" content="capital markets Tanzania, securities law, IPO, CMSA compliance, corporate finance" />
      </Helmet>

      <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900 text-white py-24">
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
                  <span className="text-4xl">📈</span>
                </div>
                <div>
                  <h1 className="text-5xl lg:text-6xl font-bold mb-4">
                    Capital Markets
                  </h1>
                  <p className="text-xl lg:text-2xl text-white/90">
                    Securities law and capital market regulatory expertise
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
                  Navigate Tanzania's Capital Markets
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  Tanzania's capital markets offer significant opportunities for companies seeking 
                  to raise capital and investors looking for growth opportunities. Our specialized 
                  capital markets team provides comprehensive legal support for public offerings, 
                  securities compliance, and complex financial transactions.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  We work closely with the Capital Markets and Securities Authority (CMSA) and 
                  understand the regulatory landscape, ensuring your capital markets transactions 
                  are compliant, efficient, and successful.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-xl"
              >
                <h3 className="text-2xl font-bold mb-6">Market Performance</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">IPOs Completed</span>
                    <span className="text-2xl font-bold text-emerald-600">15+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Capital Raised (TZS)</span>
                    <span className="text-2xl font-bold text-emerald-600">50B+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Listed Companies</span>
                    <span className="text-2xl font-bold text-emerald-600">25+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Success Rate</span>
                    <span className="text-2xl font-bold text-emerald-600">100%</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Market Services Section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6">Specialized Market Services</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Comprehensive capital markets legal support across all transaction types
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {marketServices.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300"
                >
                  <h3 className="text-2xl font-bold mb-3 text-emerald-600 dark:text-emerald-400">
                    {service.service}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
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
        <section className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6">Our Capital Markets Services</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Full-spectrum capital markets and securities law expertise
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
                  <CheckCircle className="text-emerald-600 mb-4" size={24} />
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
              <h2 className="text-4xl font-bold mb-6">Our Capital Markets Expertise</h2>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <div className="bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900 dark:to-teal-900 rounded-2xl p-8 mb-6">
                  <TrendingUp size={64} className="mx-auto text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Market Leadership</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Leading position in Tanzania's capital markets with extensive experience 
                  in landmark transactions and regulatory developments.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center"
              >
                <div className="bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-900 dark:to-cyan-900 rounded-2xl p-8 mb-6">
                  <Shield size={64} className="mx-auto text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Regulatory Excellence</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Deep understanding of CMSA regulations and strong relationships 
                  with regulatory authorities ensuring smooth transaction execution.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center"
              >
                <div className="bg-gradient-to-br from-cyan-100 to-emerald-100 dark:from-cyan-900 dark:to-emerald-900 rounded-2xl p-8 mb-6">
                  <BarChart size={64} className="mx-auto text-cyan-600 dark:text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Strategic Advisory</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Strategic guidance on market timing, structure optimization, and 
                  investor relations to maximize transaction success and value.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold mb-6">
                Ready to Access Capital Markets?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Get expert legal guidance for your capital markets and securities needs
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center bg-white text-emerald-600 font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors duration-colors duration-300"
              >
                <TrendingUp className="mr-2" size={20} />
                Schedule Capital Markets Consultation
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}