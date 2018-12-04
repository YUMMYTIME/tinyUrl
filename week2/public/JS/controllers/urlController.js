angular.module("tinyurlApp")
    .controller("urlController",["$scope","$http","$routeParams", function($scope,$http,$routeParams){//pay attention to the order here; connect both view and controller;
        $http.get("/api/v1/urls/" + $routeParams.shortUrl)   //when("/urls/:shortUrl
            .success(function(data){
                $scope.longUrl = data.longUrl;
                $scope.shortUrl = data.shortUrl;
                $scope.shortUrlToShow = "http://localhost:3000/"+data.shortUrl;
            });//$routeParams.shortUrl because app.js "/urls/:shortUrl"


    }]);