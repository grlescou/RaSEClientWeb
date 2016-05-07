


//var applogin = angular.module('loginform', []);

app.controller('formCtrl', function($scope,$location, $http ) {
   $scope.toshow = false;
   $scope.authUser = {};
   $scope.message= "";
   
   console.log("Page Controller login.");
  
  $scope.submitData = function (user)
    {
    console.log(user)
    
    var conf = {
      headers : {
            'Content-Type' : 'application/json'
        }
    };
  
  $http.post("http://192.168.127.140:8080/rasehtserver/api/v1/utilisateur/auth", user,conf)
        .success(function (data, status, headers, conf)
        {
          
      if (data.success){
        console.log(data);
        $location.path('/home');
      }
      else{
        $scope.message = data.message;
      }
        })
        .error(function (data, status, headers, conf)
        {
          $scope.message = "SUBMIT ERROR";
        });
    
  };  
    
});