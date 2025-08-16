import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, Building, Users, FileText, Clock } from "lucide-react";

export default function CompanyRegistration() {
  const services = [
    "Business Name Reservation",
    "Company Incorporation (Private & Public)",
    "BRELA Registration & Compliance",
    "Tax Registration (TIN, VAT, PAYE)",
    "Business License Applications",
    "Corporate Governance Advisory",
    "Annual Returns Filing",
    "Company Restructuring"
  ];

  const businessTypes = [
    {
      type: "Private Limited Company",
      description: "Most popular choice for small to medium businesses",
      features: ["Limited liability protection", "Separate legal entity", "Easy to raise capital", "Professional credibility"]
    },
    {
      type: "Public Limited Company",
      description: "For larger businesses planning to go public",
      features: ["Can issue shares to public", "Higher credibility", "Access to capital markets", "Regulatory compliance"]
    },
    {
      type: "Sole Proprietorship",
      description: "Simple structure for individual entrepreneurs",
      features: ["Easy to establish", "Full control", "Simple tax structure", "Low compliance requirements"]
    },
    {
      type: "Partnership",
      description: "For businesses with multiple owners",
      features: ["Shared responsibilities", "Combined expertise", "Flexible profit sharing", "Joint liability"]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Company Registration Services - Republica Attorneys</title>
        <meta name="description" content="Professional company registration services in Tanzania. BRELA registration, business licenses, tax registration, and corporate compliance." />
        <meta name="keywords" content="company registration Tanzania, BRELA registration, business license, corporate law, business setup" />
      </Helmet>

      <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 text-white py-24">
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
                  <Building size={48} className="text-white" />
                </div>
                <div>
                  <h1 className="text-5xl lg:text-6xl font-bold mb-4">
                    Company Registration
                  </h1>
                  <p className="text-xl lg:text-2xl text-white/90">
                    Complete business setup and corporate compliance services
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
                  Start Your Business Journey with Confidence
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  Starting a business in Tanzania requires navigating complex regulatory requirements. 
                  Our experienced team simplifies the company registration process, ensuring your business 
                  is properly established and compliant from day one.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  From BRELA registration to tax compliance, we handle all aspects of business formation, 
                  allowing you to focus on growing your business while we take care of the legal requirements.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-xl"
              >
                <h3 className="text-2xl font-bold mb-6">Registration Timeline</h3>
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-2 mr-4">
                      <Clock className="text-blue-600 dark:text-blue-400" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold">Name Reservation</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">1-2 business days</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-2 mr-4">
                      <FileText className="text-blue-600 dark:text-blue-400" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold">Document Preparation</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">2-3 business days</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-2 mr-4">
                      <Building className="text-blue-600 dark:text-blue-400" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold">BRELA Registration</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">5-7 business days</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-2 mr-4">
                      <CheckCircle className="text-blue-600 dark:text-blue-400" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold">Tax Registration</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">3-5 business days</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Business Types Section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6">Choose Your Business Structure</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                We help you select the right business structure based on your needs and goals
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {businessTypes.map((business, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300"
                >
                  <h3 className="text-2xl font-bold mb-3 text-blue-600 dark:text-blue-400">
                    {business.type}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {business.description}
                  </p>
                  <ul className="space-y-2">
                    {business.features.map((feature, idx) => (
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
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6">Our Registration Services</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                End-to-end business registration and compliance support
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

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold mb-6">
                Ready to Register Your Company?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Let us handle the paperwork while you focus on your business vision
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors duration-300"
              >
                <Building className="mr-2" size={20} />
                Start Registration Process
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}