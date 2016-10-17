'use strict';

// Configuring the Articles module
angular.module('articles').run(['Menus',
  function (Menus) {
    // Add the articles dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Job Listings',
      state: 'articles',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'articles', {
      title: 'List Jobs',
      state: 'articles.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'articles', {
      title: 'Add a new job',
      state: 'articles.create',
      roles: ['user']
    });
  }
]);
