module.exports = function (UserService) {
  'ngInject';
  var vm = this;

  vm.data = {
    name:  '',
    email: '',
    password: '',
    password_confirmation: ''
  };

  vm.errors = {};

  this.submitForm = function () {
    UserService.createUser(vm.data).then(function(data) {
      console.log('usuario creado', data);
    }, function(errors) {
      vm.errors = errors.data;
      console.log(vm.errors);
    });
  };
};
