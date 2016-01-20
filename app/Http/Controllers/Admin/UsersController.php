<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\ApiController;
use App\User;

class UsersController extends ApiController
{

    public function __construct(User $user)
    {
        $this->repository = $user;
    }

    protected function rulesStore()
    {
        return [
            'name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|confirmed|min:6',
        ];
    }

    protected function rulesUpdate($id)
    {
        return [
            'name' => 'sometimes|required|max:255',
            'email' => 'sometimes|required|email|max:255|unique:users,email,' . $id,
            'password' => 'sometimes|required|confirmed|min:6',
        ];
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);

        $user->delete();

        return response()->json(['message' => 'Usuario eliminado satisfatoriamente']);
    }
}
