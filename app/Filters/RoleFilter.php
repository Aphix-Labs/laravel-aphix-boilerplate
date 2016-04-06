<?php

namespace App\Filters;

class RoleFilter extends QueryFilter
{
    public function name($value = null)
    {
        return $this->builder->where('name', 'ilike', "%$value%");
    }

    public function label($value = null)
    {
        return $this->builder->where('label', 'ilike', "%$value%");
    }

    public function permissions($value = null)
    {
        return $this->builder->whereHas('permissions', function ($q) use ($value) {
            $q->where('label', 'ilike', "%$value%");
        });
    }
}
