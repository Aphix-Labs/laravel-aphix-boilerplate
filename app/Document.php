<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    protected $fillable = [
        'name',
        'filename',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    protected $appends = [
        'path'
    ];

    protected $perPage = 10;

    public function getPathAttribute()
    {
        return "/documents/{$this->attributes['filename']}";
    }
}
