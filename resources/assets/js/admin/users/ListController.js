module.exports = function (UserService) {
  var vm = this;
  this.users = [];

  UserService.getUsers().then(function(data) {
    vm.users = data.data;
  });
};
