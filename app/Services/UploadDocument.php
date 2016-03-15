<?php namespace App\Services;

class UploadDocument
{
    protected $documentPath;

    protected $filename;

    protected $file;

    public function __construct($file, $path = 'documents')
    {
        $this->file = $file;
        $this->setFilename($file);
        $this->documentPath = $path;
    }

    public function make()
    {
        $this->upload();
        return $this->filename;
    }

    private function upload()
    {
        $this->file->move($this->documentPath, $this->filename);
    }

    private function setFilename($file)
    {
        $this->filename = time() . '_'. str_replace(' ', '_', $file->getClientOriginalName());
    }
}
