module.exports = function($http, $q) {
  'ngInject';

  this.resource = '';

  this.getResourcesPerPage = function(page) {
    page = page || 1;
    return $http.get('/admin/' + this.resource + '?page=' + page);
  };

  this.getResources = function() {
    return $http.get('/admin/' + this.resource);
  };

  this.getResource = function(id) {
    return $http.get('/admin/' + this.resource + '/' + id);
  };

  this.createResource = function(data) {
    return $http.post('/admin/' + this.resource, data, {ignoreLoadingBar: true});
  };

  this.deleteResource = function(id) {
    return $http.delete('/admin/' + this.resource + '/' + id);
  };

  this.updateResource = function(id, data) {
    return $http.put('/admin/' + this.resource + '/' + id, data, {ignoreLoadingBar: true});
  };

};
