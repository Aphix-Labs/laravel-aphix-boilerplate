module.exports = function ($http) {
  'ngInject';

  this.getUsers = function () {
    return $http.get('/admin/users');
  };

  this.createUser = function(data) {
    return $http.post('/admin/users', data);
  };

  this.updateUser = function(id, data) {
    return $http.put('/admin/users/' + id, data);
  };

  this.getUser = function(id) {
    return $http.get('/admin/users/' + id);
  };
};
