module.exports = function (users, UserService, toastr, Confirm) {
  'ngInject';

  var vm = this;
  this.users = users;

  this.destroy = function (id, index) {
    Confirm.destroy(function() {
      vm.deleteUser(id, index);
    });
  };

  this.deleteUser = function (id, index) {
    UserService.deleteUser(id)
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
