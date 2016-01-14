module.exports = function OnConfig($stateProvider, $locationProvider, $urlRouterProvider) {
  'ngInject';

  $locationProvider.html5Mode({
    // enabled: true,
    // requireBase: false
  });

  // users
  $stateProvider
  .state('users', {
    url: '',
    controller: require('./users/ListController'),
    controllerAs: 'vm',
    templateUrl: '/views/admin/users/index.html',
    title: 'Users',
  })
  .state('users-create', {
    url: '/create',
    controller: require('./users/CreateController'),
    controllerAs: 'vm',
    templateUrl: '/views/admin/users/create.html',
    title: 'Users',
  });

  //
};
