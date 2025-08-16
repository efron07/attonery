import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Scale, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);

    try {
      // For shared hosting, we'll use a simple mailto or form submission
      // You can replace this with your preferred email service
      const subject = "Newsletter Subscription";
      const body = `New newsletter subscription from: ${email}`;
      window.location.href = `mailto:info@republicaattorneys.co.tz?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      setEmail("");
      alert("✅ Thank you for subscribing! We'll add you to our newsletter.");
    } catch (error) {
      console.error('Error subscribing:', error);
      alert("❌ There was an error subscribing. Please try again.");
    } finally {
      setIsSubscribing(false);
    }
  };

  const footerLinks = {
    services: [
      { name: "Mining Transactions", path: "/services/mining-transactions" },
      { name: "Company Registration", path: "/services/company-registration" },
      { name: "Trademark Registration", path: "/services/trademark-registration" },
      { name: "Land Transfers", path: "/services/land-transfers" },
      { name: "Civil Litigation", path: "/services/civil-litigation" },
      { name: "Commercial Law", path: "/services/commercial-litigation" }
    ],
    legal: [
      { name: "Privacy Policy", path: "/privacy-policy" },
      { name: "Terms of Service", path: "/terms-of-service" },
      { name: "Cookie Policy", path: "/cookie-policy" },
      { name: "Disclaimer", path: "/disclaimer" }
    ],
    company: [
      { name: "About Us", path: "/about" },
      { name: "Our Team", path: "/team" },
      { name: "Careers", path: "/careers" },
      { name: "News & Updates", path: "/blog" }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" }
  ];

  return (
    <footer className="relative bg-gray-900 text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-orange-900/50"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,255,255,0.05),transparent)]"></div>
      
      <div className="relative">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-1"
            >
              <Link to="/" className="flex items-center space-x-3 mb-6 group">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="relative"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-blue-600 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Scale className="text-white" size={24} />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-orange-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                </motion.div>
                <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
                  Republica Attorneys
                </div>
              </Link>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                Leading legal services in Tanzania with expertise across multiple practice areas, 
                delivering world-class solutions with cutting-edge technology.
              </p>
              
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center">
                  <MapPin className="mr-3 text-blue-400" size={18} />
                  <div>
                    <p>5th Floor, NHC House</p>
                    <p>Samora Avenue, Dar es Salaam</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="mr-3 text-orange-400" size={18} />
                  <a href="mailto:info@republicaattorneys.co.tz" className="hover:text-blue-400 transition-colors">
                    info@republicaattorneys.co.tz
                  </a>
                </div>
                <div className="flex items-center">
                  <Phone className="mr-3 text-green-400" size={18} />
                  <a href="tel:+255768450666" className="hover:text-blue-400 transition-colors">
                    +255 768 450 666
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h4 className="text-xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
                Our Services
              </h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={link.path} 
                      className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h4 className="text-xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
                Company
              </h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={link.path} 
                      className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
              
              <h5 className="text-lg font-semibold mt-8 mb-4 text-white">Legal</h5>
              <ul className="space-y-3">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={link.path} 
                      className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h4 className="text-xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
                Stay Updated
              </h4>
              <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                Subscribe to our newsletter for the latest legal insights, updates, and expert analysis.
              </p>
              
              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={isSubscribing}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 disabled:from-gray-600 disabled:to-gray-700 text-white py-3 rounded-xl transition-all duration-300 font-medium"
                >
                  {isSubscribing ? "Subscribing..." : "Subscribe"}
                </motion.button>
              </form>

              {/* Social Links */}
              <div className="mt-8">
                <h5 className="text-lg font-semibold mb-4 text-white">Follow Us</h5>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center text-gray-300 hover:text-white hover:bg-blue-600 transition-all duration-300"
                      aria-label={social.label}
                    >
                      <social.icon size={18} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700/50 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} Republica Attorneys & Consultants. All rights reserved.
              </div>
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <span>Made with ❤️ in Tanzania</span>
                <span>•</span>
                <span>Powered by Innovation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}