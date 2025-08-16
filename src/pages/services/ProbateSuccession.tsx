import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, FileText, Users, Shield, Heart } from "lucide-react";

export default function ProbateSuccession() {
  const services = [
    "Will Drafting & Estate Planning",
    "Probate Applications",
    "Letters of Administration",
    "Estate Distribution",
    "Inheritance Disputes",
    "Trust Administration",
    "Succession Planning",
    "Estate Tax Planning"
  ];

  const process = [
    {
      step: "1",
      title: "Estate Assessment",
      description: "Comprehensive evaluation of the deceased's assets and liabilities"
    },
    {
      step: "2",
      title: "Legal Documentation",
      description: "Preparation and filing of probate or administration applications"
    },
    {
      step: "3",
      title: "Court Proceedings",
      description: "Representation in probate court and handling legal requirements"
    },
    {
      step: "4",
      title: "Estate Distribution",
      description: "Supervised distribution of assets to rightful beneficiaries"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Probate & Succession Services - Republica Attorneys</title>
        <meta name="description" content="Expert probate and succession services in Tanzania. Estate planning, will drafting, inheritance disputes, and estate administration." />
        <meta name="keywords" content="probate Tanzania, succession law, estate planning, will drafting, inheritance disputes" />
      </Helmet>

      <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-900 text-white py-24">
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
                  <span className="text-4xl">📜</span>
                </div>
                <div>
                  <h1 className="text-5xl lg:text-6xl font-bold mb-4">
                    Probate & Succession
                  </h1>
                  <p className="text-xl lg:text-2xl text-white/90">
                    Compassionate estate planning and inheritance law services
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
                  Guiding Families Through Difficult Times
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  Dealing with the loss of a loved one is never easy, and navigating the legal 
                  complexities of estate administration can add unnecessary stress during an 
                  already difficult time. Our compassionate probate and succession team provides 
                  sensitive, professional guidance through every step of the process.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Whether you need help with estate planning, probate applications, or resolving 
                  inheritance disputes, we ensure that your loved one's wishes are honored and 
                  their estate is distributed according to law and their intentions.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-xl"
              >
                <h3 className="text-2xl font-bold mb-6">Why Estate Planning Matters</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold">Protect Your Family</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">Ensure your loved ones are provided for</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold">Avoid Disputes</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">Clear instructions prevent family conflicts</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold">Tax Efficiency</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">Minimize tax burden on your estate</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold">Peace of Mind</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">Know your affairs are in order</p>
                    </div>
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
              <h2 className="text-4xl font-bold mb-6">Our Probate & Succession Services</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Comprehensive estate planning and administration services
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
                  <CheckCircle className="text-purple-600 mb-4" size={24} />
                  <h3 className="font-semibold text-lg">{service}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6">Our Probate Process</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                A compassionate and efficient approach to estate administration
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
                  <div className="bg-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
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
              <h2 className="text-4xl font-bold mb-6">Why Families Trust Us</h2>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-2xl p-8 mb-6">
                  <Heart size={64} className="mx-auto text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Compassionate Service</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  We understand the emotional challenges of dealing with estate matters 
                  and provide sensitive, supportive guidance throughout the process.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center"
              >
                <div className="bg-gradient-to-br from-pink-100 to-indigo-100 dark:from-pink-900 dark:to-indigo-900 rounded-2xl p-8 mb-6">
                  <Shield size={64} className="mx-auto text-pink-600 dark:text-pink-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Expert Knowledge</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Deep understanding of Tanzania's succession laws and probate procedures 
                  ensures efficient and compliant estate administration.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center"
              >
                <div className="bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-2xl p-8 mb-6">
                  <Users size={64} className="mx-auto text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Family-Focused Approach</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  We work to preserve family relationships and minimize conflicts 
                  while ensuring fair and lawful distribution of assets.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold mb-6">
                Plan for Your Family's Future
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Secure your legacy with professional estate planning and succession services
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center bg-white text-purple-600 font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors duration-300"
              >
                <FileText className="mr-2" size={20} />
                Schedule Estate Planning Consultation
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}