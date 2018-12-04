angular.module("tinyurlApp")
    .controller("homeController",["$scope","$http","$location", function($scope,$http,$location){//pay attention to the order here; connect both view and controller;$location is used to jump to other page
            $scope.submit = function() {
                $http.post("/api/v1/urls",{
                    longUrl: $scope.longUrl //ng-model="longUrl" in home.html
                    }).success(function(data){//callback function
                        $location.path("/urls/"+data.shortUrl);
                    });
            }
    }]);