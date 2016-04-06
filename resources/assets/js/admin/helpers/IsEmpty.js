module.exports = function() {
  return function(object) {
    if (Array === object.constructor) {
      return angular.equals([], object);
    }
    return angular.equals({}, object);
  };
};
