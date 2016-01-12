module.exports = function ($http) {
  'ngInject';

  this.getUsers = function () {
    return $http.get('/users');
  };
};
