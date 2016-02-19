<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\ApiController;
use App\Role;

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
}
