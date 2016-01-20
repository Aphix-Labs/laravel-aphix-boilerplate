module.exports = function (RoleService) {
  var vm = this;
  this.roles = [];

  RoleService.getRoles().then(function(data) {
    vm.roles = data.data;
  });
};
