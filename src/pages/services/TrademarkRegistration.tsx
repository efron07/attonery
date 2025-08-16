import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, Shield, Search, FileText, Globe } from "lucide-react";

export default function TrademarkRegistration() {
  const services = [
    "Trademark Search & Clearance",
    "Trademark Application Filing",
    "Madrid Protocol Applications",
    "Trademark Renewals",
    "Opposition & Cancellation Proceedings",
    "Trademark Licensing Agreements",
    "Brand Protection Strategies",
    "IP Portfolio Management"
  ];

  const process = [
    {
      icon: <Search size={32} />,
      title: "Comprehensive Search",
      description: "We conduct thorough searches to ensure your trademark is available and registrable"
    },
    {
      icon: <FileText size={32} />,
      title: "Application Preparation",
      description: "Expert preparation and filing of your trademark application with proper classification"
    },
    {
      icon: <Shield size={32} />,
      title: "Prosecution & Defense",
      description: "We handle all communications with the trademark office and defend against oppositions"
    },
    {
      icon: <Globe size={32} />,
      title: "International Protection",
      description: "Extend your trademark protection globally through Madrid Protocol and direct filing"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Trademark Registration Services - Republica Attorneys</title>
        <meta name="description" content="Professional trademark registration and IP protection services in Tanzania. Trademark search, filing, renewals, and brand protection strategies." />
        <meta name="keywords" content="trademark registration Tanzania, intellectual property, brand protection, trademark search, IP law" />
      </Helmet>

      <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 text-white py-24">
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
                  <span className="text-4xl">®️</span>
                </div>
                <div>
                  <h1 className="text-5xl lg:text-6xl font-bold mb-4">
                    Trademark Registration
                  </h1>
                  <p className="text-xl lg:text-2xl text-white/90">
                    Protect your brand with comprehensive IP services
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
                  Secure Your Brand's Future
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  Your brand is one of your most valuable assets. Our comprehensive trademark registration 
                  services ensure your intellectual property is protected in Tanzania and internationally. 
                  We guide you through every step of the trademark process, from initial search to registration 
                  and ongoing protection.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  With extensive experience in intellectual property law, we help businesses of all sizes 
                  build and protect strong brand portfolios that drive competitive advantage.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-xl"
              >
                <h3 className="text-2xl font-bold mb-6">Why Register Your Trademark?</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold">Exclusive Rights</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">Gain exclusive rights to use your mark in your industry</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold">Legal Protection</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">Strong legal foundation to prevent infringement</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold">Brand Value</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">Increase your brand's commercial value and credibility</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold">Global Expansion</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">Foundation for international trademark protection</p>
                    </div>
                  </div>
                </div>
              </motion.div>
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
              <h2 className="text-4xl font-bold mb-6">Our Trademark Process</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                A systematic approach to securing and protecting your intellectual property
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="text-center group"
                >
                  <div className="bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 rounded-2xl p-6 mb-6 group-hover:scale-105 transition-transform duration-300">
                    <div className="text-purple-600 dark:text-purple-400">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6">Comprehensive IP Services</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Full-spectrum intellectual property protection and management
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
                  <CheckCircle className="text-purple-600 mb-4" size={24} />
                  <h3 className="font-semibold text-lg">{service}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold mb-6">
                Protect Your Brand Today
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Don't wait until it's too late. Secure your trademark protection now.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center bg-white text-purple-600 font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors duration-300"
              >
                <Shield className="mr-2" size={20} />
                Start Trademark Registration
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}