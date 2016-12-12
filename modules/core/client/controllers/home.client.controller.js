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
        if(numyears == 1) return "1 year";
        else return numyears+" years";
      }
      else if(numdays>0){
        if(numdays == 1) return "1 day";
        else return numdays+" days";
      }
      else if(numhours>0){
        if(numhours == 1) return "1 hour";
        else return numhours+" hours";
      }
      else if(numminutes>0){
        if(numminutes == 1) return "1 minute";
        else return numminutes+" minutes";
      }
      else if(numseconds>0){
        if(numseconds == 1) return "1 second";
        else return numseconds+" seconds";
      }
      else
        return "Apply Immediately."
    };

    // Find all Skills
    $scope.gather_info = function () {
      $scope.info = {};
      $scope.applied = "";
      $scope.approaching_deadline = [];

      //FIRST FIND ALL JOBS POSTED BY USER
      var url = '/api/article/' + $scope.authentication.user._id;
      $http.get(url).success(function(data){
          console.log(data);
          $scope.info = data;

          if($scope.info.length == 0)
            $scope.applied = "You have not started listing jobs on jobexcel."
          else if($scope.info.length == 1)
            $scope.applied = "You have listed only one job."
          else
            $scope.applied = "You have listed " + $scope.info.length + " jobs."

          for(var i=0; i<$scope.info.length; i++){
            var tmp = {};
            tmp.company = $scope.info[i].company;
            tmp.jobtitle = $scope.info[i].jobtitle;
            tmp.dead = $scope.info[i].deadline;
            var now = new Date();
            var tmpDate = new Date($scope.info[i].deadline);
            tmp.Datemsdiff = $scope.MstoTime(tmpDate - now);

            $scope.approaching_deadline.push(tmp);
          }

          console.log($scope.approaching_deadline);

          $scope.approaching_deadline.sort(function(a, b){
              var keyA = new Date(a.dead),
                  keyB = new Date(b.dead);
              // Compare the 2 dates
              if(keyA < keyB) return -1;
              if(keyA > keyB) return 1;
              return 0;
          });

          $scope.approaching_deadline = $scope.approaching_deadline.slice(0,3);
          
          console.log($scope.approaching_deadline);

        });
    };













    $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
    $scope.data = [300, 500, 100];


    $scope.words = [
      {text: "Lorem", weight: 13},
      {text: "Ipsum", weight: 10.5},
      {text: "Dolor", weight: 9.4},
      {text: "Sit", weight: 8},
      {text: "Amet", weight: 6.2},
      {text: "Consectetur", weight: 5},
      {text: "Adipiscing", weight: 5},
      {text: "Elit", weight: 5},
      {text: "Nam et", weight: 5},
      {text: "Leo", weight: 4},
      {text: "Sapien", weight: 4},
      {text: "Pellentesque", weight: 3},
      {text: "habitant", weight: 3},
      {text: "morbi", weight: 3},
      {text: "tristisque", weight: 3},
      {text: "senectus", weight: 3},
      {text: "et netus", weight: 3},
      {text: "et malesuada", weight: 3},
      {text: "fames", weight: 2},
      {text: "ac turpis", weight: 2},
      {text: "egestas", weight: 2},
      {text: "Aenean", weight: 2},
      {text: "vestibulum", weight: 2},
      {text: "elit", weight: 2},
      {text: "sit amet", weight: 2},
      {text: "metus", weight: 2},
      {text: "adipiscing", weight: 2},
      {text: "ut ultrices", weight: 2}
    ];
        
  

  }
]);
