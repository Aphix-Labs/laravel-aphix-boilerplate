module.exports = function ($http, $q) {
  'ngInject';

  this.getUsers = function (page) {
    page = page || 1;
    return $http.get('/admin/users?page=' + page);
  };

  this.createUser = function(data) {
    return $http.post('/admin/users', data, {ignoreLoadingBar: true});
  };

  this.deleteUser = function(id) {
    return $http.delete('/admin/users/' + id);
  };

  this.updateUser = function(id, data) {
    return $http.put('/admin/users/' + id, data, {ignoreLoadingBar: true});
  };

  this.getUser = function(id) {
    return $http.get('/admin/users/' + id);
  };
};
