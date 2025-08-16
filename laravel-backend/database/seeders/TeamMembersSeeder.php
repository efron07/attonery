<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TeamMember;

class TeamMembersSeeder extends Seeder
{
    public function run(): void
    {
        $teamMembers = [
            [
                'name' => 'Sarah Mwangi',
                'title' => 'Senior Partner & Managing Director',
                'bio' => 'Sarah is a seasoned legal professional with over 15 years of experience in corporate law and commercial litigation. She has successfully represented numerous multinational corporations and local businesses in complex legal matters.',
                'image' => 'team/sarah-mwangi.jpg',
                'specialties' => json_encode([
                    'Corporate Law',
                    'Commercial Litigation',
                    'Mergers & Acquisitions',
                    'Corporate Governance'
                ]),
                'experience' => '15+ years',
                'order_index' => 1,
                'active' => true,
                'email' => 'sarah.mwangi@republicaattorneys.co.tz',
                'linkedin' => 'https://linkedin.com/in/sarah-mwangi'
            ],
            [
                'name' => 'John Kamau',
                'title' => 'Partner - Real Estate Law',
                'bio' => 'John specializes in real estate law and has extensive experience in property transactions, land registration, and development projects. He has advised on some of Tanzania\'s largest real estate developments.',
                'image' => 'team/john-kamau.jpg',
                'specialties' => json_encode([
                    'Real Estate Law',
                    'Property Transactions',
                    'Land Registration',
                    'Development Projects'
                ]),
                'experience' => '12+ years',
                'order_index' => 2,
                'active' => true,
                'email' => 'john.kamau@republicaattorneys.co.tz',
                'linkedin' => 'https://linkedin.com/in/john-kamau'
            ],
            [
                'name' => 'Fatima Hassan',
                'title' => 'Partner - Employment Law',
                'bio' => 'Fatima is an expert in employment law and labor relations. She has successfully represented both employers and employees in complex employment disputes and has extensive experience in workplace policy development.',
                'image' => 'team/fatima-hassan.jpg',
                'specialties' => json_encode([
                    'Employment Law',
                    'Labor Relations',
                    'Workplace Policies',
                    'Employment Disputes'
                ]),
                'experience' => '10+ years',
                'order_index' => 3,
                'active' => true,
                'email' => 'fatima.hassan@republicaattorneys.co.tz',
                'linkedin' => 'https://linkedin.com/in/fatima-hassan'
            ],
            [
                'name' => 'David Ochieng',
                'title' => 'Associate - Corporate Law',
                'bio' => 'David is a rising star in corporate law, specializing in business formation, regulatory compliance, and contract negotiation. He has a strong track record of helping startups and small businesses navigate complex legal requirements.',
                'image' => 'team/david-ochieng.jpg',
                'specialties' => json_encode([
                    'Business Formation',
                    'Regulatory Compliance',
                    'Contract Law',
                    'Startup Law'
                ]),
                'experience' => '6+ years',
                'order_index' => 4,
                'active' => true,
                'email' => 'david.ochieng@republicaattorneys.co.tz',
                'linkedin' => 'https://linkedin.com/in/david-ochieng'
            ],
            [
                'name' => 'Grace Nkosi',
                'title' => 'Associate - Litigation',
                'bio' => 'Grace is a skilled litigator with expertise in commercial disputes, intellectual property law, and alternative dispute resolution. She has successfully represented clients in both court proceedings and arbitration.',
                'image' => 'team/grace-nkosi.jpg',
                'specialties' => json_encode([
                    'Commercial Litigation',
                    'Intellectual Property',
                    'Alternative Dispute Resolution',
                    'Civil Litigation'
                ]),
                'experience' => '5+ years',
                'order_index' => 5,
                'active' => true,
                'email' => 'grace.nkosi@republicaattorneys.co.tz',
                'linkedin' => 'https://linkedin.com/in/grace-nkosi'
            ]
        ];

        foreach ($teamMembers as $member) {
            TeamMember::create($member);
        }
    }
}