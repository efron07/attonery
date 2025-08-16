import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, MapPin, FileText, Shield, Clock } from "lucide-react";

export default function LandTransfers() {
  const services = [
    "Title Deed Verification & Due Diligence",
    "Land Purchase & Sale Agreements",
    "Right of Occupancy Applications",
    "Land Subdivision & Survey Coordination",
    "Mortgage & Charge Registration",
    "Land Dispute Resolution",
    "Lease Agreement Drafting",
    "Land Use Planning Compliance"
  ];

  const landTypes = [
    {
      type: "General Land",
      description: "Land available for private ownership and commercial use",
      features: ["Transferable rights", "Commercial development", "Investment opportunities", "Urban and rural areas"]
    },
    {
      type: "Village Land",
      description: "Land within village boundaries under customary law",
      features: ["Customary rights", "Community ownership", "Agricultural use", "Traditional governance"]
    },
    {
      type: "Reserved Land",
      description: "Land set aside for specific public purposes",
      features: ["Government use", "Conservation areas", "Infrastructure projects", "Special designations"]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Land Transfer Services - Republica Attorneys</title>
        <meta name="description" content="Expert land transfer and acquisition services in Tanzania. Title verification, due diligence, and property law expertise." />
        <meta name="keywords" content="land transfer Tanzania, property law, title deed, land acquisition, real estate law" />
      </Helmet>

      <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 text-white py-24">
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
                  <span className="text-4xl">🏞️</span>
                </div>
                <div>
                  <h1 className="text-5xl lg:text-6xl font-bold mb-4">
                    Land Transfers
                  </h1>
                  <p className="text-xl lg:text-2xl text-white/90">
                    Secure property transactions and land acquisition
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
                  Navigate Tanzania's Land Laws with Confidence
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  Land ownership in Tanzania operates under a unique legal framework where all land 
                  is owned by the state, and individuals hold rights of occupancy. Our experienced 
                  property law team ensures your land transactions are secure, compliant, and properly documented.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  From residential purchases to large-scale commercial developments, we provide 
                  comprehensive legal support throughout the entire land acquisition process, 
                  protecting your interests every step of the way.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-xl"
              >
                <h3 className="text-2xl font-bold mb-6">Land Transaction Process</h3>
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="bg-green-100 dark:bg-green-900 rounded-full p-2 mr-4">
                      <FileText className="text-green-600 dark:text-green-400" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold">Due Diligence</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">Title verification & legal checks</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-green-100 dark:bg-green-900 rounded-full p-2 mr-4">
                      <Shield className="text-green-600 dark:text-green-400" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold">Agreement Drafting</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">Comprehensive legal documentation</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-green-100 dark:bg-green-900 rounded-full p-2 mr-4">
                      <MapPin className="text-green-600 dark:text-green-400" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold">Registration</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">Official transfer & title registration</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-green-100 dark:bg-green-900 rounded-full p-2 mr-4">
                      <CheckCircle className="text-green-600 dark:text-green-400" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold">Completion</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">Final handover & documentation</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Land Types Section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6">Understanding Tanzania's Land Categories</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Navigate the three main categories of land ownership in Tanzania
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {landTypes.map((land, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300"
                >
                  <h3 className="text-2xl font-bold mb-3 text-green-600 dark:text-green-400">
                    {land.type}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {land.description}
                  </p>
                  <ul className="space-y-2">
                    {land.features.map((feature, idx) => (
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
        <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6">Our Land Transfer Services</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Comprehensive legal support for all your property needs
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
                  <CheckCircle className="text-green-600 mb-4" size={24} />
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
              <h2 className="text-4xl font-bold mb-6">Why Choose Our Land Transfer Services?</h2>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 rounded-2xl p-8 mb-6">
                  <Shield size={64} className="mx-auto text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Risk Mitigation</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Thorough due diligence and legal verification to protect your investment 
                  from potential disputes and legal complications.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center"
              >
                <div className="bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900 dark:to-green-900 rounded-2xl p-8 mb-6">
                  <Clock size={64} className="mx-auto text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Efficient Process</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Streamlined procedures and strong relationships with land registries 
                  ensure faster completion of your land transactions.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center"
              >
                <div className="bg-gradient-to-br from-purple-100 to-green-100 dark:from-purple-900 dark:to-green-900 rounded-2xl p-8 mb-6">
                  <FileText size={64} className="mx-auto text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Expert Documentation</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Comprehensive legal documentation that stands up to scrutiny and 
                  provides maximum protection for your property rights.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold mb-6">
                Secure Your Property Investment
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Get expert legal guidance for your land acquisition or transfer needs
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center bg-white text-green-600 font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors duration-300"
              >
                <MapPin className="mr-2" size={20} />
                Start Land Transfer Process
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}