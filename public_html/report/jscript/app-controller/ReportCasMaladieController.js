

app.controller('reportCntr',function($scope,$location,$route,$http){
    $scope.toshow=true;
    $scope.listeMaladie=[];
    $scope.table=[true,false,false];
    console.log("Page controlleur report");
    
    var conf = {
      headers : {
            'Content-Type' : 'application/json'
        }
    };
  
    var apiServer = new ApiServer();

    
       // get maladie
       $http.get(apiServer.getURLMaladie(),conf)
        .success(function (data, status, headers, conf)
        {
        	 $scope.message= " i'm in";
           console.log(data);
           $scope.listeMaladie= data;
         
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

