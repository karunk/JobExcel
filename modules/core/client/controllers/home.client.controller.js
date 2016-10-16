'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    $scope.myModel = 'karun'
	$scope.myValidator = function(newValue) {
	  // a simple required field:
	  return !!newValue;
	};

  }
]);
