
  


var app = angular.module('RaseClient', [
  'ngRoute',
  'datatables', 
  'ngResource',
  "ngAnimate",
  'ui.bootstrap'
]);

/**
 * Configure the Routes
 */
app.config(['$routeProvider','$locationProvider', function ($routeProvider,$locationProvider) {
 

  $routeProvider
    // Home
    .when("/", {templateUrl: "index.html", controller: "PageClientCtr"})
    
    // Pages
   // .when("/home", {templateUrl: "partials/home.html", controller: "PageCtrl"})
    //.when("/gesUser", {templateUrl: "partials/GestionUtilisateur.html", controller: "userCntr"})
   // .when("/ontologie", {templateUrl: "partials/GestionOntologie.html", controller: "ontoCntr"})

   // .when("/login", {templateUrl: "login.html", controller: "formCtrl"})
    // else 404
    .otherwise("/404", {redirectTo: '/' });

    $locationProvider.html5Mode({
      enabled: false,
      requireBase: true
    });


 


}]);


// //Define an angular module for our app
// var sampleApp = angular.module('RaseApp', ['ngRoute']);
 
// //Define Routing for app
// //Uri /AddNewOrder -> template add_order.html and Controller AddOrderController
// //Uri /ShowOrders -> template show_orders.html and Controller AddOrderController
// sampleApp.config(['$routeProvider',
//   function($routeProvider) {
//     $routeProvider.
//       when('/', {
//         templateUrl: 'partials/home.html',
//         controller: 'AddOrderController'
//     }).
//       when('/new', {
//         templateUrl: 'partials/home.html',
//         controller: 'ShowOrdersController'
//       }).
//       otherwise({
//         redirectTo: '/'
//       });
// }]);
 
 

/**
 * Controls all other Pages
 */
app.controller('PageClientCtr', function ($scope, $location, $http ) {
  
  console.log("Page Client Controller reporting for duty.");

});


app.controller("collapseFilterCtr",function($scope){
    
    $scope.isFilterCollapsed = false;
    
    console.log("Collapse Filter Search :"+$scope.isFilterCollapsed);
    
});



app.controller("collapseHeaderCtr",function($scope){
    
    $scope.isProfileCollapsed = true;
    
    console.log("Collapse Profile :"+$scope.isProfileCollapsed);
    
});
