<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminUsername = env('ADMIN_USERNAME', 'admin@republicaattorneys.co.tz');
        $adminPassword = env('ADMIN_PASSWORD', 'republica2024');

        // Check if admin user already exists
        $existingUser = User::where('username', $adminUsername)->first();

        if (!$existingUser) {
            User::create([
                'username' => $adminUsername,
                'password_hash' => Hash::make($adminPassword),
                'role' => 'admin',
            ]);

            $this->command->info('Admin user created successfully!');
        } else {
            $this->command->info('Admin user already exists!');
        }
    }
}
