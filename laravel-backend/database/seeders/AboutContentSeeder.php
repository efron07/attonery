<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\AboutContent;

class AboutContentSeeder extends Seeder
{
    public function run(): void
    {
        AboutContent::create([
            'intro' => 'Republica Attorneys is a leading law firm in Tanzania, dedicated to providing exceptional legal services with integrity, professionalism, and a commitment to justice.',
            'who_we_are' => 'We are a team of experienced legal professionals who understand the complexities of modern business and legal challenges. Our firm combines traditional legal expertise with innovative approaches to deliver comprehensive solutions for our clients.',
            'vision' => 'To be the most trusted and respected legal partner for businesses and individuals in Tanzania, known for our excellence, integrity, and commitment to client success.',
            'mission' => 'To provide exceptional legal services that empower our clients to achieve their goals while upholding the highest standards of professional ethics and legal excellence.',
            'company_values' => json_encode([
                'Integrity' => 'We maintain the highest ethical standards in all our dealings',
                'Excellence' => 'We strive for excellence in every aspect of our work',
                'Client Focus' => 'Our clients\' success is our primary concern',
                'Innovation' => 'We embrace innovative approaches to legal challenges',
                'Professionalism' => 'We conduct ourselves with the utmost professionalism'
            ]),
            'impact_stats' => json_encode([
                [
                    'number' => '15+',
                    'label' => 'Years Experience',
                    'icon' => '🎯'
                ],
                [
                    'number' => '500+',
                    'label' => 'Cases Won',
                    'icon' => '🏆'
                ],
                [
                    'number' => '1000+',
                    'label' => 'Happy Clients',
                    'icon' => '😊'
                ],
                [
                    'number' => '25+',
                    'label' => 'Team Members',
                    'icon' => '👥'
                ]
            ])
        ]);
    }
}