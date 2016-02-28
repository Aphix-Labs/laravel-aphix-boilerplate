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

        $this
            ->get('/admin/users')
            ->seeJsonStructure([['id', 'name', 'email', 'roles']])
            ->seeJson($users->toArray()[0])
            ->seeStatusCode(200);
    }

    /** @test */
    public function creating_a_user_with_incomplete_field_response_json_with_validations()
    {
        $this
            ->json('post', '/admin/users')
            ->seeJsonStructure(['name', 'email', 'password'])
            ->seeJsonContains(['roles'], $negate = true)
            ->seeStatusCode(422);
    }

    /** @test */
    public function create_a_user_without_role()
    {
        $requestData = [
            'name' => 'rodrigore',
            'email' => 'rodrigore@admin.cl',
            'password' => '123456',
            'password_confirmation' => '123456',
            'roles' => []
        ];

        $this
            ->json('post', '/admin/users', $requestData)
            ->seeJsonStructure(['message'])
            ->seeStatusCode(200);
    }

    /** @test */
    public function create_a_user_with_role()
    {
        $role = factory(Role::class)->create();

        $requestData = [
            'name' => 'rodrigore',
            'email' => 'rodrigore@admin.cl',
            'password' => '123456',
            'password_confirmation' => '123456',
            'roles' => [$role->id]
        ];

        // create user
        $this
            ->json('post', '/admin/users', $requestData)
            ->seeJsonStructure(['message'])
            ->seeStatusCode(200);

        // check existence of the user with the role
        $this
            ->get('/admin/users')
            ->seeJson([
                'email' => $requestData['email'],
                'label' => $role->label
            ]);
    }

    /** @test */
    public function edit_a_user_without_complete_all_field_response_json_with_validations()
    {
        $user = factory(User::class)->create();

        $requestData = [
            'name' => '',
            'email' => '',
        ];

        $this
            ->json('put', "/admin/users/{$user->id}", $requestData)
            ->seeJsonStructure(['name', 'email'])
            ->seeJsonContains(['roles', 'password'], $negate = true)
            ->seeStatusCode(422);
    }

    /** @test */
    public function edit_a_user()
    {
        // create user with role
        $role = factory(Role::class)->create();
        $user = factory(User::class)
            ->create();
        $user
            ->roles()
            ->save($role);

        // fake request data with a new name
        $requestData = array_merge($user->toArray(), [
            'roles' => $user->roles->pluck('id'),
            'name' => 'new name'
        ]);

        $this
            ->json('put', "/admin/users/{$user->id}", $requestData)
            ->seeJsonStructure(['message'])
            ->seeStatusCode(200);
    }

    /** @test */
    public function remove_a_user()
    {
        $user = factory(User::class)->create();

        // check existence of the user
        $this
            ->get('/admin/users')
            ->seeJson([
                'name' => $user->name,
                'email' => $user->email
            ]);

        $this
            ->json('delete', "/admin/users/{$user->id}")
            ->seeJsonStructure(['message'])
            ->seeStatusCode(200);

        // check the non existence of the user
        $this
            ->get('/admin/users')
            ->dontSeeJson([
                'name' => $user->name,
                'email' => $user->email
            ]);
    }
}
