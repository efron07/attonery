import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Scale, Users, FileText, Phone, Award, Shield, Clock, Globe, Zap, Star, ArrowRight } from "lucide-react";

export default function Home() {
  const services = [
    {
      title: "Mining Transactions",
      description: "Expert legal guidance for mining licenses, joint ventures, and regulatory compliance",
      icon: "⛏️",
      link: "/services/mining-transactions",
      gradient: "from-amber-400 to-orange-600"
    },
    {
      title: "Company Registration",
      description: "Complete business setup and ongoing corporate compliance services",
      icon: "🏢",
      link: "/services/company-registration",
      gradient: "from-blue-400 to-blue-600"
    },
    {
      title: "Trademark & IP",
      description: "Protect your brand with comprehensive intellectual property services",
      icon: "®️",
      link: "/services/trademark-registration",
      gradient: "from-purple-400 to-pink-600"
    },
    {
      title: "TIC Registration",
      description: "Investment facilitation and TIC certificate processing",
      icon: "📋",
      link: "/services/tic-registration",
      gradient: "from-green-400 to-emerald-600"
    },
    {
      title: "Land Acquisition",
      description: "Secure land transfers and property acquisition services",
      icon: "🏞️",
      link: "/services/land-transfers",
      gradient: "from-teal-400 to-cyan-600"
    },
    {
      title: "Civil & Criminal Litigation",
      description: "Expert representation in courts across all legal matters",
      icon: "⚖️",
      link: "/services/civil-litigation",
      gradient: "from-red-400 to-rose-600"
    },
    {
      title: "Commercial Litigation",
      description: "Business dispute resolution and commercial law expertise",
      icon: "💼",
      link: "/services/commercial-litigation",
      gradient: "from-indigo-400 to-purple-600"
    },
    {
      title: "Probate & Succession",
      description: "Estate planning and inheritance law services",
      icon: "📜",
      link: "/services/probate-succession",
      gradient: "from-violet-400 to-purple-600"
    },
    {
      title: "Marriage Law",
      description: "Family law matters and matrimonial dispute resolution",
      icon: "💍",
      link: "/services/marriage-law",
      gradient: "from-pink-400 to-rose-600"
    },
    {
      title: "International Finance Law",
      description: "Cross-border transactions and international trade law",
      icon: "🌍",
      link: "/services/trade-law",
      gradient: "from-cyan-400 to-blue-600"
    },
    {
      title: "Capital Markets",
      description: "Securities law and capital market regulatory compliance",
      icon: "📈",
      link: "/services/capital-markets",
      gradient: "from-emerald-400 to-green-600"
    },
  ];

  const stats = [
    { number: "15+", label: "Years Experience", icon: Clock },
    { number: "500+", label: "Cases Won", icon: Award },
    { number: "100+", label: "Corporate Clients", icon: Users },
    { number: "24/7", label: "Client Support", icon: Shield }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "Mining Corp Tanzania",
      text: "Republica Attorneys guided us through complex mining regulations with exceptional expertise.",
      image: "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5
    },
    {
      name: "David Mwangi",
      company: "Tech Startup Ltd",
      text: "Their company registration service was seamless and professional. Highly recommended!",
      image: "https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5
    },
    {
      name: "Grace Kimani",
      company: "Property Investments",
      text: "Outstanding land acquisition services. They made the complex process simple and transparent.",
      image: "https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5
    }
  ];

  return (
    <>
      <Helmet>
        <title>Republica Attorneys & Consultants - Leading Law Firm in Dar es Salaam, Tanzania</title>
        <meta name="description" content="Republica Attorneys offers expert legal services in mining, corporate law, land transfers, litigation, and finance across Tanzania. Contact us for professional legal counsel." />
        <meta name="keywords" content="law firm Tanzania, Dar es Salaam lawyers, mining law, company registration, land transfer, litigation, legal services Tanzania" />
      </Helmet>

      <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 overflow-hidden">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-orange-600">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)] animate-pulse"></div>
            <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,rgba(59,130,246,0.1)_180deg,transparent_360deg)] animate-spin" style={{ animationDuration: '20s' }}></div>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white/20 rounded-full"
                initial={{ 
                  x: Math.random() * window.innerWidth, 
                  y: Math.random() * window.innerHeight,
                  scale: Math.random() * 0.5 + 0.5
                }}
                animate={{ 
                  y: [null, -100],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>
          
          <div className="relative max-w-7xl mx-auto px-6 py-24 flex flex-col lg:flex-row items-center justify-between min-h-screen">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 space-y-8 z-10"
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3"
                >
                  <Zap className="text-orange-400" size={20} />
                  <span className="text-white font-medium">Tanzania's Premier Legal Firm</span>
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-6xl lg:text-8xl font-bold leading-tight"
                >
                  <span className="text-white">Legal</span>
                  <br />
                  <span className="bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 bg-clip-text text-transparent">
                    Excellence
                  </span>
                  <br />
                  <span className="text-white/90 text-4xl lg:text-5xl">Redefined</span>
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-xl lg:text-2xl text-blue-100 leading-relaxed max-w-2xl"
                >
                  Delivering world-class legal solutions across Tanzania and East Africa with 
                  cutting-edge technology and unmatched expertise.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/contact"
                    className="group inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-2xl transition-all duration-300 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Phone className="mr-2 relative z-10" size={20} />
                    <span className="relative z-10">Get Legal Consultation</span>
                    <ArrowRight className="ml-2 relative z-10 group-hover:translate-x-1 transition-transform duration-300" size={20} />
                  </Link>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/services"
                    className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold px-8 py-4 rounded-2xl hover:bg-white/20 transition-all duration-300"
                  >
                    <FileText className="mr-2" size={20} />
                    Explore Services
                  </Link>
                </motion.div>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                    className="text-center group"
                  >
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                      <stat.icon className="mx-auto mb-2 text-orange-400" size={24} />
                      <div className="text-2xl font-bold text-white">{stat.number}</div>
                      <div className="text-sm text-blue-200">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:w-1/2 flex justify-center lg:justify-end mt-12 lg:mt-0"
            >
              <div className="relative">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-orange-500/30 to-yellow-500/30 rounded-full blur-3xl"
                ></motion.div>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20"
                >
                  <Scale size={200} className="text-white/80" />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-orange-500/20 rounded-3xl"></div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50 to-orange-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-orange-900/20"></div>
          <div className="relative max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl lg:text-7xl font-bold mb-6">
                <span className="text-gray-900 dark:text-white">Comprehensive</span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-orange-500 bg-clip-text text-transparent">
                  Legal Services
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                From corporate law to litigation, we provide end-to-end legal solutions 
                tailored to your specific needs across all sectors.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group"
                >
                  <Link to={service.link}>
                    <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 h-full overflow-hidden">
                      {/* Gradient Background */}
                      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.gradient} opacity-10 rounded-bl-full transition-all duration-500 group-hover:opacity-20 group-hover:scale-110`}></div>
                      
                      {/* Icon */}
                      <motion.div 
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        className="text-5xl mb-6 relative z-10"
                      >
                        {service.icon}
                      </motion.div>
                      
                      {/* Content */}
                      <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 relative z-10">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 relative z-10">
                        {service.description}
                      </p>
                      
                      {/* CTA */}
                      <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:text-orange-500 transition-colors duration-300 relative z-10">
                        <span>Learn More</span>
                        <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" size={16} />
                      </div>
                      
                      {/* Hover Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-orange-600"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,255,255,0.1),transparent)]"></div>
          
          <div className="relative max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl lg:text-7xl font-bold mb-6 text-white">
                Why Choose
                <br />
                <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                  Republica Attorneys?
                </span>
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-12">
              {[
                {
                  icon: Users,
                  title: "Expert Legal Team",
                  description: "Our seasoned attorneys bring decades of combined experience across all practice areas, ensuring you receive the highest quality legal representation.",
                  gradient: "from-blue-400 to-blue-600"
                },
                {
                  icon: Shield,
                  title: "Proven Track Record",
                  description: "With over 500 successful cases and a 95% client satisfaction rate, we have established ourselves as Tanzania's most trusted legal firm.",
                  gradient: "from-orange-400 to-orange-600"
                },
                {
                  icon: Clock,
                  title: "24/7 Availability",
                  description: "Legal issues don't wait for business hours. Our team is available around the clock to provide urgent legal assistance when you need it most.",
                  gradient: "from-blue-400 to-orange-500"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ y: -10 }}
                  className="text-center group"
                >
                  <div className="relative mb-8">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`bg-gradient-to-br ${item.gradient} rounded-3xl p-8 mx-auto w-fit shadow-2xl group-hover:shadow-3xl transition-all duration-500`}
                    >
                      <item.icon size={64} className="text-white" />
                    </motion.div>
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500`}></div>
                  </div>
                  <h3 className="text-3xl font-bold mb-6 text-white">{item.title}</h3>
                  <p className="text-blue-100 leading-relaxed text-lg">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20"></div>
          
          <div className="relative max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl lg:text-7xl font-bold mb-6">
                <span className="text-gray-900 dark:text-white">What Our</span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                  Clients Say
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group"
                >
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 h-full">
                    <div className="flex items-center mb-6">
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-blue-500/20"
                      />
                      <div>
                        <h4 className="font-bold text-lg text-gray-900 dark:text-white">{testimonial.name}</h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">{testimonial.company}</p>
                      </div>
                    </div>
                    
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="text-yellow-400 fill-current" size={20} />
                      ))}
                    </div>
                    
                    <p className="text-gray-700 dark:text-gray-300 italic leading-relaxed">
                      "{testimonial.text}"
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-700 to-orange-600"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]"></div>
          
          <div className="relative max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl lg:text-7xl font-bold mb-8 text-white">
                Ready to Get Started?
              </h2>
              <p className="text-xl mb-12 text-blue-100 leading-relaxed">
                Contact us today for a consultation and let our expert legal team 
                guide you through your legal challenges with cutting-edge solutions.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center bg-white text-blue-600 font-semibold px-10 py-5 rounded-2xl hover:bg-gray-100 transition-all duration-300 shadow-2xl"
                  >
                    <Phone className="mr-3" size={24} />
                    Schedule Consultation
                    <ArrowRight className="ml-3" size={24} />
                  </Link>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <a
                    href="https://wa.me/255768450666"
                    className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm border-2 border-white text-white font-semibold px-10 py-5 rounded-2xl hover:bg-white/20 transition-all duration-300"
                  >
                    💬 WhatsApp Us
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}