module.exports = function (UserService, $state, toastr) {
  'ngInject';
  var vm = this;

  vm.data = {
    name:  '',
    email: '',
    password: '',
    password_confirmation: ''
  };

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

    UserService.createUser(vm.data)
    .then(function(data) {
      toastr.success(data.data.message, 'Estado!');
      $state.go('users');
    })
    .catch(function(errors) {
      vm.errors = errors.data;
    }).finally(function() {
      vm.formIsSubmit = false;
    });
  };
};
