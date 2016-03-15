module.exports = function (DocumentService, $state, toastr, $scope, Upload) {
  'ngInject';
  var vm = this;
  vm.action = 'Crear';
  vm.errors = {};
  vm.formIsSubmit = false;
  vm.data = {
    name:  '',
    file: '',
    filename: ''
  };

  this.hasError = function(property) {
    if (vm.errors.hasOwnProperty(property)) {
      return true;
    }
    return false;
  };

  this.submitForm = function () {
    if (vm.data.name && vm.data.file) {
      vm.upload(vm.data.file);
    }
  };

  this.upload = function(file) {
    vm.formIsSubmit = true;
    Upload.upload({
      url: '/uploadDocuments',
      data: {file: file}
    }).then(function (response) {
      vm.data.filename = response.data.filename;
      vm.createDocument();
    }, function (response) {
      vm.formIsSubmit = false;
      vm.errors = response.data;
    }, function (evt) {
      var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
      console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
    });
  };

  this.createDocument = function() {
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
