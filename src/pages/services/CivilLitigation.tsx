import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, Scale, Shield, Users, FileText } from "lucide-react";

export default function CivilLitigation() {
  const services = [
    "Contract Disputes",
    "Property & Land Disputes",
    "Employment Law Cases",
    "Personal Injury Claims",
    "Debt Recovery",
    "Family Law Matters",
    "Tort Claims",
    "Administrative Law Cases"
  ];

  const process = [
    {
      step: "1",
      title: "Case Assessment",
      description: "Comprehensive evaluation of your legal position and potential outcomes"
    },
    {
      step: "2",
      title: "Strategy Development",
      description: "Tailored litigation strategy based on case merits and client objectives"
    },
    {
      step: "3",
      title: "Pre-Trial Preparation",
      description: "Evidence gathering, witness preparation, and procedural compliance"
    },
    {
      step: "4",
      title: "Court Representation",
      description: "Expert advocacy and representation throughout trial proceedings"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Civil Litigation Services - Republica Attorneys</title>
        <meta name="description" content="Expert civil litigation services in Tanzania. Contract disputes, property law, employment cases, and comprehensive court representation." />
        <meta name="keywords" content="civil litigation Tanzania, court representation, legal disputes, contract law, property disputes" />
      </Helmet>

      <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-red-900 via-orange-800 to-yellow-900 text-white py-24">
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
                  <Scale size={48} className="text-white" />
                </div>
                <div>
                  <h1 className="text-5xl lg:text-6xl font-bold mb-4">
                    Civil Litigation
                  </h1>
                  <p className="text-xl lg:text-2xl text-white/90">
                    Expert court representation and dispute resolution
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
                  Protecting Your Rights in Court
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  When disputes arise, you need experienced litigators who understand Tanzania's 
                  legal system and can effectively advocate for your interests. Our civil litigation 
                  team has extensive courtroom experience across all levels of Tanzania's judiciary.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  We handle a wide range of civil matters, from contract disputes to personal injury 
                  claims, always striving for the best possible outcome through skilled negotiation 
                  or vigorous court representation when necessary.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-xl"
              >
                <h3 className="text-2xl font-bold mb-6">Our Track Record</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Cases Won</span>
                    <span className="text-2xl font-bold text-red-600">95%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Years of Experience</span>
                    <span className="text-2xl font-bold text-red-600">15+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Satisfied Clients</span>
                    <span className="text-2xl font-bold text-red-600">500+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Court Levels</span>
                    <span className="text-2xl font-bold text-red-600">All</span>
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
              <h2 className="text-4xl font-bold mb-6">Our Litigation Services</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Comprehensive legal representation across all areas of civil law
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
                  <CheckCircle className="text-red-600 mb-4" size={24} />
                  <h3 className="font-semibold text-lg mb-2">{service}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6">Our Litigation Process</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                A systematic approach to achieving the best outcomes for our clients
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
                  <div className="bg-red-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
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
              <h2 className="text-4xl font-bold mb-6">Why Choose Our Litigation Team?</h2>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <div className="bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900 dark:to-orange-900 rounded-2xl p-8 mb-6">
                  <Scale size={64} className="mx-auto text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Courtroom Excellence</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Our litigators are skilled advocates with extensive courtroom experience 
                  and a proven track record of successful outcomes.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center"
              >
                <div className="bg-gradient-to-br from-orange-100 to-yellow-100 dark:from-orange-900 dark:to-yellow-900 rounded-2xl p-8 mb-6">
                  <Shield size={64} className="mx-auto text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Strategic Approach</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  We develop comprehensive litigation strategies tailored to each case, 
                  maximizing your chances of a favorable outcome.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center"
              >
                <div className="bg-gradient-to-br from-yellow-100 to-red-100 dark:from-yellow-900 dark:to-red-900 rounded-2xl p-8 mb-6">
                  <Users size={64} className="mx-auto text-yellow-600 dark:text-yellow-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Client-Focused Service</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  We keep you informed throughout the litigation process and work 
                  tirelessly to protect your interests and achieve your objectives.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-red-600 to-orange-600 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold mb-6">
                Need Legal Representation?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Get expert litigation support to protect your rights and interests
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center bg-white text-red-600 font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors duration-300"
              >
                <Scale className="mr-2" size={20} />
                Schedule Legal Consultation
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}