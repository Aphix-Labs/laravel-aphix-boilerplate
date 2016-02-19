module.exports = function (roles, RoleService, toastr, Confirm) {
  var vm = this;
  vm.roles = roles;

  vm.destroy = function (data, index) {
    Confirm.destroy(function() {
      vm.deleteRole(data, index);
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
