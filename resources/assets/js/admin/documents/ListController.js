module.exports = function (documents, DocumentService, toastr, Confirm, $state) {
  'ngInject';
  var vm = this;
  vm.documents = documents.data;
  vm.totalItems = documents.total;
  vm.currentPage = documents.current_page;
  vm.itemsPerPage = documents.per_page;

  vm.pageChanged = function() {
    $state.go('.', {page: vm.currentPage});
  };

  vm.destroy = function (id, index) {
    Confirm.destroy(function() {
      vm.deleteUser(id, index);
    });
  };

  vm.deleteUser = function (id, index) {
    UserService.deleteResource(id)
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
