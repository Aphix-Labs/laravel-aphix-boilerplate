module.exports = function (UserService, toastr, SweetAlert) {
  'ngInject';

  var vm = this;
  this.users = [];

  UserService.getUsers().then(function(data) {
    vm.users = data.data;
  });

  this.destroy = function (data, index) {
    SweetAlert.swal({
      title: 'Esta seguro de eliminar?',
      text: 'No sera capaz de recuperar el registro!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Si, eliminalo!',
      closeOnConfirm: true,
    }, function(isConfirm) {
      if (isConfirm) {
        vm.deleteUser(data, index);
      }
    });
  };

  this.deleteUser = function (data, index) {
    UserService.deleteUser(data)
    .then(function(data) {
      toastr.success(data.data.message, 'Estado!');
      vm.removeFromUsers(index);
    })
    .catch(function(errors) {
      vm.errors = errors.data;
    });
  };

  this.removeFromUsers = function (index) {
    vm.users.splice(index, 1);
  };

};
