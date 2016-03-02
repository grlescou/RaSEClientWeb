



app.controller('userCntr', function($scope,$location, $http ) {
  
  $scope.toshow = true;

  $scope.message= "loading...";
  $scope.listUser= [];
   console.log("Page Controller Utilisateur");

  var conf = {
      headers : {
            'Content-Type' : 'application/json'
        }
    };
    
    var apiServer = new ApiServer();
    
    


    $http.get(apiServer.getURLUtilisateur(),conf)
        .success(function (data, status, headers, conf)
        {
        	 $scope.message= " i'm in";
          console.log(data);
          $scope.listUser= data;
         
      if (data.leng){
        console.log(data);
        $scope.message = "read";
        //$location.path('/home');
      }
      else{
        $scope.message = data.message
      }
        })
        .error(function (data, status, headers, conf)
        {
          $scope.message = "SUBMIT ERROR";
        });

 
  



    
});












