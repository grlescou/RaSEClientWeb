
  


var app = angular.module('RaseApp', [
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
    .when("/", {templateUrl: "partials/home.html", controller: "PageCtrl"})
    
    // Pages
    .when("/home", {templateUrl: "partials/home.html", controller: "PageCtrl"})
    
    .when("/ontologie", {templateUrl: "partials/GestionOntologie.html", controller: "ontoCntr"})
    
    .when("/donneesReport", {templateUrl: "partials/GestionDonneeReport.html", controller: "DonneeReportCntr"})


    .when("/gesUser", {templateUrl: "partials/GestionUtilisateur.html", controller: "userCntr"})
    .when("/gesAdmin", {templateUrl: "partials/GestionAdministrateur.html", controller: "AdmCntr"})
    .when("/gesRole", {templateUrl: "partials/GestionRole.html", controller: "roleCntr"})
    .when("/gesGIndividu", {templateUrl: "partials/GestionGroupeIndividu.html", controller: "groupeIndividuCntr"})


    .when("/login", {templateUrl: "login.html", controller: "formCtrl"})
    // else 404
    .otherwise("/404", {redirectTo: '/new' });

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
app.controller('PageCtrl', function ($scope, $location, $http ) {
  $scope.toshow = true;
  
  if($location.path() == "/login"){
    
    
    $location.path("/login");
    $scope.toshow = false;
  }
  console.log("Page Controller reporting for duty2.");

});



app.controller("collapseMenuCtr",function($scope){
    
    $scope.isSecuriteCollapsed = true;
    
    console.log("Collapse Filter Search :"+$scope.isFilterCollapsed);
    
});

