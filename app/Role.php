<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use Filterable;

    protected $fillable = [
        'name',
        'label'
    ];

    protected $perPage = 10;

    public function permissions()
    {
        return $this->belongsToMany(Permission::class);
    }

    public function grantPermission(Permission $permission)
    {
        return $this->permissions()->save($permission);
    }

    public function permissionsId()
    {
        return $this->permissions()->pluck('id');
    }

    public function syncPermissions(array $permissionsId)
    {
        return $this->permissions()->sync($permissionsId);
    }

    public function scopePermissionsOnly($q, array $params)
    {
        $withPermission = ['permissions' => function ($p) use ($params) {
            return $p->select($params);
        }];

        return $q->with($withPermission);
    }
}
