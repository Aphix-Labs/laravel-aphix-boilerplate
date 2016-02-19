module.exports = function (role, RoleService, $state, $stateParams, toastr) {
  'ngInject';
  var vm = this;
  vm.role =  role;
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

    RoleService.updateRole(vm.role)
    .then(function(role) {
      toastr.success(role.data.message, 'Estado!');
      $state.go('roles');
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
