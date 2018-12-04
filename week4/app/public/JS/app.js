var app = angular.module("tinyurlApp",["ngRoute", "ngResource", 'chart.js']);//before: index.html :<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.7.5/angular-route.min.js"></script>
//ngResource used by  $http.post("/api/v1/urls" in

app.config(function($routeProvider){//angular-route provides $routeProvider; callback function
    $routeProvider
        .when("/",{
            templateUrl: "./public/views/home.html",//view
            controller:"homeController"
        })
        .when("/urls/:shortUrl",{
            templateUrl: "./public/views/url.html",//view
            controller:"urlController"
        });

});
