module.exports = function OnConfig($stateProvider, $locationProvider, $urlRouterProvider) {
  'ngInject';

  $locationProvider.html5Mode({
    // enabled: true,
    // requireBase: false
  });

  // users
  $stateProvider
  .state('users', {
    url: '/users',
    controller: require('./users/ListController'),
    controllerAs: 'vm',
    templateUrl: '/views/admin/users/index.html',
    resolve: {
      users: function(UserService) {
        return UserService.getUsers().then(function(data) {
          return data.data;
        });
      }
    },
    title: 'Users',
  })
  .state('users-create', {
    url: '/user/create',
    controller: require('./users/CreateController'),
    controllerAs: 'vm',
    templateUrl: '/views/admin/users/create.html',
    title: 'Users',
  })
  .state('users-edit', {
    url: '/user/edit/:id',
    controller: require('./users/EditController'),
    controllerAs: 'vm',
    templateUrl: '/views/admin/users/edit.html',
    resolve: {
      data: function(UserService, $stateParams) {
        return UserService.getUser($stateParams.id).then(function(data) {
          return data.data;
        });
      }
    },
  });

  $stateProvider
  .state('roles', {
    url: '/roles',
    controller: require('./roles/ListController'),
    controllerAs: 'vm',
    templateUrl: '/views/admin/roles/index.html',
    title: 'Roles',
  })
  .state('roles-create', {
    url: '/roles/create',
    controller: require('./roles/CreateController'),
    controllerAs: 'vm',
    templateUrl: '/views/admin/roles/create.html',
    title: 'Roles',
  });

  $urlRouterProvider.otherwise('/admin');
};
