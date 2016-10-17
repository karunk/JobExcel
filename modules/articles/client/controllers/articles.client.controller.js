'use strict';

// Articles controller
angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles', '$timeout', '$filter',
  function ($scope, $stateParams, $location, Authentication, Articles, $timeout, $filter) {
    $scope.authentication = Authentication;
    
    $scope.formData = {};
    $scope.data = {};
    $scope.GreetingNumber = '';

    //Auxilary Function -- convert number to first,second etc..
    var special = ['zeroth','first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelvth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth'];
    var deca = ['twent', 'thirt', 'fourt', 'fift', 'sixt', 'sevent', 'eight', 'ninet'];
    function stringifyNumber(n) {
      if (n < 20) return special[n];
      if (n%10 === 0) return deca[Math.floor(n/10)-2] + 'ieth';
      return deca[Math.floor(n/10)-2] + 'y-' + special[n%10];
    }
    //Auxilart Function -- Build Pagination and other functions
    $scope.buildPager = function () {
      $scope.pagedItems = [];
      $scope.itemsPerPage = 15;
      $scope.currentPage = 1;
      $scope.figureOutItemsToDisplay();
    };
    $scope.figureOutItemsToDisplay = function () {
      $scope.filteredItems = $filter('filter')($scope.articles, {
        $: $scope.search
      });
      $scope.filterLength = $scope.filteredItems.length;
      var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
      var end = begin + $scope.itemsPerPage;
      $scope.pagedItems = $scope.filteredItems.slice(begin, end);
      console.log($scope.pagedItems);
    };
    $scope.pageChanged = function () {
      $scope.figureOutItemsToDisplay();
    };



    // Create new Article
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'articleForm');

        return false;
      }

      // Create new Article object
      var article = new Articles({
        jobtitle: this.jobtitle,
        company: this.company,
        deadline: this.deadline,
        notes: this.notes

      });

      // Redirect after save
      article.$save(function (response) {
        $location.path('articles/' + response._id);

        // Clear form fields
        $scope.title = '';
        $scope.content = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing Article
    $scope.remove = function (article) {
      if (article) {
        article.$remove();

        for (var i in $scope.articles) {
          if ($scope.articles[i] === article) {
            $scope.articles.splice(i, 1);
          }
        }
      } else {
        $scope.article.$remove(function () {
          $location.path('articles');
        });
      }
    };

    // Update existing Article
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'articleForm');

        return false;
      }

      var article = $scope.article;

      article.$update(function () {
        $location.path('articles/' + article._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Articles
    $scope.find = function () {
      $scope.articles = Articles.query();
      $scope.articles.$promise.then(function (result) {
          console.log(result.length);
          $scope.GreetingNumber = stringifyNumber(result.length+1);
      });
    };
    // Find a list of Articles and build pagination
    $scope.find_and_pagination = function () {
      $scope.articles = Articles.query();
      $scope.articles.$promise.then(function (result) {
          $scope.buildPager();
      });
    };  

    // Find existing Article
    $scope.findOne = function () {
      $scope.article = Articles.get({
        articleId: $stateParams.articleId
      });
    };
  }
]);
