<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use App\Role;
use App\Permission;

class RoleCrudTest extends TestCase
{
    use WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function lists_all_roles()
    {
        $roles = factory(Role::class, 3)->create();

        $this->json('get', '/admin/roles')
            ->seeJsonStructure([['id', 'name', 'label', 'permissions']])
            ->seeJson($roles->toArray()[0])
            ->seeStatusCode(200);
    }

    /**
     * @test
     */
    public function an_empty_role_is_invalid()
    {
        $this->json('post', '/admin/roles')
            ->seeJsonStructure(['name', 'label'])
            ->seeJsonContains(['roles'], $negate = true)
            ->seeStatusCode(422);
    }

    /**
     * @test
     */
    public function a_role_name_must_be_unique()
    {
        factory(Role::class)->create([
            'name' => 'rol'
        ]);

        $requestData = [
            'name' => 'rol',
            'label' => 'label'
        ];

        $this->json('post', '/admin/roles', $requestData)
            ->seeJsonStructure(['name'])
            ->seeStatusCode(422);
    }

    /**
     * @test
     */
    public function a_role_can_be_created_without_permissions()
    {
        $requestData = [
            'name' => 'dummy rol',
            'label' => 'dummy label',
        ];

        $this->json('post', '/admin/roles', $requestData)
            ->seeJsonStructure(['message'])
            ->seeStatusCode(200);
    }

    /**
     * @test
     */
    public function a_role_can_have_multiples_permissions()
    {
        $permissions = factory(Permission::class, 2)->create();

        $requestData = [
            'name' => 'dummy rol',
            'label' => 'dummy label',
            'permissions' => $permissions->pluck('id')
        ];

        $this->json('post', '/admin/roles', $requestData)
            ->seeJsonStructure(['message'])
            ->seeStatusCode(200);
    }

    /**
     * @test
     */
    public function an_exisent_role_cannot_be_empty()
    {
        $role = factory(Role::class)->create();

        $requestData = [
            'name' => '',
            'label' => ''
        ];

        $this->json('put', "/admin/roles/{$role->id}", $requestData)
            ->seeJsonStructure(['name', 'label'])
            ->seeJsonContains(['permissions'], $negate = true)
            ->seeStatusCode(422);
    }

    /**
     * @test
     */
    public function a_role_can_be_updated()
    {
        $role = factory(Role::class)->create();

        $requestData = array_merge($role->toArray(), [
            'name' => 'new name',
            'label' => 'new label',
            'permissions' => []
        ]);

        $this->json('put', "admin/roles/{$role->id}", $requestData)
            ->seeJsonStructure(['message'])
            ->seeStatusCode(200);
    }

    /**
     * @test
     */
    public function a_role_can_be_removed()
    {
        $role = factory(Role::class)->create();

        $this->json('delete', "/admin/roles/{$role->id}")
            ->seeJsonStructure(['message'])
            ->seeStatusCode(200);
    }
}
