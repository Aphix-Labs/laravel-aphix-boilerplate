<?php

use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // create admin role
        $roleAdmin = App\Role::create([
            'name' => 'admin',
            'label' => 'Administrador del sistema'
        ]);

        foreach (App\Permission::all() as $permission) {
            $roleAdmin->grantPermission($permission);
        }
    }
}
