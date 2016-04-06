<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

use App\Role;
use App\Permission;
use App\Http\Requests;
use App\Filters\RoleFilter;
use App\Http\Controllers\ApiController;

class RolesController extends ApiController
{
    public function __construct(Role $role, RoleFilter $roleFilter)
    {
        $this->repository = $role;
        $this->filter = $roleFilter;
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
        $query = $this->repository->permissionsOnly(['label'])->oldest()->filter($this->filter);
        return request()->has('page') ? $query->paginate() : $query->get();
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
