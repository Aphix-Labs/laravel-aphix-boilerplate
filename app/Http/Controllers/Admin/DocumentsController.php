<?php

namespace App\Http\Controllers\Admin;

use App\Document;
use App\Http\Requests;
use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;
use Illuminate\Contracts\Validation\Validator;

class DocumentsController extends ApiController
{

    public function __construct(Document $document)
    {
        $this->repository = $document;
    }

    protected function rulesStore()
    {
        return [
            'name'     => 'required|max:255',
            'filename' => 'required|max:255',
        ];
    }

    protected function rulesUpdate($id)
    {
        return [
            'name'     => 'sometimes|required|max:255',
            'filename' => 'required|max:255',
        ];
    }

    public function index()
    {
        return $this->repository->oldest()->paginate();
    }

    public function dbUpdate($entity, Request $request)
    {
        // call UploadDocumentService
        //
        $entity->fill($request->all());

        $entity->save();

    }
}
