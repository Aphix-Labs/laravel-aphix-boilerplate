<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use App\User;
use App\Role;

class UserCrudTest extends TestCase
{
    use WithoutMiddleware, DatabaseTransactions;

    /** @test */
    public function list_all_users()
    {
        $users = factory(User::class, 3)->create();

        $this->get('/admin/users')
            ->seeJsonStructure(['data' => ['*' => ['id', 'name', 'email', 'roles']]])
            ->seeStatusCode(200);
    }

    /** @test */
    public function the_fields_name_email_password_are_required_to_create_a_user()
    {
        $this->json('post', '/admin/users')
            ->seeJsonStructure(['name', 'email', 'password'])
            ->seeJsonContains(['roles'], $negate = true)
            ->seeStatusCode(422);
    }

    /** @test */
    public function a_user_can_be_created_without_role()
    {
        $requestData = [
            'name' => 'rodrigore',
            'email' => 'rodrigore@admin.cl',
            'password' => '123456',
            'password_confirmation' => '123456',
            'roles' => []
        ];

        $this->json('post', '/admin/users', $requestData)
            ->seeJsonStructure(['message'])
            ->seeStatusCode(200);
    }

    /** @test */
    public function a_user_can_be_created_with_roles()
    {
        $role = factory(Role::class)->create();

        $requestData = [
            'name' => 'rodrigore',
            'email' => 'rodrigore@admin.cl',
            'password' => '123456',
            'password_confirmation' => '123456',
            'roles' => [$role->id]
        ];

        $this->json('post', '/admin/users', $requestData)
            ->seeJsonStructure(['message'])
            ->seeStatusCode(200);
    }

    /** @test */
    public function an_existent_cannot_be_empty()
    {
        $user = factory(User::class)->create();

        $requestData = [
            'name' => '',
            'email' => '',
        ];

        $this->json('put', "/admin/users/{$user->id}", $requestData)
            ->seeJsonStructure(['name', 'email'])
            ->seeJsonContains(['roles', 'password'], $negate = true)
            ->seeStatusCode(422);
    }

    /** @test */
    public function a_user_can_be_updated()
    {
        // create user with role
        $role = factory(Role::class)->create();
        $user = factory(User::class)->create();
        $user->roles()->save($role);

        // fake request data with a new name
        $requestData = array_merge($user->toArray(), [
            'roles' => $user->roles->pluck('id'),
            'name' => 'new name'
        ]);

        $this->json('put', "/admin/users/{$user->id}", $requestData)
            ->seeJsonStructure(['message'])
            ->seeStatusCode(200);
    }

    /** @test */
    public function a_user_can_be_removed()
    {
        $user = factory(User::class)->create();

        $this->json('delete', "/admin/users/{$user->id}")
            ->seeJsonStructure(['message'])
            ->seeStatusCode(200);
    }
}
