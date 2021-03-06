'use strict';

module.exports = {
  client: {
    lib: {
      css: [
        'public/lib/bootstrap/dist/css/bootstrap.css',
        'public/paperkit/assets/css/ct-paper.css',
        'public/paperkit/assets/css/demo.css',
        'public/paperkit/assets/css/examples.css',
        'public/lib/angular-spinkit/build/angular-spinkit.min.css',
        'public/lib/jqcloud2/dist/jqcloud.min.css'
      ],
      js: [
        'public/lib/angular/angular.js',
        'public/lib/angular-resource/angular-resource.js',
        'public/lib/angular-animate/angular-animate.js',
        'public/lib/angular-messages/angular-messages.js',
        'public/lib/angular-ui-router/release/angular-ui-router.js',
        'public/lib/angular-ui-utils/ui-utils.js',
        'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
        'public/lib/angular-file-upload/angular-file-upload.js',
        'public/lib/owasp-password-strength-test/owasp-password-strength-test.js',
        'public/paperkit/assets/js/jquery-1.10.2.js',
        'public/paperkit/assets/js/jquery-ui-1.10.4.custom.min.js',
        'public/paperkit/bootstrap3/js/bootstrap.js',
        'public/paperkit/assets/js/ct-paper-checkbox.js',
        'public/lib/angular-spinkit/build/angular-spinkit.min.js',
        'public/lib/chart.js/dist/Chart.min.js',
        'public/lib/angular-chart.js/dist/angular-chart.min.js',
        'public/lib/jqcloud2/dist/jqcloud.min.js',
        'public/lib/angular-jqcloud/angular-jqcloud.js'
      ],
      tests: ['public/lib/angular-mocks/angular-mocks.js']
    },
    css: [
      'modules/*/client/css/*.css'
    ],
    less: [
      'modules/*/client/less/*.less'
    ],
    sass: [
      'modules/*/client/scss/*.scss'
    ],
    js: [
      'modules/core/client/app/config.js',
      'modules/core/client/app/init.js',
      'modules/*/client/*.js',
      'modules/*/client/**/*.js'
    ],
    views: ['modules/*/client/views/**/*.html'],
    templates: ['build/templates.js']
  },
  server: {
    gruntConfig: 'gruntfile.js',
    gulpConfig: 'gulpfile.js',
    allJS: ['server.js', 'config/**/*.js', 'modules/*/server/**/*.js'],
    models: 'modules/*/server/models/**/*.js',
    routes: ['modules/!(core)/server/routes/**/*.js', 'modules/core/server/routes/**/*.js'],
    sockets: 'modules/*/server/sockets/**/*.js',
    config: 'modules/*/server/config/*.js',
    policies: 'modules/*/server/policies/*.js',
    views: 'modules/*/server/views/*.html'
  }
};
