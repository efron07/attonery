import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Shield, Lock, Eye, UserCheck } from "lucide-react";

export default function PrivacyPolicy() {
  const sections = [
    {
      title: "Information We Collect",
      icon: Eye,
      content: [
        "Personal identification information (Name, email address, phone number)",
        "Legal consultation details and case information",
        "Communication records and correspondence",
        "Website usage data and analytics",
        "Payment and billing information"
      ]
    },
    {
      title: "How We Use Your Information",
      icon: UserCheck,
      content: [
        "Provide legal services and consultation",
        "Communicate about your case or legal matters",
        "Process payments and maintain billing records",
        "Improve our services and website functionality",
        "Send legal updates and newsletters (with consent)"
      ]
    },
    {
      title: "Information Protection",
      icon: Lock,
      content: [
        "SSL encryption for all data transmission",
        "Secure servers with regular security updates",
        "Limited access to authorized personnel only",
        "Regular security audits and assessments",
        "Compliance with legal confidentiality requirements"
      ]
    },
    {
      title: "Your Rights",
      icon: Shield,
      content: [
        "Access your personal information",
        "Request correction of inaccurate data",
        "Request deletion of your information",
        "Opt-out of marketing communications",
        "File complaints with regulatory authorities"
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Privacy Policy - Republica Attorneys & Consultants</title>
        <meta name="description" content="Privacy Policy for Republica Attorneys & Consultants. Learn how we protect and handle your personal information." />
        <meta name="keywords" content="privacy policy, data protection, legal confidentiality, Republica Attorneys" />
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
                Privacy Policy
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                Your privacy and confidentiality are fundamental to our legal practice. 
                Learn how we protect and handle your personal information.
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
                Republica Attorneys & Consultants ("we," "our," or "us") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you 
                visit our website or use our legal services.
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

            {/* Contact Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mt-16 bg-gradient-to-r from-blue-600 to-orange-500 rounded-3xl p-8 text-white text-center"
            >
              <h2 className="text-3xl font-bold mb-4">Questions About Privacy?</h2>
              <p className="text-xl mb-6 opacity-90">
                If you have any questions about this Privacy Policy, please contact us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:info@republicaattorneys.co.tz"
                  className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
                >
                  Email Us
                </a>
                <a
                  href="tel:+255768450666"
                  className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition-colors"
                >
                  Call Us
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}