<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }
}
