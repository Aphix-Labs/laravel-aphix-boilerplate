module.exports = function (users, UserService, toastr, Confirm, $state) {
  'ngInject';

  var vm = this;
  vm.users = users.data;
  vm.totalItems = users.total;
  vm.currentPage = users.current_page;
  vm.itemsPerPage = users.per_page;

  vm.pageChanged = function() {
    $state.go('.', {page: vm.currentPage});
  };

  vm.destroy = function (id, index) {
    Confirm.destroy(function() {
      vm.deleteUser(id, index);
    });
  };

  vm.deleteUser = function (id, index) {
    UserService.deleteUser(id)
    .then(function(data) {
      toastr.success(data.data.message, 'Estado!');
      vm.removeFromUsers(index);
    })
    .catch(function(errors) {
      vm.errors = errors.data;
    });
  };

  vm.removeFromUsers = function (index) {
    vm.users.splice(index, 1);
  };

};
