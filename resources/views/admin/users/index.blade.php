@extends('layouts.admin')

@section('content')
    <div class="panel panel-default">
        <div class="panel-heading">Usuarios</div>

        <div class="panel-body">
             <div ui-view></div>

            @{{ vm.users | json }}

             <a ui-sref="users">State 1</a>

        </div>
    </div>
@endsection

