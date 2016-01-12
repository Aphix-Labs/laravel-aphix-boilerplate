module.exports = function OnConfig($stateProvider, $locationProvider, $urlRouterProvider) {
  'ngInject';

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  $stateProvider
  .state('users', {
    url: '/admin/users',
    controller: 'UsersController',
    controllerAs: 'vm',
    templateUrl: '/views/admin/users/index.html',
    title: 'Users',
  });

  $urlRouterProvider.otherwise('/admin/users');
};
