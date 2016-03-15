<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use Illuminate\Http\Request;
use App\Services\UploadDocument;

class UploadDocumentController extends Controller
{
    public function upload(Request $request)
    {
        $this->validate($request, [
            'file' => 'required'
        ]);

        $uploadDocument = new UploadDocument(request()->file('file'));

        return ['filename' => $uploadDocument->make()];
    }
}
