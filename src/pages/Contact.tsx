import React, { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Phone, Mail, MapPin, Clock, Zap, Send, CheckCircle } from "lucide-react";
import api from "../utils/api";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit to backend
      await api.submitContactForm(formData);

      // Create WhatsApp message
      const encodedMsg = encodeURIComponent(
        `Hello Republica Attorneys, my name is *${formData.name}*.\nI need help with *${formData.service}*.\nHere is my message:\n${formData.message}\nPhone: ${formData.phone}\nEmail: ${formData.email}`
      );
      
      // Open WhatsApp
      window.open(`https://wa.me/255768450666?text=${encodedMsg}`, "_blank");
      
      // Reset form and show success
      setFormData({
        name: "",
        phone: "",
        email: "",
        service: "",
        message: ""
      });
      
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error: any) {
      console.error('Error submitting form:', error);
      alert(`Error: ${error.message || 'Failed to submit inquiry'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Office Address",
      details: ["5th Floor, NHC House", "Samora Avenue", "Dar es Salaam, Tanzania"],
      gradient: "from-blue-400 to-blue-600"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@republicaattorneys.co.tz"],
      gradient: "from-orange-400 to-orange-600"
    },
    {
      icon: Phone,
      title: "Phone & WhatsApp",
      details: ["+255 768 450 666"],
      gradient: "from-green-400 to-green-600"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon - Fri: 8:00 AM - 6:00 PM", "Sat: 9:00 AM - 2:00 PM", "Emergency: 24/7"],
      gradient: "from-purple-400 to-purple-600"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us - Republica Attorneys & Consultants</title>
        <meta name="description" content="Contact Republica Attorneys for legal consultation. Located in Dar es Salaam, Tanzania. Get expert legal advice via WhatsApp or email." />
        <meta name="keywords" content="contact Republica Attorneys, legal consultation Tanzania, Dar es Salaam lawyers, WhatsApp legal advice" />
      </Helmet>

      <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-orange-600">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,255,255,0.1),transparent)]"></div>
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,rgba(255,255,255,0.05)_180deg,transparent_360deg)]"
            ></motion.div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-6 py-32 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-8"
              >
                <Zap className="text-orange-400" size={20} />
                <span className="text-white font-medium">Get In Touch</span>
              </motion.div>
              
              <h1 className="text-6xl lg:text-8xl font-bold mb-8 text-white leading-tight">
                Contact Our
                <br />
                <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                  Legal Team
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
                Ready to discuss your legal needs? Our expert team is here to provide 
                personalized guidance and solutions.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Success Message */}
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-4 rounded-xl shadow-lg flex items-center"
          >
            <CheckCircle className="mr-2" size={20} />
            <span>Inquiry submitted successfully!</span>
          </motion.div>
        )}

        {/* Contact Form & Info */}
        <section className="py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20"></div>
          
          <div className="relative max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
                  <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                    Send Us a Message
                  </h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                          required
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">Phone Number *</label>
                        <input
                          type="tel"
                          name="phone"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div>
                      <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">Legal Service *</label>
                      <select
                        name="service"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                        required
                        value={formData.service}
                        onChange={handleChange}
                      >
                        <option value="">Select a service</option>
                        <option>Mining Transactions</option>
                        <option>Company Registration</option>
                        <option>Trademark & Compliance</option>
                        <option>TIC Registration</option>
                        <option>Land Transfers</option>
                        <option>Civil & Criminal Litigation</option>
                        <option>Commercial Litigation</option>
                        <option>Probate & Succession</option>
                        <option>Marriage Law</option>
                        <option>Finance & Trade Law</option>
                        <option>Capital Markets</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">Your Message *</label>
                      <textarea
                        name="message"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                        rows={4}
                        required
                        value={formData.message}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-xl flex items-center justify-center space-x-2"
                    >
                      {isSubmitting ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      ) : (
                        <>
                          <Send size={20} />
                          <span>Send via WhatsApp</span>
                        </>
                      )}
                    </motion.button>
                  </form>
                </div>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div className="mb-12">
                  <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                    Get in Touch
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                    We're here to help with all your legal needs. Contact us through any of the following methods:
                  </p>
                </div>

                <div className="grid gap-6">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className="group"
                    >
                      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20">
                        <div className="flex items-start space-x-4">
                          <div className={`bg-gradient-to-br ${info.gradient} rounded-xl p-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <info.icon className="text-white" size={24} />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">{info.title}</h3>
                            {info.details.map((detail, idx) => (
                              <p key={idx} className="text-gray-600 dark:text-gray-300">
                                {detail}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Map */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="rounded-2xl overflow-hidden shadow-2xl border border-white/20"
                >
                  <iframe
                    title="Republica Attorneys Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1983.4228407804464!2d39.282178615739726!3d-6.816402295072892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185c4bc702741157%3A0xd40e6e4e0c50cfd0!2sNHC%20House%2C%20Samora%20Ave%2C%20Dar%20es%20Salaam!5e0!3m2!1sen!2stz!4v1688487233055"
                    width="100%"
                    height="300"
                    loading="lazy"
                    allowFullScreen
                    className="filter grayscale hover:grayscale-0 transition-all duration-500"
                  ></iframe>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}