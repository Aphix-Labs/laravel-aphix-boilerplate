module.exports = function (roles, RoleService, toastr, Confirm, $state) {
  var vm = this;
  vm.roles = roles.data;
  vm.totalItems = roles.total;
  vm.currentPage = roles.current_page;
  vm.itemsPerPage = roles.per_page;

  vm.pageChanged = function() {
    $state.go('.', {page: vm.currentPage});
  };

  vm.destroy = function (data, index) {
    Confirm.destroy(function() {
      vm.deleteRole(data, index);
    });
  };

  vm.deleteRole = function (id, index) {
    RoleService.deleteResource(id)
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
