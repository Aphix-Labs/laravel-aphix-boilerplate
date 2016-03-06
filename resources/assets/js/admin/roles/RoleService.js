module.exports = function (ApiService) {
  'ngInject';

  angular.extend(this, ApiService);

  this.resource = 'roles';
};
