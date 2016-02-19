module.exports = function ($http, $q) {
  'ngInject';

  this.getRoles = function () {
    return $http.get('/admin/roles');
  };

  this.getRole = function (id) {
    return $http.get('/admin/roles/' + id);
  };

  this.createRole = function(data) {
    return $http.post('/admin/roles', data);
  };

  this.updateRole = function(data) {
    return $http.put('/admin/roles/' + data.id, data, {ignoreLoadingBar: true});
  };

  this.deleteRole = function(id) {
    return $http.delete('/admin/roles/' + id);
  };
};
