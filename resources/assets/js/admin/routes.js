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
    abstract: true,
    template: '<ui-view/>'
  }).
  state('users.list', {
    url: '/list',
    controller: require('./users/ListController'),
    controllerAs: 'vm',
    template: require('./views/users/index.html'),
    resolve: {
      users: function(UserService) {
        return UserService.getUsers().then(function(data) {
          return data.data;
        });
      }
    }
  })
  .state('users.create', {
    url: '/create',
    controller: require('./users/CreateController'),
    controllerAs: 'vm',
    template: require('./views/users/form.html'),
    resolve : {
      roles: function(RoleService) {
        return RoleService.getRoles().then(function(data) {
          return data.data;
        });
      }
    }
  })
  .state('users.edit', {
    url: '/edit/:id',
    controller: require('./users/EditController'),
    controllerAs: 'vm',
    template: require('./views/users/form.html'),
    resolve: {
      data: function(UserService, $stateParams) {
        return UserService.getUser($stateParams.id).then(function(data) {
          return data.data;
        });
      },
      roles: function(RoleService) {
        return RoleService.getRoles().then(function(data) {
          return data.data;
        });
      }
    },
  });

  $stateProvider
  .state('roles', {
    url: '/roles',
    abstract: true,
    template: '<ui-view/>'
  })
  .state('roles.list', {
    url: '/list',
    controller: require('./roles/ListController'),
    controllerAs: 'vm',
    template: require('./views/roles/index.html'),
    resolve: {
      roles: function(RoleService) {
        return RoleService.getRoles().then(function(data) {
          return data.data;
        });
      }
    }
  })
  .state('roles.create', {
    url: '/create',
    controller: require('./roles/CreateController'),
    controllerAs: 'vm',
    template: require('./views/roles/form.html'),
    resolve: {
      permissions: function(PermissionService) {
        return PermissionService.all().then(function(data) {
          return data.data;
        });
      }
    }
  })
  .state('roles.edit', {
    url: '/edit/:id',
    controllerAs: 'vm',
    controller: require('./roles/EditController'),
    template: require('./views/roles/form.html'),
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
    }
  });

  $urlRouterProvider.otherwise('/admin');
};
