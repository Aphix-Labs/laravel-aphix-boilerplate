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
        // create admin role
        factory(App\Role::class)->create([
            'name' => 'admin',
            'label' => 'Administrador del sistema'
        ]);

        factory(App\User::class)->create([
            'name' => 'admin',
            'email' => 'admin@admin.cl',
            'password' => bcrypt(123)
        ])->assignRole('admin');
    }
}
