'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$http',
  function ($scope, Authentication, $http) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    $scope.myModel = 'karun'
	$scope.myValidator = function(newValue) {
	  // a simple required field:
	  return !!newValue;
	};

    // Find all Skills
    $scope.find_skills = function () {
      $scope.skills = [];
      var url = '/api/skills/';
      $http.get(url).success(function(data){
          console.log(data);
          $scope.skills = data;
        });
    };

  }
]);
