<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

abstract class ApiController extends Controller
{
    protected $repository;

    abstract protected function rulesStore();

    abstract protected function rulesUpdate($id);

    protected $messageStore = 'Creación exitosa!';

    protected $messageUpdate = 'Edición exitosa!';


    public function index()
    {
        return $this->repository->all();
    }

    public function show($id)
    {
        return $this->repository->findOrFail($id);
    }

    public function store(Request $request)
    {
        $this->validate($request, $this->rulesStore());

        $this->repository->create($request->all());

        return response()->json(['message' => $this->messageStore]);
    }

    public function update($id, Request $request)
    {
        $this->validate($request, $this->rulesUpdate($id));

        $user = $this->repository->findOrFail($id);

        $user->fill($request->all());

        $user->save();

        return response()->json(['message' => $this->messageUpdate]);
    }
}
