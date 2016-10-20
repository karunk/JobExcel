'use strict';

// Setting up route
angular.module('articles').config(['$stateProvider',
  function ($stateProvider) {
    // Articles state routing
    $stateProvider
      .state('skills', {
        abstract: true,
        url: '/skills',
        template: '<ui-view/>'
      })
      .state('skills.list', {
        url: '',
        templateUrl: 'modules/articles/client/views/list-articles.client.view.html'
      })
      .state('skills.create', {
        url: '/create',
        templateUrl: 'modules/articles/client/views/create-skill.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('skills.view', {
        url: '/:articleId',
        templateUrl: 'modules/articles/client/views/view-article.client.view.html'
      })
      .state('skills.edit', {
        url: '/:articleId/edit',
        templateUrl: 'modules/articles/client/views/edit-article.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      });
  }
]);
