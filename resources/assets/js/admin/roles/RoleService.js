module.exports = function ($http) {
  'ngInject';

  this.getRoles = function () {
    return $http.get('/admin/roles');
  };

  this.createRole = function(data) {
    return $http.post('/admin/roles', data);
  };
};
