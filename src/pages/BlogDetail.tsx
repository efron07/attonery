import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { ArrowLeft, Calendar, User } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  content: string;
  date: string;
  author: string;
  metaDescription?: string;
  keywords?: string[];
}

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call - replace with actual API call
    const mockBlogs: BlogPost[] = [
      {
        id: 1,
        title: "Understanding Land Law in Tanzania",
        content: `
          <h2>Introduction to Land Law in Tanzania</h2>
          <p>Land in Tanzania is state-owned, and individuals may hold a right of occupancy. This fundamental principle shapes all land transactions and ownership structures in the country.</p>
          
          <h3>Types of Land Tenure</h3>
          <p>Tanzania recognizes several types of land tenure:</p>
          <ul>
            <li><strong>General Land:</strong> Land that is not reserved or village land</li>
            <li><strong>Reserved Land:</strong> Land set aside for special purposes</li>
            <li><strong>Village Land:</strong> Land within village boundaries</li>
          </ul>
          
          <h3>Right of Occupancy</h3>
          <p>The right of occupancy is the primary form of land holding in Tanzania. It can be:</p>
          <ul>
            <li><strong>Granted Right of Occupancy:</strong> Issued by the Commissioner for Lands</li>
            <li><strong>Customary Right of Occupancy:</strong> Recognized under customary law</li>
          </ul>
          
          <h3>Land Acquisition Process</h3>
          <p>The process of acquiring land in Tanzania involves several steps:</p>
          <ol>
            <li>Application to the relevant authority</li>
            <li>Survey and valuation</li>
            <li>Payment of required fees</li>
            <li>Issuance of Certificate of Right of Occupancy</li>
          </ol>
          
          <h3>Legal Requirements</h3>
          <p>All land transactions must comply with the Land Act and other relevant legislation. Key requirements include:</p>
          <ul>
            <li>Proper documentation</li>
            <li>Payment of stamp duty</li>
            <li>Registration with the Land Registry</li>
            <li>Compliance with planning regulations</li>
          </ul>
          
          <h3>Conclusion</h3>
          <p>Understanding Tanzania's land law is crucial for anyone involved in property transactions. We recommend seeking professional legal advice for all land-related matters to ensure compliance with current regulations.</p>
        `,
        date: "2024-01-15",
        author: "Dr. John Mwalimu",
        metaDescription: "Comprehensive guide to land law in Tanzania covering types of tenure, right of occupancy, and acquisition processes.",
        keywords: ["land law Tanzania", "right of occupancy", "land acquisition", "property law"]
      },
      {
        id: 2,
        title: "Company Registration Process in Tanzania",
        content: `
          <h2>Starting Your Business in Tanzania</h2>
          <p>Tanzania offers a conducive environment for business registration through the Business Registration and Licensing Agency (BRELA). This guide outlines the complete process.</p>
          
          <h3>Types of Business Entities</h3>
          <p>Tanzania recognizes several types of business entities:</p>
          <ul>
            <li><strong>Sole Proprietorship:</strong> Single owner business</li>
            <li><strong>Partnership:</strong> Two or more partners</li>
            <li><strong>Private Limited Company:</strong> Limited liability company</li>
            <li><strong>Public Limited Company:</strong> Company with public shareholders</li>
          </ul>
          
          <h3>Registration Process</h3>
          <p>The registration process involves the following steps:</p>
          <ol>
            <li>Name reservation with BRELA</li>
            <li>Preparation of incorporation documents</li>
            <li>Payment of registration fees</li>
            <li>Submission of application</li>
            <li>Issuance of Certificate of Incorporation</li>
          </ol>
          
          <h3>Required Documents</h3>
          <p>The following documents are typically required:</p>
          <ul>
            <li>Memorandum and Articles of Association</li>
            <li>Form I (Application for Registration)</li>
            <li>Form II (Statement of Nominal Capital)</li>
            <li>Directors' and shareholders' details</li>
            <li>Registered office address</li>
          </ul>
          
          <h3>Post-Registration Compliance</h3>
          <p>After registration, companies must comply with ongoing requirements:</p>
          <ul>
            <li>Annual returns filing</li>
            <li>Tax registration</li>
            <li>License applications</li>
            <li>Statutory meetings</li>
          </ul>
        `,
        date: "2024-01-10",
        author: "James Mwangi",
        metaDescription: "Complete guide to company registration in Tanzania through BRELA, including required documents and compliance requirements.",
        keywords: ["company registration Tanzania", "BRELA", "business registration", "incorporation"]
      },
      {
        id: 3,
        title: "Mining Rights and Regulations",
        content: `
          <h2>Tanzania's Mining Sector Overview</h2>
          <p>Tanzania's mining sector is one of the key contributors to the economy. The sector is governed by comprehensive laws and regulations designed to ensure sustainable development.</p>
          
          <h3>Mining Licenses</h3>
          <p>Tanzania issues several types of mining licenses:</p>
          <ul>
            <li><strong>Prospecting License:</strong> For exploration activities</li>
            <li><strong>Special Mining License:</strong> For large-scale mining</li>
            <li><strong>Mining License:</strong> For medium-scale mining</li>
            <li><strong>Primary Mining License:</strong> For small-scale mining</li>
          </ul>
          
          <h3>Application Process</h3>
          <p>The mining license application process includes:</p>
          <ol>
            <li>Submission of application to Mining Commission</li>
            <li>Technical and financial evaluation</li>
            <li>Environmental impact assessment</li>
            <li>Public consultation</li>
            <li>License issuance</li>
          </ol>
          
          <h3>Environmental Requirements</h3>
          <p>All mining operations must comply with environmental regulations:</p>
          <ul>
            <li>Environmental Impact Assessment (EIA)</li>
            <li>Environmental Management Plan</li>
            <li>Restoration and rehabilitation plans</li>
            <li>Regular environmental monitoring</li>
          </ul>
          
          <h3>Legal Obligations</h3>
          <p>Mining companies have various legal obligations:</p>
          <ul>
            <li>Payment of royalties and taxes</li>
            <li>Local content requirements</li>
            <li>Health and safety compliance</li>
            <li>Community development contributions</li>
          </ul>
        `,
        date: "2024-01-05",
        author: "Dr. John Mwalimu",
        metaDescription: "Comprehensive guide to mining rights and regulations in Tanzania, covering licensing, environmental requirements, and legal obligations.",
        keywords: ["mining law Tanzania", "mining licenses", "environmental compliance", "mining regulations"]
      }
    ];

    const foundBlog = mockBlogs.find(b => b.id === parseInt(id || "0"));
    setBlog(foundBlog || null);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Article Not Found</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">The article you're looking for doesn't exist.</p>
          <Link
            to="/blog"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{blog.title} - Republica Attorneys & Consultants</title>
        <meta name="description" content={blog.metaDescription || blog.content.substring(0, 160)} />
        <meta name="keywords" content={blog.keywords?.join(", ") || ""} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.metaDescription || blog.content.substring(0, 160)} />
        <meta property="og:type" content="article" />
      </Helmet>

      <article className="bg-white dark:bg-gray-900 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/blog"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 transition"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Blog
            </Link>

            <header className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
                {blog.title}
              </h1>
              
              <div className="flex items-center space-x-6 text-gray-600 dark:text-gray-400">
                <div className="flex items-center">
                  <Calendar size={18} className="mr-2" />
                  {new Date(blog.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <div className="flex items-center">
                  <User size={18} className="mr-2" />
                  {blog.author}
                </div>
              </div>
            </header>

            <div 
              className="prose prose-lg dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  Need Legal Assistance?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Our experienced legal team is ready to help you with any questions or legal matters related to this topic.
                </p>
                <Link
                  to="/contact"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
                >
                  Contact Our Legal Team
                </Link>
              </div>
            </footer>
          </motion.div>
        </div>
      </article>
    </>
  );
}