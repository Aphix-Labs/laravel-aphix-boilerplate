<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Role;

class RolesController extends Controller
{
    public function index()
    {
        return Role::all();
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|max:255|unique:roles',
            'label' => 'required|max:255',
        ]);

        Role::create([
            'name' => $request->name,
            'label' => $request->label,
        ]);

        return response()->json(['message' => 'Rol creado satisfatoriamente']);
    }
}
