<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Service;

class ServicesSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            [
                'title' => 'Corporate Law',
                'description' => 'Comprehensive corporate legal services for businesses of all sizes.',
                'icon' => 'building',
                'link' => '/services/corporate-law',
                'gradient' => 'from-blue-500 to-cyan-500',
                'order_index' => 1,
                'active' => true,
                'overview' => 'Our corporate law practice provides expert legal counsel for businesses, from startups to multinational corporations.',
                'features' => json_encode([
                    'Business Formation and Registration',
                    'Corporate Governance',
                    'Mergers and Acquisitions',
                    'Contract Negotiation and Drafting',
                    'Regulatory Compliance',
                    'Corporate Restructuring'
                ]),
                'process_steps' => json_encode([
                    'Initial Consultation and Assessment',
                    'Legal Strategy Development',
                    'Document Preparation and Review',
                    'Negotiation and Execution',
                    'Ongoing Support and Compliance'
                ]),
                'requirements' => json_encode([
                    'Business Registration Documents',
                    'Financial Statements',
                    'Corporate Structure Information',
                    'Regulatory Requirements'
                ]),
                'benefits' => json_encode([
                    'Legal Protection for Your Business',
                    'Compliance with Local and International Laws',
                    'Risk Mitigation',
                    'Strategic Legal Guidance'
                ]),
                'meta_description' => 'Expert corporate law services in Tanzania. Business formation, governance, M&A, and compliance.',
                'keywords' => 'corporate law, business law, Tanzania, legal services, business formation',
                'slug' => 'corporate-law'
            ],
            [
                'title' => 'Commercial Litigation',
                'description' => 'Expert representation in commercial disputes and litigation.',
                'icon' => 'scale',
                'link' => '/services/commercial-litigation',
                'gradient' => 'from-red-500 to-pink-500',
                'order_index' => 2,
                'active' => true,
                'overview' => 'Our commercial litigation team represents clients in complex business disputes and legal proceedings.',
                'features' => json_encode([
                    'Contract Disputes',
                    'Business Torts',
                    'Employment Litigation',
                    'Intellectual Property Disputes',
                    'Securities Litigation',
                    'Alternative Dispute Resolution'
                ]),
                'process_steps' => json_encode([
                    'Case Evaluation and Strategy',
                    'Evidence Gathering and Analysis',
                    'Pre-trial Preparation',
                    'Court Representation',
                    'Settlement Negotiation',
                    'Appeal Process (if needed)'
                ]),
                'requirements' => json_encode([
                    'Case Documentation',
                    'Evidence and Witnesses',
                    'Financial Records',
                    'Legal Authority'
                ]),
                'benefits' => json_encode([
                    'Expert Legal Representation',
                    'Strategic Case Management',
                    'Cost-Effective Solutions',
                    'Favorable Outcomes'
                ]),
                'meta_description' => 'Professional commercial litigation services in Tanzania. Expert representation in business disputes.',
                'keywords' => 'commercial litigation, business disputes, Tanzania, legal representation',
                'slug' => 'commercial-litigation'
            ],
            [
                'title' => 'Real Estate Law',
                'description' => 'Comprehensive real estate legal services for property transactions.',
                'icon' => 'home',
                'link' => '/services/real-estate-law',
                'gradient' => 'from-green-500 to-emerald-500',
                'order_index' => 3,
                'active' => true,
                'overview' => 'Our real estate practice covers all aspects of property law, from transactions to development projects.',
                'features' => json_encode([
                    'Property Transactions',
                    'Land Registration',
                    'Development Projects',
                    'Lease Agreements',
                    'Property Disputes',
                    'Regulatory Compliance'
                ]),
                'process_steps' => json_encode([
                    'Property Due Diligence',
                    'Document Review and Preparation',
                    'Negotiation and Agreement',
                    'Registration and Transfer',
                    'Post-Transaction Support'
                ]),
                'requirements' => json_encode([
                    'Property Documents',
                    'Title Deeds',
                    'Survey Plans',
                    'Regulatory Approvals'
                ]),
                'benefits' => json_encode([
                    'Secure Property Transactions',
                    'Legal Protection',
                    'Regulatory Compliance',
                    'Peace of Mind'
                ]),
                'meta_description' => 'Expert real estate law services in Tanzania. Property transactions, development, and disputes.',
                'keywords' => 'real estate law, property law, Tanzania, land registration',
                'slug' => 'real-estate-law'
            ],
            [
                'title' => 'Employment Law',
                'description' => 'Comprehensive employment law services for employers and employees.',
                'icon' => 'users',
                'link' => '/services/employment-law',
                'gradient' => 'from-purple-500 to-indigo-500',
                'order_index' => 4,
                'active' => true,
                'overview' => 'Our employment law practice provides expert guidance on all aspects of employment relationships.',
                'features' => json_encode([
                    'Employment Contracts',
                    'Workplace Policies',
                    'Discrimination Claims',
                    'Wrongful Termination',
                    'Labor Disputes',
                    'Compliance Audits'
                ]),
                'process_steps' => json_encode([
                    'Employment Assessment',
                    'Policy Development',
                    'Contract Preparation',
                    'Compliance Review',
                    'Dispute Resolution'
                ]),
                'requirements' => json_encode([
                    'Employment Records',
                    'Company Policies',
                    'Regulatory Requirements',
                    'Dispute Documentation'
                ]),
                'benefits' => json_encode([
                    'Compliance with Labor Laws',
                    'Risk Mitigation',
                    'Fair Employment Practices',
                    'Dispute Resolution'
                ]),
                'meta_description' => 'Professional employment law services in Tanzania. Employment contracts, disputes, and compliance.',
                'keywords' => 'employment law, labor law, Tanzania, workplace policies',
                'slug' => 'employment-law'
            ]
        ];

        foreach ($services as $service) {
            Service::create($service);
        }
    }
}