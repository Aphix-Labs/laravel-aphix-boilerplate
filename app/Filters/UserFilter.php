<?php

namespace App\Filters;

class UserFilter extends QueryFilter
{
    public function name($value = null)
    {
        return $this->builder->where('name', 'ilike', "%$value%");
    }

    public function email($value = null)
    {
        return $this->builder->where('email', 'ilike', "%$value%");
    }

    public function roles($value = null)
    {
        return $this->builder->whereHas('roles', function ($q) use ($value) {
            $q->where('label', 'ilike', "%$value%");
        });
    }
}
