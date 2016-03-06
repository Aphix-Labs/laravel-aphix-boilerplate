module.exports = function (RoleService, $state, toastr, permissions) {
  'ngInject';
  var vm = this;

  vm.action = 'Crear';

  vm.data = {
    name:  '',
    label: '',
    permissions: []
  };

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

    RoleService.createResource(vm.data)
    .then(function(data) {
      toastr.success(data.data.message, 'Estado!');
      $state.go('roles', {}, {reload: true});
    })
    .catch(function(errors) {
      vm.errors = errors.data;
    }).finally(function() {
      vm.formIsSubmit = false;
    });
  };
};
