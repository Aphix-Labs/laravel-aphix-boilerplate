module.exports = function (role, permissions, RoleService, $state, $stateParams, toastr) {
  'ngInject';
  var vm = this;

  vm.action = 'Editar';

  vm.data =  role;

  vm.permissions = permissions;

  vm.errors = {};

  vm.formIsSubmit = false;

  this.hasError = function(property) {
    if (vm.errors.hasOwnProperty(property)) {
      return true;
    }
    return false;
  };

  this.submitForm = function () {
    vm.formIsSubmit = true;

    RoleService.updateResource(vm.getId(), vm.data)
    .then(function(role) {
      toastr.success(role.data.message, 'Estado!');
      $state.go('roles', {}, {reload: true});
    })
    .catch(function(errors) {
      vm.errors = errors.data;
    }).finally(function() {
      vm.formIsSubmit = false;
    });
  };

  this.getId = function () {
    return $stateParams.id;
  };
};
