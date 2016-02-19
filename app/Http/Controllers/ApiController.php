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

        return response()->json(['message' => $this->storeMessage()]);
    }

    public function update($id, Request $request)
    {
        $this->validate($request, $this->rulesUpdate($id));

        $entity = $this->repository->findOrFail($id);

        $entity->fill($request->all());

        $entity->save();

        return response()->json(['message' => $this->updateMessage()]);
    }

    public function destroy($id)
    {
        $entity = $this->repository->findOrFail($id);

        $entity->delete();

        return response()->json(['message' => $this->destroyMessage()]);
    }

    protected function storeMessage()
    {
        return 'Creación exitosa!';
    }

    protected function updateMessage()
    {
        return 'Edición exitosa!';
    }

    protected function destroyMessage()
    {
        return 'Eliminación exitosa!';
    }
}
