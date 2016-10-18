'use strict';

// Articles controller
angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles', '$timeout', '$filter', '$http',
  function ($scope, $stateParams, $location, Authentication, Articles, $timeout, $filter, $http) {
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
      $scope.itemsPerPage = 6;
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
    //Auxilart function to convert milliseconds to human readable time
    $scope.MstoTime = function(milliseconds){
      console.log("sec",seconds);
      var seconds = milliseconds/1000;
      var numyears = Math.floor(seconds / 31536000);
      console.log(numyears);
      var numdays = Math.floor((seconds % 31536000) / 86400); 
      var numhours = Math.floor(((seconds % 31536000) % 86400) / 3600);
      var numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
      var numseconds = (((seconds % 31536000) % 86400) % 3600) % 60;

      if(numyears>0){
        if(numyears == 1) return "1 year left to apply";
        else return numyears+" years left to apply";
      }
      else if(numdays>0){
        if(numdays == 1) return "1 day left to apply";
        else return numdays+" days left to apply";
      }
      else if(numhours>0){
        if(numhours == 1) return "1 hour left to apply";
        else return numhours+" hours left to apply";
      }
      else if(numminutes>0){
        if(numminutes == 1) return "1 minute left to apply";
        else return numminutes+" minutes left to apply";
      }
      else if(numseconds>0){
        if(numseconds == 1) return "1 second left to apply";
        else return numseconds+" seconds left to apply";
      }
      else
        return "Deadline over! Apply Immediately."
    };
    
    $scope.text_truncate = function(str, length, ending) {  
        if (length == null) {  
          length = 100;  
        }  
        if (ending == null) {  
          ending = '...';  
        }  
        if (str.length > length) {  
          return str.substring(0, length - ending.length) + ending;  
        } else {  
          return str;  
        }  
      };
    $scope.GlassdoorClean = function(glassdoor){
      $scope.Glassdoor = {};
      $scope.Glassdoor.class = "label-neutral";

      var default_image = $scope.authentication.user.profileImageURL;
      //CEO
      try{
        $scope.Glassdoor.ceo_image = glassdoor.data.response.employers[0].ceo.image.src;
      }
      catch(err){
        $scope.Glassdoor.ceo_image = default_image;
      }
      $scope.Glassdoor.ceo_name = glassdoor.data.response.employers[0].ceo.name;
      $scope.Glassdoor.ceo_approve = glassdoor.data.response.employers[0].ceo.pctApprove;

      //RATINGS
      $scope.Glassdoor.compensation_and_benifits_rating = glassdoor.data.response.employers[0].compensationAndBenefitsRating;
      $scope.Glassdoor.culture_and_values_rating = glassdoor.data.response.employers[0].cultureAndValuesRating;
      $scope.Glassdoor.overall_rating = glassdoor.data.response.employers[0].overallRating;
      $scope.Glassdoor.rating_description = glassdoor.data.response.employers[0].ratingDescription;
      $scope.Glassdoor.reccomend_friend = glassdoor.data.response.employers[0].recommendToFriendRating;
      if($scope.Glassdoor.overall_rating<2){
        $scope.Glassdoor.class = "label-danger";
      }
      else{
        $scope.Glassdoor.class = "label-success";
      }
      //REVIEW
      $scope.Glassdoor.pro = $scope.text_truncate(glassdoor.data.response.employers[0].featuredReview.pros,100,'...');
      $scope.Glassdoor.pro_link = glassdoor.data.response.employers[0].featuredReview.attributionURL;

    };


    //---------end of aux functions-------------

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
      console.log(article);
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
      $scope.article.$promise.then(function (result) {
        var tmpDate = new Date(result.deadline);
        var now = new Date();
        $scope.Datemsdiff = $scope.MstoTime(tmpDate - now);

        $http.post('/api/glassdoor', {
          companyname: $scope.article.company
        }).success(function(data){
          console.log(data);
          $scope.glassdoor = data;
          $scope.GlassdoorClean(data);
        });

      });
    };
  }
]);
