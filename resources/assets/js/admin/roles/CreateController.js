module.exports = function (RoleService, $state, toastr, permissions) {
  'ngInject';
  var vm = this;

  vm.data = {
    name:  '',
    label: '',
    permissions: []
  };

  vm.permissions = permissions;
  console.log(vm.permissions);

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

    RoleService.createRole(vm.data)
    .then(function(data) {
      toastr.success(data.data.message, 'Estado!');
      $state.go('roles');
    })
    .catch(function(errors) {
      vm.errors = errors.data;
    }).finally(function() {
      vm.formIsSubmit = false;
    });
  };
};
