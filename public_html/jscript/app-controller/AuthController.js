


//var applogin = angular.module('loginform', []);

app.controller('formCtrl', ['$scope','$location', '$http','UserSericeAuth','SessionCookies', function($scope,$location, $http, UserSericeAuth,SessionCookies) {
   $scope.toshow = false;
   $scope.authUser = {
       mail: "",
       password:"",
       remember: true
       
   };
   //$scope.authUser.remember =false;
   $scope.message= "";
   console.log($scope.authUser.remember);
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
  
  $scope.submitData = function (user)
    {
    console.log(user);
    console.log($scope.authUser.remember);
        
     UserSericeAuth.login(user.mail,user.password,function(response){
        
       
        
        console.log(response);
        if(response.success){
            
            console.log(response);
            //$scope.globals = response;
           if (user.remember) 
           {
                SessionCookies.setCookie("Rase-user",response.User);
                SessionCookies.setSession("Rase-user",angular.toJson(response.User));
           }
           else{
                SessionCookies.setSession("Rase-user",angular.toJson(response.User));
           }


            console.log("Befor /home in login");
        
            $location.path('/home');
           console.log("After /home in login");
        }
        else
        {
             $scope.message = response.message;
             SessionCookies.removeCookie("Rase-user");
             SessionCookies.removeSession("Rase-user");
        }
         
         
     });   
        
        
 
    
  };  
    
}]);