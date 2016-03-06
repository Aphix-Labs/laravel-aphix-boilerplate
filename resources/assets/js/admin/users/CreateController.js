module.exports = function (roles, UserService, $state, toastr) {
  'ngInject';
  var vm = this;
  vm.action = 'Crear';
  vm.roles = roles;
  vm.errors = {};
  vm.formIsSubmit = false;
  vm.data = {
    name:  '',
    email: '',
    password: '',
    password_confirmation: '',
    roles: []
  };

  this.hasError = function(property) {
    if (vm.errors.hasOwnProperty(property)) {
      return true;
    }
    return false;
  };

  this.submitForm = function () {
    vm.formIsSubmit = true;

    UserService.createUser(vm.data)
    .then(function(data) {
      toastr.success(data.data.message, 'Estado!');
      $state.go('users.list');
    })
    .catch(function(errors) {
      vm.errors = errors.data;
    }).finally(function() {
      vm.formIsSubmit = false;
    });
  };
};
