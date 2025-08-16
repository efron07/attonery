<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ContactSetting;

class ContactSettingsSeeder extends Seeder
{
    public function run(): void
    {
        ContactSetting::create([
            'email' => 'info@republicaattorneys.co.tz',
            'phone' => '+255 22 123 4567',
            'whatsapp' => '+255 755 123 456',
            'address' => '123 Legal Street, Dar es Salaam, Tanzania',
            'map_embed' => '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.819123456789!2d39.2833!3d-6.8231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNDknMjMuMSJTIDM5wrAxNycwMC4wIkU!5e0!3m2!1sen!2stz!4v1234567890" width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy"></iframe>',
            'office_hours' => json_encode([
                'Monday' => '8:00 AM - 6:00 PM',
                'Tuesday' => '8:00 AM - 6:00 PM',
                'Wednesday' => '8:00 AM - 6:00 PM',
                'Thursday' => '8:00 AM - 6:00 PM',
                'Friday' => '8:00 AM - 5:00 PM',
                'Saturday' => '9:00 AM - 2:00 PM',
                'Sunday' => 'Closed'
            ])
        ]);
    }
}