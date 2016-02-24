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
    template: require('./views/users/index.html'),
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
    template: require('./views/users/create.html'),
    title: 'Users',
  })
  .state('users-edit', {
    url: '/user/edit/:id',
    controller: require('./users/EditController'),
    controllerAs: 'vm',
    template: require('./views/users/edit.html'),
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
    template: require('./views/roles/index.html'),
    title: 'Roles',
    resolve: {
      roles: function(RoleService) {
        return RoleService.getRoles().then(function(data) {
          return data.data;
        });
      }
    }
  })
  .state('roles-create', {
    url: '/roles/create',
    controller: require('./roles/CreateController'),
    controllerAs: 'vm',
    template: require('./views/roles/create.html'),
    title: 'Roles',
    resolve: {
      permissions: function(PermissionService) {
        return PermissionService.all().then(function(data) {
          return data.data;
        });
      }
    }
  })
  .state('roles-edit', {
    url: '/roles/edit/:id',
    controller: require('./roles/EditController'),
    controllerAs: 'vm',
    template: require('./views/roles/edit.html'),
    resolve: {
      role: function(RoleService, $stateParams) {
        return RoleService.getRole($stateParams.id).then(function(data) {
          return data.data;
        });
      },
      permissions: function(PermissionService) {
        return PermissionService.all().then(function(data) {
          return data.data;
        });
      }
    },
  });

  $urlRouterProvider.otherwise('/admin');
};
