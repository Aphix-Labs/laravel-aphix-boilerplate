<?php

use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $permissions = [
            [
                'name' => 'admin_users',
                'label' => 'Administrar Usuarios'
            ],
            [
                'name' => 'admin_roles',
                'label' => 'Administrar Roles'
            ]
        ];

        foreach ($permissions as $permission) {
            App\Permission::create($permission);
        }
    }
}
