<?php

use Illuminate\Database\Seeder;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\User::class)->create([
            'name' => 'admin',
            'email' => 'admin@admin.cl',
            'password' => 123
        ])->assignRole('admin');
    }
}
