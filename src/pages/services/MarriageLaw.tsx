import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, Heart, Users, Shield, Home } from "lucide-react";

export default function MarriageLaw() {
  const services = [
    "Marriage Registration & Certificates",
    "Prenuptial & Postnuptial Agreements",
    "Divorce Proceedings",
    "Child Custody & Support",
    "Matrimonial Property Division",
    "Domestic Violence Protection",
    "Adoption Procedures",
    "Maintenance & Alimony Claims"
  ];

  const marriageTypes = [
    {
      type: "Civil Marriage",
      description: "Registered under the Marriage Act",
      features: ["Monogamous union", "Equal property rights", "Divorce protection", "Inheritance rights"]
    },
    {
      type: "Customary Marriage",
      description: "Traditional marriage under customary law",
      features: ["Cultural recognition", "Community involvement", "Traditional ceremonies", "Customary inheritance"]
    },
    {
      type: "Religious Marriage",
      description: "Marriage conducted under religious law",
      features: ["Religious ceremony", "Faith-based principles", "Community recognition", "Spiritual significance"]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Marriage & Family Law Services - Republica Attorneys</title>
        <meta name="description" content="Expert marriage and family law services in Tanzania. Divorce, custody, matrimonial property, and family legal matters." />
        <meta name="keywords" content="marriage law Tanzania, family law, divorce, child custody, matrimonial property" />
      </Helmet>

      <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-rose-900 via-pink-800 to-purple-900 text-white py-24">
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
                  <span className="text-4xl">💍</span>
                </div>
                <div>
                  <h1 className="text-5xl lg:text-6xl font-bold mb-4">
                    Marriage & Family Law
                  </h1>
                  <p className="text-xl lg:text-2xl text-white/90">
                    Protecting families through life's important transitions
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
                  Supporting Families Through Every Chapter
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  Family matters are deeply personal and often emotionally challenging. Our experienced 
                  family law team provides compassionate, professional guidance through marriage, 
                  divorce, custody, and other family legal matters, always prioritizing the best 
                  interests of children and family welfare.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  We understand Tanzania's diverse marriage laws and cultural contexts, providing 
                  culturally sensitive legal services that respect traditional values while ensuring 
                  full legal protection under modern law.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-xl"
              >
                <h3 className="text-2xl font-bold mb-6">Our Approach</h3>
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="bg-rose-100 dark:bg-rose-900 rounded-full p-2 mr-4">
                      <Heart className="text-rose-600 dark:text-rose-400" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold">Compassionate Guidance</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">Sensitive support during difficult times</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-rose-100 dark:bg-rose-900 rounded-full p-2 mr-4">
                      <Users className="text-rose-600 dark:text-rose-400" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold">Child-Centered Solutions</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">Prioritizing children's best interests</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-rose-100 dark:bg-rose-900 rounded-full p-2 mr-4">
                      <Shield className="text-rose-600 dark:text-rose-400" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold">Legal Protection</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">Comprehensive rights protection</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-rose-100 dark:bg-rose-900 rounded-full p-2 mr-4">
                      <Home className="text-rose-600 dark:text-rose-400" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold">Family Preservation</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">Working to maintain family bonds</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Marriage Types Section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6">Understanding Marriage in Tanzania</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Tanzania recognizes multiple forms of marriage, each with distinct legal implications
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {marriageTypes.map((marriage, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300"
                >
                  <h3 className="text-2xl font-bold mb-3 text-rose-600 dark:text-rose-400">
                    {marriage.type}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {marriage.description}
                  </p>
                  <ul className="space-y-2">
                    {marriage.features.map((feature, idx) => (
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
        <section className="py-20 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6">Our Family Law Services</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Comprehensive legal support for all family matters
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
                  <CheckCircle className="text-rose-600 mb-4" size={24} />
                  <h3 className="font-semibold text-lg">{service}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Special Focus Areas */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6">Special Focus Areas</h2>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-900 dark:to-pink-900 rounded-2xl p-8"
              >
                <h3 className="text-2xl font-bold mb-4 text-rose-600 dark:text-rose-400">
                  Child Welfare & Protection
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We prioritize the best interests of children in all family proceedings, ensuring 
                  their welfare, safety, and future security are protected.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    <span className="text-sm">Custody arrangements</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    <span className="text-sm">Child support calculations</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    <span className="text-sm">Protection from abuse</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    <span className="text-sm">Educational decisions</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-purple-100 to-rose-100 dark:from-purple-900 dark:to-rose-900 rounded-2xl p-8"
              >
                <h3 className="text-2xl font-bold mb-4 text-purple-600 dark:text-purple-400">
                  Women's Rights Protection
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We are committed to protecting women's rights in marriage, divorce, and family 
                  matters, ensuring equal treatment and fair outcomes.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    <span className="text-sm">Property rights protection</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    <span className="text-sm">Domestic violence support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    <span className="text-sm">Maintenance claims</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    <span className="text-sm">Legal representation</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-rose-600 to-pink-600 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold mb-6">
                Need Family Law Support?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Get compassionate legal guidance for your family matters
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center bg-white text-rose-600 font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors duration-300"
              >
                <Heart className="mr-2" size={20} />
                Schedule Family Law Consultation
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}