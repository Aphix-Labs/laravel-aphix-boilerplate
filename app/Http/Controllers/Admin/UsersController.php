<?php

namespace App\Http\Controllers\Admin;

use App\User;
use App\Http\Requests;
use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;
use Illuminate\Contracts\Validation\Validator;

class UsersController extends ApiController
{

    public function __construct(User $user)
    {
        $this->repository = $user;
    }

    protected function rulesStore()
    {
        return [
            'name'     => 'required|max:255',
            'email'    => 'required|email|max:255|unique:users',
            'password' => 'required|confirmed|min:6',
            'roles'    => 'present|array',
            'roles.*'  => 'exists:roles,id'
        ];
    }

    protected function rulesUpdate($id)
    {
        return [
            'name'     => 'sometimes|required|max:255',
            'email'    => 'sometimes|required|email|max:255|unique:users,email,' . $id,
            'password' => 'sometimes|required|confirmed|min:6',
            'roles.*'  => 'exists:roles,id'
        ];
    }

    public function index()
    {
        return $this->repository->rolesOnly(['label'])->get();
    }

    public function show($id)
    {
        $user = $this->repository->findOrFail($id);

        $user->roles = $user->rolesId();

        return $user;
    }

    public function insert(Request $request)
    {
        $entity = $this->repository->create($request->all());

        $entity->syncRoles($request['roles']);
    }

    public function dbUpdate($entity, Request $request)
    {
        $entity->fill($request->all());

        $entity->save();

        $entity->syncRoles($request['roles']);
    }

    protected function formatValidationErrors(Validator $validator)
    {
        foreach ($validator->errors()->getMessages() as $key => $message) {
            if (starts_with($key, 'roles')) {
                $validator->errors()->add('roles', $message[0]);
            }
        }
        return $validator->errors()->getMessages();
    }
}
