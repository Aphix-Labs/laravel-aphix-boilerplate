module.exports = function($http) {
  'ngInject';
  this.resource = '';

  this.filterResources = function(params) {
    var queryParams = buildQueryParams(params);
    return $http.get('/admin/' + this.resource + queryParams);
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

  function buildQueryParams(params) {
    var page = params.page || 1;
    var query = '?page=' + page;

    for (var paramKey in params) {
      if (paramKey !== 'page' && params[paramKey] !== undefined) {
        query += '&' + paramKey + '=' + params[paramKey];
      }
    }
    return query;
  }
};
