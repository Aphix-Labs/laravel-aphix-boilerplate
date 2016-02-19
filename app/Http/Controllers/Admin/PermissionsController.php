<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Permission;

class PermissionsController extends Controller
{
    public function __construct(Permission $permission)
    {
        $this->repository = $permission;
    }

    public function index()
    {
        return $this->repository->all();
    }
}
