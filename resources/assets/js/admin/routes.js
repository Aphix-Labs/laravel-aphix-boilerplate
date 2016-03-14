module.exports = function OnConfig($stateProvider, $locationProvider, $urlRouterProvider) {
  'ngInject';
  $locationProvider.html5Mode({
    // enabled: true,
    // requireBase: false
  });

  $stateProvider
  // users
  .state('users', {
    url: '/users?page',
    controller: require('./users/ListController'),
    controllerAs: 'vm',
    template: require('./views/users/index.html'),
    resolve: {
      users: function(UserService, $stateParams) {
        return UserService.getResourcesPerPage($stateParams.page).then(function(data) {
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
        return RoleService.getResources().then(function(data) {
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
        return UserService.getResource($stateParams.id).then(function(data) {
          return data.data;
        });
      },
      roles: function(RoleService) {
        return RoleService.getResources().then(function(data) {
          return data.data;
        });
      }
    },
  });

  $stateProvider
  .state('roles', {
    url: '/roles?page',
    controller: require('./roles/ListController'),
    controllerAs: 'vm',
    template: require('./views/roles/index.html'),
    resolve: {
      roles: function(RoleService, $stateParams) {
        return RoleService.getResourcesPerPage($stateParams.page).then(function(data) {
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
        return RoleService.getResource($stateParams.id).then(function(data) {
          return data.data;
        });
      },
      permissions: function(PermissionService) {
        return PermissionService.all().then(function(data) {
          return data.data;
        });
      }
    }
  })
  .state('documents', {
    url: '/documents?page',
    controller: require('./documents/ListController'),
    controllerAs: 'vm',
    template: require('./views/documents/index.html'),
    resolve: {
      documents: function(DocumentService, $stateParams) {
        return DocumentService.getResourcesPerPage($stateParams.page).then(function(data) {
          return data.data;
        });
      }
    }
  })
  .state('documents.create', {
    url: '/create',
    controller: require('./documents/CreateController'),
    controllerAs: 'vm',
    template: require('./views/documents/form.html')
  });

  $urlRouterProvider.otherwise('/admin');
};
