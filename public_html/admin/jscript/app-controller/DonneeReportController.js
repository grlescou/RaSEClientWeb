



app.controller('DonneeReportCntr', function($scope,$location, $http ) {
  
  $scope.toshow = true;

  $scope.message= "loading...";
  $scope.listCasMaladie= [];
   console.log("Page Controller Utilisateur");

  var conf = {
      headers : {
            'Content-Type' : 'application/json'
        }
    };
    
    var apiServer = new ApiServer();
    
    


    $http.get(apiServer.getURLCasMaladie(),conf)
        .success(function (data, status, headers, conf)
        {
        	 $scope.message= " i'm in";
          console.log(data);
          $scope.listCasMaladie= data;
         
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












