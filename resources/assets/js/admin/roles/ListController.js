module.exports = function (roles, RoleService, toastr, Confirm, $state, $stateParams) {
  'ngInject';
  var vm = this;
  vm.roles = roles.data;
  vm.totalItems = roles.total;
  vm.itemsPerPage = roles.per_page;
  vm.search = $stateParams;
  vm.search.page = roles.current_page;
  vm.reload = false;

  vm.filter = function() {
    $state.go('.', vm.search, {reload: true});
    vm.reload = true;
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
