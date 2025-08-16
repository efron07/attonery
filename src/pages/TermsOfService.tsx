import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { FileText, Scale, Shield, AlertTriangle } from "lucide-react";

export default function TermsOfService() {
  const sections = [
    {
      title: "Legal Services",
      icon: Scale,
      content: [
        "We provide legal consultation and representation services",
        "All legal advice is subject to Tanzanian law and regulations",
        "Attorney-client privilege applies to all communications",
        "We maintain professional liability insurance",
        "Services are provided by qualified legal professionals"
      ]
    },
    {
      title: "Client Responsibilities",
      icon: FileText,
      content: [
        "Provide accurate and complete information",
        "Pay fees and costs as agreed upon",
        "Cooperate in the legal process",
        "Maintain confidentiality when required",
        "Follow legal advice and instructions"
      ]
    },
    {
      title: "Limitations",
      icon: AlertTriangle,
      content: [
        "No guarantee of specific legal outcomes",
        "Liability limited to professional negligence",
        "Time limitations apply to legal claims",
        "Some matters may require specialist referral",
        "Emergency services subject to availability"
      ]
    },
    {
      title: "Confidentiality",
      icon: Shield,
      content: [
        "All client information is strictly confidential",
        "Attorney-client privilege is maintained",
        "Information sharing only with client consent",
        "Secure handling of all documents",
        "Compliance with legal profession standards"
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Terms of Service - Republica Attorneys & Consultants</title>
        <meta name="description" content="Terms of Service for Republica Attorneys & Consultants. Legal terms and conditions for our services." />
        <meta name="keywords" content="terms of service, legal terms, attorney services, Republica Attorneys" />
      </Helmet>

      <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        {/* Hero Section */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-orange-600">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,255,255,0.1),transparent)]"></div>
          </div>
          
          <div className="relative max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-white">
                Terms of Service
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                Legal terms and conditions governing our professional relationship 
                and the provision of legal services.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20"></div>
          
          <div className="relative max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 mb-12"
            >
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                <strong>Effective Date:</strong> January 1, 2024<br />
                <strong>Last Updated:</strong> January 1, 2024
              </p>
              <p className="mt-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                These Terms of Service ("Terms") govern your relationship with Republica Attorneys & Consultants 
                and the legal services we provide. By engaging our services, you agree to these terms.
              </p>
            </motion.div>

            <div className="space-y-12">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20"
                >
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-blue-500 to-orange-500 rounded-2xl p-3 mr-4">
                      <section.icon className="text-white" size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {section.title}
                    </h2>
                  </div>
                  <ul className="space-y-3">
                    {section.content.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700 dark:text-gray-300 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Additional Terms */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mt-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20"
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Additional Terms
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  <strong>Governing Law:</strong> These terms are governed by the laws of Tanzania.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  <strong>Dispute Resolution:</strong> Any disputes will be resolved through mediation or arbitration in Dar es Salaam.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  <strong>Modifications:</strong> We reserve the right to modify these terms with reasonable notice.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <strong>Contact:</strong> For questions about these terms, contact us at info@republicaattorneys.co.tz
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}