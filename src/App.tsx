import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import ErrorBoundary from './components/ErrorBoundary';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import SEO from './components/SEO';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Team from './pages/Team';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Login from './pages/Login';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Dashboard from './admin/Dashboard';
import ServicesManager from './admin/ServicesManager';
import BlogManager from './admin/BlogManager';
import AboutManager from './admin/AboutManager';
import TeamManager from './admin/TeamManager';
import ContactSettings from './admin/ContactSettings';
import AdminLogin from './admin/Login';
import DynamicService from './pages/services/DynamicService';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './hooks/useAuth';
import analytics from './utils/analytics';
import Test from './pages/Test';
import SimpleTest from './pages/SimpleTest';

// Analytics component to track page views
function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    analytics.trackPageView(location.pathname);
  }, [location]);

  return null;
}

function App() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem('darkMode', JSON.stringify(dark));
  }, [dark]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-orange-600 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading Republica Attorneys..." />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <AuthProvider>
        <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-all duration-500">
          <SEO />
          
          {/* Dark Mode Toggle */}
          <motion.button
            onClick={() => setDark(!dark)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="fixed top-4 right-4 z-50 bg-white/10 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700 px-4 py-2 rounded-full shadow-lg text-sm font-medium transition-all duration-300"
          >
            {dark ? "🌞 Light" : "🌙 Dark"}
          </motion.button>
          
          <Router>
            <AnalyticsTracker />
            <Navigation />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/team" element={<Team />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/test" element={<Test />} />
                <Route path="/simple" element={<SimpleTest />} />
                
                {/* Individual Service Pages */}
                <Route path="/services/:link" element={<DynamicService />} />
                
                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                  path="/admin/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/services"
                  element={
                    <ProtectedRoute>
                      <ServicesManager />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/blog"
                  element={
                    <ProtectedRoute>
                      <BlogManager />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/about"
                  element={
                    <ProtectedRoute>
                      <AboutManager />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/contact"
                  element={
                    <ProtectedRoute>
                      <ContactSettings />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/team"
                  element={
                    <ProtectedRoute>
                      <TeamManager />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </motion.div>
            <Footer />
          </Router>

          {/* Enhanced WhatsApp Button */}
          <motion.a
            href="https://wa.me/255768450666"
            onClick={() => analytics.trackWhatsAppClick()}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-6 right-6 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-4 rounded-full shadow-2xl z-50 transition-all duration-300 group"
            aria-label="Chat on WhatsApp"
          >
            <div className="relative">
              💬
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            </div>
            <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Chat with us on WhatsApp
            </div>
          </motion.a>
        </div>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;