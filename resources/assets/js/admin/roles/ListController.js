module.exports = function (roles, RoleService, toastr, SweetAlert) {
  var vm = this;
  vm.roles = roles;

  vm.destroy = function (data, index) {
    SweetAlert.swal({
      title: 'Esta seguro de eliminar?',
      text: 'No sera capaz de recuperar el registro!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Si, eliminalo!',
      closeOnConfirm: true,
    }, function(isConfirm) {
      if (isConfirm) {
        vm.deleteRole(data, index);
      }
    });
  };

  vm.deleteRole = function (id, index) {
    RoleService.deleteRole(id)
    .then(function(data) {
      toastr.success(data.data.message, 'Estado!');
      vm.removeFromRoles(index);
    })
    .catch(function(errors) {
      vm.errors = errors.data;
    });
  };

  vm.removeFromRoles = function (index) {
    vm.roles.splice(index, 1);
  };
};
