@extends('layouts.admin')

@section('content')
    <div class='col-xs-12'>
        <div class='row'>
            <div class='pull-right'>
                <a ui-sref="users-create" class='btn btn-primary'>Nuevo Usuario</a>
            </div>
        </div>
        <br>

        <div class='row'>
            <div class="panel panel-default">
                <div class="panel-heading">Usuarios</div>

                <div class="panel-body">
                    <div ui-view></div>
                </div>
            </div>
        </div>
    </div>
@endsection

