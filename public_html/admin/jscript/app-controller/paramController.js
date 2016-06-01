
app.controller('paramCntr', function($scope,$location, $http ) {
  
  $scope.toshow = true;

  $scope.message= "loading...";
  $scope.listParametre= [];
   console.log("Page Controller Paramètre");

  var conf = {
      headers : {
            'Content-Type' : 'application/json'
        }
    };
    
    var apiServer = new ApiServer();
    
    


    $http.get(apiServer.getURLParametre(),conf)
        .success(function (data, status, headers, conf)
        {
        	 $scope.message= " i'm in";
          console.log(data);
          $scope.listParametre= data;
         
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












