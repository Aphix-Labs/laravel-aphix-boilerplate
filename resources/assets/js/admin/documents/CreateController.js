module.exports = function (DocumentService, $state, toastr) {
  'ngInject';
  var vm = this;
  vm.action = 'Crear';
  vm.errors = {};
  vm.formIsSubmit = false;
  vm.data = {
    name:  '',
  };

  this.hasError = function(property) {
    if (vm.errors.hasOwnProperty(property)) {
      return true;
    }
    return false;
  };

  this.submitForm = function () {
    vm.formIsSubmit = true;

    DocumentService.createResource(vm.data)
    .then(function(data) {
      toastr.success(data.data.message, 'Estado!');
      $state.go('documents', {}, {reload: true});
    })
    .catch(function(errors) {
      vm.errors = errors.data;
    }).finally(function() {
      vm.formIsSubmit = false;
    });
  };
};
