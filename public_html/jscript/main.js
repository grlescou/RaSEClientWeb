
var globalsTransList = {};  


var app = angular.module('RaseClient', [
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
    .when("/", {templateUrl: "index.html", controller: "PageClientCtr"})
    
    // Pages
   // .when("/home", {templateUrl: "partials/home.html", controller: "PageCtrl"})
    //.when("/gesUser", {templateUrl: "partials/GestionUtilisateur.html", controller: "userCntr"})
   // .when("/ontologie", {templateUrl: "partials/GestionOntologie.html", controller: "ontoCntr"})
   
   .when("/gesReport", {templateUrl: "report/partials/GestionReport.html", controller: "reportCntr"})
   
    .when("/logout", {templateUrl: "login.html", controller: "formCtrl"})
    

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



//uglobalsTransList


app.controller("cartoTablerCtr",function($scope){
    
    $scope.isCartoTableCollapsed = true;
    $scope.listData = [];
    
    $scope.initTableList = function (){
        
        if ( $scope.isCartoTableCollapsed === false)
        {
        $scope.listData = globalsTransList;
        
        $scope.LimitADMTable = limitAdm;
        
        console.log("init Tbale List");
        console.log($scope.listData);
        console.log("end init Tbale List");
        }
        
    };
    
    console.log($scope.listData);
    console.log("Collapse Table :"+$scope.isProfileCollapsed);
    
    
    
});




// Ui date picker popup 

app.controller('DatepickerPopupCtrl', function ($scope) {
  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function() {
    $scope.dt = null;
  };

  $scope.inlineOptions = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: true
  };

  $scope.dateOptions = {
    dateDisabled: disabled,
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 1
  };

  // Disable weekend selection
  function disabled(data) {
    var date = data.date,
      mode = data.mode;
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  }

  $scope.toggleMin = function() {
    $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
    $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
  };

  $scope.toggleMin();

  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };

  $scope.setDate = function(year, month, day) {
    $scope.dt = new Date(year, month, day);
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  $scope.altInputFormats = ['M!/d!/yyyy'];

  $scope.popup1 = {
    opened: false
  };

  $scope.popup2 = {
    opened: false
  };

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  $scope.events = [
    {
      date: tomorrow,
      status: 'full'
    },
    {
      date: afterTomorrow,
      status: 'partially'
    }
  ];

  function getDayClass(data) {
    var date = data.date,
      mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  }
});





app.controller('TypeaheadCtrl', function($scope, $http) {
            $scope.listMaladie= [];
            $scope.listMention= [];
                var apiServer = new ApiServer();
               var conf = {
                    headers : {
                    'Content-Type' : 'application/json'
                       }
                };

              // get Maladie
                $http.get(apiServer.getURLMaladie(),conf)
                 .success(function (data, status, headers, conf)
                 {
                        
                   console.log("maladie liste TypeHead= ");
                       console.log(data);
                           console.log("=End maladie liste TypeHead");
                    $scope.listMaladie= data;
                    
                    //$scope.categorieInstance.changeData($scope.listCategorie);

            
                 })
                 .error(function (data, status, headers, conf)
                 {
                    //$scope.listMaladie= [];
                 });
                 
                   // get Mention
                $http.get(apiServer.getURLMention(),conf)
                 .success(function (data, status, headers, conf)
                 {
                        
                   console.log("Mention liste TypeHead= ");
                       console.log(data);
                           console.log("=End Mention liste TypeHead");
                    $scope.listMention= data;
                    
                    //$scope.categorieInstance.changeData($scope.listCategorie);

            
                 })
                 .error(function (data, status, headers, conf)
                 {
                    //$scope.listMaladie= [];
                 });



      

});


app.controller('RatingCtrl', function ($scope) {
  
  $scope.max = 5;
  $scope.isReadonly = false;

  $scope.hoveringOver = function(value) {
    $scope.overStar = value;
    $scope.percent =value ;
  };

  $scope.ratingStates = [
    {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
    {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
    {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
    {stateOn: 'glyphicon-heart'},
    {stateOff: 'glyphicon-off'}
  ];
});




app.controller('FilterCtrl', function($scope, $http) {
    
    
     $scope.Matchfilter = {};
     
     
     $scope.FilterRecherche = function (){
         
         
         console.log("Filter de recherche");
         console.log($scope.Matchfilter);
           console.log("End Filter de recherche");
     };
     
    
});





//var applogin = angular.module('loginform', []);

app.controller('formCtrl', ['$rootScope','$location', '$http','UserSericeAuth','SessionCookies', function($rootScope,$location, $http, UserSericeAuth,SessionCookies) {
   $rootScope.toshow = false;
   $rootScope.authUser = {
       mail: "",
       password:"",
       remember: true
       
   };
   // $rootScope.uglobals.isLogged
   
   
   
   //$scope.authUser.remember =false;
   $rootScope.messageLogin= "";
   console.log($rootScope.authUser.remember);
   //$scope.remember = false;
   
   
//   $scope.onCheck = function(){
//       $scope.authUser.remember = ! $scope.authUser.remember;
//       console.log($scope.authUser.remember);
//   };
//   
   
//   $scope.$watch(function(){
//       return $scope.authUser.remember;
//   }, function(){
//       $scope.authUser.remember = Number($scope.authUser.remember);
//       console.log($scope.authUser.remember, typeof $scope.authUser.remember);
//   }, true);
   
   console.log("Page Controller login.");
  
  $rootScope.submitData = function (user)
    {
    console.log(user);
    console.log($rootScope.authUser.remember);
        
     UserSericeAuth.login(user.mail,user.password,function(response){
        
       
        
        console.log(response);
        if(response.success){
            $rootScope.Usermane= response.User.prenom + " " +response.User.nom
            console.log(response);
          $rootScope.uglobals = response;
           if (user.remember) 
           {
                
                SessionCookies.setCookie("Rase-user",response.User);
                SessionCookies.setSession("Rase-user",angular.toJson(response.User));
           }
           else{
                SessionCookies.setSession("Rase-user",angular.toJson(response.User));
           }
           
           
           if($rootScope.uglobals.User.groupeIndividu === "PersonnelSante")
           {
              $rootScope.isMenuPersonelSanteCollapsed = true;
    
              $rootScope.isMenuOrganismeSanteCollapsed = false;
    
           }
           if($rootScope.uglobals.User.groupeIndividu === "OrganismeSante")
           {
                   $rootScope.isMenuPersonelSanteCollapsed = false;
    
                     $rootScope.isMenuOrganismeSanteCollapsed = true;
    
                 
           }


            console.log("Befor /home in login");
        
            //$location.path('/home');
           console.log("After /home in login");
           $rootScope.authUser = {};
           $rootScope.messageLogin= "";
        }
        else
        {
             $rootScope.messageLogin = response.message;
             SessionCookies.removeCookie("Rase-user");
             SessionCookies.removeSession("Rase-user");
        }
         
         
     });   
        
        
 
    
  };  
    
}]);


app.controller("collapseMenuCtr",['$rootScope',function($rootScope){
    
   if(! $rootScope.uglobals.isLogged){
       
    
    $rootScope.isMenuPersonelSanteCollapsed = false;
    
    $rootScope.isMenuOrganismeSanteCollapsed = false;
    
    }
    
}]);


app.controller("collapseReportCtr",['$rootScope',function($rootScope){
    
     $rootScope.isReportCollapsed = true;
    
   if(! $rootScope.uglobals.isLogged){
       
    
      $rootScope.isReportCollapsed = true;
    
    }
    
    $rootScope.reportCollapse = function(){
         $rootScope.isReportCollapsed = !  $rootScope.isReportCollapsed ;
    }
    
    
    
    
    
}]);



app.controller("sessionCtr", ['$rootScope','$location', '$http','UserSericeAuth','SessionCookies', function($rootScope,$location, $http, UserSericeAuth,SessionCookies){
        
  
  if(! $rootScope.uglobals.isLogged){
        $rootScope.Usermane= "Login";
  }
  
    
    $rootScope.logout = function(){
        
        UserSericeAuth.logout();
        
        $rootScope.isMenuPersonelSanteCollapsed = false;
        $rootScope.isMenuOrganismeSanteCollapsed = false;
        
         $location.path("/logout");
         $rootScope.toshow = false;
         $rootScope.uglobals.isLogged = false;
         $rootScope.Usermane= "Login";
        
    };
    
        
        
        
}]);



app.run(['$rootScope','$location', '$http','UserSericeAuth','SessionCookies', function($rootScope,$location, $http, UserSericeAuth,SessionCookies){
        
         
 
         
   
 
        UserSericeAuth.refreshSession(function(response){
         $rootScope.uglobals = {};
         //$rootScope.uglobals.User = null;
         console.log(response);
          $rootScope.uglobals = response  ;
         
         if( $rootScope.uglobals.isLogged){
           //$rootScope.uglobals.User = response.User  ;
           
            $rootScope.Usermane=  $rootScope.uglobals.User.prenom + " " +$rootScope.uglobals.User.nom
           
//           console.log("Im redirect to home page");
//                if($location.path() === "/login"){
//                
//                $location.path("/home");
//            }
         }
         else
         {
              //$rootScope.uglobals.User = response.User  ;
              //
            $rootScope.Usermane= "Login";
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
         $rootScope.uglobals = {};
         //$rootScope.uglobals.User = null;
         console.log("State Refresh");
         
          $rootScope.uglobals = response  ;
        if( $rootScope.uglobals.isLogged)
        {
          $rootScope.Usermane=  $rootScope.uglobals.User.prenom + " " +$rootScope.uglobals.User.nom;
          
          if($rootScope.uglobals.User.groupeIndividu === "PersonnelSante")
           {
              $rootScope.isMenuPersonelSanteCollapsed = true;
    
              $rootScope.isMenuOrganismeSanteCollapsed = false;
    
           }
           if($rootScope.uglobals.User.groupeIndividu === "OrganismeSante")
           {
                   $rootScope.isMenuPersonelSanteCollapsed = false;
    
                     $rootScope.isMenuOrganismeSanteCollapsed = true;
    
                 
           }


        }
        else
        {
              $rootScope.Usermane= "Login";
              $rootScope.isMenuPersonelSanteCollapsed = false;
    
              $rootScope.isMenuOrganismeSanteCollapsed = false;
        }
          console.log($rootScope.uglobals);
          
          });
           
           
            if($location.path() !== "/" &&  $rootScope.uglobals.isLogged ===false ){
               //  $location.path("/login");
                  console.log("Im redirect to login by state");
                   $rootScope.Usermane= "Login";
            }
            else{
            
            if($location.path() === "/" &&  $rootScope.uglobals.isLogged){
                
               // $location.path("/home");
                $rootScope.Usermane=  $rootScope.uglobals.User.prenom + " " +$rootScope.uglobals.User.nom
                console.log("Login page to home page if True by state");
            }
            else{
                console.log("Im redirect to nothing by state");
            }
        }
            
           
       });
       
        
        
}]);
