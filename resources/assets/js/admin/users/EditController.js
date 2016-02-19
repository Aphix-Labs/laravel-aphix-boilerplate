module.exports = function (data, UserService, $state, $stateParams, toastr) {
  'ngInject';
  var vm = this;
  vm.data =  data;
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

  this.getId = function () {
    return $stateParams.id;
  };
};
