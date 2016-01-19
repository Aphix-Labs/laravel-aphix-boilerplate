module.exports = function ($http) {
  'ngInject';

  this.getUsers = function () {
    return $http.get('/admin/users/all');
  };

  this.createUser = function(data) {
    return $http.post('/admin/users', data);
  };

  this.deleteUser = function(id) {
    return $http.delete('/admin/users/' + id);
  };
};
