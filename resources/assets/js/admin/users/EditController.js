module.exports = function (UserService, $state, $stateParams, toastr) {
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

    UserService.updateUser(vm.getId(), vm.data)
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

  this.fetchUser = function (id) {
    UserService.getUser(id).then(function(data) {
      vm.data = data.data;
    });
  };

  this.getId = function () {
    return $stateParams.id;
  };

  this.fetchUser(this.getId());
};
