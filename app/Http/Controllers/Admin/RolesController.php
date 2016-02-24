<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\ApiController;
use App\Role;
use App\Permission;

class RolesController extends ApiController
{
    public function __construct(Role $role)
    {
        $this->repository = $role;
    }

    protected function rulesStore()
    {
        return [
            'name' => 'required|max:255|unique:roles',
            'label' => 'required|max:255',
        ];
    }

    protected function rulesUpdate($id)
    {
        return [
            'name' => 'sometimes|required|max:255|unique:roles,name,' . $id,
            'label' => 'sometimes|required|max:255',
        ];
    }

    public function index()
    {
        return $this->repository->permissionsOnly(['label'])->get();
    }

    public function show($id)
    {
        $role = $this->repository->findOrFail($id);

        $role->permissions = $role->permissionsId();

        return $role;
    }

    public function insert(Request $request)
    {
        $role = $this->repository->create($request->all());

        $permissions = Permission::whereIn('id', $request->permissions)->get();

        foreach ($permissions as $permission) {
            $role->grantPermission($permission);
        }
    }

    public function dbUpdate($entity, Request $request)
    {
        $entity->fill($request->all());

        $entity->save();

        $entity->syncPermissions($request['permissions']);
    }
}
