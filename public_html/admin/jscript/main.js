
  


var app = angular.module('RaseApp', [
  'ngRoute',
  'datatables', 
  'ngResource',
  "ngAnimate",
  "ngCookies",
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
     .when("/logout", {templateUrl: "login.html", controller: "formCtrl"})
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
  
  if($location.path() === "/login"){
    
    
    $location.path("/login");
    $scope.toshow = false;
  }
  console.log("Page Controller reporting for duty2.");

});



app.controller("collapseMenuCtr",function($scope){
    
    $scope.isSecuriteCollapsed = true;
    
    console.log("Collapse Filter Search :"+$scope.isFilterCollapsed);
    
});



app.controller("collapseHeaderCtr",function($scope){
    
    $scope.isProfileCollapsed = true;
    
    console.log("Collapse Profile :"+$scope.isProfileCollapsed);
    
});



app.controller("sessionCtr", ['$scope','$location', '$http','UserSericeAuth','SessionCookies', function($scope,$location, $http, UserSericeAuth,SessionCookies){
        
    
    
    $scope.logout = function(){
        
        UserSericeAuth.logout();
        
         $location.path("/logout");
         $scope.toshow = false;
        
    };
    
        
        
        
}]);



app.run(['$rootScope','$location', '$http','UserSericeAuth','SessionCookies', function($rootScope,$location, $http, UserSericeAuth,SessionCookies){
        
         
 
         
   
 
        UserSericeAuth.refreshSession(function(response){
         $rootScope.globals = {};
         //$rootScope.globals.User = null;
         console.log(response);
          $rootScope.globals = response  ;
         
         if( $rootScope.globals.isLogged){
           //$rootScope.globals.User = response.User  ;
           
//           console.log("Im redirect to home page");
//                if($location.path() === "/login"){
//                
//                $location.path("/home");
//            }
         }
         else
         {
              //$rootScope.globals.User = response.User  ;
//              
//            if($location.path() !== "/login"){
//    
//             //UserSericeAuth.logout();
//          
//              $location.path("/login");
//              console.log("Im redirect to login page");
//            }
             
              
         }
            
            
        });
        
       
       $rootScope.$on('$locationChangeStart',function(event,next,current){
           
         UserSericeAuth.refreshSession(function(response){
         $rootScope.globals = {};
         //$rootScope.globals.User = null;
         console.log("State Refresh");
         
          $rootScope.globals = response  ;
          
          console.log($rootScope.globals);
          
          });
           
           
            if($location.path() !== "/login" &&  $rootScope.globals.isLogged ===false ){
                 $location.path("/login");
                  console.log("Im redirect to login by state");
            }
            else{
            
            if($location.path() === "/login" &&  $rootScope.globals.isLogged){
                
                $location.path("/home");
                console.log("Login page to home page if True by state");
            }
            else{
                console.log("Im redirect to nothing by state");
            }
        }
            
           
       });
       
        
        
}]);
